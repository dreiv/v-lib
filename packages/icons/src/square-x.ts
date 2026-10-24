import { h } from 'vue'
import { svg } from './svg'

export const VIconSquareX = {
  name: 'VIconSquareX',
  setup: () => () =>
    svg([
      h('rect', { width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 }),
      h('path', { d: 'm15 9-6 6' }),
      h('path', { d: 'm9 9 6 6' }),
    ]),
}
