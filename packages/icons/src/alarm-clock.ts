import { h } from 'vue'
import { svg } from './svg'

export const VIconAlarmClock = {
  name: 'VIconAlarmClock',
  setup: () => () =>
    svg([
      h('circle', { cx: 12, cy: 13, r: 8 }),
      h('path', { d: 'M12 9v4l2 2' }),
      h('path', { d: 'M5 3 2 6' }),
      h('path', { d: 'm22 6-3-3' }),
      h('path', { d: 'M6.38 18.7 4 21' }),
      h('path', { d: 'M17.64 18.67 20 21' }),
    ]),
}
