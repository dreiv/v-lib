import { h } from 'vue'
import { svg } from './svg'

export const VIconCalendar = {
  name: 'VIconCalendar',
  setup: () => () =>
    svg([
      h('path', { d: 'M8 2v3' }),
      h('path', { d: 'M16 2v3' }),
      h('rect', { x: 3, y: 3, width: 18, height: 18, rx: 2 }),
      h('path', { d: 'M3 9h18' }),
    ]),
}
