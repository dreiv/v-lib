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
      'src/components/alert/index.ts',
      'src/components/autocomplete/index.ts',
      'src/components/badge/index.ts',
      'src/components/button/index.ts',
      'src/components/checkbox/index.ts',
      'src/components/combobox/index.ts',
      'src/components/container/index.ts',
      'src/components/dialog/index.ts',
      'src/components/error-summary/index.ts',
      'src/components/field/index.ts',
      'src/components/inline/index.ts',
      'src/components/link/index.ts',
      'src/components/loading-region/index.ts',
      'src/components/menu/index.ts',
      'src/components/popover/index.ts',
      'src/components/radio-group/index.ts',
      'src/components/select/index.ts',
      'src/components/spinner/index.ts',
      'src/components/stack/index.ts',
      'src/components/tag/index.ts',
      'src/components/text-area/index.ts',
      'src/components/text-field/index.ts',
      'src/components/toast/index.ts',
      'src/components/tooltip/index.ts',
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
