import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: './' => relative asset paths. Works on GitHub Pages under any repo
// sub-path AND when the built site is opened straight from disk (fully offline).
// HashRouter handles client-side routing without server config.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    // The course content (6 chapters of rich lesson data) is legitimately large
    // and ships as one cacheable chunk; vendor libs split separately. ~200 kB
    // gzip total for a full offline course is expected, so raise the advisory.
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('lucide')) return 'icons'
            if (id.includes('@fontsource')) return undefined
            return 'vendor'
          }
          if (id.includes('/src/data/')) return 'content'
          return undefined
        },
      },
    },
  },
})
