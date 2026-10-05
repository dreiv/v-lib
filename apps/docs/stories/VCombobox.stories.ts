import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { VCombobox } from '@v/design-system/combobox'

const meta = {
  title: 'Forms/VCombobox',
  component: VCombobox,
  args: {
    label: 'Country',
    triggerLabel: 'Show options',
    emptyText: 'No results',
    options: [
      { value: 'ro', label: 'Romania' },
      { value: 'de', label: 'Germany' },
      { value: 'fr', label: 'France' },
    ],
  },
  render: (args) => ({
    components: { VCombobox },
    setup: () => ({ args, model: ref<string | null>(null) }),
    template: '<VCombobox v-bind="args" v-model="model" />',
  }),
} satisfies Meta<typeof VCombobox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithDescription: Story = { args: { description: 'Where your order ships to.' } }
export const Required: Story = { args: { required: true } }
export const WithError: Story = { args: { error: 'Select a country.' } }
export const Disabled: Story = { args: { disabled: true } }
