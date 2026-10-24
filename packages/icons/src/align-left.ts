import { h } from 'vue'
import { svg } from './svg'

export const VIconAlignLeft = {
  name: 'VIconAlignLeft',
  setup: () => () =>
    svg([h('path', { d: 'M21 5H3' }), h('path', { d: 'M15 12H3' }), h('path', { d: 'M17 19H3' })]),
}
