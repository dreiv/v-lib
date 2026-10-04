import { createApp, h } from 'vue'
import { VTooltip } from '@v/design-system/tooltip'

createApp({
  render: () => h(VTooltip, { text: 'x' }, () => h('button', { type: 'button' }, 'x')),
}).mount('#app')
