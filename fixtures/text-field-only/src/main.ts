import { createApp, h } from 'vue'
import { VTextField } from '@v/design-system/text-field'

createApp({ render: () => h(VTextField, { label: 'x' }) }).mount('#app')
