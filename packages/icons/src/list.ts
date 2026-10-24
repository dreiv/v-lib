import { h } from 'vue'
import { svg } from './svg'

export const VIconList = {
  name: 'VIconList',
  setup: () => () =>
    svg([
      h('path', { d: 'M3 5h.01' }),
      h('path', { d: 'M3 12h.01' }),
      h('path', { d: 'M3 19h.01' }),
      h('path', { d: 'M8 5h13' }),
      h('path', { d: 'M8 12h13' }),
      h('path', { d: 'M8 19h13' }),
    ]),
}
