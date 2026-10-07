import { h } from 'vue'
import { svg } from './svg'

export const VIconAlertCircle = {
  name: 'VIconAlertCircle',
  setup: () => () =>
    svg([
      h('circle', { cx: 12, cy: 12, r: 10 }),
      h('line', { x1: 12, x2: 12, y1: 8, y2: 12 }),
      h('line', { x1: 12, x2: 12.01, y1: 16, y2: 16 }),
    ]),
}
