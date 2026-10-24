import { h } from 'vue'
import { svg } from './svg'

export const VIconUnderline = {
  name: 'VIconUnderline',
  setup: () => () =>
    svg([
      h('path', { d: 'M6 4v6a6 6 0 0 0 12 0V4' }),
      h('line', { x1: 4, x2: 20, y1: 20, y2: 20 }),
    ]),
}
