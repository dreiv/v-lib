import { h } from 'vue'
import { svg } from './svg'

export const VIconMinusSquare = {
  name: 'VIconMinusSquare',
  setup: () => () =>
    svg([h('rect', { width: 18, height: 18, x: 3, y: 3, rx: 2 }), h('path', { d: 'M8 12h8' })]),
}
