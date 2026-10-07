import { h } from 'vue'
import { svg } from './svg'

export const VIconFastForward = {
  name: 'VIconFastForward',
  setup: () => () =>
    svg([
      h('path', { d: 'M12 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 12 18z' }),
      h('path', { d: 'M2 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 2 18z' }),
    ]),
}
