import { h } from 'vue'
import { svg } from './svg'

export const VIconMinimize2 = {
  name: 'VIconMinimize2',
  setup: () => () =>
    svg([
      h('path', { d: 'm14 10 7-7' }),
      h('path', { d: 'M20 10h-6V4' }),
      h('path', { d: 'm3 21 7-7' }),
      h('path', { d: 'M4 14h6v6' }),
    ]),
}
