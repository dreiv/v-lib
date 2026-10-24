import { h } from 'vue'
import { svg } from './svg'

export const VIconAlertTriangle = {
  name: 'VIconAlertTriangle',
  setup: () => () =>
    svg([
      h('path', { d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3' }),
      h('path', { d: 'M12 9v4' }),
      h('path', { d: 'M12 17h.01' }),
    ]),
}
