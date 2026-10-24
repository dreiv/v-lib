import { h } from 'vue'
import { svg } from './svg'

export const VIconBarChart4 = {
  name: 'VIconBarChart4',
  setup: () => () =>
    svg([
      h('path', { d: 'M13 17V9' }),
      h('path', { d: 'M18 17V5' }),
      h('path', { d: 'M3 3v16a2 2 0 0 0 2 2h16' }),
      h('path', { d: 'M8 17v-3' }),
    ]),
}
