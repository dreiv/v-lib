import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { SchemePanels, px, tokensOf, ui, v } from './foundations-shared.ts'

const meta = { title: 'Foundations/Spacing and shape' } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Space: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { SchemePanels },
    setup: () => ({
      v,
      ui,
      steps: tokensOf('space').map((token) => ({ ...token, px: px(token.value) })),
    }),
    template: `
      <SchemePanels system>
        <div :style="{ display: 'grid', gap: v('space-2') }">
          <div v-for="step in steps" :key="step.name" :style="{ display: 'grid', gridTemplateColumns: '9rem 1fr', alignItems: 'center', gap: v('space-3') }">
            <code :style="ui.code">{{ step.name }}<br />{{ step.value }} · {{ step.px }}</code>
            <span :style="{ display: 'block', blockSize: '1rem', inlineSize: 'var(' + step.name + ')', background: v('color-accent-ink'), borderRadius: '2px' }" />
          </div>
        </div>
      </SchemePanels>
    `,
  }),
}

export const Shape: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { SchemePanels },
    setup: () => ({ v, ui, radii: tokensOf('radius') }),
    template: `
      <SchemePanels system>
        <div :style="{ display: 'flex', flexWrap: 'wrap', gap: v('space-6') }">
          <div v-for="radius in radii" :key="radius.name">
            <span :style="{ display: 'block', inlineSize: '6rem', blockSize: '4rem', background: v('color-surface-subtle'), border: v('border-width') + ' solid ' + v('color-border'), borderRadius: 'var(' + radius.name + ')' }" />
            <code :style="ui.code">{{ radius.name }}<br />{{ radius.value }}</code>
          </div>
          <div>
            <span :style="{ display: 'block', inlineSize: '6rem', blockSize: '4rem', borderBlockStart: v('border-width') + ' solid ' + v('color-border') }" />
            <code :style="ui.code">--v-border-width<br />1px</code>
          </div>
        </div>
      </SchemePanels>
    `,
  }),
}

export const ControlHeights: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { SchemePanels },
    setup: () => ({
      v,
      ui,
      heights: tokensOf('control', 'height').map((token) => ({ ...token, px: px(token.value) })),
    }),
    template: `
      <SchemePanels system>
        <div :style="{ display: 'grid', gap: v('space-3') }">
          <div v-for="height in heights" :key="height.name" :style="{ display: 'grid', gridTemplateColumns: '12rem 1fr', alignItems: 'center', gap: v('space-3') }">
            <code :style="ui.code">{{ height.name }}<br />{{ height.value }} · {{ height.px }}</code>
            <span :style="{ display: 'block', blockSize: 'var(' + height.name + ')', maxInlineSize: '14rem', background: v('color-surface-subtle'), border: v('border-width') + ' solid ' + v('color-border'), borderRadius: v('radius-1') }" />
          </div>
          <div :style="{ display: 'flex', alignItems: 'center', gap: v('space-3') }">
            <code :style="ui.code">--v-control-indicator<br />1.25rem · 20px</code>
            <span :style="{ display: 'block', inlineSize: v('control-indicator'), blockSize: v('control-indicator'), border: v('border-width') + ' solid ' + v('color-border'), borderRadius: v('radius-1') }" />
          </div>
        </div>
      </SchemePanels>
    `,
  }),
}
