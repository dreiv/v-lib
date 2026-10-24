import { h } from 'vue'
import { svg } from './svg'

export const VIconTrain = {
  name: 'VIconTrain',
  setup: () => () =>
    svg([
      h('rect', { width: 16, height: 16, x: 4, y: 3, rx: 2 }),
      h('path', { d: 'M4 11h16' }),
      h('path', { d: 'M12 3v8' }),
      h('path', { d: 'm8 19-2 3' }),
      h('path', { d: 'm18 22-2-3' }),
      h('path', { d: 'M8 15h.01' }),
      h('path', { d: 'M16 15h.01' }),
    ]),
}
