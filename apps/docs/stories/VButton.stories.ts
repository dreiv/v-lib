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

export const Matrix: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { VButton },
    setup: () => ({
      variants: ['primary', 'secondary', 'danger', 'quiet'] as const,
      sizes: ['small', 'medium', 'large'] as const,
    }),
    template: `
      <div style="display: grid; gap: 1rem; justify-items: start">
        <div
          v-for="variant in variants"
          :key="variant"
          style="display: flex; flex-wrap: wrap; align-items: center; gap: 1rem"
        >
          <VButton v-for="size in sizes" :key="size" :variant="variant" :size="size">
            {{ variant }}
          </VButton>
          <VButton :variant="variant" disabled>Disabled</VButton>
          <VButton :variant="variant" pending>Pending</VButton>
        </div>
      </div>
    `,
  }),
}
