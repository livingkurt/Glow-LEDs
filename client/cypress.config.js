const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.js", // Make sure this path is correct
  },
  projectId: "ubcka4",
  chromeWebSecurity: false,
});
