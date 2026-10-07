import { h } from 'vue'
import { svg } from './svg'

export const VIconPowerOff = {
  name: 'VIconPowerOff',
  setup: () => () =>
    svg([
      h('path', { d: 'M18.36 6.64A9 9 0 0 1 20.77 15' }),
      h('path', { d: 'M6.16 6.16a9 9 0 1 0 12.68 12.68' }),
      h('path', { d: 'M12 2v4' }),
      h('path', { d: 'm2 2 20 20' }),
    ]),
}
