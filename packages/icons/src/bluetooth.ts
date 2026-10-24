import { h } from 'vue'
import { svg } from './svg'

export const VIconBluetooth = {
  name: 'VIconBluetooth',
  setup: () => () => svg([h('path', { d: 'm7 7 10 10-5 5V2l5 5L7 17' })]),
}
