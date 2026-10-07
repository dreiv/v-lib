import { h } from 'vue'
import { svg } from './svg'

export const VIconTrash2 = {
  name: 'VIconTrash2',
  setup: () => () =>
    svg([
      h('path', { d: 'M10 11v6' }),
      h('path', { d: 'M14 11v6' }),
      h('path', { d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6' }),
      h('path', { d: 'M3 6h18' }),
      h('path', { d: 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' }),
    ]),
}
