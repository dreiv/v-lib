import { h } from 'vue'
import { svg } from './svg'

export const VIconCheckCircle = {
  name: 'VIconCheckCircle',
  setup: () => () =>
    svg([h('path', { d: 'M21.801 10A10 10 0 1 1 17 3.335' }), h('path', { d: 'm9 11 3 3L22 4' })]),
}
