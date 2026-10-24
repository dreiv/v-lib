import { h } from 'vue'
import { svg } from './svg'

export const VIconTablet = {
  name: 'VIconTablet',
  setup: () => () =>
    svg([
      h('rect', { width: 16, height: 20, x: 4, y: 2, rx: 2, ry: 2 }),
      h('line', { x1: 12, x2: 12.01, y1: 18, y2: 18 }),
    ]),
}
