import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { VAutocomplete } from '@v/design-system/autocomplete'

const meta = {
  title: 'Forms/VAutocomplete',
  component: VAutocomplete,
  args: {
    label: 'City',
    suggestions: ['Timișoara', 'Târgu Mureș', 'Brașov', 'Cluj-Napoca', 'Constanța'],
  },
  render: (args) => ({
    components: { VAutocomplete },
    setup: () => ({ args, model: ref('') }),
    template: '<VAutocomplete v-bind="args" v-model="model" />',
  }),
} satisfies Meta<typeof VAutocomplete>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithDescription: Story = { args: { description: 'You can also type another city.' } }
export const Required: Story = { args: { required: true } }
export const WithError: Story = { args: { error: 'Enter a city.' } }
export const Disabled: Story = { args: { disabled: true } }
