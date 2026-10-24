import { h } from 'vue'
import { svg } from './svg'

export const VIconHistory = {
  name: 'VIconHistory',
  setup: () => () =>
    svg([
      h('path', { d: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' }),
      h('path', { d: 'M3 3v5h5' }),
      h('path', { d: 'M12 7v5l4 2' }),
    ]),
}
