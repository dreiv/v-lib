import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { tokenPrefix, tokens } from '@v/design-tokens'
import { SchemePanels, px, tokensOf, ui, v } from './foundations-shared.ts'

const meta = { title: 'Foundations/Spacing and shape' } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const heightUsage: Record<string, string> = {
  xs: 'Dense controls that cannot grow. Leave space around them.',
  sm: 'Compact controls in tight layouts.',
  md: 'The default size.',
  lg: 'Prominent actions and touch-first layouts.',
}

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
            <span :style="{ display: 'block', blockSize: v('space-4'), inlineSize: 'var(' + step.name + ')', background: v('color-text-accent'), borderRadius: v('radius-sm') }" />
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
    setup: () => ({
      v,
      ui,
      radii: tokensOf('radius'),
      borderName: `${tokenPrefix}border-width`,
      borderWidth: tokens.border.width,
    }),
    template: `
      <SchemePanels system>
        <div :style="{ display: 'flex', flexWrap: 'wrap', gap: v('space-6') }">
          <div v-for="radius in radii" :key="radius.name">
            <span :style="{ display: 'block', inlineSize: '6rem', blockSize: '4rem', background: v('color-surface-muted'), border: v('border-width') + ' solid ' + v('color-border'), borderRadius: 'var(' + radius.name + ')' }" />
            <code :style="ui.code">{{ radius.name }}<br />{{ radius.value }}</code>
          </div>
          <div>
            <span :style="{ display: 'block', inlineSize: '6rem', blockSize: '4rem', borderBlockStart: v('border-width') + ' solid ' + v('color-border') }" />
            <code :style="ui.code">{{ borderName }}<br />{{ borderWidth }}</code>
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
      heights: tokensOf('control', 'height').map((token) => ({
        ...token,
        px: px(token.value),
        usage: heightUsage[token.name.slice(`${tokenPrefix}control-height-`.length)] ?? '',
      })),
      indicatorName: `${tokenPrefix}control-indicator-size`,
      indicator: tokens.control.indicatorSize,
      indicatorPx: px(tokens.control.indicatorSize),
    }),
    template: `
      <SchemePanels system>
        <div :style="{ display: 'grid', gap: v('space-3') }">
          <div v-for="height in heights" :key="height.name" :style="{ display: 'grid', gridTemplateColumns: '12rem 1fr', alignItems: 'center', gap: v('space-3') }">
            <div>
              <code :style="ui.code">{{ height.name }}<br />{{ height.value }} · {{ height.px }}</code>
              <p :style="ui.note">{{ height.usage }}</p>
            </div>
            <span :style="{ display: 'block', blockSize: 'var(' + height.name + ')', maxInlineSize: '14rem', background: v('color-surface-muted'), border: v('border-width') + ' solid ' + v('color-border'), borderRadius: v('radius-sm') }" />
          </div>
          <div :style="{ display: 'flex', alignItems: 'center', gap: v('space-3') }">
            <code :style="ui.code">{{ indicatorName }}<br />{{ indicator }} · {{ indicatorPx }}</code>
            <span :style="{ display: 'block', inlineSize: v('control-indicator-size'), blockSize: v('control-indicator-size'), border: v('border-width') + ' solid ' + v('color-border'), borderRadius: v('radius-sm') }" />
          </div>
        </div>
      </SchemePanels>
    `,
  }),
}
