import dotenv from "dotenv";

dotenv.config();

const environment = process.env.ENVIRONMENT;
// const environment = "staging";
// const environment = "production";

const decideEnvironment = ({ production, staging, development }) => {
  if (environment === "development") {
    return development;
  } else if (environment === "staging") {
    return staging;
  } else if (environment === "production") {
    return production;
  }
};

// Glow LEDs Backend Environment Variables
const config = {
  // Database
  MONGODB_URI: decideEnvironment({
    production: process.env.MONGODB_URI_PROD,
    staging: process.env.MONGODB_URI_STAGING,
    development: process.env.MONGODB_URI_DEV,
  }),
  // Environment
  ENVIRONMENT: environment,
  NODE_ENV: process.env.NODE_ENV,

  // User Login
  // Local Authorization
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,

  // Sign in with Google
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,

  // Server
  PORT: process.env.PORT || 8080,

  // Company Info
  // No Reply Email
  INFO_EMAIL: process.env.INFO_EMAIL,
  INFO_PASSWORD: process.env.INFO_PASSWORD,
  DISPLAY_INFO_EMAIL: process.env.DISPLAY_INFO_EMAIL,
  PHONE_NUMBER: process.env.PHONE_NUMBER,

  // Contact Email
  CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  CONTACT_PASSWORD: process.env.CONTACT_PASSWORD,
  DISPLAY_CONTACT_EMAIL: process.env.DISPLAY_CONTACT_EMAIL,

  // Admin Login
  LOGIN_EMAIL: process.env.LOGIN_EMAIL,
  LOGIN_PASSWORD: process.env.LOGIN_PASSWORD,

  // Temp Password
  TEMP_PASS: process.env.TEMP_PASS,

  // Production Address
  PRODUCTION_ADDRESS: process.env.PRODUCTION_ADDRESS,
  PRODUCTION_CITY: process.env.PRODUCTION_CITY,
  PRODUCTION_STATE: process.env.PRODUCTION_STATE,
  PRODUCTION_POSTAL_CODE: process.env.PRODUCTION_POSTAL_CODE,
  PRODUCTION_COUNTRY: process.env.PRODUCTION_COUNTRY,

  // Easy Post
  EASY_POST: decideEnvironment({
    production: process.env.EASY_POST_LIVE,
    staging: process.env.EASY_POST_DEV,
    development: process.env.EASY_POST_DEV,
  }),
  // EASY_POST_LIVE: process.env.EASY_POST_LIVE,
  // EASY_POST_DEV: process.env.EASY_POST_DEV,

  // USPS
  // USPS_SECRET_PROD: process.env.USPS_SECRET_PROD,
  // USPS_SECRET_DEV: process.env.USPS_SECRET_DEV,

  // Google Sheets
  REACT_APP_GOOGLE_SHEETS_PRIVATE: process.env.REACT_APP_GOOGLE_SHEETS_PRIVATE,
  GOOGLE_SHEETS_CLIENT_ID: process.env.GOOGLE_SHEETS_CLIENT_ID,
  GOOGLE_SHEETS_CLIENT_SECRET: process.env.GOOGLE_SHEETS_CLIENT_SECRET,

  // Stripe
  STRIPE_KEY: decideEnvironment({
    production: process.env.STRIPE_LIVE_SECRET_KEY,
    staging: process.env.STRIPE_TEST_SECRET_KEY,
    development: process.env.STRIPE_TEST_SECRET_KEY,
  }),
  // STRIPE_KEY: process.env.NODE_ENV ? process.env.STRIPE_LIVE_SECRET_KEY : ,
  // STRIPE_TEST_PUBLISHER_KEY: process.env.STRIPE_TEST_PUBLISHER_KEY,
  // STRIPE_TEST_SECRET_KEY: process.env.STRIPE_TEST_SECRET_KEY,
  // STRIPE_LIVE_PUBLISHER_KEY: process.env.STRIPE_LIVE_PUBLISHER_KEY,
  // STRIPE_LIVE_SECRET_KEY: process.env.STRIPE_LIVE_SECRET_KEY,

  // Airtable
  AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
  REACT_APP_AIRTABLE_ACCESS_TOKEN: process.env.REACT_APP_AIRTABLE_ACCESS_TOKEN,

  // Debugging
  // Bugsnag
  BUGSNAG_KEY: process.env.BUGSNAG_KEY,

  // New Relic
  NEW_RELIC_APP_NAME: process.env.NEW_RELIC_APP_NAME,
  NEW_RELIC_KEY: process.env.NEW_RELIC_KEY,

  // Scout
  SCOUT_KEY: process.env.SCOUT_KEY,
  SCOUT_LOG_LEVEL: process.env.SCOUT_LOG_LEVEL,
  SCOUT_MONITOR: process.env.SCOUT_MONITOR,

  // Email
  // No Reply Email
  GOOGLE_INFO_OAUTH_ID: process.env.GOOGLE_INFO_OAUTH_ID,
  GOOGLE_INFO_OAUTH_SECRET: process.env.GOOGLE_INFO_OAUTH_SECRET,
  GOOGLE_INFO_OAUTH_REFRESH_TOKEN: process.env.GOOGLE_INFO_OAUTH_REFRESH_TOKEN,

  // Contact Email
  GOOGLE_CONTACT_OAUTH_ID: process.env.GOOGLE_CONTACT_OAUTH_ID,
  GOOGLE_CONTACT_OAUTH_SECRET: process.env.GOOGLE_CONTACT_OAUTH_SECRET,
  GOOGLE_CONTACT_OAUTH_REFRESH_TOKEN: process.env.GOOGLE_CONTACT_OAUTH_REFRESH_TOKEN,

  GOOGLE_EMAIL_OAUTH_API: process.env.GOOGLE_EMAIL_OAUTH_API,

  // Image Uploading
  // Imgur
  IMGUR_ClIENT_ID: process.env.IMGUR_ClIENT_ID,
  IMGUR_ClIENT_SECRET: process.env.IMGUR_ClIENT_SECRET,
};

export default config;
