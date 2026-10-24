import { h } from 'vue'
import { svg } from './svg'

export const VIconUndo2 = {
  name: 'VIconUndo2',
  setup: () => () =>
    svg([
      h('path', { d: 'M9 14 4 9l5-5' }),
      h('path', { d: 'M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11' }),
    ]),
}
