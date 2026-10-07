import { h } from 'vue'
import { svg } from './svg'

export const VIconImages = {
  name: 'VIconImages',
  setup: () => () =>
    svg([
      h('path', { d: 'm22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16' }),
      h('path', { d: 'M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2' }),
      h('circle', { cx: 13, cy: 7, r: 1, fill: 'currentColor' }),
      h('rect', { x: 8, y: 2, width: 14, height: 14, rx: 2 }),
    ]),
}
