import { h } from 'vue'
import { svg } from './svg'

export const VIconSquareCheck = {
  name: 'VIconSquareCheck',
  setup: () => () =>
    svg([
      h('rect', { width: 18, height: 18, x: 3, y: 3, rx: 2 }),
      h('path', { d: 'm16 9-5.5 5.5L8 12' }),
    ]),
}
