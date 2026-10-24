import { h } from 'vue'
import { svg } from './svg'

export const VIconAlignJustify = {
  name: 'VIconAlignJustify',
  setup: () => () =>
    svg([h('path', { d: 'M3 5h18' }), h('path', { d: 'M3 12h18' }), h('path', { d: 'M3 19h18' })]),
}
