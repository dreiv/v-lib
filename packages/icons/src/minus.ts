import { h } from 'vue'
import { svg } from './svg'

export const VIconMinus = {
  name: 'VIconMinus',
  setup: () => () => svg([h('path', { d: 'M5 12h14' })]),
}
