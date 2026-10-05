import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { VContainer } from '@v/design-system/container'
import { VInline } from '@v/design-system/inline'
import { VStack } from '@v/design-system/stack'

const meta = {
  title: 'Layout/VStack',
  component: VStack,
  args: { gap: 4 },
  argTypes: { gap: { control: 'select', options: [1, 2, 3, 4, 6, 8, 10, 16] } },
  render: (args) => ({
    components: { VStack },
    setup: () => ({ args }),
    template: `<VStack v-bind="args"><p>One</p><p>Two</p><p>Three</p></VStack>`,
  }),
} satisfies Meta<typeof VStack>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Inline: Story = {
  render: () => ({
    components: { VInline },
    template: `<VInline :gap="3"><span>One</span><span>Two</span><span>Three</span></VInline>`,
  }),
}

export const Container: Story = {
  render: () => ({
    components: { VContainer },
    template: `<VContainer as="main"><p>Content is centered and capped at the container width.</p></VContainer>`,
  }),
}
