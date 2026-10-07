import { h } from 'vue'
import { svg } from './svg'

export const VIconUpload = {
  name: 'VIconUpload',
  setup: () => () =>
    svg([
      h('path', { d: 'M12 3v12' }),
      h('path', { d: 'm17 8-5-5-5 5' }),
      h('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
    ]),
}
