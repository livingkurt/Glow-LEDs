const isCI = process.env.CI === "true";

const config = {
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  projectId: "ubcka4",
  chromeWebSecurity: false,
};

config.e2e.baseUrl = "http://localhost:3000"; // Replace with your CI server URL
// if (isCI) {
// } else {
//   config.e2e.baseUrl = "http://localhost:3000"; // Your local server URL
// }

module.exports = config;
