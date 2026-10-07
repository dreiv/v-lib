import { h } from 'vue'
import { svg } from './svg'

export const VIconMonitor = {
  name: 'VIconMonitor',
  setup: () => () =>
    svg([
      h('rect', { width: 20, height: 14, x: 2, y: 3, rx: 2 }),
      h('line', { x1: 8, x2: 16, y1: 21, y2: 21 }),
      h('line', { x1: 12, x2: 12, y1: 17, y2: 21 }),
    ]),
}
