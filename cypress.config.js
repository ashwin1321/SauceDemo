import { defineConfig } from "cypress";
import mochawesome from "cypress-mochawesome-reporter/plugin";

export default defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com/",
    setupNodeEvents(on, config) {
      mochawesome(on); // register plugin
      return config;
    },
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true,
      charts: true,
    },
  },
});
