# VTooltip

## Role

- Wraps exactly one focusable trigger, which keeps its own role and receives `aria-describedby` while the tooltip is open.
- The visible bubble is in a portal; an `role="tooltip"` copy hidden visually carries the text for assistive technology.
- The tooltip only supplements an accessible name that already exists and never holds interactive content.

## Name source

- The trigger (visible text or `aria-label`), not the tooltip.

## Description source

- The `text` prop.

## Keyboard commands

- Tab focuses the trigger and opens the tooltip without the pointer delay.
- Escape closes the tooltip and focus stays on the trigger.
- The tooltip is never in the tab order.

## Focus entry

- None; focus stays on the trigger.

## Focus movement

- None.

## Focus exit

- None.

## Focus restoration

- Not applicable.

## Announcements

- The description is read when the trigger is focused or re-read by the screen reader, not announced live.

## Required consumer content

- The trigger must already have an accessible name.
- Text that adds a hint or a shortcut rather than repeating the name.

## WCAG mapping

- 1.4.13 Content on Hover or Focus: dismissible with Escape, hoverable, persistent until pointer or focus leaves.
- 1.4.3 Contrast (Minimum): inverse system text and surface colors.
- 2.1.1 Keyboard, 4.1.2 Name, Role, Value.

## Automated tests

- tests/tooltip.test.ts: closed state, open on focus with `role="tooltip"` and `aria-describedby`, Escape closes.
- e2e/tooltip.spec.ts: hover, focus, Escape, hovering the bubble keeps it open.
- Fixture tooltip-only: bundle contains the tooltip and no combobox, menu, toast or dialog code.

## Manual tests

- [ ] NVDA, JAWS and VoiceOver read the description after the name when the trigger is focused.
- [ ] Tooltip text is not announced twice in a confusing way.
- [ ] Escape closes it without moving focus, in each browser.
- [ ] Forced colors: the bubble edge and text are visible.
- [ ] 200% and 400% zoom: the bubble is not clipped and does not cover the trigger.
- [ ] Touch: nothing essential depends on the tooltip.

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- Touch devices cannot hover; the information must also be reachable some other way.
- Screen readers that announce both the name and the description read the same text twice when the two match.
- Each VTooltip has its own provider, so moving between tooltips does not skip the open delay.

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI ~2.10.5 (2.10.5 installed).
