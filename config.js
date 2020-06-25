// import dotenv from 'dotenv';
const dotenv = require('dotenv');

dotenv.config();

// export default {
//   PORT: process.env.PORT || 5000,
//   MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/amazona',
//   JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
//   PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
// };

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/glow_leds_db',
  // MONGODB_URL: process.env.MONGODB_URI || 'mongodb://livingkurt:07QXtrAS7vN7gp4G@ds217349.mlab.com:17349/heroku_vljhv1ts',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
};

