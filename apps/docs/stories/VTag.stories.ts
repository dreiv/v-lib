import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { VTag } from '@v/design-system/tag'

const meta = {
  title: 'Feedback/VTag',
  component: VTag,
  render: () => ({
    components: { VTag },
    template: `<VTag>Accessibility</VTag>`,
  }),
} satisfies Meta<typeof VTag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
