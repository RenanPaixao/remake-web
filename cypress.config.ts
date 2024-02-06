import { defineConfig } from 'cypress'
import vitePreprocessor from 'cypress-vite'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    watchForFileChanges: false,
    chromeWebSecurity: false,
    setupNodeEvents(on) {
      on('file:preprocessor', vitePreprocessor())
    }
  }
})
