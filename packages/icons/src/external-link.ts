import { h } from 'vue'
import { svg } from './svg'

export const VIconExternalLink = {
  name: 'VIconExternalLink',
  setup: () => () =>
    svg([
      h('path', { d: 'M15 3h6v6' }),
      h('path', { d: 'M10 14 21 3' }),
      h('path', { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' }),
    ]),
}
