# VContainer

## Role

- A `div` by default, or the element named by `as` (section, nav, header, footer, main, article, aside).

## Name source

- None; landmark elements are named by the app with `aria-label`.

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

- One `main` per page.
- An `aria-label` on `section` and `nav` when more than one is on the page.

## WCAG mapping

- 1.4.10 Reflow: the width is at most 100% of the parent.
- 1.4.4 Resize Text: the maximum width is in rem.

## Automated tests

- tests/layout.test.ts: element, slot, `as`.

## Manual tests

- [ ] 400% zoom: no horizontal scroll.
- [ ] Landmarks are listed once in the screen reader landmark list.

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- One maximum width (`--v-container-inline`) and fixed inline padding; no sizes or breakpoints.

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI not used.
