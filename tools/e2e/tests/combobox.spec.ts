import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('filters, selects with the keyboard and closes', async ({ page }) => {
  const input = page.getByRole('combobox', { name: 'Country' })

  await input.focus()
  await page.keyboard.type('ger')
  await expect(page.getByRole('listbox').getByRole('option')).toHaveText(['Germany'])

  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')
  await expect(page.getByRole('listbox')).toBeHidden()
  await expect(input).toHaveValue('Germany')
  await expect(input).toBeFocused()
})

test('shows the empty message when nothing matches', async ({ page }) => {
  await page.getByRole('combobox', { name: 'Country' }).fill('zzz')
  await expect(page.getByRole('listbox')).toContainText('No results')
})

test('the trigger button opens the list and keeps focus on the input', async ({ page }) => {
  await page.getByRole('button', { name: 'Show options' }).click()

  await expect(page.getByRole('listbox')).toBeVisible()
  await expect(page.getByRole('combobox', { name: 'Country' })).toBeFocused()
})

test('draws one focus ring around the whole anchor', async ({ page }) => {
  const supported = await page.evaluate(() => CSS.supports('color', 'AccentColor'))
  test.skip(!supported, 'this browser does not support the AccentColor system color')

  const anchor = page.locator('.v-combobox__anchor').first()
  const input = page.getByRole('combobox', { name: 'Country' })
  const ring = (locator: typeof anchor) =>
    locator.evaluate((element) => getComputedStyle(element).outlineStyle)

  await input.focus()
  expect(await ring(anchor)).toBe('solid')
  expect(await ring(input)).toBe('none')

  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: 'Show options' }).click()
  expect(await ring(anchor)).toBe('solid')
  expect(await ring(page.getByRole('button', { name: 'Show options' }))).toBe('none')
})
