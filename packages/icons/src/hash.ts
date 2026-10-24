import { h } from 'vue'
import { svg } from './svg'

export const VIconHash = {
  name: 'VIconHash',
  setup: () => () =>
    svg([
      h('line', { x1: 4, x2: 20, y1: 9, y2: 9 }),
      h('line', { x1: 4, x2: 20, y1: 15, y2: 15 }),
      h('line', { x1: 10, x2: 8, y1: 3, y2: 21 }),
      h('line', { x1: 16, x2: 14, y1: 3, y2: 21 }),
    ]),
}
