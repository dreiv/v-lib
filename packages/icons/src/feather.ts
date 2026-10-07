import { h } from 'vue'
import { svg } from './svg'

export const VIconFeather = {
  name: 'VIconFeather',
  setup: () => () =>
    svg([
      h('path', {
        d: 'M14.086 18.412A2 2 0 0112.67 19H5v-7.672a2 2 0 01.586-1.414L11.75 3.75a6 6 0 118.49 8.49z',
      }),
      h('path', { d: 'M16 8 2 22' }),
      h('path', { d: 'M17.488 15H9' }),
    ]),
}
