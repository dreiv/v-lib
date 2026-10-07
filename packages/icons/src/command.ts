import { h } from 'vue'
import { svg } from './svg'

export const VIconCommand = {
  name: 'VIconCommand',
  setup: () => () =>
    svg([
      h('path', { d: 'M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' }),
    ]),
}
