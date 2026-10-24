import { h } from 'vue'
import { svg } from './svg'

export const VIconTerminal = {
  name: 'VIconTerminal',
  setup: () => () => svg([h('path', { d: 'M12 19h8' }), h('path', { d: 'm4 17 6-6-6-6' })]),
}
