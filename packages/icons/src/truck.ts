import { h } from 'vue'
import { svg } from './svg'

export const VIconTruck = {
  name: 'VIconTruck',
  setup: () => () =>
    svg([
      h('path', { d: 'M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2' }),
      h('path', { d: 'M15 18H9' }),
      h('path', {
        d: 'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14',
      }),
      h('circle', { cx: 17, cy: 18, r: 2 }),
      h('circle', { cx: 7, cy: 18, r: 2 }),
    ]),
}
