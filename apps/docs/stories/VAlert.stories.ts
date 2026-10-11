import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { VAlert } from '@v/design-system/alert'

const meta = {
  title: 'Feedback/VAlert',
  component: VAlert,
  args: { title: 'Your plan renews on 1 March', tone: 'info', dismissible: false, showIcon: false },
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
export const WithIcon: Story = { args: { showIcon: true } }
export const Dismissible: Story = {
  args: { tone: 'warning', title: 'Storage is almost full', dismissible: true },
}

export const Matrix: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { VAlert },
    setup: () => ({
      rows: [
        { tone: 'info', title: 'In review', body: 'A reviewer will follow up shortly.' },
        { tone: 'success', title: 'Changes saved', body: 'Your draft is up to date.' },
        {
          tone: 'warning',
          title: 'Storage is almost full',
          body: 'Free up space before it runs out.',
        },
        { tone: 'danger', title: 'Payment failed', body: 'Update your payment method to retry.' },
      ] as const,
      headers: ['No icon', 'With icon'],
      headerStyle: 'font: 600 0.75rem/1 sans-serif; text-transform: uppercase; opacity: 0.6',
    }),
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, minmax(16rem, 1fr)); gap: 0.75rem 1.5rem">
        <span v-for="header in headers" :key="header" :style="headerStyle">{{ header }}</span>

        <template v-for="row in rows" :key="row.tone">
          <VAlert :tone="row.tone" :title="row.title">{{ row.body }}</VAlert>
          <VAlert :tone="row.tone" :title="row.title" show-icon>{{ row.body }}</VAlert>
        </template>
      </div>
    `,
  }),
}
