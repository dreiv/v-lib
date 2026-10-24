import { h } from 'vue'
import { svg } from './svg'

export const VIconUserMinus = {
  name: 'VIconUserMinus',
  setup: () => () =>
    svg([
      h('path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }),
      h('circle', { cx: 9, cy: 7, r: 4 }),
      h('line', { x1: 22, x2: 16, y1: 11, y2: 11 }),
    ]),
}
