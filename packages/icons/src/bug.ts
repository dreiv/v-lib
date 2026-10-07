import { h } from 'vue'
import { svg } from './svg'

export const VIconBug = {
  name: 'VIconBug',
  setup: () => () =>
    svg([
      h('path', { d: 'M12 20v-9' }),
      h('path', { d: 'M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z' }),
      h('path', { d: 'M14.12 3.88 16 2' }),
      h('path', { d: 'M21 21a4 4 0 0 0-3.81-4' }),
      h('path', { d: 'M21 5a4 4 0 0 1-3.55 3.97' }),
      h('path', { d: 'M22 13h-4' }),
      h('path', { d: 'M3 21a4 4 0 0 1 3.81-4' }),
      h('path', { d: 'M3 5a4 4 0 0 0 3.55 3.97' }),
      h('path', { d: 'M6 13H2' }),
      h('path', { d: 'm8 2 1.88 1.88' }),
      h('path', { d: 'M9 7.13V6a3 3 0 1 1 6 0v1.13' }),
    ]),
}
