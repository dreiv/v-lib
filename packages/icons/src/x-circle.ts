import { h } from 'vue'
import { svg } from './svg'

export const VIconXCircle = {
  name: 'VIconXCircle',
  setup: () => () =>
    svg([
      h('circle', { cx: 12, cy: 12, r: 10 }),
      h('path', { d: 'm15 9-6 6' }),
      h('path', { d: 'm9 9 6 6' }),
    ]),
}
