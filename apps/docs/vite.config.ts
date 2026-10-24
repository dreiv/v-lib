import { defineConfig } from 'vite-plus'
import vue from '@vitejs/plugin-vue'
import { vueFs } from '../../vite.shared'

export default defineConfig({
  plugins: [vue({ script: { fs: vueFs } })],
})
