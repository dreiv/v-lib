import { h } from 'vue'
import { svg } from './svg'

export const VIconCpu = {
  name: 'VIconCpu',
  setup: () => () =>
    svg([
      h('path', { d: 'M12 20v2' }),
      h('path', { d: 'M12 2v2' }),
      h('path', { d: 'M17 20v2' }),
      h('path', { d: 'M17 2v2' }),
      h('path', { d: 'M2 12h2' }),
      h('path', { d: 'M2 17h2' }),
      h('path', { d: 'M2 7h2' }),
      h('path', { d: 'M20 12h2' }),
      h('path', { d: 'M20 17h2' }),
      h('path', { d: 'M20 7h2' }),
      h('path', { d: 'M7 20v2' }),
      h('path', { d: 'M7 2v2' }),
      h('rect', { x: 4, y: 4, width: 16, height: 16, rx: 2 }),
      h('rect', { x: 8, y: 8, width: 8, height: 8, rx: 1 }),
    ]),
}
