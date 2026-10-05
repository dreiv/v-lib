import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { VButton } from '@v/design-system/button'
import { VDialog } from '@v/design-system/dialog'

const meta = {
  title: 'Overlays/VDialog',
  component: VDialog,
  args: { title: 'Delete project', closeLabel: 'Close' },
  render: (args) => ({
    components: { VButton, VDialog },
    setup: () => ({ args, open: ref(false) }),
    template: `
      <div>
        <VButton @click="open = true">Open dialog</VButton>
        <VDialog v-bind="args" v-model:open="open">
          <p>All files in this project are removed.</p>
          <template #footer>
            <VButton variant="quiet" @click="open = false">Cancel</VButton>
            <VButton variant="danger" @click="open = false">Delete</VButton>
          </template>
        </VDialog>
      </div>
    `,
  }),
} satisfies Meta<typeof VDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithDescription: Story = {
  args: { description: 'This action cannot be undone.' },
}
export const LongTitle: Story = {
  args: {
    title: 'Delete the project and every document, comment and attachment that belongs to it',
  },
}
