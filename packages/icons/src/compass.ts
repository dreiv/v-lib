import { h } from 'vue'
import { svg } from './svg'

export const VIconCompass = {
  name: 'VIconCompass',
  setup: () => () =>
    svg([
      h('circle', { cx: 12, cy: 12, r: 10 }),
      h('path', {
        d: 'm16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z',
      }),
    ]),
}
