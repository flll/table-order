import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  root: './src/client',
  plugins: [vue()],
  build: {
    outDir: '../../dist/client',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/client', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
}) 