import { h } from 'vue'
import { svg } from './svg'

export const VIconArrowDownLeft = {
  name: 'VIconArrowDownLeft',
  setup: () => () => svg([h('path', { d: 'M17 7 7 17' }), h('path', { d: 'M17 17H7V7' })]),
}
