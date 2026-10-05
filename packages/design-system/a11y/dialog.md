# VDialog

## Role

- `role="dialog"` in a portal, modal: the rest of the page is hidden from assistive technology with `aria-hidden` behind a scrim.
- There is no trigger; the app controls `v-model:open`.

## Name source

- The required `title` prop, an `h2`, through `aria-labelledby`.

## Description source

- The optional `description` prop through `aria-describedby`; the attribute is omitted when there is no description.

## Keyboard commands

- Tab and Shift+Tab loop inside the dialog.
- Escape closes the dialog.
- The close button is named by the required `closeLabel` prop.

## Focus entry

- The first tabbable element in the dialog, which is the close button. The initial focus cannot be changed through the public API.

## Focus movement

- Trapped inside the dialog while it is open.

## Focus exit

- Close button, Escape, or an action in the footer that sets `open` to false.

## Focus restoration

- Focus returns to the element that was focused when the dialog opened.
- When the opener is an item of a VMenu, which closes, focus returns to the menu trigger.
- If the opener was not focused (opened from a timer or a pointer on a non-focusable element), focus returns to the body.

## Announcements

- The title and description are read when focus enters the dialog.

## Required consumer content

- `title` and `closeLabel`.
- Actions in the `footer` slot with visible text.
- Open the dialog from a focusable element so focus can be restored.

## WCAG mapping

- 4.1.2 Name, Role, Value: dialog role with a title.
- 2.1.2 No Keyboard Trap: Escape and the close button leave the dialog.
- 2.4.3 Focus Order, 2.4.11 Focus Not Obscured (Minimum).
- 1.4.10 Reflow: width is capped by the viewport and the content scrolls inside the dialog.
- 2.5.8 Target Size (Minimum): the close button is 44px.
- 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast: tokens contrast tests.

## Automated tests

- tests/dialog.test.ts: closed state, role with title and description, no `aria-describedby` and no warning without a description, close button name and behavior, footer slot, Escape and focus restoration, restoration to a menu trigger.
- e2e/dialog.spec.ts (Chromium): opened from a menu item, focus trap, page hidden behind, Escape and footer action restore focus to the menu trigger.

## Manual tests

- [ ] NVDA, JAWS and VoiceOver announce the dialog name and description on open and do not reach the page behind it.
- [ ] Focus lands on the close button and the order of the footer actions is sensible.
- [ ] Focus returns to the opener after Escape and after the close button.
- [ ] Scroll lock on the page behind, on desktop and on iOS Safari.
- [ ] Forced colors: the dialog edge is visible against the scrim.
- [ ] 200% zoom and 400% reflow with a long title and long body.
- [ ] Touch: the on-screen keyboard does not hide the focused field.

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- Modal only; there is no alert dialog, so there is no "must choose an action" variant.
- No way to choose the initial focus or to prevent outside dismissal.
- Nested dialogs are not tested.

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI ~2.10.5 (2.10.5 installed).
