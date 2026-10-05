import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { VLoadingRegion } from '@v/design-system/loading-region'
import { VSpinner } from '@v/design-system/spinner'

const meta = {
  title: 'Feedback/VSpinner',
  component: VSpinner,
  args: { label: 'Loading' },
} satisfies Meta<typeof VSpinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Region: Story = {
  render: () => ({
    components: { VLoadingRegion },
    template: `
      <VLoadingRegion label="Loading orders" loading>
        <p>Order 1042</p>
        <p>Order 1043</p>
      </VLoadingRegion>
    `,
  }),
}
