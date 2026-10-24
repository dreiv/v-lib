import { h } from 'vue'
import { svg } from './svg'

export const VIconArrowRight = {
  name: 'VIconArrowRight',
  setup: () => () => svg([h('path', { d: 'M5 12h14' }), h('path', { d: 'm12 5 7 7-7 7' })]),
}
