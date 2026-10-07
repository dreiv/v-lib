import { h } from 'vue'
import { svg } from './svg'

export const VIconNavigation = {
  name: 'VIconNavigation',
  setup: () => () => svg([h('polygon', { points: '3 11 22 2 13 21 11 13 3 11' })]),
}
