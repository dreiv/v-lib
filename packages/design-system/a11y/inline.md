# VInline

## Role

- A `div` by default, or the element named by `as` (section, nav, header, footer, main, article, aside).
- Lists are not offered: `list-style: none` removes list semantics in Safari with VoiceOver.

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

- An `aria-label` on `section` and `nav` when more than one is on the page.
- Source order that matches the visual order.

## WCAG mapping

- 1.3.1 Info and Relationships, 1.3.2 Meaningful Sequence: wrapping keeps the DOM order.
- 1.4.10 Reflow: items wrap instead of overflowing.
- 1.4.12 Text Spacing: gaps are in rem.

## Automated tests

- tests/layout.test.ts: element, default and given gap, `as`, attribute forwarding.

## Manual tests

- [ ] Landmarks are listed once and named in the screen reader landmark list.
- [ ] 200% zoom and 400% reflow with many items.

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- Wrapping row with centered items only; no alignment or justify props.
- Gap steps are the space tokens 1, 2, 3, 4, 6, 8, 10 and 16.

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI not used.
