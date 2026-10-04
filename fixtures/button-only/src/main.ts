import { createApp, h } from 'vue'
import { VButton } from '@v/design-system/button'

createApp({ render: () => h(VButton, { label: 'x', options: [] }) }).mount('#app')
