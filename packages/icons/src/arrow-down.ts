import { h } from 'vue'
import { svg } from './svg'

export const VIconArrowDown = {
  name: 'VIconArrowDown',
  setup: () => () => svg([h('path', { d: 'M12 5v14' }), h('path', { d: 'm19 12-7 7-7-7' })]),
}
