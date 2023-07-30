import path from 'path'
import { defineConfig } from 'vitest/config'
/// <reference types="vitest" />
/// <reference types="vite/client" />

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  test: {
    coverage: {
      reporter: ['text', 'text-summary', 'html'],
      provider: 'v8',
      skipFull: true,
    },
    testTimeout: 5000,
  },
  resolve: {
    alias: {
      '@/ports': path.resolve(__dirname, './src/business/application/ports'),
      '@/use-cases': path.resolve(__dirname, './src/business/application/use-cases'),
      '@/entities': path.resolve(__dirname, './src/business/domain/entities'),
      '@/': path.resolve(__dirname, './src'),
    },
  },
})
