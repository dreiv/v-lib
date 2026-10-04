<script setup lang="ts">
import { useFieldContext } from '../field/field.context'
import type { VTextFieldType } from './text-field.types'

const {
  type = 'text',
  placeholder,
  autocomplete,
} = defineProps<{
  type?: VTextFieldType
  placeholder?: string
  autocomplete?: string
}>()

const model = defineModel<string>({ default: '' })
const { id, describedby, invalid, required, disabled } = useFieldContext()
</script>

<template>
  <input
    :id="id"
    v-model="model"
    class="v-field__control v-text-field"
    :type="type"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    :required="required"
    :disabled="disabled"
    :aria-invalid="invalid || undefined"
    :aria-describedby="describedby"
  />
</template>
