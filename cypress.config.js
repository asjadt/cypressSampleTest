const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Add custom event listeners here if needed
      return config;
    },
  },
  reporter: "mochawesome", // Specify the reporter
  reporterOptions: {
    reportDir: "cypress/reports", // Directory where the report will be saved
    overwrite: false, // Don't overwrite previous reports
    html: true, // Generate an HTML report
    json: true, // Generate a JSON report
  },
});
