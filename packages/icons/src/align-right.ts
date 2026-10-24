import { h } from 'vue'
import { svg } from './svg'

export const VIconAlignRight = {
  name: 'VIconAlignRight',
  setup: () => () =>
    svg([h('path', { d: 'M21 5H3' }), h('path', { d: 'M21 12H9' }), h('path', { d: 'M21 19H7' })]),
}
