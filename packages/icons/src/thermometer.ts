import { h } from 'vue'
import { svg } from './svg'

export const VIconThermometer = {
  name: 'VIconThermometer',
  setup: () => () => svg([h('path', { d: 'M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z' })]),
}
