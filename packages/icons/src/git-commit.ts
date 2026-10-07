import { h } from 'vue'
import { svg } from './svg'

export const VIconGitCommit = {
  name: 'VIconGitCommit',
  setup: () => () =>
    svg([
      h('circle', { cx: 12, cy: 12, r: 3 }),
      h('line', { x1: 3, x2: 9, y1: 12, y2: 12 }),
      h('line', { x1: 15, x2: 21, y1: 12, y2: 12 }),
    ]),
}
