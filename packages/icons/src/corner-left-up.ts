import { h } from 'vue'
import { svg } from './svg'

export const VIconCornerLeftUp = {
  name: 'VIconCornerLeftUp',
  setup: () => () =>
    svg([h('path', { d: 'M14 9 9 4 4 9' }), h('path', { d: 'M20 20h-7a4 4 0 0 1-4-4V4' })]),
}
