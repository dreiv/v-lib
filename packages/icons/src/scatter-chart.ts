import { h } from 'vue'
import { svg } from './svg'

export const VIconScatterChart = {
  name: 'VIconScatterChart',
  setup: () => () =>
    svg([
      h('circle', { cx: 7.5, cy: 7.5, r: '.5', fill: 'currentColor' }),
      h('circle', { cx: 18.5, cy: 5.5, r: '.5', fill: 'currentColor' }),
      h('circle', { cx: 11.5, cy: 11.5, r: '.5', fill: 'currentColor' }),
      h('circle', { cx: 7.5, cy: 16.5, r: '.5', fill: 'currentColor' }),
      h('circle', { cx: 17.5, cy: 14.5, r: '.5', fill: 'currentColor' }),
      h('path', { d: 'M3 3v16a2 2 0 0 0 2 2h16' }),
    ]),
}
