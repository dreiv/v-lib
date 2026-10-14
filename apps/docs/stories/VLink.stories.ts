import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { VLink } from '@v/design-system/link'

const meta = {
  title: 'Actions/VLink',
  component: VLink,
  parameters: {
    docs: {
      description: {
        component: `
VLink renders a native anchor. It never imports \`vue-router\`; when the app installs a router, \`to\`
uses it, otherwise a string \`to\` is rendered as \`href\`.

\`\`\`vue
<VLink to="/terms">terms of use</VLink>
<VLink :to="{ name: 'user', params: { id } }" replace>profile</VLink>
<VLink href="https://example.com" target="_blank">example</VLink>
\`\`\`

With a router, VLink resolves \`RouterLink\` from the app, renders one \`a\` with the resolved \`href\`,
leaves Ctrl/Cmd/Shift/middle clicks and \`target="_blank"\` to the browser, and sets
\`aria-current="page"\` on the exact active route. \`vue-router\` is an optional peer dependency and is not
installed in this Storybook, so the router behaviour is described here rather than shown.

\`target="_blank"\` adds the external icon (turn it off with \`externalIcon\`) and visually hidden text
from the injected \`link.opensInNewWindow\` string. An \`aria-label\` replaces that text, so keep the
visible text and the new-window hint in it. See a11y/link.md for more.
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

export const NewWindowWithoutIcon: Story = {
  render: () => ({
    components: { VLink },
    template: `
      <p>
        By continuing you accept the
        <VLink href="#terms" target="_blank" :external-icon="false">terms of use</VLink>.
      </p>
    `,
  }),
}

export const CustomLabel: Story = {
  render: () => ({
    components: { VLink },
    template: `
      <p>
        <VLink
          href="#report"
          target="_blank"
          aria-label="Annual report (PDF, opens in new window)"
        >Annual report</VLink>
      </p>
    `,
  }),
}

export const ToWithoutRouter: Story = {
  render: () => ({
    components: { VLink },
    template:
      '<p>Without a router a string <code>to</code> becomes <VLink to="#terms">the href</VLink>.</p>',
  }),
}

export const CancelledClick: Story = {
  render: () => ({
    components: { VLink },
    setup() {
      const onClick = (event: MouseEvent) => {
        event.preventDefault()
        alert('click received, navigation cancelled')
      }
      return { onClick }
    },
    template: '<p><VLink to="#terms" @click="onClick">terms of use</VLink></p>',
  }),
}

export const WrappingInParagraph: Story = {
  render: () => ({
    components: { VLink },
    template: `
      <p style="max-inline-size: 16rem">
        Read
        <VLink href="#guide" target="_blank">the complete accessibility guide for the component library</VLink>
        before you start, then continue with
        <VLink href="https://example.com/a/very/long/path/that/has/no/spaces/at/all">this long address</VLink>.
      </p>
    `,
  }),
}
