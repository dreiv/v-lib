# VTooltip

## Semantics

- Wraps exactly one focusable trigger. The trigger keeps its own role and receives `aria-describedby` while the tooltip is open.
- The visible bubble is in a portal; an `role="tooltip"` copy hidden visually carries the text for assistive technology.
- The tooltip only supplements an accessible name that already exists. It never carries essential information and never holds interactive content.

## Name and description

- Name source: the trigger (visible text or `aria-label`), not the tooltip.
- Description source: the `text` prop.
- Required consumer content: the trigger must already have an accessible name. Text that repeats the name adds nothing; use it for a hint or a shortcut.

## Keyboard

- Tab focuses the trigger and opens the tooltip. Reka UI opens on keyboard focus without the pointer delay.
- Escape closes the tooltip and focus stays on the trigger.
- The tooltip is never in the tab order.
- Focus entry, movement and exit: none, focus stays on the trigger. Restoration: not applicable.

## States

- Open states `delayed-open` and `instant-open` fade in with `--v-duration-fast`; the duration collapses under `prefers-reduced-motion`.
- Pointer: opens after a delay, stays open while the pointer is over the trigger or the bubble (hoverable), closes on pointer leave.
- Layer: `--v-z-tooltip`.
- Announcements: the description is read when the trigger is focused or re-read by the screen reader, not announced live.

## Forced colors and zoom

- The bubble gets a `CanvasText` border and system `Canvas` background so its edge is visible.
- Width is capped at 20rem and wraps long words; at 400% zoom the bubble stays inside the viewport through Reka collision handling.

## WCAG mapping

- 1.4.13 Content on Hover or Focus: dismissible with Escape, hoverable, persistent until pointer or focus leaves.
- 1.4.3 Contrast (text): text and background are the inverse system text and surface colors.
- 2.1.1 Keyboard, 4.1.2 Name, Role, Value.

## Automated coverage

- tests/tooltip.test.ts: closed state, open on focus with `role="tooltip"` and `aria-describedby`, Escape closes.
- e2e/tooltip.spec.ts: hover, focus, Escape, hovering the bubble keeps it open.
- Fixture tooltip-only: bundle contains the tooltip and no combobox, menu, toast or dialog code.

## Known limitations

- Touch devices cannot hover; the information must also be reachable some other way.
- Screen readers that announce both the name and the description read the same text twice when the two match.
- Each VTooltip has its own provider, so moving between tooltips does not skip the open delay.

## Manual verification

- [ ] NVDA, JAWS and VoiceOver read the description after the name when the trigger is focused.
- [ ] Tooltip text is not announced twice in a confusing way.
- [ ] Escape closes it without moving focus, in each browser.
- [ ] Forced colors: the bubble edge and text are visible.
- [ ] 200% and 400% zoom: the bubble is not clipped and does not cover the trigger.
- [ ] Touch: nothing essential depends on the tooltip.

Verification date: pending. Verified versions: Vue ^3.5.43, Reka UI ~2.10.5.
