import { h } from 'vue'
import { svg } from './svg'

export const VIconTerminalSquare = {
  name: 'VIconTerminalSquare',
  setup: () => () =>
    svg([
      h('path', { d: 'm7 11 2-2-2-2' }),
      h('path', { d: 'M11 13h4' }),
      h('rect', { width: 18, height: 18, x: 3, y: 3, rx: 2, ry: 2 }),
    ]),
}
