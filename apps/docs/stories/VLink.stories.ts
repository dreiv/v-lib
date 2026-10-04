import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { VLink } from '@v/design-system/link'

const meta = {
  title: 'Actions/VLink',
  component: VLink,
} satisfies Meta<typeof VLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { VLink },
    template: '<p>By continuing you accept the <VLink href="#terms">terms of use</VLink>.</p>',
  }),
}

export const NewWindow: Story = {
  render: () => ({
    components: { VLink },
    template: `
      <p>
        By continuing you accept the
        <VLink href="#terms" target="_blank" rel="noopener" aria-label="Terms of use, new window">
          terms of use
        </VLink>.
      </p>
    `,
  }),
}
