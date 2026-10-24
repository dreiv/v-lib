import { h } from 'vue'
import { svg } from './svg'

export const VIconIndent = {
  name: 'VIconIndent',
  setup: () => () =>
    svg([
      h('path', { d: 'M21 5H11' }),
      h('path', { d: 'M21 12H11' }),
      h('path', { d: 'M21 19H11' }),
      h('path', { d: 'm3 8 4 4-4 4' }),
    ]),
}
