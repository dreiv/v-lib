import { h } from 'vue'
import { svg } from './svg'

export const VIconClock = {
  name: 'VIconClock',
  setup: () => () => svg([h('circle', { cx: 12, cy: 12, r: 10 }), h('path', { d: 'M12 6v6l4 2' })]),
}
