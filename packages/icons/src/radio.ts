import { h } from 'vue'
import { svg } from './svg'

export const VIconRadio = {
  name: 'VIconRadio',
  setup: () => () =>
    svg([
      h('path', { d: 'M16.247 7.761a6 6 0 0 1 0 8.478' }),
      h('path', { d: 'M19.075 4.933a10 10 0 0 1 0 14.134' }),
      h('path', { d: 'M4.925 19.067a10 10 0 0 1 0-14.134' }),
      h('path', { d: 'M7.753 16.239a6 6 0 0 1 0-8.478' }),
      h('circle', { cx: 12, cy: 12, r: 2 }),
    ]),
}
