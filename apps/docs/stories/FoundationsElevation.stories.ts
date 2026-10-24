import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { tokenPrefix } from '@v/design-tokens'
import { SchemePanels, TokenList, describeColor, tokensOf, ui, v } from './foundations-shared.ts'

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

export const Elevation: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { SchemePanels },
    setup() {
      const all = tokensOf('shadow')
      const color = all.find((token) => token.name.endsWith('-color'))
      return {
        v,
        ui,
        surface: `${tokenPrefix}color-surface-raised`,
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
      }
    },
    template: `
      <div>
        <SchemePanels>
          <div :style="{ display: 'grid', gap: v('space-6') }">
            <div v-for="level in levels" :key="level.name">
              <code :style="ui.code">{{ level.name }}</code>
              <p :style="ui.note">{{ level.note }}</p>
              <div
                :style="{
                  marginBlockStart: v('space-3'),
                  padding: v('space-4'),
                  background: v('color-surface-raised'),
                  border: v('border-width') + ' solid ' + v('color-border'),
                  borderRadius: v('radius-md'),
                  boxShadow: 'var(' + level.name + ')',
                }"
              >{{ surface }}</div>
            </div>
          </div>
        </SchemePanels>
        <p :style="ui.note">Shadow color: {{ shadowColor }}</p>
      </div>
    `,
  }),
}

export const Layers: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { TokenList },
    setup: () => ({
      rows: tokensOf('z').map((token) => ({
        token: token.name,
        value: token.value,
        note: layerUsage[token.name.slice(`${tokenPrefix}z-`.length)] ?? '',
      })),
      labels: ['Token', 'Stacking order', 'Use'],
    }),
    template: `<TokenList :rows="rows" :labels="labels" />`,
  }),
}
