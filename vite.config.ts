import { defineConfig } from 'vite-plus'
import vue from '@vitejs/plugin-vue'
import { vueFs } from './vite.shared'

export default defineConfig({
  plugins: [vue({ script: { fs: vueFs } })],
  staged: {
    '*': 'vp check --fix',
  },
  run: {
    cache: true,
  },
  fmt: {
    singleQuote: true,
    semi: false,
    printWidth: 100,
    trailingComma: 'all',
    ignorePatterns: ['**/dist/**', '**/storybook-static/**', '.packed/**'],
  },
  lint: {
    ignorePatterns: ['**/dist/**', '**/storybook-static/**', '.packed/**'],
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    plugins: ['typescript', 'vue', 'vitest'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'vite-plus/prefer-vite-plus-imports': 'error',
    },
  },
  test: {
    projects: ['packages/*'],
  },
})
