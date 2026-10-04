<script setup lang="ts">
import { computed, useId } from 'vue'
import { useFieldMessages } from '../field/field.messages'
import type { VRadioGroupProps } from './radio-group.types'

const {
  label,
  description,
  error,
  required = false,
  disabled = false,
  options,
  name,
} = defineProps<VRadioGroupProps>()

const model = defineModel<string | null>({ default: null })

const id = useId()
const groupName = computed(() => name ?? id)
const { descriptionId, errorId, invalid, describedby } = useFieldMessages(
  id,
  () => description,
  () => error,
)
</script>

<template>
  <fieldset
    class="v-radio-group"
    role="radiogroup"
    :disabled="disabled"
    :aria-invalid="invalid || undefined"
    :aria-describedby="describedby"
    :data-invalid="invalid || undefined"
    :data-disabled="disabled || undefined"
  >
    <legend class="v-radio-group__legend">
      {{ label }}
      <span v-if="required" class="v-field__required" aria-hidden="true">*</span>
    </legend>
    <p v-if="description" :id="descriptionId" class="v-field__description">{{ description }}</p>
    <div class="v-radio-group__options">
      <label v-for="option in options" :key="option.value" class="v-radio-group__option">
        <input
          v-model="model"
          class="v-radio-group__input"
          type="radio"
          :name="groupName"
          :value="option.value"
          :required="required"
        />
        <span>{{ option.label }}</span>
      </label>
    </div>
    <p v-if="error" :id="errorId" class="v-field__error">{{ error }}</p>
  </fieldset>
</template>
