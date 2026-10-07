import { h } from 'vue'
import { svg } from './svg'

export const VIconGitBranch = {
  name: 'VIconGitBranch',
  setup: () => () =>
    svg([
      h('path', { d: 'M15 6a9 9 0 0 0-9 9V3' }),
      h('circle', { cx: 18, cy: 6, r: 3 }),
      h('circle', { cx: 6, cy: 18, r: 3 }),
    ]),
}
