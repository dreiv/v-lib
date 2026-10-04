import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { VIconButton } from '@v/design-system/icon-button'

const meta = {
  title: 'Actions/VIconButton',
  component: VIconButton,
  args: { size: 'medium' },
  render: (args) => ({
    components: { VIconButton },
    setup: () => ({ args }),
    template: `
      <VIconButton v-bind="args" aria-label="Close">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M4 4l12 12M16 4L4 16" />
        </svg>
      </VIconButton>
    `,
  }),
} satisfies Meta<typeof VIconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Small: Story = { args: { size: 'small' } }
export const Large: Story = { args: { size: 'large' } }
export const Disabled: Story = { args: { disabled: true } }
