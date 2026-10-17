import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { tokenPrefix, tokens } from '@v/design-tokens'
import { SchemePanels, TokenList, ui, v } from './foundations-shared.ts'

const meta = { title: 'Foundations/Focus' } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Tokens: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { TokenList },
    setup: () => ({
      rows: [
        {
          token: `${tokenPrefix}focus-width`,
          value: tokens.focus.width,
          note: 'Thickness of the focus line.',
        },
        {
          token: `${tokenPrefix}focus-offset`,
          value: tokens.focus.offset,
          note: "Gap between the element's edge and the focus line, so the line never merges with the element's own border.",
        },
        {
          token: `${tokenPrefix}focus-color`,
          value: 'The accent, adjusted for contrast',
          note: 'The same color as color-text-accent. Tested at 3:1 on the surface.',
        },
        {
          token: `${tokenPrefix}focus-ring`,
          value: `${tokens.focus.width} solid line in the focus color`,
          note: 'Ready-to-use `outline` shorthand. Pair it with the offset.',
        },
      ],
    }),
    template: `<TokenList :rows="rows" />`,
  }),
}

export const Ring: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { SchemePanels },
    setup: () => ({ v, ui }),
    template: `
      <SchemePanels>
        <div :style="{ display: 'grid', gap: v('space-4'), justifyItems: 'start' }">
          <div>
            <span
              :style="{
                display: 'inline-block',
                padding: v('space-2') + ' ' + v('space-3'),
                border: v('border-width') + ' solid ' + v('color-border'),
                borderRadius: v('radius-sm'),
                outline: v('focus-ring'),
                outlineOffset: v('focus-offset'),
              }"
            >Focus ring, always on</span>
          </div>
          <p :style="ui.note">Press Tab to move through these controls and see the real indicator.</p>
          <div class="v-inline v-wrap v-items-center v-gap-4">
            <button type="button">Button</button>
            <a href="#" @click.prevent>Link</a>
            <input type="text" aria-label="Text field" value="Text field" />
          </div>
        </div>
      </SchemePanels>
    `,
  }),
}
