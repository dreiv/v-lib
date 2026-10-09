import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { VButton } from '@v/design-system/button'
import { VTooltip } from '@v/design-system/tooltip'
import { VIconClose } from '@v/icons'

const meta = {
  title: 'Overlays/VTooltip',
  component: VTooltip,
  args: { text: 'Close dialog' },
  render: (args) => ({
    components: { VButton, VIconClose, VTooltip },
    setup: () => ({ args }),
    template: `
      <div style="padding: 4rem">
        <VTooltip v-bind="args">
          <VButton variant="quiet" icon-only aria-label="Close"><VIconClose /></VButton>
        </VTooltip>
      </div>
    `,
  }),
} satisfies Meta<typeof VTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const LongText: Story = {
  args: {
    text: 'Closes the dialog and discards every change you have made since you last saved the document',
  },
}
