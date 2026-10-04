import { defineConfig } from 'vite-plus'
import vue from '@vitejs/plugin-vue'
import vueRolldown from 'unplugin-vue/rolldown'
import { vueFs } from '../../vite.shared'

export default defineConfig({
  run: {
    tasks: {
      build: { command: 'vp pack', cache: false },
    },
  },
  plugins: [vue({ script: { fs: vueFs } })],
  pack: {
    plugins: [vueRolldown({ script: { fs: vueFs } })],
    entry: [
      'src/index.ts',
      'src/components/button/index.ts',
      'src/components/checkbox/index.ts',
      'src/components/combobox/index.ts',
      'src/components/field/index.ts',
      'src/components/radio-group/index.ts',
      'src/components/text-area/index.ts',
      'src/components/text-field/index.ts',
    ],
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
