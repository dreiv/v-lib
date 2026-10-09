# VButton

## Role

- Native `button`, `type="button"` by default.

## Name source

- Slot content, or `aria-label` passed as an attribute.

## Description source

- None by default; `aria-describedby` passed as an attribute.

## Keyboard commands

- Native: Enter and Space activate, Tab focuses.

## Focus entry

- Tab.

## Focus movement

- Native: none.

## Focus exit

- Tab or Shift+Tab.

## Focus restoration

- Not applicable.

## Announcements

- `pending` sets `aria-disabled="true"` and `aria-busy="true"` (not native `disabled`); no live announcement is made.

## Required consumer content

- Visible text or an `aria-label`.
- Visible text that says what happens.

## WCAG mapping

- 4.1.2 Name, Role, Value: native element.
- 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast: tokens contrast tests.
- 2.4.7 Focus Visible: base `:focus-visible` rule.
- 2.5.8 Target Size (Minimum): 44px at medium.

## Automated tests

- tests/button.test.ts: element, type, data attributes, attribute forwarding, pending.
- Storybook a11y addon on the VButton stories.

## Manual tests

- [ ] Focus handling when a focused button becomes pending (disabled) in each browser.
- [ ] Screen readers announce the busy state.
- [ ] Forced colors: all variants distinguishable and bordered.
- [ ] Contrast of every variant with Windows and macOS accent colors.

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- A pending button uses `aria-disabled` rather than native `disabled`, so it stays in the tab order and remains focusable; screen-reader support for `aria-disabled` on buttons is inconsistent.

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI not used.
