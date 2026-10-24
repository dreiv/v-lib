import { h } from 'vue'
import { svg } from './svg'

export const VIconCalendarDays = {
  name: 'VIconCalendarDays',
  setup: () => () =>
    svg([
      h('path', { d: 'M8 2v3' }),
      h('path', { d: 'M16 2v3' }),
      h('rect', { x: 3, y: 3, width: 18, height: 18, rx: 2 }),
      h('path', { d: 'M3 9h18' }),
      h('path', { d: 'M8 13h.01' }),
      h('path', { d: 'M12 13h.01' }),
      h('path', { d: 'M16 13h.01' }),
      h('path', { d: 'M8 17h.01' }),
      h('path', { d: 'M12 17h.01' }),
      h('path', { d: 'M16 17h.01' }),
    ]),
}
