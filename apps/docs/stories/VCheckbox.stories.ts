import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { VCheckbox } from '@v/design-system/checkbox'

const meta = {
  title: 'Forms/VCheckbox',
  component: VCheckbox,
  args: { label: 'Send me product updates' },
  render: (args) => ({
    components: { VCheckbox },
    setup: () => ({ args, model: ref(false) }),
    template: '<VCheckbox v-bind="args" v-model="model" />',
  }),
} satisfies Meta<typeof VCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithDescription: Story = { args: { description: 'About one email a month.' } }
export const Required: Story = { args: { label: 'I accept the terms', required: true } }
export const WithError: Story = {
  args: { label: 'I accept the terms', error: 'Accept the terms to continue.' },
}
export const Disabled: Story = { args: { disabled: true } }
