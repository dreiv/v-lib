import { h } from 'vue'
import { svg } from './svg'

export const VIconPercent = {
  name: 'VIconPercent',
  setup: () => () =>
    svg([
      h('line', { x1: 19, x2: 5, y1: 5, y2: 19 }),
      h('circle', { cx: 6.5, cy: 6.5, r: 2.5 }),
      h('circle', { cx: 17.5, cy: 17.5, r: 2.5 }),
    ]),
}
