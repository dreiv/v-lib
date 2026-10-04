# VIconButton

## Semantics

- Native `button`, `type="button"` by default.
- The icon goes in the default slot and must be hidden from assistive technology (`aria-hidden="true"` on the svg).

## Name and description

- Required consumer content: an `aria-label` attribute. The component cannot check it, and an icon-only button without it has no accessible name.
- The name states the action, not the icon ("Close dialog", not "X").

## Keyboard

- Native: Enter and Space activate, Tab focuses.

## States

- `disabled` uses the native attribute.
- Hover background uses `--v-color-hover`.
- Focus ring comes from the base `:focus-visible` rule.
- The icon svg is sized to `--v-control-indicator`.

## Forced colors and zoom

- Border switches to `ButtonText`, disabled to `GrayText`.
- Square at the control height tokens: 44px at medium, 32px at small, 52px at large.

## Automated coverage

- tests/icon-button.test.ts: element, type, size data attribute, attribute forwarding including `aria-label`, slot, disabled, click handling.

## Known limitations

- No tooltip. An action that is not obvious from the icon needs visible text or a VTooltip once it exists.

## Manual verification

- [ ] Screen readers announce the `aria-label` and the button role, and do not announce the svg.
- [ ] Icon contrast against the surface and the hover background with every accent color.
- [ ] Forced colors: the button boundary and the icon are visible.
- [ ] Small size target (32px) is acceptable where it is used.
- [ ] Touch: the whole square is the target.
