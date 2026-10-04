import { createApp, h } from 'vue'
import { VButton } from '@v/design-system/button'

createApp({ render: () => h(VButton, null, () => 'x') }).mount('#app')
