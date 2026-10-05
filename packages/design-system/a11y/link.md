# VLink

## Role

- Native `a`; `href` and every other attribute are passed through.
- Without an `href` the element is not a link and not focusable; use VButton for actions.

## Name source

- Slot content, or `aria-label` passed as an attribute.

## Description source

- None.

## Keyboard commands

- Native: Tab focuses, Enter activates.

## Focus entry

- Tab.

## Focus movement

- Native: none.

## Focus exit

- Tab or Shift+Tab.

## Focus restoration

- Not applicable.

## Announcements

- None.

## Required consumer content

- Link text that makes sense out of context; the component cannot check this.
- Text or `aria-label` that says so when the link opens a new window.

## WCAG mapping

- 1.4.1 Use of Color: underlined at rest.
- 2.4.4 Link Purpose (In Context).
- 1.4.3 Contrast (Minimum): accent ink on the surface, tokens contrast tests.
- 2.5.8 Target Size (Minimum): inline links are exempt.

## Automated tests

- tests/link.test.ts: element, slot, attribute forwarding.
- Tokens contrast tests for accent ink on the surface.

## Manual tests

- [ ] Screen readers announce the link role and name.
- [ ] Underline visible and distinguishable in forced colors.
- [ ] Focus ring visible against the surrounding text on every theme and accent.
- [ ] 200% zoom and 400% reflow with long link text.

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- No external-link indicator; a link that opens a new window must say so itself.
- No router integration.

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI not used.
