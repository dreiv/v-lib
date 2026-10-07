import { h } from 'vue'
import { svg } from './svg'

export const VIconChevronUp = {
  name: 'VIconChevronUp',
  setup: () => () => svg([h('path', { d: 'm18 15-6-6-6 6' })]),
}
