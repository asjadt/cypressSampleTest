const { defineConfig } = require("cypress");
const fs = require("fs");
const mochawesome = require("cypress-mochawesome-reporter/plugin");

// Helper function to load environment-specific config
function getConfigByFile(file) {
  const pathToConfigFile = `./cypress/e2e/config/${file}.json`;

  if (fs.existsSync(pathToConfigFile)) {
    return JSON.parse(fs.readFileSync(pathToConfigFile, "utf-8"));
  }

  return {};
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      mochawesome(on); // Set up Mochawesome plugin

      const file = config.env.configFile || "development";
      const envConfig = getConfigByFile(file);
      const baseUrl = envConfig.FRONTEND_URL;

      return {
        ...config,
        env: {
          ...config.env,
          ...envConfig,
        },
        baseUrl,
      };
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
    screenshotsFolder: "cypress/screenshots",
    screenshotOnRunFailure: true,
  },

  reporter: "cypress-mochawesome-reporter", // Specify the Mochawesome reporter
  reporterOptions: {
    reportDir: "cypress/reports",
    reportFilename: "mochawesome",
    charts: true,
    reportPageTitle: "Test Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveHtml: true,
    debug: true,
  },
});
