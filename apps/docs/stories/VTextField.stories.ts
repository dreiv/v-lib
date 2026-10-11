import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, reactive, ref } from 'vue'
import { VButton } from '@v/design-system/button'
import { VTextField } from '@v/design-system/text-field'
import type { VTextFieldType } from '@v/design-system/text-field'

const typeOptions: VTextFieldType[] = ['text', 'email', 'password', 'search', 'tel', 'url']

const meta = {
  title: 'Forms/VTextField',
  component: VTextField,
  args: { label: 'Full name', placeholder: 'Jane Doe' },
  argTypes: {
    type: { control: 'select', options: typeOptions },
  },
  render: (args) => ({
    components: { VTextField },
    setup: () => ({ args }),
    template: '<VTextField v-bind="args" />',
  }),
} satisfies Meta<typeof VTextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithDescription: Story = { args: { description: 'As it appears on your ID.' } }
export const Required: Story = {
  args: { label: 'Email address', type: 'email', required: true, placeholder: 'you@example.com' },
}
export const WithError: Story = {
  args: {
    label: 'Email address',
    type: 'email',
    error: 'Enter a valid email address.',
    placeholder: 'you@example.com',
  },
}
export const Disabled: Story = { args: { disabled: true } }
export const Email: Story = {
  args: { label: 'Email', type: 'email', autocomplete: 'email', placeholder: 'you@example.com' },
}
export const Password: Story = {
  args: { label: 'Password', type: 'password', autocomplete: 'current-password' },
}
export const Search: Story = {
  args: { label: 'Search', type: 'search', placeholder: 'Search…' },
}
export const SearchWithButton: Story = {
  render: () => ({
    components: { VTextField, VButton },
    setup: () => {
      const query = ref('')
      return { query }
    },
    template: `
      <form
        role="search"
        style="display: flex; align-items: flex-end; gap: 0.5rem; max-inline-size: 24rem;"
        @submit.prevent
      >
        <VTextField
          v-model="query"
          label="Search the site"
          type="search"
          placeholder="Search…"
          style="flex: 1;"
        />
        <VButton type="submit">Search</VButton>
      </form>
    `,
  }),
}
export const Tel: Story = {
  args: {
    label: 'Phone number',
    type: 'tel',
    autocomplete: 'tel',
    placeholder: '(555) 123-4567',
  },
}
export const Url: Story = {
  args: {
    label: 'Website',
    type: 'url',
    autocomplete: 'url',
    placeholder: 'https://example.com',
  },
}

export const Form: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { VTextField },
    setup: () => {
      const values = reactive({
        name: '',
        email: '',
        password: '',
        search: '',
        phone: '',
        website: '',
      })

      const emailTouched = reactive({ value: false })

      const emailError = computed(() => {
        if (!emailTouched.value || !values.email) return undefined
        return /.+@.+\..+/.test(values.email) ? undefined : 'Enter a valid email address.'
      })

      return { values, emailTouched, emailError }
    },
    template: `
      <form style="display: grid; gap: 1rem; max-inline-size: 24rem;">
        <VTextField
          v-model="values.name"
          label="Full name"
          description="As it appears on your ID."
          placeholder="Jane Doe"
          required
          autocomplete="name"
        />
        <VTextField
          v-model="values.email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          required
          autocomplete="email"
          :error="emailError"
          @blur="emailTouched.value = true"
        />
        <VTextField
          v-model="values.password"
          label="Password"
          type="password"
          description="At least 8 characters."
          autocomplete="new-password"
        />
        <VTextField
          v-model="values.search"
          label="Search the site"
          type="search"
          placeholder="Search…"
        />
        <VTextField
          v-model="values.phone"
          label="Phone number"
          type="tel"
          autocomplete="tel"
          placeholder="(555) 123-4567"
        />
        <VTextField
          v-model="values.website"
          label="Website"
          type="url"
          autocomplete="url"
          placeholder="https://example.com"
        />
        <VTextField
          label="Company (read-only example)"
          model-value="Acme Inc."
          disabled
        />
      </form>
    `,
  }),
}
