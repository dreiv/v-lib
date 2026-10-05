# VErrorSummary

## Role

- A `section` named by its `h2` heading (`aria-labelledby`), containing a `ul` of links.
- Nothing is rendered when `errors` is empty.

## Name source

- Section: the required `heading` prop.
- Links: the error messages.

## Description source

- None. The summary does not reference the field error ids; the app passes the same message to the field `error` prop and to the summary.

## Keyboard commands

- Tab moves through the links; Enter activates a link, which focuses the target control and scrolls it into view.
- If no element has the link id, the click keeps the browser default.

## Focus entry

- `focus()` is exposed; the app calls it after a failed submit. It waits one tick, then focuses the heading (`tabindex="-1"`).

## Focus movement

- Tab through the links.
- A link moves focus to the control with that id.

## Focus exit

- Following a link, or Tab out of the last link.

## Focus restoration

- Not applicable.

## Announcements

- Focusing the heading announces the heading, and the list when the screen reader reports it.
- There is no live region; the summary relies on the focus move.

## Required consumer content

- `heading` text in the page language.
- Each error `id` must equal the `id` of a focusable control (for a radio group, the first radio).
- Call `focus()` after a failed submit.

## WCAG mapping

- 3.3.1 Error Identification: errors are text, not color alone.
- 2.4.3 Focus Order, 2.4.11 Focus Not Obscured (Minimum).
- 1.4.3 Contrast (Minimum): tokens contrast tests.
- 1.4.10 Reflow: layout reflows at any width.

## Automated tests

- tests/error-summary.test.ts: empty state, heading and landmark name, link targets, focusing text field, radio group and checkbox, missing target, `focus()` including before the summary appears.
- Storybook a11y addon on the VErrorSummary stories.

## Manual tests

- [ ] Screen readers announce the heading and the link count when focus moves to the heading.
- [ ] Following a link announces the field label, required state and error.
- [ ] The focused control is not hidden behind sticky headers or overlays after following a link.
- [ ] Focus ring on the heading after submitting with a mouse and with the keyboard.
- [ ] Forced colors: border is `CanvasText`, links are `LinkText`.
- [ ] 200% zoom and 400% reflow with long messages.

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- The heading level is fixed at `h2`; the app owns the page heading hierarchy.

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI not used.
