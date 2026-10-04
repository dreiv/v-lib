<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { VButton } from '@v/design-system/button'
import { VCheckbox } from '@v/design-system/checkbox'
import { VCombobox } from '@v/design-system/combobox'
import { VErrorSummary, type VErrorSummaryItem } from '@v/design-system/error-summary'
import { VIconButton } from '@v/design-system/icon-button'
import { VLink } from '@v/design-system/link'
import { VRadioGroup } from '@v/design-system/radio-group'
import { VSelect } from '@v/design-system/select'
import { VTextArea } from '@v/design-system/text-area'
import { VTextField } from '@v/design-system/text-field'
import { VTooltip } from '@v/design-system/tooltip'
import { VIconClose } from '@v/icons'

const summary = useTemplateRef<InstanceType<typeof VErrorSummary>>('summary')
const submitted = ref(false)

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
}
</script>

<template>
  <main>
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
      <VRadioGroup id="plan" v-model="plan" label="Plan" :options="plans" :error="messages.plan" />
      <VSelect
        id="language"
        v-model="language"
        label="Language"
        placeholder="Choose a language"
        :options="languages"
        :error="messages.language"
      />
      <VCombobox v-model="country" label="Country" :options="options" />
      <VButton type="submit">Save</VButton>
      <VTooltip text="Clear every field">
        <VIconButton aria-label="Reset form" type="reset"><VIconClose /></VIconButton>
      </VTooltip>
      <p>By saving you accept the <VLink href="#terms">terms</VLink>.</p>
    </form>
  </main>
</template>
