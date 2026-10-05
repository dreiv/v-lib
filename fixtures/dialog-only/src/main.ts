import { createApp, h } from 'vue'
import { VDialog } from '@v/design-system/dialog'

createApp({
  render: () => h(VDialog, { title: 'x', closeLabel: 'x' }, () => 'x'),
}).mount('#app')
