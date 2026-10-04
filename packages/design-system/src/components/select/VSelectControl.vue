<script setup lang="ts">
import { computed } from 'vue'
import { useFieldContext } from '../field/field.context'
import type { VSelectOption } from './select.types'

const { options, placeholder = '' } = defineProps<{
  options: VSelectOption[]
  placeholder?: string
}>()

const model = defineModel<string | null>({ default: null })
const { id, describedby, invalid, required, disabled } = useFieldContext()

const value = computed({
  get: () => model.value ?? '',
  set: (next) => {
    model.value = next === '' ? null : next
  },
})
</script>

<template>
  <select
    :id="id"
    v-model="value"
    class="v-field__control v-select"
    :required="required"
    :disabled="disabled"
    :aria-invalid="invalid || undefined"
    :aria-describedby="describedby"
  >
    <option value="">{{ placeholder }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>
