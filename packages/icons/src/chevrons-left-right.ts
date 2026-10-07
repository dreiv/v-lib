import { h } from 'vue'
import { svg } from './svg'

export const VIconChevronsLeftRight = {
  name: 'VIconChevronsLeftRight',
  setup: () => () => svg([h('path', { d: 'm9 7-5 5 5 5' }), h('path', { d: 'm15 7 5 5-5 5' })]),
}
