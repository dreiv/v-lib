import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { VAlert } from '@v/design-system/alert'

const meta = {
  title: 'Feedback/VAlert',
  component: VAlert,
  args: { title: 'Your plan renews on 1 March', tone: 'info' },
  argTypes: { tone: { control: 'select', options: ['info', 'success', 'warning', 'danger'] } },
  render: (args) => ({
    components: { VAlert },
    setup: () => ({ args }),
    template: `<VAlert v-bind="args">Update your payment method before then.</VAlert>`,
  }),
} satisfies Meta<typeof VAlert>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {}
export const Success: Story = { args: { tone: 'success', title: 'Changes saved' } }
export const Warning: Story = { args: { tone: 'warning', title: 'Storage is almost full' } }
export const Danger: Story = { args: { tone: 'danger', title: 'Payment failed' } }
export const Live: Story = { args: { tone: 'danger', title: 'Connection lost', live: 'assertive' } }
