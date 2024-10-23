const environment = process.env.VITE_ENVIRONMENT; // could be 'development', 'staging', or 'production'

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
  // Public URL
  PUBLIC_URL: process.env.PUBLIC_URL,

  // Environment
  NODE_ENV: process.env.NODE_ENV,

  API_URL: import.meta.env.VITE_API_URL,

  // Stripe
  VITE_STRIPE_KEY: decideEnvironment({
    production: process.env.VITE_STRIPE_LIVE_KEY,
    staging: process.env.VITE_STRIPE_TEST_KEY,
    development: process.env.VITE_STRIPE_TEST_KEY,
  }),
  VITE_ENVIRONMENT: process.env.VITE_ENVIRONMENT,
  // VITE_STRIPE_LIVE_KEY: process.env.VITE_STRIPE_LIVE_KEY,
  // VITE_STRIPE_TEST_KEY: process.env.VITE_STRIPE_TEST_KEY,

  // Company Info
  // No Reply Email
  VITE_INFO_EMAIL: process.env.VITE_INFO_EMAIL,

  // Contact Email
  VITE_CONTACT_EMAIL: process.env.VITE_CONTACT_EMAIL,

  // Production Address
  VITE_PRODUCTION_FIRST_NAME: process.env.VITE_PRODUCTION_FIRST_NAME,
  VITE_PRODUCTION_LAST_NAME: process.env.VITE_PRODUCTION_LAST_NAME,
  VITE_PRODUCTION_ADDRESS: process.env.VITE_PRODUCTION_ADDRESS,
  VITE_PRODUCTION_CITY: process.env.VITE_PRODUCTION_CITY,
  VITE_PRODUCTION_STATE: process.env.VITE_PRODUCTION_STATE,
  VITE_PRODUCTION_POSTAL_CODE: process.env.VITE_PRODUCTION_POSTAL_CODE,
  VITE_PRODUCTION_COUNTRY: process.env.VITE_PRODUCTION_COUNTRY,
  VITE_PRODUCTION_PHONE_NUMBER: process.env.VITE_PRODUCTION_PHONE_NUMBER,

  // Headquarters Address
  VITE_HEADQUARTERS_FIRST_NAME: process.env.VITE_HEADQUARTERS_FIRST_NAME,
  VITE_HEADQUARTERS_LAST_NAME: process.env.VITE_HEADQUARTERS_LAST_NAME,
  VITE_HEADQUARTERS_ADDRESS: process.env.VITE_HEADQUARTERS_ADDRESS,
  VITE_HEADQUARTERS_CITY: process.env.VITE_HEADQUARTERS_CITY,
  VITE_HEADQUARTERS_STATE: process.env.VITE_HEADQUARTERS_STATE,
  VITE_HEADQUARTERS_POSTAL_CODE: process.env.VITE_HEADQUARTERS_POSTAL_CODE,
  VITE_HEADQUARTERS_COUNTRY: process.env.VITE_HEADQUARTERS_COUNTRY,
  VITE_HEADQUARTERS_PHONE_NUMBER: process.env.VITE_HEADQUARTERS_PHONE_NUMBER,

  // Destanye
  VITE_DESTANYE_FIRST_NAME: process.env.VITE_DESTANYE_FIRST_NAME,
  VITE_DESTANYE_LAST_NAME: process.env.VITE_DESTANYE_LAST_NAME,
  VITE_DESTANYE_EMAIL: process.env.VITE_DESTANYE_EMAIL,

  // Temp Password
  VITE_TEMP_PASS: process.env.VITE_TEMP_PASS,

  // Google Sheets
  VITE_GOOGLE_SHEETS_PRIVATE: process.env.VITE_GOOGLE_SHEETS_PRIVATE,

  // React Check Blocker
  SKIP_PREFLIGHT_CHECK: process.env.SKIP_PREFLIGHT_CHECK,

  // Debugging
  // Bugsnag
  VITE_BUGSNAG_KEY: process.env.VITE_BUGSNAG_KEY,

  // Google Autocomplete
  VITE_GOOGLE_PLACES_KEY: process.env.VITE_GOOGLE_PLACES_KEY,

  // Airtable
  VITE_AIRTABLE_ACCESS_TOKEN: process.env.VITE_AIRTABLE_ACCESS_TOKEN,
};

export default config;
