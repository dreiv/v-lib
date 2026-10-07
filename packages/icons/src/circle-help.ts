import { h } from 'vue'
import { svg } from './svg'

export const VIconCircleHelp = {
  name: 'VIconCircleHelp',
  setup: () => () =>
    svg([
      h('circle', { cx: 12, cy: 12, r: 10 }),
      h('path', { d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' }),
      h('path', { d: 'M12 17h.01' }),
    ]),
}
