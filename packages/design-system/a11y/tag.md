# VTag

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

- Short text that makes sense on its own.

## WCAG mapping

- 1.4.3 Contrast (Minimum): text on the divider surface, tokens contrast tests.
- 1.4.10 Reflow: text wraps.

## Automated tests

- tests/badge.test.ts: element, no role, attribute forwarding.

## Manual tests

- [ ] Text contrast on the tag background in light and dark.
- [ ] Forced colors: the tag edge is visible.
- [ ] 200% zoom and 400% reflow with long text.

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- Not interactive, selectable or removable; add a separate component when a product needs one.

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI not used.
