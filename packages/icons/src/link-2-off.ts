import { h } from 'vue'
import { svg } from './svg'

export const VIconLink2Off = {
  name: 'VIconLink2Off',
  setup: () => () =>
    svg([
      h('path', { d: 'M9 17H7A5 5 0 0 1 7 7' }),
      h('path', { d: 'M15 7h2a5 5 0 0 1 4 8' }),
      h('line', { x1: 8, x2: 12, y1: 12, y2: 12 }),
      h('line', { x1: 2, x2: 22, y1: 2, y2: 22 }),
    ]),
}
