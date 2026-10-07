import { h } from 'vue'
import { svg } from './svg'

export const VIconSliders = {
  name: 'VIconSliders',
  setup: () => () =>
    svg([
      h('path', { d: 'M10 8h4' }),
      h('path', { d: 'M12 21v-9' }),
      h('path', { d: 'M12 8V3' }),
      h('path', { d: 'M17 16h4' }),
      h('path', { d: 'M19 12V3' }),
      h('path', { d: 'M19 21v-5' }),
      h('path', { d: 'M3 14h4' }),
      h('path', { d: 'M5 10V3' }),
      h('path', { d: 'M5 21v-7' }),
    ]),
}
