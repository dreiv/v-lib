import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { VButton } from '@v/design-system/button'
import { VMenu, VMenuItem, VMenuSeparator } from '@v/design-system/menu'

const meta = {
  title: 'Overlays/VMenu',
  component: VMenu,
} satisfies Meta<typeof VMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { VButton, VMenu, VMenuItem, VMenuSeparator },
    setup: () => ({ last: ref('') }),
    template: `
      <div>
        <VMenu>
          <template #trigger><VButton variant="secondary">Actions</VButton></template>
          <VMenuItem @select="last = 'rename'">Rename</VMenuItem>
          <VMenuItem @select="last = 'duplicate'">Duplicate</VMenuItem>
          <VMenuSeparator />
          <VMenuItem @select="last = 'delete'">Delete</VMenuItem>
        </VMenu>
        <p>Last action: {{ last || 'none' }}</p>
      </div>
    `,
  }),
}

export const WithDisabledItem: Story = {
  render: () => ({
    components: { VButton, VMenu, VMenuItem },
    template: `
      <VMenu>
        <template #trigger><VButton variant="secondary">Actions</VButton></template>
        <VMenuItem>Rename</VMenuItem>
        <VMenuItem disabled>Archive</VMenuItem>
      </VMenu>
    `,
  }),
}
