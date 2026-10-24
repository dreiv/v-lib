import { h } from 'vue'
import { svg } from './svg'

export const VIconCalendarRange = {
  name: 'VIconCalendarRange',
  setup: () => () =>
    svg([
      h('rect', { x: 3, y: 3, width: 18, height: 18, rx: 2 }),
      h('path', { d: 'M16 2v3' }),
      h('path', { d: 'M3 9h18' }),
      h('path', { d: 'M8 2v3' }),
      h('path', { d: 'M17 13h-6' }),
      h('path', { d: 'M13 17H7' }),
      h('path', { d: 'M7 13h.01' }),
      h('path', { d: 'M17 17h.01' }),
    ]),
}
