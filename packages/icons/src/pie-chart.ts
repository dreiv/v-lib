import { h } from 'vue'
import { svg } from './svg'

export const VIconPieChart = {
  name: 'VIconPieChart',
  setup: () => () =>
    svg([
      h('path', {
        d: 'M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z',
      }),
      h('path', { d: 'M21.21 15.89A10 10 0 1 1 8 2.83' }),
    ]),
}
