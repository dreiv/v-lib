import { h } from 'vue'
import { svg } from './svg'

export const VIconCornerUpRight = {
  name: 'VIconCornerUpRight',
  setup: () => () =>
    svg([h('path', { d: 'm15 14 5-5-5-5' }), h('path', { d: 'M4 20v-7a4 4 0 0 1 4-4h12' })]),
}
