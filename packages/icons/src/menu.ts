import { h } from 'vue'
import { svg } from './svg'

export const VIconMenu = {
  name: 'VIconMenu',
  setup: () => () =>
    svg([h('path', { d: 'M4 5h16' }), h('path', { d: 'M4 12h16' }), h('path', { d: 'M4 19h16' })]),
}
