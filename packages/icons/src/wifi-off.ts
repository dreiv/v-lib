import { h } from 'vue'
import { svg } from './svg'

export const VIconWifiOff = {
  name: 'VIconWifiOff',
  setup: () => () =>
    svg([
      h('path', { d: 'M12 20h.01' }),
      h('path', { d: 'M8.5 16.429a5 5 0 0 1 7 0' }),
      h('path', { d: 'M5 12.859a10 10 0 0 1 5.17-2.69' }),
      h('path', { d: 'M19 12.859a10 10 0 0 0-2.007-1.523' }),
      h('path', { d: 'M2 8.82a15 15 0 0 1 4.177-2.643' }),
      h('path', { d: 'M22 8.82a15 15 0 0 0-11.288-3.764' }),
      h('path', { d: 'm2 2 20 20' }),
    ]),
}
