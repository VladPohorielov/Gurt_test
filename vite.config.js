
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deploy note: when publishing to GitHub Pages under the repository
// https://github.com/VladPohorielov/Gurt_test set base to '/Gurt_test/'
export default defineConfig({
  base: '/Gurt_test/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  }
})