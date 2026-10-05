<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { VAlert } from '@v/design-system/alert'
import { VAutocomplete } from '@v/design-system/autocomplete'
import { VBadge } from '@v/design-system/badge'
import { VButton } from '@v/design-system/button'
import { VCheckbox } from '@v/design-system/checkbox'
import { VCombobox } from '@v/design-system/combobox'
import { VContainer } from '@v/design-system/container'
import { VDialog } from '@v/design-system/dialog'
import { VErrorSummary, type VErrorSummaryItem } from '@v/design-system/error-summary'
import { VIconButton } from '@v/design-system/icon-button'
import { VInline } from '@v/design-system/inline'
import { VLink } from '@v/design-system/link'
import { VLoadingRegion } from '@v/design-system/loading-region'
import { VMenu, VMenuItem, VMenuSeparator } from '@v/design-system/menu'
import { VPopover } from '@v/design-system/popover'
import { VRadioGroup } from '@v/design-system/radio-group'
import { VSelect } from '@v/design-system/select'
import { VSpinner } from '@v/design-system/spinner'
import { VStack } from '@v/design-system/stack'
import { VTag } from '@v/design-system/tag'
import { VTextArea } from '@v/design-system/text-area'
import { VTextField } from '@v/design-system/text-field'
import { VToastRegion, useToast } from '@v/design-system/toast'
import { VTooltip } from '@v/design-system/tooltip'
import { VIconClose } from '@v/icons'

const docsUrl = import.meta.env.DEV ? 'http://localhost:6006/' : `${import.meta.env.BASE_URL}docs/`

const summary = useTemplateRef<InstanceType<typeof VErrorSummary>>('summary')
const submitted = ref(false)

const toast = useToast()
const confirming = ref(false)
const city = ref('')
const cities = ['Timișoara', 'Târgu Mureș', 'Brașov', 'Cluj-Napoca']
const country = ref<string | null>(null)
const language = ref<string | null>(null)
const email = ref('')
const notes = ref('')
const subscribe = ref(false)
const plan = ref<string | null>(null)
const plans = [
  { value: 'free', label: 'Free' },
  { value: 'team', label: 'Team' },
]
const options = [
  { value: 'ro', label: 'Romania' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
]
const languages = [
  { value: 'ro', label: 'Romanian' },
  { value: 'en', label: 'English' },
]

const errors = computed(() => {
  const found: VErrorSummaryItem[] = []
  if (!submitted.value) return found
  if (!email.value) found.push({ id: 'email', message: 'Enter an email address.' })
  if (!plan.value) found.push({ id: 'plan', message: 'Choose a plan.' })
  if (!language.value) found.push({ id: 'language', message: 'Select a language.' })
  return found
})

const messages = computed(() => Object.fromEntries(errors.value.map((e) => [e.id, e.message])))

async function submit() {
  submitted.value = true
  await summary.value?.focus()
  if (errors.value.length === 0) toast.show({ title: 'Saved' })
}
</script>

<template>
  <VContainer as="main">
    <VStack>
      <nav aria-label="Project">
        <VLink :href="docsUrl">Component documentation</VLink>
      </nav>
      <VAlert title="Review the form" tone="info"
        >All fields are required unless marked optional.</VAlert
      >
      <VInline>
        <VBadge tone="success">Active</VBadge>
        <VTag>Accessibility</VTag>
        <VSpinner label="Syncing" />
      </VInline>
      <VLoadingRegion label="Loading preview" :loading="false"
        ><p>Preview ready.</p></VLoadingRegion
      >
      <form novalidate @submit.prevent="submit">
        <VErrorSummary ref="summary" heading="There is a problem" :errors="errors" />
        <VTextField
          id="email"
          v-model="email"
          label="Email"
          type="email"
          autocomplete="email"
          :error="messages.email"
        />
        <VTextArea v-model="notes" label="Notes" />
        <VCheckbox v-model="subscribe" label="Send me product updates" />
        <VRadioGroup
          id="plan"
          v-model="plan"
          label="Plan"
          :options="plans"
          :error="messages.plan"
        />
        <VSelect
          id="language"
          v-model="language"
          label="Language"
          placeholder="Choose a language"
          :options="languages"
          :error="messages.language"
        />
        <VCombobox
          v-model="country"
          label="Country"
          trigger-label="Show options"
          empty-text="No results"
          :options="options"
        />
        <VAutocomplete v-model="city" label="City" :suggestions="cities" />
        <VButton type="submit">Save</VButton>
        <VTooltip text="Clear every field">
          <VIconButton aria-label="Reset form" type="reset"><VIconClose /></VIconButton>
        </VTooltip>
        <VMenu>
          <template #trigger><VButton variant="secondary">More</VButton></template>
          <VMenuItem @select="toast.show({ title: 'Draft saved' })">Save draft</VMenuItem>
          <VMenuSeparator />
          <VMenuItem @select="confirming = true">Discard</VMenuItem>
        </VMenu>
        <VPopover label="Privacy">
          <template #trigger><VButton variant="quiet">Privacy</VButton></template>
          <p>We only use your email to send receipts.</p>
        </VPopover>
        <VDialog v-model:open="confirming" title="Discard changes" close-label="Close">
          <p>Your unsaved changes are lost.</p>
          <template #footer>
            <VButton variant="quiet" @click="confirming = false">Keep editing</VButton>
            <VButton variant="danger" @click="confirming = false">Discard</VButton>
          </template>
        </VDialog>
        <VToastRegion
          label="Notifications ({hotkey})"
          announcement-label="Notification"
          close-label="Close"
        />
        <p>By saving you accept the <VLink href="#terms">terms</VLink>.</p>
      </form>
    </VStack>
  </VContainer>
</template>
