import { h } from 'vue'
import { svg } from './svg'

export const VIconCloud = {
  name: 'VIconCloud',
  setup: () => () => svg([h('path', { d: 'M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z' })]),
}
