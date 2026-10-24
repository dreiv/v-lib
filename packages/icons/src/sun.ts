import { h } from 'vue'
import { svg } from './svg'

export const VIconSun = {
  name: 'VIconSun',
  setup: () => () =>
    svg([
      h('circle', { cx: 12, cy: 12, r: 4 }),
      h('path', { d: 'M12 2v2' }),
      h('path', { d: 'M12 20v2' }),
      h('path', { d: 'm4.93 4.93 1.41 1.41' }),
      h('path', { d: 'm17.66 17.66 1.41 1.41' }),
      h('path', { d: 'M2 12h2' }),
      h('path', { d: 'M20 12h2' }),
      h('path', { d: 'm6.34 17.66-1.41 1.41' }),
      h('path', { d: 'm19.07 4.93-1.41 1.41' }),
    ]),
}
