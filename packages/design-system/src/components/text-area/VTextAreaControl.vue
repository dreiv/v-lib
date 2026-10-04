<script setup lang="ts">
import { useFieldContext } from '../field/field.context'

const { placeholder, autocomplete } = defineProps<{
  placeholder?: string
  autocomplete?: string
}>()

const model = defineModel<string>({ default: '' })
const { id, describedby, invalid, required, disabled } = useFieldContext()
</script>

<template>
  <textarea
    :id="id"
    v-model="model"
    class="v-field__control v-text-area"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    :required="required"
    :disabled="disabled"
    :aria-invalid="invalid || undefined"
    :aria-describedby="describedby"
  />
</template>
