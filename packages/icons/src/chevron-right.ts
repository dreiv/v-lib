import { h } from 'vue'
import { svg } from './svg'

export const VIconChevronRight = {
  name: 'VIconChevronRight',
  setup: () => () => svg([h('path', { d: 'm9 18 6-6-6-6' })]),
}
