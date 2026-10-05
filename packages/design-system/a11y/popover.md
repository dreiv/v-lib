# VPopover

## Role

- The trigger keeps its own role and gets `aria-haspopup="dialog"`, `aria-expanded` and `aria-controls`.
- Content `role="dialog"`, non-modal: the page behind stays reachable.

## Name source

- The required `label` prop, as `aria-label` on the content.

## Description source

- None.

## Keyboard commands

- Enter or Space on the trigger toggles the popover.
- Escape closes it.
- Tab moves through the content; focus is not trapped.

## Focus entry

- The first tabbable element in the content; the content itself when it has none, so static text is still reached.

## Focus movement

- Tab and Shift+Tab; focus is not trapped.

## Focus exit

- Escape, the trigger, or moving focus or the pointer outside the popover closes it.

## Focus restoration

- Focus returns to the trigger on Escape or trigger toggle.
- It is not forced back when the user interacted outside.

## Announcements

- The dialog name is read when focus enters the content.

## Required consumer content

- `label`.
- A trigger with an accessible name.
- Non-essential, short, task-supporting content only.

## WCAG mapping

- 4.1.2 Name, Role, Value.
- 2.1.1 Keyboard, 2.1.2 No Keyboard Trap.
- 1.4.13 Content on Hover or Focus: opened by an action, dismissible with Escape.
- 2.4.11 Focus Not Obscured (Minimum): placement uses Reka UI collision handling.
- 1.4.10 Reflow: width is capped at 24rem and 90vw, and the content scrolls.

## Automated tests

- tests/popover.test.ts: closed state, open with name and focus inside, Escape and focus return, controlled open.
- e2e/popover.spec.ts (Chromium): click and keyboard open, static content focus, Escape, outside click.

## Manual tests

- [ ] NVDA, JAWS and VoiceOver announce the trigger state and the popover name.
- [ ] Keyboard-only: Tab leaves the popover and it closes as expected.
- [ ] Pointer: clicking outside closes it without stealing focus.
- [ ] Forced colors: the popover edge is visible.
- [ ] 200% zoom and 400% reflow, including near the viewport edge.
- [ ] Touch: tap outside closes it.

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- Non-modal only; use VDialog when the user must finish the task first.
- No arrow, no custom placement props.
- Not a replacement for VTooltip: do not use it for hover hints.
- The content is portaled to the end of the document, so Tab from inside it continues after the end of the page, not after the trigger.

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI ~2.10.5 (2.10.5 installed).
