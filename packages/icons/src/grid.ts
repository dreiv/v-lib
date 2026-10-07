import { h } from 'vue'
import { svg } from './svg'

export const VIconGrid = {
  name: 'VIconGrid',
  setup: () => () =>
    svg([
      h('rect', { width: 18, height: 18, x: 3, y: 3, rx: 2 }),
      h('path', { d: 'M3 9h18' }),
      h('path', { d: 'M3 15h18' }),
      h('path', { d: 'M9 3v18' }),
      h('path', { d: 'M15 3v18' }),
    ]),
}
