const { defineConfig } = require("cypress")
const fs = require("fs")

module.exports = defineConfig({
  projectId: 'mdwesz',

  allowCypressEnv: false,

  e2e: {

    baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php',

    video: true,

    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',

    setupNodeEvents(on, config) {

      // Supprimer la vidéo si le test réussit et conserve la vidéo en cas d'échec
      on('after:spec', (spec, results) => {

        if (results && results.video && results.stats.failures === 0) {

          if (fs.existsSync(results.video)) {

            fs.unlinkSync(results.video)

          }

        }

      })

    },

  },

  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  requestTimeout: 15000

})