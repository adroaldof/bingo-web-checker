import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportHeight: 960,
    viewportWidth: 1536,
    defaultCommandTimeout: 10000,
  },
})
