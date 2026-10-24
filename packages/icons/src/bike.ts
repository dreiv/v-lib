import { h } from 'vue'
import { svg } from './svg'

export const VIconBike = {
  name: 'VIconBike',
  setup: () => () =>
    svg([
      h('circle', { cx: 18.5, cy: 17.5, r: 3.5 }),
      h('circle', { cx: 5.5, cy: 17.5, r: 3.5 }),
      h('circle', { cx: 15, cy: 5, r: 1 }),
      h('path', { d: 'M12 17.5V14l-3-3 4-3 2 3h2' }),
    ]),
}
