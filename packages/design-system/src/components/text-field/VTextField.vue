<script setup lang="ts">
import { VField } from '../field'
import VTextFieldControl from './VTextFieldControl.vue'
import type { VTextFieldProps } from './text-field.types'

defineOptions({ inheritAttrs: false })

const {
  label,
  description,
  error,
  required = false,
  disabled = false,
  type = 'text',
  placeholder,
  autocomplete,
} = defineProps<VTextFieldProps>()

const model = defineModel<string>({ default: '' })
</script>

<template>
  <VField
    :label="label"
    :description="description"
    :error="error"
    :required="required"
    :disabled="disabled"
  >
    <VTextFieldControl
      v-model="model"
      v-bind="$attrs"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
    />
  </VField>
</template>
