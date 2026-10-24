import { h } from 'vue'
import { svg } from './svg'

export const VIconArrowUp = {
  name: 'VIconArrowUp',
  setup: () => () => svg([h('path', { d: 'm5 12 7-7 7 7' }), h('path', { d: 'M12 19V5' })]),
}
