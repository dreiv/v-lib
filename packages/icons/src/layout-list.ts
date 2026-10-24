import { h } from 'vue'
import { svg } from './svg'

export const VIconLayoutList = {
  name: 'VIconLayoutList',
  setup: () => () =>
    svg([
      h('rect', { width: 7, height: 7, x: 3, y: 3, rx: 1 }),
      h('rect', { width: 7, height: 7, x: 3, y: 14, rx: 1 }),
      h('path', { d: 'M14 4h7' }),
      h('path', { d: 'M14 9h7' }),
      h('path', { d: 'M14 15h7' }),
      h('path', { d: 'M14 20h7' }),
    ]),
}
