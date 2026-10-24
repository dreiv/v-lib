import { h } from 'vue'
import { svg } from './svg'

export const VIconQrCode = {
  name: 'VIconQrCode',
  setup: () => () =>
    svg([
      h('rect', { width: 5, height: 5, x: 3, y: 3, rx: 1 }),
      h('rect', { width: 5, height: 5, x: 16, y: 3, rx: 1 }),
      h('rect', { width: 5, height: 5, x: 3, y: 16, rx: 1 }),
      h('path', { d: 'M21 16h-3a2 2 0 0 0-2 2v3' }),
      h('path', { d: 'M21 21v.01' }),
      h('path', { d: 'M12 7v3a2 2 0 0 1-2 2H7' }),
      h('path', { d: 'M3 12h.01' }),
      h('path', { d: 'M12 3h.01' }),
      h('path', { d: 'M12 16v.01' }),
      h('path', { d: 'M16 12h1' }),
      h('path', { d: 'M21 12v.01' }),
      h('path', { d: 'M12 21v-1' }),
    ]),
}
