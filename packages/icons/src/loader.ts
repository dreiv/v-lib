import { h } from 'vue'
import { svg } from './svg'

export const VIconLoader = {
  name: 'VIconLoader',
  setup: () => () =>
    svg([
      h('path', { d: 'M12 2v4' }),
      h('path', { d: 'm16.2 7.8 2.9-2.9' }),
      h('path', { d: 'M18 12h4' }),
      h('path', { d: 'm16.2 16.2 2.9 2.9' }),
      h('path', { d: 'M12 18v4' }),
      h('path', { d: 'm4.9 19.1 2.9-2.9' }),
      h('path', { d: 'M2 12h4' }),
      h('path', { d: 'm4.9 4.9 2.9 2.9' }),
    ]),
}
