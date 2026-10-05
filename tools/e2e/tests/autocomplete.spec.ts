import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('suggests while typing and keeps the typed text when nothing is chosen', async ({ page }) => {
  const input = page.getByRole('combobox', { name: 'City' })

  await input.fill('ti')
  await expect(page.getByRole('listbox').getByRole('option')).toHaveText(['Timișoara'])

  await page.keyboard.press('Escape')
  await expect(page.getByRole('listbox')).toBeHidden()
  await expect(input).toHaveValue('ti')
})

test('picks a suggestion with the keyboard', async ({ page }) => {
  const input = page.getByRole('combobox', { name: 'City' })

  await input.fill('bra')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')

  await expect(input).toHaveValue('Brașov')
  await expect(page.getByRole('listbox')).toBeHidden()
  await expect(input).toBeFocused()
})

test('shows no list when nothing matches', async ({ page }) => {
  await page.getByRole('combobox', { name: 'City' }).fill('zzz')
  await expect(page.getByRole('listbox')).toHaveCount(0)
  await expect(page.locator('.v-combobox__content:visible')).toHaveCount(0)
})
