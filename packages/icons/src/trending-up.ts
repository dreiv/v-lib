import { h } from 'vue'
import { svg } from './svg'

export const VIconTrendingUp = {
  name: 'VIconTrendingUp',
  setup: () => () =>
    svg([h('path', { d: 'M16 7h6v6' }), h('path', { d: 'm22 7-8.5 8.5-5-5L2 17' })]),
}
