
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Примітка деплою: при публікації на GitHub Pages під репозиторій
// https://github.com/VladPohorielov/Gurt_test встановіть base як '/Gurt_test/'
export default defineConfig({
  base: '/Gurt_test/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Збільшити ліміт розміру для відео файлів
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        // Зберігати відео файли окремо для уникнення проблем з розміром збірки
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.mp4')) {
            return 'video/[name][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      },
    },
  },
  // Забезпечити копіювання відео файлів до dist
  assetsInclude: ['**/*.mp4']
})