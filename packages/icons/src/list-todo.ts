import { h } from 'vue'
import { svg } from './svg'

export const VIconListTodo = {
  name: 'VIconListTodo',
  setup: () => () =>
    svg([
      h('path', { d: 'M13 5h8' }),
      h('path', { d: 'M13 12h8' }),
      h('path', { d: 'M13 19h8' }),
      h('path', { d: 'm3 17 2 2 4-4' }),
      h('rect', { x: 3, y: 4, width: 6, height: 6, rx: 1 }),
    ]),
}
