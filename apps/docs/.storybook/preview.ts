import type { Preview } from '@storybook/vue3-vite'
import { themes } from 'storybook/theming'
import '@v/design-system/styles'

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { theme: prefersDark ? themes.dark : themes.light },
  },
}

export default preview
