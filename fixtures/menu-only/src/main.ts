import { createApp, h } from 'vue'
import { VMenu, VMenuItem } from '@v/design-system/menu'

createApp({
  render: () =>
    h(VMenu, null, {
      trigger: () => h('button', { type: 'button' }, 'x'),
      default: () => h(VMenuItem, null, () => 'x'),
    }),
}).mount('#app')
