import { h } from 'vue'
import { svg } from './svg'

export const VIconCode2 = {
  name: 'VIconCode2',
  setup: () => () =>
    svg([
      h('path', { d: 'm18 16 4-4-4-4' }),
      h('path', { d: 'm6 8-4 4 4 4' }),
      h('path', { d: 'm14.5 4-5 16' }),
    ]),
}
