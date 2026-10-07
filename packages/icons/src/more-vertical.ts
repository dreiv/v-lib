import { h } from 'vue'
import { svg } from './svg'

export const VIconMoreVertical = {
  name: 'VIconMoreVertical',
  setup: () => () =>
    svg([
      h('circle', { cx: 12, cy: 12, r: 1 }),
      h('circle', { cx: 12, cy: 5, r: 1 }),
      h('circle', { cx: 12, cy: 19, r: 1 }),
    ]),
}
