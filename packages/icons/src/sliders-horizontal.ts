import { h } from 'vue'
import { svg } from './svg'

export const VIconSlidersHorizontal = {
  name: 'VIconSlidersHorizontal',
  setup: () => () =>
    svg([
      h('path', { d: 'M10 5H3' }),
      h('path', { d: 'M12 19H3' }),
      h('path', { d: 'M14 3v4' }),
      h('path', { d: 'M16 17v4' }),
      h('path', { d: 'M21 12h-9' }),
      h('path', { d: 'M21 19h-5' }),
      h('path', { d: 'M21 5h-7' }),
      h('path', { d: 'M8 10v4' }),
      h('path', { d: 'M8 12H3' }),
    ]),
}
