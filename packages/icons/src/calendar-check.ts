import { h } from 'vue'
import { svg } from './svg'

export const VIconCalendarCheck = {
  name: 'VIconCalendarCheck',
  setup: () => () =>
    svg([
      h('path', { d: 'M8 2v3' }),
      h('path', { d: 'M16 2v3' }),
      h('rect', { x: 3, y: 3, width: 18, height: 18, rx: 2 }),
      h('path', { d: 'M3 9h18' }),
      h('path', { d: 'm9 15 2 2 4-4' }),
    ]),
}
