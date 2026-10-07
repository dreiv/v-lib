import { h } from 'vue'
import { svg } from './svg'

export const VIconAtSign = {
  name: 'VIconAtSign',
  setup: () => () =>
    svg([
      h('circle', { cx: 12, cy: 12, r: 4 }),
      h('path', { d: 'M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8' }),
    ]),
}
