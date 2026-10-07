import { h } from 'vue'
import { svg } from './svg'

export const VIconBatteryFull = {
  name: 'VIconBatteryFull',
  setup: () => () =>
    svg([
      h('path', { d: 'M10 10v4' }),
      h('path', { d: 'M14 10v4' }),
      h('path', { d: 'M22 14v-4' }),
      h('path', { d: 'M6 10v4' }),
      h('rect', { x: 2, y: 6, width: 16, height: 12, rx: 2 }),
    ]),
}
