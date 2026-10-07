import { h } from 'vue'
import { svg } from './svg'

export const VIconLink2 = {
  name: 'VIconLink2',
  setup: () => () =>
    svg([
      h('path', { d: 'M9 17H7A5 5 0 0 1 7 7h2' }),
      h('path', { d: 'M15 7h2a5 5 0 1 1 0 10h-2' }),
      h('line', { x1: 8, x2: 16, y1: 12, y2: 12 }),
    ]),
}
