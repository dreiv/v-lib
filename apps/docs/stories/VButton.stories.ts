import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { VButton } from '@v/design-system/button'
import { VIconPlus } from '@v/icons'

const meta = {
  title: 'Actions/VButton',
  component: VButton,
  args: { variant: 'primary', size: 'medium' },
  render: (args) => ({
    components: { VButton },
    setup: () => ({ args }),
    template: '<VButton v-bind="args">Save</VButton>',
  }),
} satisfies Meta<typeof VButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Danger: Story = { args: { variant: 'danger' } }
export const Quiet: Story = { args: { variant: 'quiet' } }
export const Pending: Story = { args: { pending: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Small: Story = { args: { size: 'small' } }
export const Large: Story = { args: { size: 'large' } }
export const FullWidth: Story = { args: { full: true } }
export const IconOnly: Story = {
  args: { iconOnly: true },
  render: (args) => ({
    components: { VButton, VIconPlus },
    setup: () => ({ args }),
    template: '<VButton v-bind="args" aria-label="Add"><VIconPlus /></VButton>',
  }),
}
