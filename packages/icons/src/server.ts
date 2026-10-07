import { h } from 'vue'
import { svg } from './svg'

export const VIconServer = {
  name: 'VIconServer',
  setup: () => () =>
    svg([
      h('rect', { width: 20, height: 8, x: 2, y: 2, rx: 2, ry: 2 }),
      h('rect', { width: 20, height: 8, x: 2, y: 14, rx: 2, ry: 2 }),
      h('line', { x1: 6, x2: 6.01, y1: 6, y2: 6 }),
      h('line', { x1: 6, x2: 6.01, y1: 18, y2: 18 }),
    ]),
}
