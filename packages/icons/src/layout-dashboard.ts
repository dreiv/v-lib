import { h } from 'vue'
import { svg } from './svg'

export const VIconLayoutDashboard = {
  name: 'VIconLayoutDashboard',
  setup: () => () =>
    svg([
      h('rect', { width: 7, height: 9, x: 3, y: 3, rx: 1 }),
      h('rect', { width: 7, height: 5, x: 14, y: 3, rx: 1 }),
      h('rect', { width: 7, height: 9, x: 14, y: 12, rx: 1 }),
      h('rect', { width: 7, height: 5, x: 3, y: 16, rx: 1 }),
    ]),
}
