# VIconButton

## Role

- Native `button`, `type="button"` by default; the icon is `aria-hidden`.

## Name source

- `aria-label` passed as an attribute. The component cannot check it, and an icon-only button without it has no accessible name.
- The name states the action ("Close dialog"), not the icon.

## Description source

- None.

## Keyboard commands

- Native: Enter and Space activate, Tab focuses.

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

- An `aria-label` attribute.
- An `aria-hidden` svg in the default slot.

## WCAG mapping

- 4.1.2 Name, Role, Value, 1.1.1 Non-text Content: `aria-label`.
- 1.4.11 Non-text Contrast: icon against surface and hover background.
- 2.5.8 Target Size (Minimum): 44px at medium, 32px at small, 52px at large.
- 2.4.7 Focus Visible: base `:focus-visible` rule.

## Automated tests

- tests/icon-button.test.ts: element, type, size data attribute, attribute forwarding including `aria-label`, slot, disabled, click handling.

## Manual tests

- [ ] Screen readers announce the `aria-label` and the button role, and do not announce the svg.
- [ ] Icon contrast against the surface and the hover background with every accent color.
- [ ] Forced colors: the button boundary and the icon are visible.
- [ ] Small size target (32px) is acceptable where it is used.
- [ ] Touch: the whole square is the target.

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- No tooltip, variants or pending state.
- The small size is below 44px but above the 24px WCAG 2.2 minimum.

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI not used.
