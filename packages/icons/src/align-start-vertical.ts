import { h } from 'vue'
import { svg } from './svg'

export const VIconAlignStartVertical = {
  name: 'VIconAlignStartVertical',
  setup: () => () =>
    svg([
      h('rect', { width: 9, height: 6, x: 6, y: 14, rx: 2 }),
      h('rect', { width: 16, height: 6, x: 6, y: 4, rx: 2 }),
      h('path', { d: 'M2 2v20' }),
    ]),
}
