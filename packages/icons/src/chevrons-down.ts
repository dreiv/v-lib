import { h } from 'vue'
import { svg } from './svg'

export const VIconChevronsDown = {
  name: 'VIconChevronsDown',
  setup: () => () => svg([h('path', { d: 'm7 6 5 5 5-5' }), h('path', { d: 'm7 13 5 5 5-5' })]),
}
