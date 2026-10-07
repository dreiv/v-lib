import { h } from 'vue'
import { svg } from './svg'

export const VIconPower = {
  name: 'VIconPower',
  setup: () => () =>
    svg([h('path', { d: 'M12 2v10' }), h('path', { d: 'M18.4 6.6a9 9 0 1 1-12.77.04' })]),
}
