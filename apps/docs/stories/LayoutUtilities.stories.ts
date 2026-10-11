import type { Meta, StoryObj } from '@storybook/vue3-vite'

// These are plain CSS classes from packages/design-system/src/shared/utilities.css,
// not a Vue component - this assumes utilities.css is already loaded globally in
// Storybook's preview, the same place tokens.css is loaded for every other story.
const meta = {
  title: 'Foundations/Layout Utilities',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const chipStyle =
  'padding: 0.5rem 0.75rem; background: var(--v-color-surface-subtle); border-radius: var(--v-radius-1); border: var(--v-border-width) solid var(--v-color-border); white-space: nowrap;'

const chip = (label: string) => `<span style="${chipStyle}">${label}</span>`

export const Stack: Story = {
  render: () => ({
    template: `
      <div class="v-stack v-items-start v-gap-4">
        ${chip('One')}
        ${chip('Two')}
        ${chip('Three')}
      </div>
    `,
  }),
}

export const Inline: Story = {
  render: () => ({
    template: `
      <div class="v-inline v-gap-3">
        ${chip('One')}
        ${chip('Two')}
        ${chip('Three')}
      </div>
    `,
  }),
}

export const Wrap: Story = {
  name: 'Inline + Wrap (Cluster)',
  render: () => ({
    template: `
      <div class="v-inline v-wrap v-gap-2" style="max-inline-size: 22rem;">
        ${[
          'Potion of Healing',
          'Fire Resistance',
          'Longsword +1',
          'Boots of Speed',
          'Cloak of Protection',
          'Ring of Mind Shielding',
        ]
          .map((label) => chip(label))
          .join('\n')}
      </div>
    `,
  }),
}

export const GapScale: Story = {
  name: 'Gap scale',
  render: () => ({
    template: `
      <div class="v-stack v-gap-6">
        ${[1, 2, 3, 4, 6, 8, 10, 16]
          .map(
            (step) => `
              <div class="v-inline v-items-center v-gap-4">
                <code style="min-inline-size: 3ch;">${step}</code>
                <div class="v-inline v-gap-${step}">
                  ${chip('A')}
                  ${chip('B')}
                </div>
              </div>
            `,
          )
          .join('\n')}
      </div>
    `,
  }),
}

export const AlignItems: Story = {
  name: 'align-items',
  render: () => ({
    template: `
      <div class="v-stack v-gap-6">
        ${['start', 'center', 'end', 'stretch']
          .map(
            (align) => `
              <div class="v-inline v-items-${align} v-gap-3" style="block-size: 4rem; padding: 0 0.5rem; outline: 1px dashed var(--v-color-divider);">
                <code style="align-self: flex-start;">items-${align}</code>
                ${chip('Short')}
                <span style="padding: 1.25rem 0.75rem; background: var(--v-color-surface-subtle); border-radius: var(--v-radius-1); border: var(--v-border-width) solid var(--v-color-border);">Taller</span>
              </div>
            `,
          )
          .join('\n')}
      </div>
    `,
  }),
}

export const JustifyContent: Story = {
  name: 'justify-content',
  render: () => ({
    template: `
      <div class="v-stack v-gap-6">
        ${['start', 'center', 'end', 'between']
          .map(
            (justify) => `
              <div class="v-inline v-justify-${justify} v-gap-3" style="inline-size: 100%; padding: 0 0.5rem; outline: 1px dashed var(--v-color-divider);">
                <code>justify-${justify}</code>
                ${chip('A')}
                ${chip('B')}
              </div>
            `,
          )
          .join('\n')}
      </div>
    `,
  }),
}

export const Toolbar: Story = {
  name: 'Composed: toolbar',
  render: () => ({
    template: `
      <div class="v-inline v-justify-between v-items-center v-gap-4" style="inline-size: 100%;">
        <strong>Inventory</strong>
        <div class="v-inline v-gap-2">
          ${chip('Sort')}
          ${chip('Filter')}
        </div>
      </div>
    `,
  }),
}
