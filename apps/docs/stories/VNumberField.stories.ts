import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { reactive, ref } from 'vue'
import { VButton } from '@v/design-system/button'
import { VNumberField } from '@v/design-system/number-field'

const meta = {
  title: 'Forms/VNumberField',
  component: VNumberField,
  args: { label: 'Quantity', modelValue: 1 },
  render: (args) => ({
    components: { VNumberField },
    setup: () => ({ args, model: ref(args.modelValue ?? null) }),
    template: '<VNumberField v-bind="args" v-model="model" />',
  }),
} satisfies Meta<typeof VNumberField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithDescription: Story = {
  args: { description: 'How many you want to order.' },
}
export const Required: Story = { args: { required: true } }
export const WithError: Story = {
  args: { error: 'Enter a quantity between 1 and 10.' },
}
export const Disabled: Story = { args: { disabled: true } }
export const Bounded: Story = {
  args: {
    label: 'Seats',
    modelValue: 2,
    min: 1,
    max: 8,
    description: 'Up to 8 seats per booking.',
  },
}
export const Currency: Story = {
  args: {
    label: 'Budget',
    modelValue: 50,
    min: 0,
    step: 5,
    formatOptions: { style: 'currency', currency: 'USD' },
  },
}

export const Form: Story = {
  tags: ['!dev'],
  render: () => ({
    components: { VNumberField, VButton },
    setup: () => {
      const cart = reactive([
        { id: 1, name: 'Espresso beans, 1kg', price: 24, quantity: 1, stock: 6 },
        { id: 2, name: 'Oat milk, 1L', price: 4, quantity: 2, stock: 10 },
        { id: 3, name: 'Filter papers, 100ct', price: 7, quantity: 0, stock: 3 },
      ])

      const total = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)

      return { cart, total }
    },
    template: `
      <form style="display: grid; gap: 1rem; max-inline-size: 28rem;">
        <div
          v-for="item in cart"
          :key="item.id"
          style="display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem;"
        >
          <VNumberField
            v-model="item.quantity"
            :label="item.name"
            :description="'$' + item.price + ' each · ' + item.stock + ' in stock'"
            :min="0"
            :max="item.stock"
            style="flex: 1;"
          />
        </div>
        <p style="font-weight: 600;">Total: \${{ total() }}</p>
        <VButton type="submit">Checkout</VButton>
      </form>
    `,
  }),
}
