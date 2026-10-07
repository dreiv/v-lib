import { h } from 'vue'
import { svg } from './svg'

export const VIconType = {
  name: 'VIconType',
  setup: () => () =>
    svg([
      h('path', { d: 'M12 4v16' }),
      h('path', { d: 'M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2' }),
      h('path', { d: 'M9 20h6' }),
    ]),
}
