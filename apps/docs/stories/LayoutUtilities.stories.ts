import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { tokenPrefix, tokens } from '@v/design-tokens'
import { tokensOf, v } from './foundations-shared.ts'

const meta = {
  title: 'Foundations/Layout Utilities',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const box = `background: ${v('color-surface-subtle')}; border-radius: ${v('radius-1')}; border: ${v('border-width')} solid ${v('color-border')};`

const chipStyle = `padding: ${v('space-2')} ${v('space-3')}; ${box} white-space: nowrap;`

const chip = (label: string) => `<span style="${chipStyle}">${label}</span>`

const guide = `outline: ${v('border-width')} dashed ${v('color-divider')};`

const steps = tokensOf('space').map((token) => token.name.slice(`${tokenPrefix}space-`.length))

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
        ${['Design', 'Engineering', 'Research', 'Accessibility', 'Documentation', 'Release']
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
        ${steps
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
              <div class="v-inline v-items-${align} v-gap-3" style="block-size: ${v('space-16')}; padding: 0 ${v('space-2')}; ${guide}">
                <code style="align-self: flex-start;">items-${align}</code>
                ${chip('Short')}
                <span style="padding: ${v('space-4')} ${v('space-3')}; ${box}">Taller</span>
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
              <div class="v-inline v-justify-${justify} v-gap-3" style="inline-size: 100%; padding: 0 ${v('space-2')}; ${guide}">
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

export const Container: Story = {
  name: 'Container',
  render: () => ({
    template: `
      <div style="${guide}">
        <div class="v-container">
          <div style="padding: ${v('space-4')}; ${box}">
            Content is centered and capped at ${tokens.container.inline}.
          </div>
        </div>
      </div>
    `,
  }),
}
