import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { VTextField } from '@v/design-system/text-field'

const meta = {
  title: 'Forms/VTextField',
  component: VTextField,
  args: { label: 'Email', type: 'email', autocomplete: 'email' },
  render: (args) => ({
    components: { VTextField },
    setup: () => ({ args, model: ref('') }),
    template: '<VTextField v-bind="args" v-model="model" />',
  }),
} satisfies Meta<typeof VTextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithDescription: Story = { args: { description: 'We only use it to send receipts.' } }
export const Required: Story = { args: { required: true } }
export const WithError: Story = { args: { error: 'Enter an email address like name@example.com.' } }
export const Disabled: Story = { args: { disabled: true } }
