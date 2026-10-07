import { h } from 'vue'
import { svg } from './svg'

export const VIconStopCircle = {
  name: 'VIconStopCircle',
  setup: () => () =>
    svg([
      h('circle', { cx: 12, cy: 12, r: 10 }),
      h('rect', { x: 9, y: 9, width: 6, height: 6, rx: 1 }),
    ]),
}
