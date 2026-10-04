<script setup lang="ts">
import { ref } from 'vue'
import { VButton } from '@v/design-system/button'
import { VCombobox } from '@v/design-system/combobox'

const country = ref<string | null>(null)
const options = [
  { value: 'ro', label: 'Romania' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
]
</script>

<template>
  <main>
    <VCombobox v-model="country" label="Country" :options="options" />
    <VButton>Save</VButton>
  </main>
</template>
