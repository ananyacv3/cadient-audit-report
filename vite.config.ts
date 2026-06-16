import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' keeps asset URLs relative so the built site works on any static
// host (and when opening dist/index.html directly for fetch-based validation).
export default defineConfig({
  plugins: [react()],
  base: './',
})
