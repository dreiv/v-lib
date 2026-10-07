import { h } from 'vue'
import { svg } from './svg'

export const VIconSmartphoneCharging = {
  name: 'VIconSmartphoneCharging',
  setup: () => () =>
    svg([
      h('rect', { width: 14, height: 20, x: 5, y: 2, rx: 2, ry: 2 }),
      h('path', { d: 'M12.667 8 10 12h4l-2.667 4' }),
    ]),
}
