import express from "express";
import path, { dirname } from "path";
import mongoose from "mongoose";
import template_routes from "./email_templates/template_routes.js";
import config from "./config.js";
import cors from "cors";
import passport from "passport";
import compression from "compression";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { fileURLToPath } from "url";
import routes from "./api/index.js"; // Make sure to add the .js extension
import sslRedirect from "heroku-ssl-redirect";
import configurePassport from "./passport.js";
import * as Sentry from "@sentry/node";

// Import updated Sentry methods
import "./instrument.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
      "http://localhost:5173",
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

app.use(cors({ origin: ["http://localhost:5173", "https://livingkurt.github.io/"] }));
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

if (config.NODE_ENV === "production") {
  Sentry.setupExpressErrorHandler(app);
}

if (config.NODE_ENV === "production") {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, "../client/dist")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

server.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
});
