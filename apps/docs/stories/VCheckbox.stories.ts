import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
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
export const Indeterminate: Story = { args: { label: 'Select all', indeterminate: true } }

export const Group: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { VCheckbox },
    setup: () => {
      const items = ref([
        { id: 'readme', label: 'Update README', checked: true },
        { id: 'tests', label: 'Add unit tests', checked: true },
        { id: 'types', label: 'Fix type errors', checked: false },
        {
          id: 'docs',
          label: 'Write documentation',
          checked: false,
          description: 'Keep the API reference in sync with the new props.',
        },
        {
          id: 'release',
          label: 'Sign off on the release',
          checked: false,
          required: true,
        },
      ])

      const checkedCount = computed(() => items.value.filter((item) => item.checked).length)
      const allChecked = computed(() => checkedCount.value === items.value.length)
      const noneChecked = computed(() => checkedCount.value === 0)
      const indeterminate = computed(() => !allChecked.value && !noneChecked.value)

      function toggleAll(value: boolean) {
        items.value.forEach((item) => (item.checked = value))
      }

      return { items, allChecked, indeterminate, toggleAll }
    },
    template: `
      <fieldset style="border: none; padding: 0; margin: 0; display: grid; gap: 0.75rem;">
        <legend style="font: 600 0.875rem/1 sans-serif; margin-bottom: 0.25rem;">
          Release checklist
        </legend>
        <VCheckbox
          label="Select all"
          :model-value="allChecked"
          :indeterminate="indeterminate"
          @update:model-value="toggleAll"
        />
        <div style="display: grid; gap: 0.5rem; margin-inline-start: 1.75rem;">
          <VCheckbox
            v-for="item in items"
            :key="item.id"
            v-model="item.checked"
            :label="item.label"
            :description="item.description"
            :required="item.required"
          />
        </div>
      </fieldset>
    `,
  }),
}
