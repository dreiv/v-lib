import { h } from 'vue'
import { svg } from './svg'

export const VIconArrowUpLeft = {
  name: 'VIconArrowUpLeft',
  setup: () => () => svg([h('path', { d: 'M7 17V7h10' }), h('path', { d: 'M17 17 7 7' })]),
}
