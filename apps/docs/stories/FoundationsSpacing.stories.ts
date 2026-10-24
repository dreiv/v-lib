import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { tokenPrefix, tokens } from '@v/design-tokens'
import { SchemePanels, Tile, px, source, tokensOf } from './foundations-shared.ts'

const meta = { title: 'Foundations/Spacing and shape' } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const heightUsage: Record<string, string> = {
  xs: 'Dense controls that cannot grow. The same as the target minimum. Leave space around them.',
  sm: 'Compact controls in tight layouts.',
  md: 'The default size.',
  lg: 'Prominent actions and touch-first layouts.',
}

const spaceSource = `
.toolbar {
  display: flex;
  gap: var(--v-space-2);
  padding: var(--v-space-3) var(--v-space-4);
}
`

export const Space: Story = {
  tags: ['!dev'],
  parameters: source(spaceSource, 'css'),
  render: () => ({
    components: { SchemePanels },
    setup: () => ({
      steps: tokensOf('space').map((token) => ({ ...token, px: px(token.value) })),
    }),
    template: `
      <SchemePanels system>
        <div class="fd-rows" :style="{ '--fd-columns': '11rem 1fr' }">
          <div v-for="step in steps" :key="step.name" class="fd-row">
            <div>
              <code class="fd-code">{{ step.name }}</code>
              <code class="fd-value">{{ step.value }} · {{ step.px }}</code>
            </div>
            <span class="fd-bar" :style="{ inlineSize: 'var(' + step.name + ')' }" />
          </div>
        </div>
      </SchemePanels>
    `,
  }),
}

const shapeSource = `
.control {
  border: var(--v-border-width) solid var(--v-color-border);
  border-radius: var(--v-radius-sm);
}

.card {
  border-radius: var(--v-radius-md);
}
`

export const Shape: Story = {
  tags: ['!dev'],
  parameters: source(shapeSource, 'css'),
  render: () => ({
    components: { Tile },
    setup: () => ({
      radii: tokensOf('radius'),
      borderName: `${tokenPrefix}border-width`,
      borderWidth: tokens.border.width,
    }),
    template: `
      <div class="fd-tiles" :style="{ '--fd-tile': '12rem' }">
        <Tile
          v-for="radius in radii"
          :key="radius.name"
          single
          :token="radius.name"
          :value="radius.value"
        >
          <div class="fd-stage">
            <span class="fd-shape" :style="{ borderRadius: 'var(' + radius.name + ')' }" />
          </div>
        </Tile>
        <Tile single :token="borderName" :value="borderWidth">
          <div class="fd-stage">
            <span class="fd-rule" />
          </div>
        </Tile>
      </div>
    `,
  }),
}

const controlSource = `
.button {
  min-block-size: var(--v-control-height-md);
  min-inline-size: var(--v-control-target-min);
}

.checkbox {
  inline-size: var(--v-control-indicator-size);
  block-size: var(--v-control-indicator-size);
}

.option {
  min-block-size: var(--v-control-target-min);
}
`

export const ControlHeights: Story = {
  tags: ['!dev'],
  parameters: source(controlSource, 'css'),
  render: () => ({
    components: { SchemePanels },
    setup: () => ({
      heights: tokensOf('control', 'height').map((token) => ({
        ...token,
        px: px(token.value),
        usage: heightUsage[token.name.slice(`${tokenPrefix}control-height-`.length)] ?? '',
      })),
      targetName: `${tokenPrefix}control-target-min`,
      target: tokens.control.targetMin,
      targetPx: px(tokens.control.targetMin),
      indicatorName: `${tokenPrefix}control-indicator-size`,
      indicator: tokens.control.indicatorSize,
      indicatorPx: px(tokens.control.indicatorSize),
    }),
    template: `
      <SchemePanels system>
        <div class="fd-rows" :style="{ '--fd-columns': 'minmax(12rem, 1fr) 2fr' }">
          <div class="fd-row">
            <div>
              <code class="fd-code">{{ targetName }}</code>
              <code class="fd-value">{{ target }} · {{ targetPx }}</code>
              <p class="fd-note">The smallest size of any pointer target. Never below 24 CSS pixels, even if the user lowers the root font size.</p>
            </div>
            <span class="fd-control fd-control--target" />
          </div>
          <div v-for="height in heights" :key="height.name" class="fd-row">
            <div>
              <code class="fd-code">{{ height.name }}</code>
              <code class="fd-value">{{ height.value }} · {{ height.px }}</code>
              <p class="fd-note">{{ height.usage }}</p>
            </div>
            <span class="fd-control" :style="{ blockSize: 'var(' + height.name + ')' }" />
          </div>
          <div class="fd-row">
            <div>
              <code class="fd-code">{{ indicatorName }}</code>
              <code class="fd-value">{{ indicator }} · {{ indicatorPx }}</code>
              <p class="fd-note">Check and radio indicators. Smaller than the target minimum, so the click target is the whole option row. The dashed square marks the minimum.</p>
            </div>
            <span class="fd-control fd-control--slot"><span class="fd-indicator" /></span>
          </div>
        </div>
      </SchemePanels>
    `,
  }),
}
