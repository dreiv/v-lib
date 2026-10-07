import { h } from 'vue'
import { svg } from './svg'

export const VIconSkipForward = {
  name: 'VIconSkipForward',
  setup: () => () =>
    svg([
      h('path', { d: 'M21 4v16' }),
      h('path', {
        d: 'M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z',
      }),
    ]),
}
