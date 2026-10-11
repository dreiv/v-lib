<script setup lang="ts">
import { computed } from 'vue'
import {
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
} from 'reka-ui'
import { VIconMinus, VIconPlus } from '@v/icons'
import { useFieldContext } from '../field/field.context'
import { useVStrings } from '../../strings'
import { VButton } from '../button'

const strings = useVStrings()

const {
  label,
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
} = defineProps<{
  label: string
  min?: number
  max?: number
  step?: number
  defaultValue?: number
  formatOptions?: Intl.NumberFormatOptions
  locale?: string
  readonly?: boolean
  name?: string
  incrementLabel?: string
  decrementLabel?: string
}>()

const model = defineModel<number | null>({ default: null })
const { id, describedby, invalid, required, disabled } = useFieldContext()

const increaseLabel = computed(
  () => incrementLabel || strings.numberField.increase.replace('{label}', label),
)
const decreaseLabel = computed(
  () => decrementLabel || strings.numberField.decrease.replace('{label}', label),
)
</script>

<template>
  <NumberFieldRoot
    :id="id"
    v-model="model"
    class="v-number-field"
    :min="min"
    :max="max"
    :step="step"
    :default-value="defaultValue"
    :format-options="formatOptions"
    :locale="locale"
    :disabled="disabled"
    :readonly="readonly"
    :required="required"
    :name="name"
    :data-invalid="invalid || undefined"
    :data-disabled="disabled || undefined"
  >
    <NumberFieldDecrement as-child>
      <VButton
        class="v-number-field__button"
        variant="primary"
        icon-only
        :aria-label="decreaseLabel"
      >
        <VIconMinus />
      </VButton>
    </NumberFieldDecrement>
    <NumberFieldInput
      class="v-number-field__input"
      :aria-invalid="invalid || undefined"
      :aria-required="required || undefined"
      :aria-describedby="describedby"
    />
    <NumberFieldIncrement as-child>
      <VButton
        class="v-number-field__button"
        variant="primary"
        icon-only
        :aria-label="increaseLabel"
      >
        <VIconPlus />
      </VButton>
    </NumberFieldIncrement>
  </NumberFieldRoot>
</template>
