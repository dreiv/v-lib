import { h } from 'vue'
import { svg } from './svg'

export const VIconLockOpen = {
  name: 'VIconLockOpen',
  setup: () => () =>
    svg([
      h('rect', { width: 18, height: 11, x: 3, y: 11, rx: 2, ry: 2 }),
      h('path', { d: 'M7 11V7a5 5 0 0 1 9.9-1' }),
    ]),
}
