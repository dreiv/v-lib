import { h } from 'vue'
import { svg } from './svg'

export const VIconSettings2 = {
  name: 'VIconSettings2',
  setup: () => () =>
    svg([
      h('path', { d: 'M14 17H5' }),
      h('path', { d: 'M19 7h-9' }),
      h('circle', { cx: 17, cy: 17, r: 3 }),
      h('circle', { cx: 7, cy: 7, r: 3 }),
    ]),
}
