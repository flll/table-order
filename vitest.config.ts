import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [vue()],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./tests/setup.ts'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          'dist/',
          '**/*.d.ts',
          'tests/setup.ts',
          '**/*.{test,spec}.{ts,tsx}'
        ]
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  })
) 