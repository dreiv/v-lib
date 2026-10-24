import { h } from 'vue'
import { svg } from './svg'

export const VIconCornerRightUp = {
  name: 'VIconCornerRightUp',
  setup: () => () =>
    svg([h('path', { d: 'm10 9 5-5 5 5' }), h('path', { d: 'M4 20h7a4 4 0 0 0 4-4V4' })]),
}
