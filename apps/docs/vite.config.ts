import { defaultClientConditions, defineConfig } from 'vite-plus'
import vue from '@vitejs/plugin-vue'
import { vueFs } from '../../vite.shared'

export default defineConfig(({ command }) => ({
  plugins: [vue({ script: { fs: vueFs } })],
  resolve: {
    // Storybook dev and the tests read package sources through the `@v/source`
    // export condition. `storybook build` (command 'build') uses the built dist.
    conditions: command === 'serve' ? ['@v/source', ...defaultClientConditions] : undefined,
  },
  test: {
    include: ['tests/**/*.test.ts'],
  },
}))
