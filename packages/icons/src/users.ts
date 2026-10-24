import { h } from 'vue'
import { svg } from './svg'

export const VIconUsers = {
  name: 'VIconUsers',
  setup: () => () =>
    svg([
      h('path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }),
      h('path', { d: 'M16 3.128a4 4 0 0 1 0 7.744' }),
      h('path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87' }),
      h('circle', { cx: 9, cy: 7, r: 4 }),
    ]),
}
