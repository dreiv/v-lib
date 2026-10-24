import { h } from 'vue'
import { svg } from './svg'

export const VIconListOrdered = {
  name: 'VIconListOrdered',
  setup: () => () =>
    svg([
      h('path', { d: 'M11 5h10' }),
      h('path', { d: 'M11 12h10' }),
      h('path', { d: 'M11 19h10' }),
      h('path', { d: 'M4 4h1v5' }),
      h('path', { d: 'M4 9h2' }),
      h('path', { d: 'M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02' }),
    ]),
}
