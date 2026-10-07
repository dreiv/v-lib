import { h } from 'vue'
import { svg } from './svg'

export const VIconCircleMinus = {
  name: 'VIconCircleMinus',
  setup: () => () => svg([h('circle', { cx: 12, cy: 12, r: 10 }), h('path', { d: 'M8 12h8' })]),
}
