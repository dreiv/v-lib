import { h } from 'vue'
import { svg } from './svg'

export const VIconRepeat1 = {
  name: 'VIconRepeat1',
  setup: () => () =>
    svg([
      h('path', { d: 'm17 2 4 4-4 4' }),
      h('path', { d: 'M3 11v-1a4 4 0 0 1 4-4h14' }),
      h('path', { d: 'm7 22-4-4 4-4' }),
      h('path', { d: 'M21 13v1a4 4 0 0 1-4 4H3' }),
      h('path', { d: 'M11 10h1v4' }),
    ]),
}
