import { h } from 'vue'
import { svg } from './svg'

export const VIconSunMedium = {
  name: 'VIconSunMedium',
  setup: () => () =>
    svg([
      h('circle', { cx: 12, cy: 12, r: 4 }),
      h('path', { d: 'M12 3v1' }),
      h('path', { d: 'M12 20v1' }),
      h('path', { d: 'M3 12h1' }),
      h('path', { d: 'M20 12h1' }),
      h('path', { d: 'm18.364 5.636-.707.707' }),
      h('path', { d: 'm6.343 17.657-.707.707' }),
      h('path', { d: 'm5.636 5.636.707.707' }),
      h('path', { d: 'm17.657 17.657.707.707' }),
    ]),
}
