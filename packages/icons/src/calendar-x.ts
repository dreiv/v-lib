import { h } from 'vue'
import { svg } from './svg'

export const VIconCalendarX = {
  name: 'VIconCalendarX',
  setup: () => () =>
    svg([
      h('path', { d: 'M8 2v3' }),
      h('path', { d: 'M16 2v3' }),
      h('rect', { x: 3, y: 3, width: 18, height: 18, rx: 2 }),
      h('path', { d: 'M3 9h18' }),
      h('path', { d: 'm14 13-4 4' }),
      h('path', { d: 'm10 13 4 4' }),
    ]),
}
