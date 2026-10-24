import { h } from 'vue'
import { svg } from './svg'

export const VIconBatteryLow = {
  name: 'VIconBatteryLow',
  setup: () => () =>
    svg([
      h('path', { d: 'M22 14v-4' }),
      h('path', { d: 'M6 14v-4' }),
      h('rect', { x: 2, y: 6, width: 16, height: 12, rx: 2 }),
    ]),
}
