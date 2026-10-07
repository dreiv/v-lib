import { h } from 'vue'
import { svg } from './svg'

export const VIconX = {
  name: 'VIconX',
  setup: () => () => svg([h('path', { d: 'M18 6 6 18' }), h('path', { d: 'm6 6 12 12' })]),
}
