import { defineConfig } from 'vite-plus'
import vue from '@vitejs/plugin-vue'
import vueRolldown from 'unplugin-vue/rolldown'
import { vueFs } from '../../vite.shared'

export default defineConfig({
  plugins: [vue({ script: { fs: vueFs } })],
  pack: {
    plugins: [vueRolldown({ script: { fs: vueFs } })],
    entry: ['src/index.ts', 'src/components/button/index.ts', 'src/components/combobox/index.ts'],
    format: ['esm'],
    dts: { vue: true },
    sourcemap: true,
    minify: false,
    exports: false,
    css: { splitting: true, inject: true },
    copy: [{ from: 'src/styles', to: 'dist' }],
  },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.ts'],
  },
})
