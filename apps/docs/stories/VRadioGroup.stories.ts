import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { VRadioGroup } from '@v/design-system/radio-group'

const meta = {
  title: 'Forms/VRadioGroup',
  component: VRadioGroup,
  args: {
    label: 'Plan',
    options: [
      { value: 'free', label: 'Free' },
      { value: 'team', label: 'Team' },
      { value: 'enterprise', label: 'Enterprise' },
    ],
  },
  render: (args) => ({
    components: { VRadioGroup },
    setup: () => ({ args, model: ref<string | null>(null) }),
    template: '<VRadioGroup v-bind="args" v-model="model" />',
  }),
} satisfies Meta<typeof VRadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithDescription: Story = { args: { description: 'You can change it later.' } }
export const Required: Story = { args: { required: true } }
export const WithError: Story = { args: { error: 'Choose a plan.' } }
export const Disabled: Story = { args: { disabled: true } }
