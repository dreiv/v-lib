import { h } from 'vue'
import { svg } from './svg'

export const VIconTarget = {
  name: 'VIconTarget',
  setup: () => () =>
    svg([
      h('circle', { cx: 12, cy: 12, r: 10 }),
      h('circle', { cx: 12, cy: 12, r: 6 }),
      h('circle', { cx: 12, cy: 12, r: 2 }),
    ]),
}
