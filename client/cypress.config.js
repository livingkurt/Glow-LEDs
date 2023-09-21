const isCI = process.env.CI === "true";

const config = {
  // your existing config here
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  projectId: "ubcka4",
  chromeWebSecurity: false,
};

if (isCI) {
  config.e2e.baseUrl = "https://glow-leds-dev.herokuapp.com"; // Replace with your CI server URL
} else {
  config.e2e.baseUrl = "http://localhost:3000"; // Your local server URL
}

module.exports = config;
