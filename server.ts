require("newrelic");
export {};
import sslRedirect from "heroku-ssl-redirect";
import express, { Request, Response } from "express";
import multer, { Multer } from "multer";
import path from "path";
import mongoose from "mongoose";
import routes from "./api";
import template_routes from "./email_templates/template_routes";
import axios from "axios";
import FormData from "form-data";
import config from "./config";
const cors = require("cors");
const passport = require("passport");
const compression = require("compression");
const expressAttack = require("express-attack");
const requestIp = require("request-ip");
const bodyParser = require("body-parser");

// const scout = require("@scout_apm/scout-apm");
// const express = require("express");
const fs = require("fs");

// // The "main" function
// async function start() {
//   // Trigger the download and installation of the core-agent
//   await scout.install({
//     allowShutdown: true, // allow shutting down spawned scout-agent processes from this program
//     monitor: true, // enable monitoring
//     name: "",
//     key: ""
//   });

mongoose
  .connect(config.MONGODB_URI || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .catch((error: { reason: any }) => console.log(error));

// Initialize your express application
const app = express();

// Enable the app-wide scout middleware
// app.use(scout.expressMiddleware());

// Add other middleware and routes
// app.use( ... )
// app.get( ... )

app.all("*", function (req: any, res: any, next: any) {
  const origin = req.get("origin");
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
// app.use(allowCrossDomain);

app.use(cors({ origin: ["http://localhost:3000", "https://livingkurt.github.io/"] }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use(sslRedirect());

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./passport")(passport);
// Bugsnag.notify(new Error('Test error'));

app.use(routes);
app.use("/api/templates", template_routes);

if (config.NODE_ENV === "production") {
  app.use(express.static("dist"));
  app.use(express.static("client/build"));
  // app.use("/dist", express.static(path.join(__dirname, "dist")));

  app.get("*", (request: express.Request, response: express.Response) => {
    response.sendFile(path.join("/app", "client/build", "index.html"));
  });
}

app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
});

app.post("/api/gcode", async (req: any, res: any) => {
  try {
    const filename = req.body.filename;
    const data = req.body.gcode;
    fs.writeFile(`~/Desktop/${filename}`, data, (err: any) => {
      if (err) throw err;

      res.send("Gcode Continous File Created");
    });
  } catch (err) {}
});

//   // Start express
//   app.start();
// }

// // If this script is executed directly, run the start function
// if (require.main === module) {
//   start();
// }
