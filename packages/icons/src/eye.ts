import { h } from 'vue'
import { svg } from './svg'

export const VIconEye = {
  name: 'VIconEye',
  setup: () => () =>
    svg([
      h('path', {
        d: 'M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0',
      }),
      h('circle', { cx: 12, cy: 12, r: 3 }),
    ]),
}
