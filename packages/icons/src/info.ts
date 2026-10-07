import { h } from 'vue'
import { svg } from './svg'

export const VIconInfo = {
  name: 'VIconInfo',
  setup: () => () =>
    svg([
      h('circle', { cx: 12, cy: 12, r: 10 }),
      h('path', { d: 'M12 16v-4' }),
      h('path', { d: 'M12 8h.01' }),
    ]),
}
