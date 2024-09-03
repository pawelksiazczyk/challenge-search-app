import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setup.ts',
    exclude: [...configDefaults.exclude, 'e2e/*'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/setup.ts',
        'postcss.config.js',
        'tailwind.config.js',
      ],
    },
  },
  resolve: {
    extensions: ['.js', '.ts', '.json', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
