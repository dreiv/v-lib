import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { VBadge } from '@v/design-system/badge'
import { VIconAlertTriangle, VIconCircleCheck, VIconCircleX, VIconInfo } from '@v/icons'

const meta = {
  title: 'Feedback/VBadge',
  component: VBadge,
  args: { tone: 'neutral' },
  argTypes: {
    tone: { control: 'select', options: ['neutral', 'info', 'success', 'warning', 'danger'] },
  },
  render: (args) => ({
    components: { VBadge },
    setup: () => ({ args }),
    template: `<VBadge v-bind="args">Draft</VBadge>`,
  }),
} satisfies Meta<typeof VBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Success: Story = { args: { tone: 'success' } }
export const Danger: Story = { args: { tone: 'danger' } }

export const WithIcon: Story = {
  args: { tone: 'success' },
  render: (args) => ({
    components: { VBadge, VIconCircleCheck },
    setup: () => ({ args }),
    template: `<VBadge v-bind="args"><VIconCircleCheck />Paid</VBadge>`,
  }),
}

export const Matrix: Story = {
  tags: ['!dev'],
  render: () => ({
    components: {
      VBadge,
      VIconInfo,
      VIconCircleCheck,
      VIconAlertTriangle,
      VIconCircleX,
    },
    setup: () => ({
      rows: [
        { tone: 'neutral', label: 'Draft', icon: null },
        { tone: 'info', label: 'In review', icon: 'VIconInfo' },
        { tone: 'success', label: 'Paid', icon: 'VIconCircleCheck' },
        { tone: 'warning', label: 'Due soon', icon: 'VIconAlertTriangle' },
        { tone: 'danger', label: 'Overdue', icon: 'VIconCircleX' },
      ] as const,
      headers: ['Text only', 'With icon'],
      headerStyle: 'font: 600 0.75rem/1 sans-serif; text-transform: uppercase; opacity: 0.6',
      labelStyle: 'font: 600 0.875rem/1 sans-serif; text-transform: capitalize',
    }),
    template: `
      <div
        style="
          display: grid;
          grid-template-columns: auto repeat(2, max-content);
          align-items: center;
          justify-items: center;
          gap: 0.75rem 1.5rem;
        "
      >
        <span />
        <span v-for="header in headers" :key="header" :style="headerStyle">{{ header }}</span>

        <template v-for="row in rows" :key="row.tone">
          <span :style="labelStyle + '; justify-self: start'">{{ row.tone }}</span>
          <VBadge :tone="row.tone">{{ row.label }}</VBadge>
          <VBadge :tone="row.tone">
            <component :is="row.icon" v-if="row.icon" />
            {{ row.label }}
          </VBadge>
        </template>
      </div>
    `,
  }),
}
