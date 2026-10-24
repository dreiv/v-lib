import { h } from 'vue'
import { svg } from './svg'

export const VIconParkingCircle = {
  name: 'VIconParkingCircle',
  setup: () => () =>
    svg([h('circle', { cx: 12, cy: 12, r: 10 }), h('path', { d: 'M9 17V7h4a3 3 0 0 1 0 6H9' })]),
}
