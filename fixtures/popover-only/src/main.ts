import { createApp, h } from 'vue'
import { VPopover } from '@v/design-system/popover'

createApp({
  render: () =>
    h(
      VPopover,
      { label: 'x' },
      {
        trigger: () => h('button', { type: 'button' }, 'x'),
        default: () => 'x',
      },
    ),
}).mount('#app')
