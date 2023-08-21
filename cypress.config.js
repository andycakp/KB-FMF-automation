const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'az46y5',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
