<script setup lang="ts">
import { VField } from '../field'
import VAutocompleteControl from './VAutocompleteControl.vue'
import type { VAutocompleteProps } from './autocomplete.types'

defineOptions({ inheritAttrs: false })

const {
  id,
  label,
  description,
  error,
  required = false,
  disabled = false,
  suggestions,
  placeholder,
} = defineProps<VAutocompleteProps>()

const model = defineModel<string>({ default: '' })
</script>

<template>
  <VField
    :id="id"
    :label="label"
    :description="description"
    :error="error"
    :required="required"
    :disabled="disabled"
  >
    <VAutocompleteControl
      v-model="model"
      v-bind="$attrs"
      :suggestions="suggestions"
      :placeholder="placeholder"
    />
  </VField>
</template>
