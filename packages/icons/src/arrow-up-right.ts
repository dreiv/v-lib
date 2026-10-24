import { h } from 'vue'
import { svg } from './svg'

export const VIconArrowUpRight = {
  name: 'VIconArrowUpRight',
  setup: () => () => svg([h('path', { d: 'M7 7h10v10' }), h('path', { d: 'M7 17 17 7' })]),
}
