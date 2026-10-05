import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('opens on click as a named dialog and Escape closes it with focus on the trigger', async ({
  page,
}) => {
  const trigger = page.getByRole('button', { name: 'Privacy' })

  await trigger.click()
  await expect(trigger).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByRole('dialog', { name: 'Privacy' })).toContainText('receipts')

  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toBeHidden()
  await expect(trigger).toBeFocused()
})

test('opens with the keyboard and moves focus into the content', async ({ page }) => {
  await page.getByRole('button', { name: 'Privacy' }).focus()
  await page.keyboard.press('Enter')

  const dialog = page.getByRole('dialog', { name: 'Privacy' })
  await expect(dialog).toBeVisible()
  await expect(dialog).toBeFocused()
})

test('clicking outside closes it', async ({ page }) => {
  await page.getByRole('button', { name: 'Privacy' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()

  await page.getByRole('textbox', { name: 'Notes' }).click()
  await expect(page.getByRole('dialog')).toBeHidden()
  await expect(page.getByRole('textbox', { name: 'Notes' })).toBeFocused()
})
