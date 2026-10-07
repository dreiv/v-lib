import { h } from 'vue'
import { svg } from './svg'

export const VIconSquare = {
  name: 'VIconSquare',
  setup: () => () => svg([h('rect', { width: 18, height: 18, x: 3, y: 3, rx: 2 })]),
}
