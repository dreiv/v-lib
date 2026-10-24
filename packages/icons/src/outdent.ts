import { h } from 'vue'
import { svg } from './svg'

export const VIconOutdent = {
  name: 'VIconOutdent',
  setup: () => () =>
    svg([
      h('path', { d: 'M21 5H11' }),
      h('path', { d: 'M21 12H11' }),
      h('path', { d: 'M21 19H11' }),
      h('path', { d: 'm7 8-4 4 4 4' }),
    ]),
}
