# VBadge

## Role

- A `span` with no role.

## Name source

- Its text.

## Description source

- None.

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

- None.

## Required consumer content

- Text that says the status in words ("Paid", "Overdue"); the tone is shown by border color only.
- Short text.

## WCAG mapping

- 1.4.1 Use of Color: the text carries the status.
- 1.4.11 Non-text Contrast: tone borders at least 3:1, tokens contrast tests.
- 1.4.3 Contrast (Minimum): text on the subtle surface.
- 1.4.10 Reflow: text wraps anywhere.

## Automated tests

- tests/badge.test.ts: element, no role, tone data attribute, attribute forwarding.

## Manual tests

- [ ] Forced colors: the badge edge is visible.
- [ ] 200% zoom and 400% reflow with long text.
- [ ] Each tone is distinguishable by its text with color vision deficiency simulation.

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- Not interactive, not removable and not a live region.
- A badge that changes after load is not announced.

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI not used.
