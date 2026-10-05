import { createApp, h } from 'vue'
import { VAutocomplete } from '@v/design-system/autocomplete'

createApp({ render: () => h(VAutocomplete, { label: 'x', suggestions: [] }) }).mount('#app')
