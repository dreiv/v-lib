import { h } from 'vue'
import { svg } from './svg'

export const VIconRefreshCw = {
  name: 'VIconRefreshCw',
  setup: () => () =>
    svg([
      h('path', { d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8' }),
      h('path', { d: 'M21 3v5h-5' }),
      h('path', { d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16' }),
      h('path', { d: 'M8 16H3v5' }),
    ]),
}
