import { h } from 'vue'
import { svg } from './svg'

export const VIconLayers2 = {
  name: 'VIconLayers2',
  setup: () => () =>
    svg([
      h('path', {
        d: 'M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z',
      }),
      h('path', {
        d: 'm20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845',
      }),
    ]),
}
