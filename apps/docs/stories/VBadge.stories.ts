import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { VBadge } from '@v/design-system/badge'
import { VTag } from '@v/design-system/tag'

const meta = {
  title: 'Feedback/VBadge',
  component: VBadge,
  args: { tone: 'neutral' },
  argTypes: {
    tone: { control: 'select', options: ['neutral', 'info', 'success', 'warning', 'danger'] },
  },
  render: (args) => ({
    components: { VBadge },
    setup: () => ({ args }),
    template: `<VBadge v-bind="args">Draft</VBadge>`,
  }),
} satisfies Meta<typeof VBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Success: Story = { args: { tone: 'success' } }
export const Danger: Story = { args: { tone: 'danger' } }

export const Tag: Story = {
  render: () => ({
    components: { VTag },
    template: `<VTag>Accessibility</VTag>`,
  }),
}
