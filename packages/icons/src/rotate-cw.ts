import { h } from 'vue'
import { svg } from './svg'

export const VIconRotateCw = {
  name: 'VIconRotateCw',
  setup: () => () =>
    svg([
      h('path', { d: 'M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8' }),
      h('path', { d: 'M21 3v5h-5' }),
    ]),
}
