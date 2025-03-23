const { defineConfig } = require("cypress");
const mochawesome = require("cypress-mochawesome-reporter/plugin");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      mochawesome(on); // Set up Mochawesome plugin
      return config;
    },
    reporter: "cypress-mochawesome-reporter", // Specify the Mochawesome reporter
    reporterOptions: {
      reportDir: "cypress/reports", // Path where the report will be generated
      reportFilename: "mochawesome", // The base filename for the report
      charts: true, // Optional: Enable charts
      reportPageTitle: "Test Report", // Optional: Title of the HTML report
      embeddedScreenshots: true, // Enable embedding screenshots in the report
      inlineAssets: true, // Inline CSS and JS assets
      saveHtml: true, // Save the report as an HTML file
      debug: true,
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false,
    screenshotsFolder: "cypress/screenshots", // Path for screenshots
    screenshotOnRunFailure: true, // Automatically capture screenshots on failure
  },
});
