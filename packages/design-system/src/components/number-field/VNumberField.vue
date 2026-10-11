<script setup lang="ts">
import { VField } from '../field'
import VNumberFieldControl from './VNumberFieldControl.vue'
import type { VNumberFieldProps } from './number-field.types'

defineOptions({ inheritAttrs: false })

const {
  id,
  label,
  description,
  error,
  required = false,
  disabled = false,
  min,
  max,
  step,
  defaultValue,
  formatOptions,
  locale,
  readonly = false,
  name,
  incrementLabel,
  decrementLabel,
} = defineProps<VNumberFieldProps>()

const model = defineModel<number | null>({ default: null })
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
    <VNumberFieldControl
      v-model="model"
      v-bind="$attrs"
      :label="label"
      :min="min"
      :max="max"
      :step="step"
      :default-value="defaultValue"
      :format-options="formatOptions"
      :locale="locale"
      :readonly="readonly"
      :name="name"
      :increment-label="incrementLabel"
      :decrement-label="decrementLabel"
    />
  </VField>
</template>
