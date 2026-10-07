import { h } from 'vue'
import { svg } from './svg'

export const VIconWifi = {
  name: 'VIconWifi',
  setup: () => () =>
    svg([
      h('path', { d: 'M12 20h.01' }),
      h('path', { d: 'M2 8.82a15 15 0 0 1 20 0' }),
      h('path', { d: 'M5 12.859a10 10 0 0 1 14 0' }),
      h('path', { d: 'M8.5 16.429a5 5 0 0 1 7 0' }),
    ]),
}
