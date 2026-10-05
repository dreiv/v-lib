import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { VButton } from '@v/design-system/button'
import { VLink } from '@v/design-system/link'
import { VPopover } from '@v/design-system/popover'

const meta = {
  title: 'Overlays/VPopover',
  component: VPopover,
  args: { label: 'Shipping details' },
  render: (args) => ({
    components: { VButton, VLink, VPopover },
    setup: () => ({ args }),
    template: `
      <VPopover v-bind="args">
        <template #trigger><VButton variant="secondary">Shipping</VButton></template>
        <p>Orders ship within two working days.</p>
        <VLink href="#shipping">Shipping policy</VLink>
      </VPopover>
    `,
  }),
} satisfies Meta<typeof VPopover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
