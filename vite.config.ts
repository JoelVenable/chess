/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    coverage: {
      exclude: ['postcss.config.js', 'tailwind.config.js', '.eslintrc.cjs'],
    },
  },
  plugins: [react()],
})
