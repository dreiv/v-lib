import { h } from 'vue'
import { svg } from './svg'

export const VIconTable2 = {
  name: 'VIconTable2',
  setup: () => () =>
    svg([
      h('path', { d: 'M3 9h18' }),
      h('path', { d: 'M9 3v18' }),
      h('rect', { x: 3, y: 3, width: 18, height: 18, rx: 2 }),
    ]),
}
