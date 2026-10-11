import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { VLoadingRegion } from '@v/design-system/loading-region'

const meta = {
  title: 'Feedback/VLoadingRegion',
  component: VLoadingRegion,
  args: { label: 'Loading orders' },
} satisfies Meta<typeof VLoadingRegion>

export default meta
type Story = StoryObj<typeof meta>

const summaryTemplate = `
  <article style="max-width: 28rem; display: grid; gap: 0.75rem;">
    <h3 style="margin: 0;">Q3 summary</h3>
    <p style="margin: 0;">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Revenue grew
      12% quarter over quarter, driven mostly by renewals in the mid-market
      segment.
    </p>
    <p style="margin: 0;">
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Churn held steady at 4.1%, in line with the prior two quarters. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco.
    </p>
    <ul style="margin: 0; padding-left: 1.25rem;">
      <li>New accounts: 184</li>
      <li>Expansion revenue: $42,300</li>
      <li>Net retention: 108%</li>
    </ul>
  </article>
`

export const Default: Story = {
  render: () => ({
    components: { VLoadingRegion },
    template: `<VLoadingRegion label="Loading orders">${summaryTemplate}</VLoadingRegion>`,
  }),
}

export const Loading: Story = {
  args: { loading: true },
  render: (args) => ({
    components: { VLoadingRegion },
    setup: () => ({ args }),
    template: `<VLoadingRegion v-bind="args">${summaryTemplate}</VLoadingRegion>`,
  }),
}
