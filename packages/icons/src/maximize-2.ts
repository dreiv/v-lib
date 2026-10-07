import { h } from 'vue'
import { svg } from './svg'

export const VIconMaximize2 = {
  name: 'VIconMaximize2',
  setup: () => () =>
    svg([
      h('path', { d: 'M15 3h6v6' }),
      h('path', { d: 'm21 3-7 7' }),
      h('path', { d: 'm3 21 7-7' }),
      h('path', { d: 'M9 21H3v-6' }),
    ]),
}
