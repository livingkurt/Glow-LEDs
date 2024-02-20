import sslRedirect from "heroku-ssl-redirect";
import express from "express";
import path from "path";
import mongoose from "mongoose";
import routes from "./api";

import template_routes from "./email_templates/template_routes";
import config from "./config";
const cors = require("cors");
const passport = require("passport");
const compression = require("compression");
import { Server } from "socket.io";
import { google } from "googleapis"; // Import Google's OAuth libraries

const Bugsnag = require("@bugsnag/js");
const BugsnagPluginExpress = require("@bugsnag/plugin-express");

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

Bugsnag.start({
  apiKey: config.BUGSNAG_KEY,
  plugins: [BugsnagPluginExpress],
  releaseStage: process.env.NODE_ENV || "development",
});

mongoose.connect(config.MONGODB_URI || "", {}).catch(error => console.log(error));

const app = express();

const io = new Server({
  cors: {
    origin: ["http://localhost:3000", "https://glow-leds.com", "https://glow-leds-dev.herokuapp.com"],
  },
});

io.listen(4000);

app.all("*", function (req, res, next) {
  const origin = req.get("origin");
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const bugsnagMiddleware = Bugsnag.getPlugin("express");
app.use(bugsnagMiddleware.requestHandler);

app.use(cors({ origin: ["http://localhost:3000", "https://livingkurt.github.io/"] }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());
app.use(compression());
app.use(sslRedirect());

app.use(passport.initialize());

io.on("connection", socket => {
  console.log("a user connected");
  socket.emit("testEvent", { msg: "Hello from server" });
});

app.use((req, res, next) => {
  req.io = io;
  console.log("Middleware to attach io to req is running");
  next();
});
require("./passport")(passport);

app.use(routes);
app.use("/api/templates", template_routes);

if (config.NODE_ENV === "production") {
  app.use(express.static("dist"));
  app.use(express.static("client/build"));

  app.get("*", (request, response) => {
    response.sendFile(path.join("/app", "client/build", "index.html"));
  });
}

app.use(bugsnagMiddleware.errorHandler);

initializeAllOAuthClients()
  .then(() => {
    app.listen(config.PORT, () => {
      console.log(`Server listening on port ${config.PORT}`);
    });
  })
  .catch(error => {
    console.error("Failed to initialize OAuth clients", error);
    process.exit(1);
  });
// app.listen(config.PORT, () => {
//   console.log(`Server listening on port ${config.PORT}`);
// });

app.get("/api/bugsnag-test", function (req, res) {
  Bugsnag.notify(new Error("Test error"));
  res.send("Test error sent to Bugsnag");
});

export { oauthClients }; // Export oauthClients
