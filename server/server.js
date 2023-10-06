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
const fs = require("fs");

const Bugsnag = require("@bugsnag/js");
const BugsnagPluginExpress = require("@bugsnag/plugin-express");

Bugsnag.start({
  apiKey: config.BUGSNAG_KEY,
  plugins: [BugsnagPluginExpress],
});

mongoose.connect(config.MONGODB_URI || "", {}).catch(error => console.log(error));

const app = express();

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

app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
});

app.get("/api/bugsnag-test", function (req, res) {
  Bugsnag.notify(new Error("Test error"));
  res.send("Test error sent to Bugsnag");
});
