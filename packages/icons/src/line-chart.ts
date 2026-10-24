import { h } from 'vue'
import { svg } from './svg'

export const VIconLineChart = {
  name: 'VIconLineChart',
  setup: () => () =>
    svg([h('path', { d: 'M3 3v16a2 2 0 0 0 2 2h16' }), h('path', { d: 'm19 9-5 5-4-4-3 3' })]),
}
