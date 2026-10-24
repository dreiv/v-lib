import { h } from 'vue'
import { svg } from './svg'

export const VIconConstruction = {
  name: 'VIconConstruction',
  setup: () => () =>
    svg([
      h('rect', { x: 2, y: 6, width: 20, height: 8, rx: 1 }),
      h('path', { d: 'M17 14v7' }),
      h('path', { d: 'M7 14v7' }),
      h('path', { d: 'M17 3v3' }),
      h('path', { d: 'M7 3v3' }),
      h('path', { d: 'M10 14 2.3 6.3' }),
      h('path', { d: 'm14 6 7.7 7.7' }),
      h('path', { d: 'm8 6 8 8' }),
    ]),
}
