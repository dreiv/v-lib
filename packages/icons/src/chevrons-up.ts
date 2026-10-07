import { h } from 'vue'
import { svg } from './svg'

export const VIconChevronsUp = {
  name: 'VIconChevronsUp',
  setup: () => () => svg([h('path', { d: 'm17 11-5-5-5 5' }), h('path', { d: 'm17 18-5-5-5 5' })]),
}
