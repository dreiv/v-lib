import { h } from 'vue'
import { svg } from './svg'

export const VIconBattery = {
  name: 'VIconBattery',
  setup: () => () =>
    svg([
      h('path', { d: 'M 22 14 L 22 10' }),
      h('rect', { x: 2, y: 6, width: 16, height: 12, rx: 2 }),
    ]),
}
