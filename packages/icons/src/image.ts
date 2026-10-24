import { h } from 'vue'
import { svg } from './svg'

export const VIconImage = {
  name: 'VIconImage',
  setup: () => () =>
    svg([
      h('rect', { width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 }),
      h('circle', { cx: 9, cy: 9, r: 2 }),
      h('path', { d: 'm21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21' }),
    ]),
}
