import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { VErrorSummary } from '@v/design-system/error-summary'
import { VTextField } from '@v/design-system/text-field'

const meta = {
  title: 'Forms/VErrorSummary',
  component: VErrorSummary,
  args: {
    heading: 'There is a problem',
    errors: [{ id: 'email', message: 'Enter an email address like name@example.com.' }],
  },
  render: (args) => ({
    components: { VErrorSummary, VTextField },
    setup: () => ({ args, email: ref('') }),
    template: `
      <div>
        <VErrorSummary v-bind="args" />
        <VTextField
          id="email"
          v-model="email"
          label="Email"
          type="email"
          autocomplete="email"
          error="Enter an email address like name@example.com."
        />
      </div>
    `,
  }),
} satisfies Meta<typeof VErrorSummary>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Multiple: Story = {
  args: {
    errors: [
      { id: 'email', message: 'Enter an email address like name@example.com.' },
      { id: 'plan', message: 'Choose a plan.' },
    ],
  },
}
