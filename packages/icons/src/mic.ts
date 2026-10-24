import { h } from 'vue'
import { svg } from './svg'

export const VIconMic = {
  name: 'VIconMic',
  setup: () => () =>
    svg([
      h('path', { d: 'M12 19v3' }),
      h('path', { d: 'M19 10v2a7 7 0 0 1-14 0v-2' }),
      h('rect', { x: 9, y: 2, width: 6, height: 13, rx: 3 }),
    ]),
}
