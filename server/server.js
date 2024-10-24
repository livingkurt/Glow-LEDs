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
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";

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

app.use(cors({ origin: ["http://localhost:3000", "https://livingkurt.github.io/"] }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());
app.use(compression());
app.use(sslRedirect());

app.use(passport.initialize());

io.on("connection", socket => {
  console.log("a user connected");
});

app.use((req, res, next) => {
  req.io = io;
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

server.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
});
