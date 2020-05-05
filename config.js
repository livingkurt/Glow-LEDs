const dotenv = require('dotenv')
// import dotenv from 'dotenv'
dotenv.config();

module.exports = {
  MONGODB_URI: process.env.MONGODB_URL || 'mongodb://localhost/ecommercedb',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb'
}