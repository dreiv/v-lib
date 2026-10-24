import { h } from 'vue'
import { svg } from './svg'

export const VIconSunDim = {
  name: 'VIconSunDim',
  setup: () => () =>
    svg([
      h('circle', { cx: 12, cy: 12, r: 4 }),
      h('path', { d: 'M12 4h.01' }),
      h('path', { d: 'M20 12h.01' }),
      h('path', { d: 'M12 20h.01' }),
      h('path', { d: 'M4 12h.01' }),
      h('path', { d: 'M17.657 6.343h.01' }),
      h('path', { d: 'M17.657 17.657h.01' }),
      h('path', { d: 'M6.343 17.657h.01' }),
      h('path', { d: 'M6.343 6.343h.01' }),
    ]),
}
