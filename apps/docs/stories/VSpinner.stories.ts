import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { VSpinner } from '@v/design-system/spinner'

const meta = {
  title: 'Feedback/VSpinner',
  component: VSpinner,
  args: { label: 'Loading' },
} satisfies Meta<typeof VSpinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
