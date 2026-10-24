import { h } from 'vue'
import { svg } from './svg'

export const VIconCornerRightDown = {
  name: 'VIconCornerRightDown',
  setup: () => () =>
    svg([h('path', { d: 'm10 15 5 5 5-5' }), h('path', { d: 'M4 4h7a4 4 0 0 1 4 4v12' })]),
}
