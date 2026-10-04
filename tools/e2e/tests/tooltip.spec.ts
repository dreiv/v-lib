import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('opens on keyboard focus and closes on Escape with focus kept', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'Reset form' })
  const content = page.locator('.v-tooltip__content')

  await trigger.focus()
  await expect(content).toContainText('Clear every field')
  await expect(trigger).toHaveAttribute('aria-describedby', /.+/)

  await page.keyboard.press('Escape')
  await expect(content).toBeHidden()
  await expect(trigger).toBeFocused()
})

test('stays open while the pointer moves onto the bubble', async ({ page }) => {
  const content = page.locator('.v-tooltip__content')

  await page.getByRole('button', { name: 'Reset form' }).hover()
  await expect(content).toBeVisible()

  await content.hover()
  await expect(content).toBeVisible()
})

test('is not in the tab order', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'Reset form' })

  await trigger.focus()
  await page.keyboard.press('Tab')
  await expect(page.locator('.v-tooltip__content')).toBeHidden()
  await expect(trigger).not.toBeFocused()
})
