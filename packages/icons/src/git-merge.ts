import { h } from 'vue'
import { svg } from './svg'

export const VIconGitMerge = {
  name: 'VIconGitMerge',
  setup: () => () =>
    svg([
      h('circle', { cx: 18, cy: 18, r: 3 }),
      h('circle', { cx: 6, cy: 6, r: 3 }),
      h('path', { d: 'M6 21V9a9 9 0 0 0 9 9' }),
    ]),
}
