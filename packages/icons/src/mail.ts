import { h } from 'vue'
import { svg } from './svg'

export const VIconMail = {
  name: 'VIconMail',
  setup: () => () =>
    svg([
      h('path', { d: 'm22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7' }),
      h('rect', { x: 2, y: 4, width: 20, height: 16, rx: 2 }),
    ]),
}
