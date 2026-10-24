import { h } from 'vue'
import { svg } from './svg'

export const VIconCornerLeftDown = {
  name: 'VIconCornerLeftDown',
  setup: () => () =>
    svg([h('path', { d: 'm14 15-5 5-5-5' }), h('path', { d: 'M20 4h-7a4 4 0 0 0-4 4v12' })]),
}
