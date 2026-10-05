import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { VButton } from '@v/design-system/button'
import { VToastRegion, useToast } from '@v/design-system/toast'

const meta = {
  title: 'Feedback/VToast',
  component: VToastRegion,
  args: {
    label: 'Notifications ({hotkey})',
    announcementLabel: 'Notification',
    closeLabel: 'Close',
  },
  render: (args) => ({
    components: { VButton, VToastRegion },
    setup: () => ({ args, toast: useToast() }),
    template: `
      <div>
        <VButton @click="toast.show({ title: 'Project saved' })">Save</VButton>
        <VButton
          variant="secondary"
          @click="toast.show({ title: 'Export ready', description: 'Your export is ready to download.', duration: Infinity })"
        >
          Export
        </VButton>
        <VToastRegion v-bind="args" />
      </div>
    `,
  }),
} satisfies Meta<typeof VToastRegion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
