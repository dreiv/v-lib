import { h } from 'vue'
import { svg } from './svg'

export const VIconDivide = {
  name: 'VIconDivide',
  setup: () => () =>
    svg([
      h('circle', { cx: 12, cy: 6, r: 1 }),
      h('line', { x1: 5, x2: 19, y1: 12, y2: 12 }),
      h('circle', { cx: 12, cy: 18, r: 1 }),
    ]),
}
