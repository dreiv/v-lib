import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, reactive, ref } from 'vue'
import { VTextArea } from '@v/design-system/text-area'

const meta = {
  title: 'Forms/VTextArea',
  component: VTextArea,
  args: { label: 'Notes', placeholder: 'Type your notes here…' },
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

export const Form: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { VTextArea },
    setup: () => {
      const values = reactive({
        summary: '',
        details: '',
      })

      const summaryTouched = reactive({ value: false })

      const summaryError = computed(() => {
        if (!summaryTouched.value || values.summary) return undefined
        return 'Give a short summary before submitting.'
      })

      return { values, summaryTouched, summaryError }
    },
    template: `
      <form style="display: grid; gap: 1rem; max-inline-size: 32rem;">
        <VTextArea
          v-model="values.summary"
          label="Summary"
          description="One or two sentences. The field grows as you type."
          placeholder="What happened?"
          required
          :error="summaryError"
          @blur="summaryTouched.value = true"
        />
        <VTextArea
          v-model="values.details"
          label="Additional details"
          description="Optional — steps to reproduce, screenshots, anything else useful."
          placeholder="Add any extra context…"
        />
        <VTextArea
          label="Internal notes (read-only example)"
          model-value="Triaged by support on Oct 9."
          disabled
        />
      </form>
    `,
  }),
}
