
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
    // Increase asset size limit for video files
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        // Keep video files separate to avoid bundle size issues
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.mp4')) {
            return 'video/[name][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      },
    },
  },
  // Ensure video files are copied to dist
  assetsInclude: ['**/*.mp4']
})