import { h } from 'vue'
import { svg } from './svg'

export const VIconStrikethrough = {
  name: 'VIconStrikethrough',
  setup: () => () =>
    svg([
      h('path', { d: 'M16 4H9a3 3 0 0 0-2.83 4' }),
      h('path', { d: 'M14 12a4 4 0 0 1 0 8H6' }),
      h('line', { x1: 4, x2: 20, y1: 12, y2: 12 }),
    ]),
}
