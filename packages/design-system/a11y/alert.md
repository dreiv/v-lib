# VAlert

## Role

- A `div` with no role by default, so an alert present at page load is read in order like any content.
- `live="polite"` adds `role="status"`, `live="assertive"` adds `role="alert"`; use them only for alerts that appear after the page has loaded.

## Name source

- The required `title` prop, a `p` inside the alert.

## Description source

- The default slot, rendered after the title.

## Keyboard commands

- None; the component is not interactive.

## Focus entry

- Not focusable.

## Focus movement

- Not applicable.

## Focus exit

- Not applicable.

## Focus restoration

- Not applicable.

## Announcements

- Only with `live`: the content is announced when the alert is inserted or changes, politely for `status` and immediately for `alert`.
- Without `live`, nothing is announced.

## Required consumer content

- A `title` that states the kind of message in words ("Error: payment failed"), because the tone is otherwise shown by border color only.
- `live` only for alerts that appear in response to something that happened.

## WCAG mapping

- 1.4.1 Use of Color: the tone is carried by the title text, not by the border color alone.
- 1.4.11 Non-text Contrast: tone borders are at least 3:1 on the surface and the subtle surface, tokens contrast tests.
- 1.4.3 Contrast (Minimum): text on the subtle surface.
- 4.1.3 Status Messages: `live`.
- 1.4.10 Reflow: text wraps anywhere.

## Automated tests

- tests/alert.test.ts: title and body, tone data attribute, role per `live`, attribute forwarding.
- Tokens contrast tests for info, success, warning and danger.

## Manual tests

- [ ] An alert inserted with `live="assertive"` interrupts and one with `live="polite"` waits, in NVDA, JAWS and VoiceOver.
- [ ] An alert rendered at page load is not announced twice.
- [ ] Forced colors: the border is visible.
- [ ] 200% zoom and 400% reflow with a long title and body.
- [ ] Each tone is distinguishable by its title with color vision deficiency simulation.

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- No icon, close button or actions.
- Tone is shown by the start border color; the title must carry the meaning.
- Inserting a node that already has `role="alert"` is announced by most but not all screen readers.

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI not used.
