import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'More' }).focus()
  await page.keyboard.press('Enter')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')
})

test('opens as a named dialog with focus inside and hides the page behind it', async ({ page }) => {
  const dialog = page.getByRole('dialog', { name: 'Discard changes' })

  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('button', { name: 'Close' })).toBeFocused()
  await expect(page.getByRole('button', { name: 'More' })).toHaveCount(0)
})

test('keeps Tab and Shift+Tab inside the dialog', async ({ page }) => {
  const dialog = page.getByRole('dialog')
  const close = dialog.getByRole('button', { name: 'Close' })
  const keep = dialog.getByRole('button', { name: 'Keep editing' })
  const discard = dialog.getByRole('button', { name: 'Discard' })

  await page.keyboard.press('Tab')
  await expect(keep).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(discard).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(close).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(discard).toBeFocused()
})

test('Escape closes it and focus returns to the menu trigger that led to it', async ({ page }) => {
  await page.keyboard.press('Escape')

  await expect(page.getByRole('dialog')).toBeHidden()
  await expect(page.getByRole('button', { name: 'More' })).toBeFocused()
})

test('a footer action closes it and focus returns to the menu trigger', async ({ page }) => {
  await page.getByRole('dialog').getByRole('button', { name: 'Keep editing' }).click()

  await expect(page.getByRole('dialog')).toBeHidden()
  await expect(page.getByRole('button', { name: 'More' })).toBeFocused()
})
