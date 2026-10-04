import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { VSelect } from '@v/design-system/select'

const meta = {
  title: 'Forms/VSelect',
  component: VSelect,
  args: {
    label: 'Country',
    placeholder: 'Choose a country',
    options: [
      { value: 'ro', label: 'Romania' },
      { value: 'de', label: 'Germany' },
      { value: 'fr', label: 'France' },
    ],
  },
  render: (args) => ({
    components: { VSelect },
    setup: () => ({ args, model: ref<string | null>(null) }),
    template: '<VSelect v-bind="args" v-model="model" />',
  }),
} satisfies Meta<typeof VSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithDescription: Story = { args: { description: 'Where your order ships to.' } }
export const Required: Story = { args: { required: true } }
export const WithError: Story = { args: { error: 'Select a country.' } }
export const Disabled: Story = { args: { disabled: true } }
