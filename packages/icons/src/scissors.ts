import { h } from 'vue'
import { svg } from './svg'

export const VIconScissors = {
  name: 'VIconScissors',
  setup: () => () =>
    svg([
      h('circle', { cx: 6, cy: 6, r: 3 }),
      h('path', { d: 'M8.12 8.12 12 12' }),
      h('path', { d: 'M20 4 8.12 15.88' }),
      h('circle', { cx: 6, cy: 18, r: 3 }),
      h('path', { d: 'M14.8 14.8 20 20' }),
    ]),
}
