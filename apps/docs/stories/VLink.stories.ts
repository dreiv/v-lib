import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { VLink, guardRouterNavigate } from '@v/design-system/link'

const meta = {
  title: 'Actions/VLink',
  component: VLink,
  parameters: {
    docs: {
      description: {
        component: `
VLink is a plain anchor — no \`to\` prop, no \`vue-router\` dependency.

For internal navigation, apply \`.v-link\` directly to \`RouterLink\`:

\`\`\`vue
<RouterLink class="v-link" to="/about">About</RouterLink>
\`\`\`

For anything needing VLink's behavior (external links, the "opens in new window" treatment),
compose it with \`RouterLink\`'s \`custom\` + \`v-slot\` API and the exported
\`guardRouterNavigate\` helper, which guards against hijacking Ctrl/Cmd/Shift/middle-clicks:

\`\`\`vue
<RouterLink to="/terms" custom v-slot="{ href, navigate }">
  <VLink :href="href" @click="guardRouterNavigate($event, navigate)">terms of use</VLink>
</RouterLink>
\`\`\`

Pass \`aria-label\` to override the generated text — keep "opens in new window" (or similar) in
it, since a custom label replaces the generated text entirely. See a11y/link.md for more.
        `,
      },
    },
  },
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
        <VLink href="#terms" target="_blank">terms of use</VLink>.
      </p>
    `,
  }),
}

export const RouterIntegration: Story = {
  render: () => ({
    components: { VLink },
    setup() {
      const fakeNavigate = () => alert('SPA navigation triggered')
      return { guardRouterNavigate, fakeNavigate }
    },
    template: `
      <p>
        <VLink href="/terms" @click="guardRouterNavigate($event, fakeNavigate)">terms of use</VLink>
      </p>
    `,
  }),
}
