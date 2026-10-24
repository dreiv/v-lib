import { h } from 'vue'
import { svg } from './svg'

export const VIconDownloadCloud = {
  name: 'VIconDownloadCloud',
  setup: () => () =>
    svg([
      h('path', { d: 'M12 13v8l-4-4' }),
      h('path', { d: 'm12 21 4-4' }),
      h('path', { d: 'M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284' }),
    ]),
}
