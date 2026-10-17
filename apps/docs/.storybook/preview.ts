import type { Preview } from '@storybook/vue3-vite'
import { themes } from 'storybook/theming'
import '@v/design-system/styles'

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: { theme: prefersDark ? themes.dark : themes.light },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Foundations',
          [
            'Color',
            'Typography',
            'Spacing and shape',
            'Elevation and layers',
            'Focus',
            'Motion and states',
            'Layout Utilities',
          ],
          'Actions',
          'Forms',
          'Feedback',
          'Overlays',
        ],
      },
    },
  },
}

export default preview
