import { h } from 'vue'
import { svg } from './svg'

export const VIconEllipsis = {
  name: 'VIconEllipsis',
  setup: () => () =>
    svg([
      h('circle', { cx: 12, cy: 12, r: 1 }),
      h('circle', { cx: 19, cy: 12, r: 1 }),
      h('circle', { cx: 5, cy: 12, r: 1 }),
    ]),
}
