import { h } from 'vue'
import { svg } from './svg'

export const VIconRedo = {
  name: 'VIconRedo',
  setup: () => () =>
    svg([
      h('path', { d: 'M21 7v6h-6' }),
      h('path', { d: 'M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7' }),
    ]),
}
