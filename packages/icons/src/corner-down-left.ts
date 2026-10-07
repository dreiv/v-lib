import { h } from 'vue'
import { svg } from './svg'

export const VIconCornerDownLeft = {
  name: 'VIconCornerDownLeft',
  setup: () => () =>
    svg([h('path', { d: 'M20 4v7a4 4 0 0 1-4 4H4' }), h('path', { d: 'm9 10-5 5 5 5' })]),
}
