<script setup lang="ts">
import { useId } from 'vue'
import { useFieldMessages } from '../field/field.messages'
import type { VCheckboxProps } from './checkbox.types'

defineOptions({ inheritAttrs: false })

const {
  label,
  description,
  error,
  required = false,
  disabled = false,
} = defineProps<VCheckboxProps>()

const model = defineModel<boolean>({ default: false })

const { descriptionId, errorId, invalid, describedby } = useFieldMessages(
  useId(),
  () => description,
  () => error,
)
</script>

<template>
  <div
    class="v-checkbox"
    :data-invalid="invalid || undefined"
    :data-disabled="disabled || undefined"
  >
    <label class="v-checkbox__row">
      <input
        v-bind="$attrs"
        v-model="model"
        class="v-checkbox__input"
        type="checkbox"
        :required="required"
        :disabled="disabled"
        :aria-invalid="invalid || undefined"
        :aria-describedby="describedby"
      />
      <span>
        {{ label }}
        <span v-if="required" class="v-field__required" aria-hidden="true">*</span>
      </span>
    </label>
    <p v-if="description" :id="descriptionId" class="v-field__description">{{ description }}</p>
    <p v-if="error" :id="errorId" class="v-field__error">{{ error }}</p>
  </div>
</template>
