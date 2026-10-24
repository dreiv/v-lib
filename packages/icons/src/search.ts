import { h } from 'vue'
import { svg } from './svg'

export const VIconSearch = {
  name: 'VIconSearch',
  setup: () => () =>
    svg([h('path', { d: 'm21 21-4.34-4.34' }), h('circle', { cx: 11, cy: 11, r: 8 })]),
}
