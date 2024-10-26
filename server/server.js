import express from "express";
import path from "path";
import mongoose from "mongoose";
import template_routes from "./email_templates/template_routes.js";
import config from "./config.js";
import cors from "cors";
import passport from "passport";
import compression from "compression";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { google } from "googleapis";
import { fileURLToPath } from "url";
import { dirname } from "path";
import routes from "./api/index.js"; // Make sure to add the .js extension
import sslRedirect from "heroku-ssl-redirect";
import configurePassport from "./passport.js";

// ... rest of your server.js code

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const Bugsnag = require("@bugsnag/js");
// const BugsnagPluginExpress = require("@bugsnag/plugin-express");

const oauthClients = {};

async function initializeOAuthClient(type, credentials) {
  const oauth2Client = new google.auth.OAuth2(
    credentials.client_id,
    credentials.client_secret,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: credentials.refresh_token,
  });

  // Refresh and store the access token for this client
  const { token } = await oauth2Client.getAccessToken();
  oauthClients[type] = { client: oauth2Client, accessToken: token, user: credentials.user };
}

// Initialize all OAuth clients on server start
async function initializeAllOAuthClients() {
  await initializeOAuthClient("contact", {
    user: config.CONTACT_EMAIL,
    client_id: config.GOOGLE_CONTACT_OAUTH_ID,
    client_secret: config.GOOGLE_CONTACT_OAUTH_SECRET,
    refresh_token: config.GOOGLE_CONTACT_OAUTH_REFRESH_TOKEN,
  });
  await initializeOAuthClient("info", {
    user: config.INFO_EMAIL,
    client_id: config.GOOGLE_INFO_OAUTH_ID,
    client_secret: config.GOOGLE_INFO_OAUTH_SECRET,
    refresh_token: config.GOOGLE_INFO_OAUTH_REFRESH_TOKEN,
  });
}

// Bugsnag.start({
//   apiKey: config.BUGSNAG_KEY,
//   plugins: [BugsnagPluginExpress],
//   releaseStage: process.env.NODE_ENV || "development",
// });

mongoose.connect(config.MONGODB_URI || "", {}).catch(error => console.log(error));

const originalPopulate = mongoose.Query.prototype.populate;

/**
 * Override of mongoose.Query.prototype.populate
 *
 * Automatically adds a match of { deleted: { $ne: true } } to the populate
 * query, so that deleted documents are not included in the result.
 *
 */
mongoose.Query.prototype.populate = function (...args) {
  // If the first argument is an object, modify it
  if (typeof args[0] === "object" && args[0] !== null) {
    args[0].match = { ...args[0].match, deleted: { $ne: true } };
  }
  // If it's a string (path), convert to object and add match
  else if (typeof args[0] === "string") {
    args[0] = {
      path: args[0],
      match: { deleted: { $ne: true } },
    };
  }

  // Call the original populate method with modified arguments
  return originalPopulate.apply(this, args);
};

const app = express();

const server = createServer(app); // Attach Express to HTTP Server
const io = new SocketIOServer(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://glow-leds.com",
      "https://www.glow-leds.com",
      "https://glow-leds-dev.herokuapp.com",
    ],
    credentials: true,
  },
});

app.all("*", function (req, res, next) {
  const origin = req.get("origin");
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// const bugsnagMiddleware = Bugsnag.getPlugin("express");
// app.use(bugsnagMiddleware.requestHandler);

app.use(cors({ origin: ["http://localhost:3000", "https://livingkurt.github.io/"] }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());
app.use(compression());
app.use(sslRedirect.default());

app.use(passport.initialize());

io.on("connection", socket => {
  console.log("a user connected");
});

app.use((req, res, next) => {
  req.io = io;
  next();
});
configurePassport(passport);

app.use(routes);
app.use("/api/templates", template_routes);

if (process.env.NODE_ENV === "production") {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, "../client/dist")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

// app.use(bugsnagMiddleware.errorHandler);

initializeAllOAuthClients()
  .then(() => {
    server.listen(config.PORT, () => {
      console.log(`Server listening on port ${config.PORT}`);
    });
  })
  .catch(error => {
    console.error("Failed to initialize OAuth clients", error);
    console.warn("Starting server without OAuth clients. Some functionality may be limited.");

    server.listen(config.PORT, () => {
      console.log(`Server listening on port ${config.PORT}`);
    });
  });

// ... (rest of the code remains the same)

// app.get("/api/bugsnag-test", function (req, res) {
//   Bugsnag.notify(new Error("Test error"));
//   res.send("Test error sent to Bugsnag");
// });

export { oauthClients }; // Export oauthClients
