import { h } from 'vue'
import { svg } from './svg'

export const VIconCalculator = {
  name: 'VIconCalculator',
  setup: () => () =>
    svg([
      h('rect', { width: 16, height: 20, x: 4, y: 2, rx: 2 }),
      h('line', { x1: 8, x2: 16, y1: 6, y2: 6 }),
      h('line', { x1: 16, x2: 16, y1: 14, y2: 18 }),
      h('path', { d: 'M16 10h.01' }),
      h('path', { d: 'M12 10h.01' }),
      h('path', { d: 'M8 10h.01' }),
      h('path', { d: 'M12 14h.01' }),
      h('path', { d: 'M8 14h.01' }),
      h('path', { d: 'M12 18h.01' }),
      h('path', { d: 'M8 18h.01' }),
    ]),
}
