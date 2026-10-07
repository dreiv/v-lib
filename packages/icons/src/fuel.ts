import { h } from 'vue'
import { svg } from './svg'

export const VIconFuel = {
  name: 'VIconFuel',
  setup: () => () =>
    svg([
      h('path', { d: 'M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5' }),
      h('path', { d: 'M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16' }),
      h('path', { d: 'M2 21h13' }),
      h('path', { d: 'M3 9h11' }),
    ]),
}
