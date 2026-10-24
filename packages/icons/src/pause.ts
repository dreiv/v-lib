import { h } from 'vue'
import { svg } from './svg'

export const VIconPause = {
  name: 'VIconPause',
  setup: () => () =>
    svg([
      h('rect', { x: 14, y: 3, width: 5, height: 18, rx: 1 }),
      h('rect', { x: 5, y: 3, width: 5, height: 18, rx: 1 }),
    ]),
}
