import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { tokenPrefix } from '@v/design-tokens'
import { SchemePair, TokenList, describeColor, source, tokensOf } from './foundations-shared.ts'

const meta = { title: 'Foundations/Elevation and layers' } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const shadowPattern = /^0 (\d+)px (\d+)px/

const describeShadow = (value: string) => {
  const match = value.match(shadowPattern)
  return match ? `Soft shadow, ${match[1]}px down with a ${match[2]}px blur.` : ''
}

const levelUsage: Record<string, string> = {
  raised: 'Cards and other small raised elements.',
  overlay: 'Menus, popovers, dialogs, and other floating panels.',
}

const layerUsage: Record<string, string> = {
  sticky: 'Sticky headers and toolbars that stay above scrolling content.',
  modal: 'Dialogs and the scrim behind them.',
  popover: 'Menus, popovers, and listboxes opened from a control.',
  toast: 'Notifications that stay visible above dialogs.',
  tooltip: 'Tooltips, always on top.',
}

const layerKey = (name: string) => name.slice(`${tokenPrefix}z-`.length)

const elevationSource = `
.menu {
  background: var(--v-color-surface-raised);
  border: var(--v-border-width) solid var(--v-color-border);
  border-radius: var(--v-radius-md);
  box-shadow: var(--v-shadow-overlay);
}
`

export const Elevation: Story = {
  tags: ['!dev'],
  parameters: source(elevationSource, 'css'),
  render: () => ({
    components: { SchemePair },
    setup() {
      const all = tokensOf('shadow')
      const color = all.find((token) => token.name.endsWith('-color'))
      return {
        levels: all
          .filter((token) => token !== color)
          .map((token) => ({
            ...token,
            note: [
              levelUsage[token.name.slice(`${tokenPrefix}shadow-`.length)],
              describeShadow(token.value),
            ]
              .filter(Boolean)
              .join(' '),
          })),
        shadowColor: color ? describeColor(color.value) : '',
        surface: `${tokenPrefix}color-surface-raised`,
      }
    },
    template: `
      <div>
        <div class="fd-tiles" :style="{ '--fd-tile': '20rem' }">
          <figure v-for="level in levels" :key="level.name" class="fd-tile">
            <SchemePair>
              <div class="fd-stage fd-stage--roomy">
                <div class="fd-elevated" :style="{ boxShadow: 'var(' + level.name + ')' }">
                  <span class="fd-muted fd-small">{{ surface }}</span>
                </div>
              </div>
            </SchemePair>
            <figcaption class="fd-tile-caption">
              <code class="fd-code">{{ level.name }}</code>
              <p class="fd-note">{{ level.note }}</p>
            </figcaption>
          </figure>
        </div>
        <p class="fd-note">Shadow color: {{ shadowColor }}</p>
      </div>
    `,
  }),
}

const layersSource = `
.dialog {
  z-index: var(--v-z-modal);
}

.tooltip {
  z-index: var(--v-z-tooltip);
}
`

export const Layers: Story = {
  tags: ['!dev'],
  parameters: source(layersSource, 'css'),
  render: () => ({
    components: { SchemePair, TokenList },
    setup() {
      const layers = tokensOf('z')
      return {
        layers,
        rows: layers.map((token) => ({
          token: token.name,
          value: token.value,
          note: layerUsage[layerKey(token.name)] ?? '',
        })),
        labels: ['Token', 'Stacking order', 'Use'],
      }
    },
    template: `
      <div>
        <SchemePair>
          <div class="fd-stage fd-stage--roomy">
            <div class="fd-stack-layers" role="img" aria-label="Layers stacked from sticky at the bottom to tooltip on top">
              <div v-for="(layer, index) in layers" :key="layer.name" class="fd-layer" :style="{ '--fd-i': index, zIndex: 'var(' + layer.name + ')' }">
                <code class="fd-code">{{ layer.name }}</code>
                <code class="fd-value">{{ layer.value }}</code>
              </div>
            </div>
          </div>
        </SchemePair>
        <TokenList :rows="rows" :labels="labels" />
      </div>
    `,
  }),
}
