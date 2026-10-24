import { h } from 'vue'
import { svg } from './svg'

export const VIconAlignCenter = {
  name: 'VIconAlignCenter',
  setup: () => () =>
    svg([h('path', { d: 'M21 5H3' }), h('path', { d: 'M17 12H7' }), h('path', { d: 'M19 19H5' })]),
}
