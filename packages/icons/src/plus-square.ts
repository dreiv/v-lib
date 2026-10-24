import { h } from 'vue'
import { svg } from './svg'

export const VIconPlusSquare = {
  name: 'VIconPlusSquare',
  setup: () => () =>
    svg([
      h('rect', { width: 18, height: 18, x: 3, y: 3, rx: 2 }),
      h('path', { d: 'M8 12h8' }),
      h('path', { d: 'M12 8v8' }),
    ]),
}
