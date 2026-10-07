import { h } from 'vue'
import { svg } from './svg'

export const VIconTrendingDown = {
  name: 'VIconTrendingDown',
  setup: () => () =>
    svg([h('path', { d: 'M16 17h6v-6' }), h('path', { d: 'm22 17-8.5-8.5-5 5L2 7' })]),
}
