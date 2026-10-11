import { createApp, h } from 'vue'
import { VNumberField } from '@v/design-system/number-field'

createApp({ render: () => h(VNumberField, { label: 'x' }) }).mount('#app')
