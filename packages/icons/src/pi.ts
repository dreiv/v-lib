import { h } from 'vue'
import { svg } from './svg'

export const VIconPi = {
  name: 'VIconPi',
  setup: () => () =>
    svg([
      h('line', { x1: 9, x2: 9, y1: 4, y2: 20 }),
      h('path', { d: 'M4 7c0-1.7 1.3-3 3-3h13' }),
      h('path', { d: 'M18 20c-1.7 0-3-1.3-3-3V4' }),
    ]),
}
