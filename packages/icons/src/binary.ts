import { h } from 'vue'
import { svg } from './svg'

export const VIconBinary = {
  name: 'VIconBinary',
  setup: () => () =>
    svg([
      h('rect', { x: 14, y: 14, width: 4, height: 6, rx: 2 }),
      h('rect', { x: 6, y: 4, width: 4, height: 6, rx: 2 }),
      h('path', { d: 'M6 20h4' }),
      h('path', { d: 'M14 10h4' }),
      h('path', { d: 'M6 14h2v6' }),
      h('path', { d: 'M14 4h2v6' }),
    ]),
}
