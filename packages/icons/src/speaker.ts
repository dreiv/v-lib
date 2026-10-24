import { h } from 'vue'
import { svg } from './svg'

export const VIconSpeaker = {
  name: 'VIconSpeaker',
  setup: () => () =>
    svg([
      h('rect', { width: 16, height: 20, x: 4, y: 2, rx: 2 }),
      h('path', { d: 'M12 6h.01' }),
      h('circle', { cx: 12, cy: 14, r: 4 }),
      h('path', { d: 'M12 14h.01' }),
    ]),
}
