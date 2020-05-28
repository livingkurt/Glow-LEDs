const express = require("express");
const config = require('./config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { user_routes, product_routes, order_routes, email_routes } = require('./routes/index')
const path = require("path");
const PORT = process.env.PORT || 3001;
// const passport = require("passport");
const app = express();
require("dotenv").config()


mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/glow_leds_db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json())

// require("./passport")(passport);

app.use("/api/users", user_routes)
app.use("/api/products", product_routes)
app.use("/api/orders", order_routes)
app.use("/api/emails", email_routes)
app.use("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID)
})

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
