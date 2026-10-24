import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { tokenPrefix, tokens } from '@v/design-tokens'
import { SchemePanels, TokenList, source } from './foundations-shared.ts'

const meta = { title: 'Foundations/Focus' } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const tokensSource = `
:focus-visible {
  outline: var(--v-focus-ring);
  outline-offset: var(--v-focus-offset);
}
`

export const Tokens: Story = {
  tags: ['!dev'],
  parameters: source(tokensSource, 'css'),
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

const ringSource = `
<template>
  <span class="chip">Focus ring, always on</span>
</template>

<style>
.chip {
  padding: var(--v-space-2) var(--v-space-3);
  border: var(--v-border-width) solid var(--v-color-border);
  border-radius: var(--v-radius-sm);
  outline: var(--v-focus-ring);
  outline-offset: var(--v-focus-offset);
}
</style>
`

export const Ring: Story = {
  tags: ['!dev'],
  parameters: source(ringSource),
  render: () => ({
    components: { SchemePanels },
    template: `
      <SchemePanels>
        <div class="fd-stack">
          <span class="fd-focus-sample">Focus ring, always on</span>
          <p class="fd-note">Press Tab to move through these controls and see the real indicator.</p>
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
