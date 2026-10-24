import { h } from 'vue'
import { svg } from './svg'

export const VIconAnchor = {
  name: 'VIconAnchor',
  setup: () => () =>
    svg([
      h('path', { d: 'M12 6v16' }),
      h('path', { d: 'm19 13 2-1a9 9 0 0 1-18 0l2 1' }),
      h('path', { d: 'M9 11h6' }),
      h('circle', { cx: 12, cy: 4, r: 2 }),
    ]),
}
