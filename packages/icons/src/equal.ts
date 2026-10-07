import { h } from 'vue'
import { svg } from './svg'

export const VIconEqual = {
  name: 'VIconEqual',
  setup: () => () =>
    svg([h('line', { x1: 5, x2: 19, y1: 9, y2: 9 }), h('line', { x1: 5, x2: 19, y1: 15, y2: 15 })]),
}
