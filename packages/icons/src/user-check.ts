import { h } from 'vue'
import { svg } from './svg'

export const VIconUserCheck = {
  name: 'VIconUserCheck',
  setup: () => () =>
    svg([
      h('path', { d: 'm16 11 2 2 4-4' }),
      h('path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }),
      h('circle', { cx: 9, cy: 7, r: 4 }),
    ]),
}
