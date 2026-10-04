<script setup lang="ts">
import { ref } from 'vue'
import { VButton } from '@v/design-system/button'
import { VCheckbox } from '@v/design-system/checkbox'
import { VCombobox } from '@v/design-system/combobox'
import { VRadioGroup } from '@v/design-system/radio-group'
import { VTextArea } from '@v/design-system/text-area'
import { VTextField } from '@v/design-system/text-field'

const country = ref<string | null>(null)
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
</script>

<template>
  <main>
    <VTextField v-model="email" label="Email" type="email" autocomplete="email" />
    <VTextArea v-model="notes" label="Notes" />
    <VCheckbox v-model="subscribe" label="Send me product updates" />
    <VRadioGroup v-model="plan" label="Plan" :options="plans" />
    <VCombobox v-model="country" label="Country" :options="options" />
    <VButton>Save</VButton>
  </main>
</template>
