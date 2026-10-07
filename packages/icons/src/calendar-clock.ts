import { h } from 'vue'
import { svg } from './svg'

export const VIconCalendarClock = {
  name: 'VIconCalendarClock',
  setup: () => () =>
    svg([
      h('path', { d: 'M16 14v2.2l1.6 1' }),
      h('path', { d: 'M16 2v3' }),
      h('path', { d: 'M21 7.338V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2.338' }),
      h('path', { d: 'M3 9h5.859' }),
      h('path', { d: 'M8 2v3' }),
      h('circle', { cx: 16, cy: 16, r: 6 }),
    ]),
}
