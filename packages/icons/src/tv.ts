import { h } from 'vue'
import { svg } from './svg'

export const VIconTv = {
  name: 'VIconTv',
  setup: () => () =>
    svg([
      h('path', { d: 'm17 2-5 5-5-5' }),
      h('rect', { width: 20, height: 15, x: 2, y: 7, rx: 2 }),
    ]),
}
