import { h } from 'vue'
import { svg } from './svg'

export const VIconMoveVertical = {
  name: 'VIconMoveVertical',
  setup: () => () =>
    svg([
      h('path', { d: 'M12 2v20' }),
      h('path', { d: 'm8 18 4 4 4-4' }),
      h('path', { d: 'm8 6 4-4 4 4' }),
    ]),
}
