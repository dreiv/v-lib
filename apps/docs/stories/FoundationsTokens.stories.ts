import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import { flatten, tokens, type TokenGroup } from '@v/design-tokens'
import { pageOf, pages, type PageKey } from './token-docs.ts'
import { source } from './foundations-shared.ts'

const meta = { title: 'Foundations/All tokens', parameters: { layout: 'padded' } } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const rows = flatten(tokens as TokenGroup).map((token) => ({
  ...token,
  page: pageOf(token.name),
  isColor: token.name.startsWith('--v-color-'),
}))

const usageSource = `
/* Every token is a CSS custom property with the --v- prefix. */
.card {
  padding: var(--v-space-4);
  border-radius: var(--v-radius-md);
  background: var(--v-color-surface-raised);
  box-shadow: var(--v-shadow-raised);
}
`

export const Reference: Story = {
  tags: ['!dev'],
  parameters: source(usageSource, 'css'),
  render: () => ({
    setup() {
      const query = ref('')
      const page = ref<PageKey | ''>('')
      const copied = ref('')
      const shown = computed(() => {
        const text = query.value.trim().toLowerCase()
        return rows.filter(
          (row) =>
            (!page.value || row.page === page.value) &&
            (!text || row.name.includes(text) || row.value.toLowerCase().includes(text)),
        )
      })
      const copy = async (name: string) => {
        try {
          await navigator.clipboard.writeText(`var(${name})`)
          copied.value = `Copied var(${name})`
        } catch {
          copied.value = `Select and copy var(${name})`
        }
      }
      return {
        query,
        page,
        copied,
        shown,
        copy,
        total: rows.length,
        pages: Object.entries(pages).map(([key, value]) => ({ key, title: value.title })),
        pageTitle: (key?: PageKey) => (key ? pages[key].title : ''),
        pageHref: (key?: PageKey) => (key ? `./?path=/docs/${pages[key].id}--docs` : undefined),
        columns: 'minmax(14rem, 1.4fr) minmax(10rem, 2fr) auto minmax(8rem, 1fr)',
      }
    },
    template: `
      <div>
        <div class="fd-filters">
          <label class="fd-picker">
            Filter
            <input v-model="query" type="search" placeholder="Name or value" />
          </label>
          <label class="fd-picker">
            Page
            <select v-model="page">
              <option value="">All pages</option>
              <option v-for="item in pages" :key="item.key" :value="item.key">{{ item.title }}</option>
            </select>
          </label>
          <span class="fd-note" aria-live="polite">{{ shown.length }} of {{ total }} tokens. {{ copied }}</span>
        </div>
        <div class="fd-rows" :style="{ '--fd-columns': columns }">
          <div class="fd-row fd-row--head">
            <span class="fd-th">Token</span>
            <span class="fd-th">Value</span>
            <span class="fd-th">Light / dark</span>
            <span class="fd-th">Explained on</span>
          </div>
          <div v-for="row in shown" :key="row.name" class="fd-row">
            <button type="button" class="fd-copy fd-code" :aria-label="'Copy var(' + row.name + ')'" @click="copy(row.name)">
              {{ row.name }}
            </button>
            <code class="fd-code">{{ row.value }}</code>
            <span v-if="row.isColor" class="fd-dual" role="img" aria-label="Light and dark swatches">
              <span class="fd-dual-half" data-scheme="light" :style="{ background: 'var(' + row.name + ')' }" />
              <span class="fd-dual-half" data-scheme="dark" :style="{ background: 'var(' + row.name + ')' }" />
            </span>
            <span v-else />
            <a v-if="row.page" class="fd-text" target="_top" :href="pageHref(row.page)">{{ pageTitle(row.page) }}</a>
          </div>
        </div>
        <p v-if="!shown.length" class="fd-note">No token matches this filter.</p>
      </div>
    `,
  }),
}
