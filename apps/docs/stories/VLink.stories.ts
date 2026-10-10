import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { VLink } from '@v/design-system/link'

const meta = {
  title: 'Actions/VLink',
  component: VLink,
  parameters: {
    docs: {
      description: {
        component: `
VLink is a plain anchor — no \`to\` prop, no \`vue-router\` dependency. For routed links, compose it
with \`RouterLink\`'s \`custom\` + \`v-slot\` API:

\`\`\`vue
<RouterLink to="/terms" custom v-slot="{ href, navigate }">
  <VLink :href="href" @click="onNavigate($event, navigate)">terms of use</VLink>
</RouterLink>
\`\`\`

\`navigate\` from the \`custom\` slot skips the click guard a normal \`<RouterLink>\` has, so Ctrl/Cmd/
Shift/middle-click would hijack new-tab clicks into SPA navigation unless you guard it yourself —
see the "Router integration" story below for a working guard, and a11y/link.md for the full write-up.
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
        The icon and "opens in new window" text are added automatically.
      </p>
      <p>
        Pass <code>aria-label</code> when that default text is the wrong description, e.g. a download:
        <VLink href="/terms.pdf" target="_blank" aria-label="Terms of use, PDF download">
          terms of use
        </VLink>
      </p>
    `,
  }),
}

export const RouterIntegration: Story = {
  render: () => ({
    components: { VLink },
    setup() {
      function onNavigate(event: MouseEvent, navigate: (e: MouseEvent) => void) {
        const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
        if (event.defaultPrevented || modified || event.button !== 0) return
        event.preventDefault()
        navigate(event)
      }
      // Stand-in for RouterLink's `navigate` slot prop
      const fakeNavigate = () => alert('SPA navigation triggered')
      return { onNavigate, fakeNavigate }
    },
    template: `
      <p>
        <VLink href="/terms" @click="onNavigate($event, fakeNavigate)">terms of use</VLink>
        — try a plain click vs. Ctrl/Cmd/middle-click.
      </p>
    `,
  }),
}
