import { h } from 'vue'
import { svg } from './svg'

export const VIconInfinity = {
  name: 'VIconInfinity',
  setup: () => () =>
    svg([h('path', { d: 'M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8' })]),
}
