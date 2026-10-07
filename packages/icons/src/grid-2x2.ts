import { h } from 'vue'
import { svg } from './svg'

export const VIconGrid2x2 = {
  name: 'VIconGrid2x2',
  setup: () => () =>
    svg([
      h('path', { d: 'M12 3v18' }),
      h('path', { d: 'M3 12h18' }),
      h('rect', { x: 3, y: 3, width: 18, height: 18, rx: 2 }),
    ]),
}
