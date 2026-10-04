<script setup lang="ts">
import { computed, useId } from 'vue'
import { provideFieldContext } from './field.context'
import { useFieldMessages } from './field.messages'
import type { VFieldProps } from './field.types'

const { label, description, error, required = false, disabled = false } = defineProps<VFieldProps>()

const id = useId()
const { descriptionId, errorId, invalid, describedby } = useFieldMessages(
  id,
  () => description,
  () => error,
)

provideFieldContext({
  id,
  descriptionId,
  errorId,
  invalid,
  describedby,
  required: computed(() => required),
  disabled: computed(() => disabled),
})
</script>

<template>
  <div class="v-field" :data-invalid="invalid || undefined" :data-disabled="disabled || undefined">
    <label class="v-field__label" :for="id">
      {{ label }}
      <span v-if="required" class="v-field__required" aria-hidden="true">*</span>
    </label>
    <p v-if="description" :id="descriptionId" class="v-field__description">{{ description }}</p>
    <slot />
    <p v-if="error" :id="errorId" class="v-field__error">{{ error }}</p>
  </div>
</template>
