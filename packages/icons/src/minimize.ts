import { h } from 'vue'
import { svg } from './svg'

export const VIconMinimize = {
  name: 'VIconMinimize',
  setup: () => () =>
    svg([
      h('path', { d: 'M8 3v3a2 2 0 0 1-2 2H3' }),
      h('path', { d: 'M21 8h-3a2 2 0 0 1-2-2V3' }),
      h('path', { d: 'M3 16h3a2 2 0 0 1 2 2v3' }),
      h('path', { d: 'M16 21v-3a2 2 0 0 1 2-2h3' }),
    ]),
}
