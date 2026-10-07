import { h } from 'vue'
import { svg } from './svg'

export const VIconUser = {
  name: 'VIconUser',
  setup: () => () =>
    svg([
      h('path', { d: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' }),
      h('circle', { cx: 12, cy: 7, r: 4 }),
    ]),
}
