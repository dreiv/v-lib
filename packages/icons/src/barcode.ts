import { h } from 'vue'
import { svg } from './svg'

export const VIconBarcode = {
  name: 'VIconBarcode',
  setup: () => () =>
    svg([
      h('path', { d: 'M3 5v14' }),
      h('path', { d: 'M8 5v14' }),
      h('path', { d: 'M12 5v14' }),
      h('path', { d: 'M17 5v14' }),
      h('path', { d: 'M21 5v14' }),
    ]),
}
