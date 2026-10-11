# VAlert

## Role

- A `div` with no role by default, so an alert present at page load is read in order like any content.
- `live="polite"` adds `role="status"`, `live="assertive"` adds `role="alert"`; use them only for alerts that appear after the page has loaded.

## Name source

- The required `title` prop, a `p` inside the alert.

## Description source

- The default slot, rendered after the title.

## Keyboard commands

- None when `dismissible` is not set; the component is not interactive.
- `dismissible`: the close button is a quiet, icon-only VButton, so it follows VButton's own keyboard behavior (Tab to focus, Enter/Space to activate) — see `button.md`.

## Focus entry

- Not focusable, except the close button (VButton) when `dismissible` is set.

## Focus movement

- Not applicable; activating the close button does not open or move focus anywhere by itself.

## Focus exit

- Not applicable.

## Focus restoration

- VAlert owns an `open` model (default `true`, optionally bound with `v-model:open`). Clicking the close button sets it to `false` and the alert removes itself. VAlert does not move focus afterward — listen for `update:open` if the alert might hold focus when it closes (2.4.3).

## Announcements

- Only with `live`: the content is announced when the alert is inserted or changes, politely for `status` and immediately for `alert`.
- Without `live`, nothing is announced.

## Required consumer content

- A `title` that states the kind of message in words ("Error: payment failed"), because the tone is otherwise shown by border color only.
- `live` only for alerts that appear in response to something that happened.
- If the alert could hold focus when dismissed, an `@update:open` handler that moves focus somewhere sensible — VAlert only removes itself, it doesn't manage focus.

## WCAG mapping

- 1.4.1 Use of Color: the tone is carried by the title text, not by the border color or the optional `showIcon` icon alone.
- 1.4.11 Non-text Contrast: tone borders and the `showIcon` icon (same `--v-color-{tone}` token, same tokens contrast tests) are at least 3:1 on the surface and the subtle surface.
- 1.4.3 Contrast (Minimum): text on the subtle surface; the close button's icon is overridden to inherit this same color rather than VButton's quiet-variant accent tint, so it's covered by the same test.
- 4.1.3 Status Messages: `live`.
- 1.4.10 Reflow: text wraps anywhere.
- 2.5.8 Target Size (Minimum) [2.2]: met by VButton's own `small` size (2rem/32px) — not re-implemented here; see `button.md`.
- 2.4.11 Focus Not Obscured (Minimum) [2.2]: not applicable — VAlert always renders in normal document flow and never as fixed/sticky/overlay content, so author content can't obscure its close button when focused. Revisit if a floating/toast variant is ever built on top of it.
- 2.4.3 Focus Order: post-dismiss focus handling is a consumer responsibility (see Focus restoration).

## Automated tests

- tests/alert.test.ts: title and body, tone data attribute, role per `live`, tone icon hidden by default and shown with `showIcon`, dismiss button hidden by default and rendered with an accessible name, dismissing removes the alert, `v-model:open` emits `update:open`, attribute forwarding.
- Tokens contrast tests for info, success, warning and danger.

## Manual tests

- [ ] An alert inserted with `live="assertive"` interrupts and one with `live="polite"` waits, in NVDA, JAWS and VoiceOver.
- [ ] An alert rendered at page load is not announced twice.
- [ ] Forced colors: the border is visible, and the close button's icon stays legible.
- [ ] 200% zoom and 400% reflow with a long title and body.
- [ ] Each tone is distinguishable by its title and icon with color vision deficiency simulation.
- [ ] The close button's hit target, focus ring and label make sense out of context (should already hold if `button.md`'s manual tests pass).

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- No actions slot beyond the optional dismiss button; additional actions belong in the body slot.
- Tone is shown by the start border color; the title must carry the meaning.
- Inserting a node that already has `role="alert"` is announced by most but not all screen readers.
- Dismissing removes the alert from the DOM but never moves focus — the host app must do that itself via `update:open` when it matters.

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI not used.
