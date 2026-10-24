import { h } from 'vue'
import { svg } from './svg'

export const VIconGlobe = {
  name: 'VIconGlobe',
  setup: () => () =>
    svg([
      h('circle', { cx: 12, cy: 12, r: 10 }),
      h('path', { d: 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20' }),
      h('path', { d: 'M2 12h20' }),
    ]),
}
