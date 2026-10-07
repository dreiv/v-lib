import { h } from 'vue'
import { svg } from './svg'

export const VIconPlus = {
  name: 'VIconPlus',
  setup: () => () => svg([h('path', { d: 'M5 12h14' }), h('path', { d: 'M12 5v14' })]),
}
