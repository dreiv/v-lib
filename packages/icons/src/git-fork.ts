import { h } from 'vue'
import { svg } from './svg'

export const VIconGitFork = {
  name: 'VIconGitFork',
  setup: () => () =>
    svg([
      h('circle', { cx: 12, cy: 18, r: 3 }),
      h('circle', { cx: 6, cy: 6, r: 3 }),
      h('circle', { cx: 18, cy: 6, r: 3 }),
      h('path', { d: 'M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9' }),
      h('path', { d: 'M12 12v3' }),
    ]),
}
