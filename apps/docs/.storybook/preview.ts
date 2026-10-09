import type { Preview } from '@storybook/vue3-vite'
import '@v/design-system/styles'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default preview
