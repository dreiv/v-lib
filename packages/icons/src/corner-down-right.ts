import { h } from 'vue'
import { svg } from './svg'

export const VIconCornerDownRight = {
  name: 'VIconCornerDownRight',
  setup: () => () =>
    svg([h('path', { d: 'm15 10 5 5-5 5' }), h('path', { d: 'M4 4v7a4 4 0 0 0 4 4h12' })]),
}
