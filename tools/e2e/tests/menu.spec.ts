import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('opens with the keyboard on the first item and Escape returns focus to the trigger', async ({
  page,
}) => {
  const trigger = page.getByRole('button', { name: 'More' })

  await trigger.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('menuitem', { name: 'Save draft' })).toBeFocused()

  await page.keyboard.press('Escape')
  await expect(page.getByRole('menu')).toBeHidden()
  await expect(trigger).toBeFocused()
})

test('opened with the pointer, focus is on the menu and the arrow keys enter the items', async ({
  page,
}) => {
  await page.getByRole('button', { name: 'More' }).click()
  await expect(page.getByRole('menu')).toBeFocused()

  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('menuitem', { name: 'Save draft' })).toBeFocused()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('menuitem', { name: 'Discard' })).toBeFocused()
})

test('Tab does not move focus out of an open menu', async ({ page }) => {
  await page.getByRole('button', { name: 'More' }).focus()
  await page.keyboard.press('Enter')
  await page.keyboard.press('Tab')

  await expect(page.getByRole('menu')).toBeVisible()
  await expect(page.getByRole('menuitem', { name: 'Save draft' })).toBeFocused()
})

test('choosing an item runs its action, closes the menu and returns focus to the trigger', async ({
  page,
}) => {
  const trigger = page.getByRole('button', { name: 'More' })

  await trigger.focus()
  await page.keyboard.press('Enter')
  await page.keyboard.press('Enter')

  await expect(page.getByRole('menu')).toBeHidden()
  await expect(page.locator('.v-toast')).toContainText('Draft saved')
  await expect(trigger).toBeFocused()
})
