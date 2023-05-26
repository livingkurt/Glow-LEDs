import dotenv from "dotenv";

dotenv.config();

// Glow LEDs Backend Environment Variables
const config = {
  // Public URL
  PUBLIC_URL: process.env.PUBLIC_URL,

  // Environment
  NODE_ENV: process.env.NODE_ENV,

  // Stripe
  REACT_APP_STRIPE_KEY: process.env.REACT_APP_STRIPE_KEY,

  // Company Info
  // No Reply Email
  REACT_APP_INFO_EMAIL: process.env.REACT_APP_INFO_EMAIL,

  // Contact Email
  REACT_APP_CONTACT_EMAIL: process.env.REACT_APP_CONTACT_EMAIL,

  // Production Address
  REACT_APP_RETURN_ADDRESS: process.env.REACT_APP_RETURN_ADDRESS,
  REACT_APP_RETURN_CITY: process.env.REACT_APP_RETURN_CITY,
  REACT_APP_RETURN_STATE: process.env.REACT_APP_RETURN_STATE,
  REACT_APP_RETURN_POSTAL_CODE: process.env.REACT_APP_RETURN_POSTAL_CODE,
  REACT_APP_RETURN_COUNTRY: process.env.REACT_APP_RETURN_COUNTRY,

  // Temp Password
  REACT_APP_TEMP_PASS: process.env.REACT_APP_TEMP_PASS,

  // Google Sheets
  REACT_APP_GOOGLE_SHEETS_PRIVATE: process.env.REACT_APP_GOOGLE_SHEETS_PRIVATE,

  // React Check Blocker
  SKIP_PREFLIGHT_CHECK: process.env.SKIP_PREFLIGHT_CHECK,

  // Debugging
  // Bugsnag
  REACT_APP_BUGSNAG_KEY: process.env.REACT_APP_BUGSNAG_KEY,

  // Google Autocomplete
  REACT_APP_GOOGLE_PLACES_KEY: process.env.REACT_APP_GOOGLE_PLACES_KEY,

  // Airtable
  REACT_APP_AIRTABLE_ACCESS_TOKEN: process.env.REACT_APP_AIRTABLE_ACCESS_TOKEN
};

export default config;
