import { h } from 'vue'
import { svg } from './svg'

export const VIconShare = {
  name: 'VIconShare',
  setup: () => () =>
    svg([
      h('path', { d: 'M12 2v13' }),
      h('path', { d: 'm16 6-4-4-4 4' }),
      h('path', { d: 'M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8' }),
    ]),
}
