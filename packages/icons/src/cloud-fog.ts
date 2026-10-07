import { h } from 'vue'
import { svg } from './svg'

export const VIconCloudFog = {
  name: 'VIconCloudFog',
  setup: () => () =>
    svg([
      h('path', { d: 'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' }),
      h('path', { d: 'M16 17H7' }),
      h('path', { d: 'M17 21H9' }),
    ]),
}
