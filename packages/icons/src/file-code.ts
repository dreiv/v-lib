import { h } from 'vue'
import { svg } from './svg'

export const VIconFileCode = {
  name: 'VIconFileCode',
  setup: () => () =>
    svg([
      h('path', {
        d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
      }),
      h('path', { d: 'M14 2v5a1 1 0 0 0 1 1h5' }),
      h('path', { d: 'M10 12.5 8 15l2 2.5' }),
      h('path', { d: 'm14 12.5 2 2.5-2 2.5' }),
    ]),
}
