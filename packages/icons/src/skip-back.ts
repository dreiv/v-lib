import { h } from 'vue'
import { svg } from './svg'

export const VIconSkipBack = {
  name: 'VIconSkipBack',
  setup: () => () =>
    svg([
      h('path', {
        d: 'M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z',
      }),
      h('path', { d: 'M3 20V4' }),
    ]),
}
