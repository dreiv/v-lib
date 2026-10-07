import { h } from 'vue'
import { svg } from './svg'

export const VIconCircle = {
  name: 'VIconCircle',
  setup: () => () => svg([h('circle', { cx: 12, cy: 12, r: 10 })]),
}
