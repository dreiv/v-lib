import { h } from 'vue'
import { svg } from './svg'

export const VIconGauge = {
  name: 'VIconGauge',
  setup: () => () =>
    svg([h('path', { d: 'm12 14 4-4' }), h('path', { d: 'M3.34 19a10 10 0 1 1 17.32 0' })]),
}
