import { createApp, h } from 'vue'
import { VToastRegion } from '@v/design-system/toast'

createApp({
  render: () => h(VToastRegion, { label: 'x', announcementLabel: 'x', closeLabel: 'x' }),
}).mount('#app')
