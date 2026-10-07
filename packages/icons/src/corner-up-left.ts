import { h } from 'vue'
import { svg } from './svg'

export const VIconCornerUpLeft = {
  name: 'VIconCornerUpLeft',
  setup: () => () =>
    svg([h('path', { d: 'M20 20v-7a4 4 0 0 0-4-4H4' }), h('path', { d: 'M9 14 4 9l5-5' })]),
}
