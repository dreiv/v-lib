import { h } from 'vue'
import { svg } from './svg'

export const VIconRewind = {
  name: 'VIconRewind',
  setup: () => () =>
    svg([
      h('path', { d: 'M12 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 12 18z' }),
      h('path', { d: 'M22 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 22 18z' }),
    ]),
}
