import { h } from 'vue'
import { svg } from './svg'

export const VIconCalendarPlus = {
  name: 'VIconCalendarPlus',
  setup: () => () =>
    svg([
      h('path', { d: 'M16 18h6' }),
      h('path', { d: 'M16 2v3' }),
      h('path', { d: 'M19 15v6' }),
      h('path', { d: 'M21 11.5V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h8.3' }),
      h('path', { d: 'M3 9h18' }),
      h('path', { d: 'M8 2v3' }),
    ]),
}
