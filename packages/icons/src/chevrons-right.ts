import { h } from 'vue'
import { svg } from './svg'

export const VIconChevronsRight = {
  name: 'VIconChevronsRight',
  setup: () => () => svg([h('path', { d: 'm6 17 5-5-5-5' }), h('path', { d: 'm13 17 5-5-5-5' })]),
}
