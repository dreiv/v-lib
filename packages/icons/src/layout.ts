import { h } from 'vue'
import { svg } from './svg'

export const VIconLayout = {
  name: 'VIconLayout',
  setup: () => () =>
    svg([
      h('rect', { width: 18, height: 18, x: 3, y: 3, rx: 2 }),
      h('path', { d: 'M3 9h18' }),
      h('path', { d: 'M9 21V9' }),
    ]),
}
