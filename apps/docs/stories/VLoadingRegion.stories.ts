import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { VLoadingRegion } from '@v/design-system/loading-region'

const meta = {
  title: 'Feedback/VLoadingRegion',
  component: VLoadingRegion,
  args: { label: 'Loading orders' },
} satisfies Meta<typeof VLoadingRegion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { VLoadingRegion },
    template: `
      <VLoadingRegion label="Loading orders">
        <p>Order 1042</p>
        <p>Order 1043</p>
      </VLoadingRegion>
    `,
  }),
}

export const Loading: Story = {
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
