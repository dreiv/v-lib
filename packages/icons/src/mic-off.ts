import { h } from 'vue'
import { svg } from './svg'

export const VIconMicOff = {
  name: 'VIconMicOff',
  setup: () => () =>
    svg([
      h('path', { d: 'M12 19v3' }),
      h('path', { d: 'M15 9.34V5a3 3 0 0 0-5.68-1.33' }),
      h('path', { d: 'M16.95 16.95A7 7 0 0 1 5 12v-2' }),
      h('path', { d: 'M18.89 13.23A7 7 0 0 0 19 12v-2' }),
      h('path', { d: 'm2 2 20 20' }),
      h('path', { d: 'M9 9v3a3 3 0 0 0 5.12 2.12' }),
    ]),
}
