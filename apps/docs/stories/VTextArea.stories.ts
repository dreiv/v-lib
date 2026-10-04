import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { VTextArea } from '@v/design-system/text-area'

const meta = {
  title: 'Forms/VTextArea',
  component: VTextArea,
  args: { label: 'Notes' },
  render: (args) => ({
    components: { VTextArea },
    setup: () => ({ args, model: ref('') }),
    template: '<VTextArea v-bind="args" v-model="model" />',
  }),
} satisfies Meta<typeof VTextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithDescription: Story = { args: { description: 'Visible to the whole team.' } }
export const Required: Story = { args: { required: true } }
export const WithError: Story = { args: { error: 'Notes cannot be empty.' } }
export const Disabled: Story = { args: { disabled: true } }
