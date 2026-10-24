import { h } from 'vue'
import { svg } from './svg'

export const VIconAsterisk = {
  name: 'VIconAsterisk',
  setup: () => () =>
    svg([
      h('path', { d: 'M12 5v14' }),
      h('path', { d: 'm18.065 8.496-12.125 7' }),
      h('path', { d: 'm5.94 8.504 12.125 7' }),
    ]),
}
