import { h } from 'vue'
import { svg } from './svg'

export const VIconBarChart2 = {
  name: 'VIconBarChart2',
  setup: () => () =>
    svg([h('path', { d: 'M5 21v-6' }), h('path', { d: 'M12 21V3' }), h('path', { d: 'M19 21V9' })]),
}
