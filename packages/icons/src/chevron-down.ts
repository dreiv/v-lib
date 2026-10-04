import { h } from 'vue'
import { svg } from './svg'

export const VIconChevronDown = {
  name: 'VIconChevronDown',
  setup: () => () => svg([h('path', { d: 'm6 9 6 6 6-6' })]),
}
