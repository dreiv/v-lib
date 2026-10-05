import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

async function showToast(page: import('@playwright/test').Page) {
  await page.getByRole('button', { name: 'More' }).focus()
  await page.keyboard.press('Enter')
  await page.keyboard.press('Enter')
  await expect(page.locator('.v-toast')).toBeVisible()
}

test('appears without taking focus and is announced politely', async ({ page }) => {
  await showToast(page)

  await expect(page.locator('.v-toast')).toContainText('Draft saved')
  await expect(page.getByRole('button', { name: 'More' })).toBeFocused()
  await expect(page.locator('[aria-live="polite"]')).toContainText('Notification')
})

test('F8 reaches the region and Tab reaches the toast and its close button', async ({ page }) => {
  await showToast(page)

  await page.keyboard.press('F8')
  await expect(page.locator('.v-toast__viewport')).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.locator('.v-toast')).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.locator('.v-toast').getByRole('button', { name: 'Close' })).toBeFocused()
})

test('closing it from the keyboard returns focus to where it was before F8', async ({ page }) => {
  await showToast(page)

  await page.keyboard.press('F8')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')

  await expect(page.locator('.v-toast')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'More' })).toBeFocused()
})

test('Escape on a focused toast dismisses it and returns focus', async ({ page }) => {
  await showToast(page)

  await page.keyboard.press('F8')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Escape')

  await expect(page.locator('.v-toast')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'More' })).toBeFocused()
})
