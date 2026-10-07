import { h } from 'vue'
import { svg } from './svg'

export const VIconArrowDownRight = {
  name: 'VIconArrowDownRight',
  setup: () => () => svg([h('path', { d: 'm7 7 10 10' }), h('path', { d: 'M17 7v10H7' })]),
}
