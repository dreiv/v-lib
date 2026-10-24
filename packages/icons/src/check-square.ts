import { h } from 'vue'
import { svg } from './svg'

export const VIconCheckSquare = {
  name: 'VIconCheckSquare',
  setup: () => () =>
    svg([
      h('path', { d: 'M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344' }),
      h('path', { d: 'm9 11 3 3L22 4' }),
    ]),
}
