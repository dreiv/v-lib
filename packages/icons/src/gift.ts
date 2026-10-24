import { h } from 'vue'
import { svg } from './svg'

export const VIconGift = {
  name: 'VIconGift',
  setup: () => () =>
    svg([
      h('path', { d: 'M12 7v14' }),
      h('path', { d: 'M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8' }),
      h('path', { d: 'M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5' }),
      h('rect', { x: 3, y: 7, width: 18, height: 4, rx: 1 }),
    ]),
}
