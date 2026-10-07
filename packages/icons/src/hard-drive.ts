import { h } from 'vue'
import { svg } from './svg'

export const VIconHardDrive = {
  name: 'VIconHardDrive',
  setup: () => () =>
    svg([
      h('path', { d: 'M10 16h.01' }),
      h('path', {
        d: 'M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
      }),
      h('path', { d: 'M21.946 12.013H2.054' }),
      h('path', { d: 'M6 16h.01' }),
    ]),
}
