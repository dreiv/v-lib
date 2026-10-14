import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { VButton } from '@v/design-system/button'
import { VIconPlus } from '@v/icons'
import { ref } from 'vue'

const meta = {
  title: 'Actions/VButton',
  component: VButton,
  args: { variant: 'primary', size: 'medium' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'quiet'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
  },
  render: (args) => ({
    components: { VButton },
    setup: () => ({ args }),
    template: '<VButton v-bind="args">Save</VButton>',
  }),
} satisfies Meta<typeof VButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Danger: Story = { args: { variant: 'danger' } }
export const Quiet: Story = { args: { variant: 'quiet' } }
export const Pending: Story = { args: { pending: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Small: Story = { args: { size: 'small' } }
export const Large: Story = { args: { size: 'large' } }
export const FullWidth: Story = { args: { full: true } }

export const WithIcon: Story = {
  render: (args) => ({
    components: { VButton, VIconPlus },
    setup: () => ({ args }),
    template: '<VButton v-bind="args"><VIconPlus />Add item</VButton>',
  }),
}

export const IconOnly: Story = {
  args: { iconOnly: true },
  render: (args) => ({
    components: { VButton, VIconPlus },
    setup: () => ({ args }),
    template: '<VButton v-bind="args" aria-label="Add"><VIconPlus /></VButton>',
  }),
}

export const SaveChanges: Story = {
  render: () => ({
    components: { VButton },
    setup() {
      const pending = ref(false)
      const clicks = ref(0)
      const status = ref('')

      function save() {
        clicks.value++
        pending.value = true
        status.value = 'Saving…'

        setTimeout(() => {
          pending.value = false
          status.value = 'Saved'
        }, 3000)
      }

      return { pending, clicks, status, save }
    },
    template: `
      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 1rem">
        <VButton variant="primary" :pending="pending" @click="save">Save changes</VButton>
        <output>clicks received: {{ clicks }}</output>
        <span role="status" aria-live="polite">{{ status }}</span>
      </div>
    `,
  }),
}

export const Multiline: Story = {
  render: () => ({
    components: { VButton },
    template: `
      <div style="display: grid; justify-items: start; gap: 0.75rem; max-inline-size: 18rem">
        <VButton>A very long label that has to wrap onto several lines without clipping</VButton>
        <VButton variant="primary">Download the full quarterly report with attachments</VButton>
        <VButton variant="danger">Delete this project and everything inside it</VButton>
      </div>
    `,
  }),
}

export const Matrix: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { VButton, VIconPlus },
    setup: () => ({
      variants: ['primary', 'secondary', 'danger', 'quiet'] as const,
      sizes: ['small', 'medium', 'large'] as const,
      headers: ['Small', 'Medium', 'Large', 'Icon only', 'Disabled', 'Pending'],
      headerStyle: 'font: 600 0.75rem/1 sans-serif; text-transform: uppercase; opacity: 0.6',
      labelStyle: 'font: 600 0.875rem/1 sans-serif; text-transform: capitalize',
    }),
    template: `
      <div
        style="
          display: grid;
          grid-template-columns: auto repeat(6, max-content);
          align-items: center;
          gap: 0.75rem 1.5rem;
        "
      >
        <span />
        <span v-for="header in headers" :key="header" :style="headerStyle">{{ header }}</span>

        <template v-for="variant in variants" :key="variant">
          <span :style="labelStyle">{{ variant }}</span>
          <VButton v-for="size in sizes" :key="size" :variant="variant" :size="size">
            {{ variant }}
          </VButton>
          <VButton :variant="variant" icon-only aria-label="Add">
            <VIconPlus />
          </VButton>
          <VButton :variant="variant" disabled>Disabled</VButton>
          <VButton :variant="variant" pending>Pending</VButton>
        </template>
      </div>
    `,
  }),
}
