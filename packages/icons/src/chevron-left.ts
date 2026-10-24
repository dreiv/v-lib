import { h } from 'vue'
import { svg } from './svg'

export const VIconChevronLeft = {
  name: 'VIconChevronLeft',
  setup: () => () => svg([h('path', { d: 'm15 18-6-6 6-6' })]),
}
