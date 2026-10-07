import { h } from 'vue'
import { svg } from './svg'

export const VIconCheckCircle2 = {
  name: 'VIconCheckCircle2',
  setup: () => () =>
    svg([h('circle', { cx: 12, cy: 12, r: 10 }), h('path', { d: 'm16 9-5.5 5.5L8 12' })]),
}
