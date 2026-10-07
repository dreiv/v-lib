import { h } from 'vue'
import { svg } from './svg'

export const VIconCheck = {
  name: 'VIconCheck',
  setup: () => () => svg([h('path', { d: 'M20 6 9 17l-5-5' })]),
}
