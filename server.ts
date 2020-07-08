// import express from 'express';
// import path from 'path';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import config from './config';
// import userRoute from './routes/userRoute';
// import productRoute from './routes/productRoute';
// import orderRoute from './routes/orderRoute';

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
// const userRoute = require('./routes/userRoute');
// const productRoute = require('./routes/productRoute');
// const orderRoute = require('./routes/orderRoute');
const { user_routes, product_routes, order_routes, email_routes } = require('./routes/index');

// const mongodbUrl = config.MONGODB_URL;
// mongoose.connect(process.env.RESTORED_MONGODB_URI || "mongodb://localhost/glow_leds_db", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// }).catch((error) => console.log(error.reason));

const app = express();
app.use(bodyParser.json());

app.use('/api/users', user_routes);
app.use('/api/products', product_routes);
app.use('/api/orders', order_routes);
app.use('/api/emails', email_routes);
app.get('/api/config/paypal', (req, res) => {
	res.send(config.PAYPAL_CLIENT_ID);
});

// app.use(express.static(path.join(__dirname, '/client/build')));

// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));
}
// Send every request to the React app
// Define any API routes before this runs
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(config.PORT, () => {
	console.log('Server started at http://localhost:5000');
});
