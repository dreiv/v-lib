import { h } from 'vue'
import { svg } from './svg'

export const VIconCalendarSearch = {
  name: 'VIconCalendarSearch',
  setup: () => () =>
    svg([
      h('path', { d: 'M16 2v3' }),
      h('path', { d: 'M21 10.69V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h7.25' }),
      h('path', { d: 'm22 21-1.875-1.875' }),
      h('path', { d: 'M3 9h18' }),
      h('path', { d: 'M8 2v3' }),
      h('circle', { cx: 18, cy: 17, r: 3 }),
    ]),
}
