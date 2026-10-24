import { h } from 'vue'
import { svg } from './svg'

export const VIconLayoutGrid = {
  name: 'VIconLayoutGrid',
  setup: () => () =>
    svg([
      h('rect', { width: 7, height: 7, x: 3, y: 3, rx: 1 }),
      h('rect', { width: 7, height: 7, x: 14, y: 3, rx: 1 }),
      h('rect', { width: 7, height: 7, x: 14, y: 14, rx: 1 }),
      h('rect', { width: 7, height: 7, x: 3, y: 14, rx: 1 }),
    ]),
}
