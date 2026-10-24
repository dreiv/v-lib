import { h } from 'vue'
import { svg } from './svg'

export const VIconScan = {
  name: 'VIconScan',
  setup: () => () =>
    svg([
      h('path', { d: 'M3 7V5a2 2 0 0 1 2-2h2' }),
      h('path', { d: 'M17 3h2a2 2 0 0 1 2 2v2' }),
      h('path', { d: 'M21 17v2a2 2 0 0 1-2 2h-2' }),
      h('path', { d: 'M7 21H5a2 2 0 0 1-2-2v-2' }),
    ]),
}
