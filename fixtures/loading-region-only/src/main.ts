import { createApp, h } from 'vue'
import { VLoadingRegion } from '@v/design-system/loading-region'

createApp({
  render: () => h(VLoadingRegion, { label: 'x', loading: true }, () => 'x'),
}).mount('#app')
