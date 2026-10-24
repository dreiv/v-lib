import { h } from 'vue'
import { svg } from './svg'

export const VIconCreditCard = {
  name: 'VIconCreditCard',
  setup: () => () =>
    svg([
      h('rect', { width: 20, height: 14, x: 2, y: 5, rx: 2 }),
      h('line', { x1: 2, x2: 22, y1: 10, y2: 10 }),
      h('path', { d: 'M6 14h2' }),
    ]),
}
