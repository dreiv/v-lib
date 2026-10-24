import { h } from 'vue'
import { svg } from './svg'

export const VIconBatteryCharging = {
  name: 'VIconBatteryCharging',
  setup: () => () =>
    svg([
      h('path', { d: 'm11 7-3 5h4l-3 5' }),
      h('path', { d: 'M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935' }),
      h('path', { d: 'M22 14v-4' }),
      h('path', { d: 'M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936' }),
    ]),
}
