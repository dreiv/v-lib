import { h } from 'vue'
import { svg } from './svg'

export const VIconChevronsLeft = {
  name: 'VIconChevronsLeft',
  setup: () => () => svg([h('path', { d: 'm11 17-5-5 5-5' }), h('path', { d: 'm18 17-5-5 5-5' })]),
}
