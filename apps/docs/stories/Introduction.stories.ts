import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { VButton } from '@v/design-system/button'
import { SchemePanels, ui, v } from './foundations-shared.ts'

const meta = { title: 'Introduction', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Sampler: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { SchemePanels, VButton },
    setup: () => ({ v }),
    template: `
      <SchemePanels>
        <div :style="{ display: 'grid', gap: v('space-4'), justifyItems: 'start' }">
          <div class="v-inline v-wrap v-items-center v-gap-3">
            <VButton variant="primary">Save</VButton>
            <VButton variant="secondary">Cancel</VButton>
            <VButton variant="danger">Delete</VButton>
            <VButton variant="quiet">Learn more</VButton>
          </div>
        </div>
      </SchemePanels>
    `,
  }),
}

const packages = [
  {
    name: '@v/design-tokens',
    note: 'The token source of truth and the compiled CSS custom properties.',
  },
  {
    name: '@v/design-system',
    note: 'The Vue components, the base styles, and the layout utilities.',
  },
  { name: '@v/icons', note: 'The icon components, such as VIconPlus.' },
]

export const Packages: Story = {
  tags: ['!dev'],
  render: () => ({
    setup: () => ({
      ui,
      packages,
      columns: 'minmax(12rem, 1fr) minmax(12rem, 3fr)',
    }),
    template: `
      <div>
        <div :style="{ ...ui.row(columns), borderBlockEnd: 'none', paddingBlock: 0 }">
          <span :style="ui.th">Package</span>
          <span :style="ui.th">What it holds</span>
        </div>
        <div v-for="item in packages" :key="item.name" :style="ui.row(columns)">
          <code :style="ui.code">{{ item.name }}</code>
          <p :style="{ ...ui.note, margin: 0 }">{{ item.note }}</p>
        </div>
      </div>
    `,
  }),
}
