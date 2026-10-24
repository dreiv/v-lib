import { h } from 'vue'
import { svg } from './svg'

export const VIconSmartphone = {
  name: 'VIconSmartphone',
  setup: () => () =>
    svg([
      h('rect', { width: 14, height: 20, x: 5, y: 2, rx: 2, ry: 2 }),
      h('path', { d: 'M12 18h.01' }),
    ]),
}
