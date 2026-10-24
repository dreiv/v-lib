import { h } from 'vue'
import { svg } from './svg'

export const VIconArrowLeft = {
  name: 'VIconArrowLeft',
  setup: () => () => svg([h('path', { d: 'm12 19-7-7 7-7' }), h('path', { d: 'M19 12H5' })]),
}
