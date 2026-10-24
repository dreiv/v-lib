import { h } from 'vue'
import { svg } from './svg'

export const VIconMoveHorizontal = {
  name: 'VIconMoveHorizontal',
  setup: () => () =>
    svg([
      h('path', { d: 'm18 8 4 4-4 4' }),
      h('path', { d: 'M2 12h20' }),
      h('path', { d: 'm6 8-4 4 4 4' }),
    ]),
}
