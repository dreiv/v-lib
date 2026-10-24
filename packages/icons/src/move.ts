import { h } from 'vue'
import { svg } from './svg'

export const VIconMove = {
  name: 'VIconMove',
  setup: () => () =>
    svg([
      h('path', { d: 'M12 2v20' }),
      h('path', { d: 'm15 19-3 3-3-3' }),
      h('path', { d: 'm19 9 3 3-3 3' }),
      h('path', { d: 'M2 12h20' }),
      h('path', { d: 'm5 9-3 3 3 3' }),
      h('path', { d: 'm9 5 3-3 3 3' }),
    ]),
}
