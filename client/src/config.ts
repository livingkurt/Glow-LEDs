// const environment = process.env.REACT_APP_ENVIRONMENT;

const environment = process.env.REACT_APP_ENVIRONMENT as string; // could be 'development', 'staging', or 'production'

const decideEnvironment = ({
  production,
  staging,
  development,
}: {
  production: string | undefined;
  staging: string | undefined;
  development: string | undefined;
}): string | undefined => {
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

  // Stripe
  REACT_APP_STRIPE_KEY: decideEnvironment({
    production: process.env.REACT_APP_STRIPE_LIVE_KEY,
    staging: process.env.REACT_APP_STRIPE_TEST_KEY,
    development: process.env.REACT_APP_STRIPE_TEST_KEY,
  }),
  // REACT_APP_STRIPE_LIVE_KEY: process.env.REACT_APP_STRIPE_LIVE_KEY,
  // REACT_APP_STRIPE_TEST_KEY: process.env.REACT_APP_STRIPE_TEST_KEY,

  // Company Info
  // No Reply Email
  REACT_APP_INFO_EMAIL: process.env.REACT_APP_INFO_EMAIL,

  // Contact Email
  REACT_APP_CONTACT_EMAIL: process.env.REACT_APP_CONTACT_EMAIL,

  // Production Address
  REACT_APP_PRODUCTION_FIRST_NAME: process.env.REACT_APP_PRODUCTION_FIRST_NAME,
  REACT_APP_PRODUCTION_LAST_NAME: process.env.REACT_APP_PRODUCTION_LAST_NAME,
  REACT_APP_PRODUCTION_ADDRESS: process.env.REACT_APP_PRODUCTION_ADDRESS,
  REACT_APP_PRODUCTION_CITY: process.env.REACT_APP_PRODUCTION_CITY,
  REACT_APP_PRODUCTION_STATE: process.env.REACT_APP_PRODUCTION_STATE,
  REACT_APP_PRODUCTION_POSTAL_CODE: process.env.REACT_APP_PRODUCTION_POSTAL_CODE,
  REACT_APP_PRODUCTION_COUNTRY: process.env.REACT_APP_PRODUCTION_COUNTRY,
  REACT_APP_PRODUCTION_PHONE_NUMBER: process.env.REACT_APP_PRODUCTION_PHONE_NUMBER,

  // Headquarters Address
  REACT_APP_HEADQUARTERS_FIRST_NAME: process.env.REACT_APP_HEADQUARTERS_FIRST_NAME,
  REACT_APP_HEADQUARTERS_LAST_NAME: process.env.REACT_APP_HEADQUARTERS_LAST_NAME,
  REACT_APP_HEADQUARTERS_ADDRESS: process.env.REACT_APP_HEADQUARTERS_ADDRESS,
  REACT_APP_HEADQUARTERS_CITY: process.env.REACT_APP_HEADQUARTERS_CITY,
  REACT_APP_HEADQUARTERS_STATE: process.env.REACT_APP_HEADQUARTERS_STATE,
  REACT_APP_HEADQUARTERS_POSTAL_CODE: process.env.REACT_APP_HEADQUARTERS_POSTAL_CODE,
  REACT_APP_HEADQUARTERS_COUNTRY: process.env.REACT_APP_HEADQUARTERS_COUNTRY,
  REACT_APP_HEADQUARTERS_PHONE_NUMBER: process.env.REACT_APP_HEADQUARTERS_PHONE_NUMBER,

  // Destanye
  REACT_APP_DESTANYE_FIRST_NAME: process.env.REACT_APP_DESTANYE_FIRST_NAME,
  REACT_APP_DESTANYE_LAST_NAME: process.env.REACT_APP_DESTANYE_LAST_NAME,
  REACT_APP_DESTANYE_EMAIL: process.env.REACT_APP_DESTANYE_EMAIL,

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
  REACT_APP_AIRTABLE_ACCESS_TOKEN: process.env.REACT_APP_AIRTABLE_ACCESS_TOKEN,
};

export default config;
