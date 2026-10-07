import { h } from 'vue'
import { svg } from './svg'

export const VIconUndo = {
  name: 'VIconUndo',
  setup: () => () =>
    svg([
      h('path', { d: 'M3 7v6h6' }),
      h('path', { d: 'M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13' }),
    ]),
}
