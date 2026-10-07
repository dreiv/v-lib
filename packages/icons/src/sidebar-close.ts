import { h } from 'vue'
import { svg } from './svg'

export const VIconSidebarClose = {
  name: 'VIconSidebarClose',
  setup: () => () =>
    svg([
      h('rect', { width: 18, height: 18, x: 3, y: 3, rx: 2 }),
      h('path', { d: 'M9 3v18' }),
      h('path', { d: 'm16 15-3-3 3-3' }),
    ]),
}
