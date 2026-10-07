import { h } from 'vue'
import { svg } from './svg'

export const VIconBarChart = {
  name: 'VIconBarChart',
  setup: () => () =>
    svg([h('path', { d: 'M5 21v-6' }), h('path', { d: 'M12 21V9' }), h('path', { d: 'M19 21V3' })]),
}
