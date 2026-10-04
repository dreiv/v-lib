<script setup lang="ts">
import { VField } from '../field'
import VComboboxControl from './VComboboxControl.vue'
import type { VComboboxProps } from './combobox.types'

const {
  id,
  label,
  description,
  error,
  required = false,
  disabled = false,
  options,
  placeholder,
} = defineProps<VComboboxProps>()

const model = defineModel<string | null>({ default: null })
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
    <VComboboxControl v-model="model" :options="options" :placeholder="placeholder" />
  </VField>
</template>
