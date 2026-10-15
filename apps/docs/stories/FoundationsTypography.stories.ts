import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { tokenPrefix } from '@v/design-tokens'
import { SchemePanels, px, tokensOf, ui, v } from './foundations-shared.ts'

const meta = { title: 'Foundations/Typography' } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const sample = 'Pack my box with five dozen liquor jugs'

export const Families: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { SchemePanels },
    setup: () => ({
      v,
      ui,
      sample,
      families: [`${tokenPrefix}font-sans`, `${tokenPrefix}font-mono`],
      weights: tokensOf('font', 'weight'),
    }),
    template: `
      <SchemePanels system>
        <div :style="{ display: 'grid', gap: v('space-4') }">
          <div v-for="family in families" :key="family">
            <code :style="ui.code">{{ family }}</code>
            <p :style="{ margin: 0, fontFamily: 'var(' + family + ')', fontSize: v('font-size-lg') }">{{ sample }}</p>
          </div>
          <div v-for="weight in weights" :key="weight.name">
            <code :style="ui.code">{{ weight.name }}: {{ weight.value }}</code>
            <p :style="{ margin: 0, fontWeight: 'var(' + weight.name + ')', fontSize: v('font-size-lg') }">{{ sample }}</p>
          </div>
        </div>
      </SchemePanels>
    `,
  }),
}

export const Sizes: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { SchemePanels },
    setup: () => ({
      v,
      ui,
      sample,
      sizes: tokensOf('font', 'size').map((token) => ({ ...token, px: px(token.value) })),
    }),
    template: `
      <SchemePanels system>
        <div v-for="size in sizes" :key="size.name" :style="{ paddingBlock: v('space-2'), borderBlockEnd: v('border-width') + ' solid ' + v('color-divider') }">
          <code :style="ui.code">{{ size.name }} · {{ size.value }} ({{ size.px }} at the default root size)</code>
          <p :style="{ margin: 0, fontSize: 'var(' + size.name + ')', lineHeight: v('line-height-tight') }">{{ sample }}</p>
        </div>
      </SchemePanels>
    `,
  }),
}

export const LineHeights: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { SchemePanels },
    setup: () => ({
      v,
      ui,
      heights: tokensOf('lineHeight'),
      text: 'Spacing between lines changes how long passages read. Wider line spacing helps people who track lines with difficulty, and tighter spacing suits headings that wrap onto two lines.',
    }),
    template: `
      <SchemePanels system>
        <div :style="{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))', gap: v('space-6') }">
          <div v-for="height in heights" :key="height.name">
            <code :style="ui.code">{{ height.name }}: {{ height.value }}</code>
            <p :style="{ margin: 0, lineHeight: 'var(' + height.name + ')', maxInlineSize: '36ch' }">{{ text }}</p>
          </div>
        </div>
      </SchemePanels>
    `,
  }),
}
