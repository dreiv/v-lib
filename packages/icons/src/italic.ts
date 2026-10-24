import { h } from 'vue'
import { svg } from './svg'

export const VIconItalic = {
  name: 'VIconItalic',
  setup: () => () =>
    svg([
      h('line', { x1: 19, x2: 10, y1: 4, y2: 4 }),
      h('line', { x1: 14, x2: 5, y1: 20, y2: 20 }),
      h('line', { x1: 15, x2: 9, y1: 4, y2: 20 }),
    ]),
}
