import { h } from 'vue'
import { svg } from './svg'

export const VIconChevronsUpDown = {
  name: 'VIconChevronsUpDown',
  setup: () => () => svg([h('path', { d: 'm7 15 5 5 5-5' }), h('path', { d: 'm7 9 5-5 5 5' })]),
}
