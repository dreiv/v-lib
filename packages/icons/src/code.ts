import { h } from 'vue'
import { svg } from './svg'

export const VIconCode = {
  name: 'VIconCode',
  setup: () => () => svg([h('path', { d: 'm16 18 6-6-6-6' }), h('path', { d: 'm8 6-6 6 6 6' })]),
}
