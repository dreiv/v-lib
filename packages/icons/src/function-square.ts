import { h } from 'vue'
import { svg } from './svg'

export const VIconFunctionSquare = {
  name: 'VIconFunctionSquare',
  setup: () => () =>
    svg([
      h('rect', { width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 }),
      h('path', { d: 'M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3' }),
      h('path', { d: 'M9 11.2h5.7' }),
    ]),
}
