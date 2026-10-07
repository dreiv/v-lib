import { h } from 'vue'
import { svg } from './svg'

export const VIconCloudDrizzle = {
  name: 'VIconCloudDrizzle',
  setup: () => () =>
    svg([
      h('path', { d: 'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' }),
      h('path', { d: 'M8 19v1' }),
      h('path', { d: 'M8 14v1' }),
      h('path', { d: 'M16 19v1' }),
      h('path', { d: 'M16 14v1' }),
      h('path', { d: 'M12 21v1' }),
      h('path', { d: 'M12 16v1' }),
    ]),
}
