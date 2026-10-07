import { h } from 'vue'
import { svg } from './svg'

export const VIconDownload = {
  name: 'VIconDownload',
  setup: () => () =>
    svg([
      h('path', { d: 'M12 15V3' }),
      h('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
      h('path', { d: 'm7 10 5 5 5-5' }),
    ]),
}
