import { h } from 'vue'
import { svg } from './svg'

export const VIconBriefcase = {
  name: 'VIconBriefcase',
  setup: () => () =>
    svg([
      h('path', { d: 'M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' }),
      h('rect', { width: 20, height: 14, x: 2, y: 6, rx: 2 }),
    ]),
}
