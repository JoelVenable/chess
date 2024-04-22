/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    typecheck: {
      tsconfig: './tsconfig.spec.json',
    },
    globals: true,
    coverage: {
      exclude: ['postcss.config.js', 'tailwind.config.js', '.eslintrc.cjs'],
    },
  },
  plugins: [react(), tsconfigPaths()],
})
