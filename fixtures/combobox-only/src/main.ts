import { createApp, h } from 'vue'
import { VCombobox } from '@v/design-system/combobox'

createApp({
  render: () => h(VCombobox, { label: 'x', options: [], triggerLabel: 'x', emptyText: 'x' }),
}).mount('#app')
