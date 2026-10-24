import { h } from 'vue'
import { svg } from './svg'

export const VIconUserX = {
  name: 'VIconUserX',
  setup: () => () =>
    svg([
      h('path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }),
      h('circle', { cx: 9, cy: 7, r: 4 }),
      h('line', { x1: 17, x2: 22, y1: 8, y2: 13 }),
      h('line', { x1: 22, x2: 17, y1: 8, y2: 13 }),
    ]),
}
