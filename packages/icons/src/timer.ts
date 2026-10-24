import { h } from 'vue'
import { svg } from './svg'

export const VIconTimer = {
  name: 'VIconTimer',
  setup: () => () =>
    svg([
      h('line', { x1: 10, x2: 14, y1: 2, y2: 2 }),
      h('line', { x1: 12, x2: 15, y1: 14, y2: 11 }),
      h('circle', { cx: 12, cy: 14, r: 8 }),
    ]),
}
