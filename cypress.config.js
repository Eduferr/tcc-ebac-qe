const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

require('dotenv').config();

module.exports = defineConfig({

  // =========================
  // CONFIGURAÇÃO GLOBAL
  // =========================
  retries: {
    runMode: 2,     // 🔒 OBRIGATÓRIO para CI
    openMode: 0
  },

  chromeWebSecurity: false,

  viewportWidth: 1280,
  viewportHeight: 720,

  video: false,
  screenshotOnRunFailure: false,
  screenshotsFolder: false,

  // =========================
  // E2E
  // =========================
  e2e: {
    baseUrl: process.env.BASE_URL || 'http://lojaebac.ebaconline.art.br',

    specPattern: ['ui/cypress/e2e/features/**/*.feature'],
    supportFile: 'ui/cypress/support/e2e.js',
    fixturesFolder: 'ui/cypress/fixtures',

    env: {
      allure: true,
      allureResultsPath: 'allure/ui-tests/ui-results',
      USER: process.env.CYPRESS_USER,
      PASSWORD: process.env.CYPRESS_PASSWORD,
    },

    async setupNodeEvents(on, config) {

      // Cucumber
      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Allure (registro obrigatório)
      allureWriter(on, config);

      return config;
    },
  },
});
