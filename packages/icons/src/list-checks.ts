import { h } from 'vue'
import { svg } from './svg'

export const VIconListChecks = {
  name: 'VIconListChecks',
  setup: () => () =>
    svg([
      h('path', { d: 'M13 5h8' }),
      h('path', { d: 'M13 12h8' }),
      h('path', { d: 'M13 19h8' }),
      h('path', { d: 'm3 17 2 2 4-4' }),
      h('path', { d: 'm3 7 2 2 4-4' }),
    ]),
}
