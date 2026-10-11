# VNumberField

## Role

- Built on reka-ui's `NumberFieldRoot` / `NumberFieldInput` / `NumberFieldIncrement` / `NumberFieldDecrement`, which implement the [WAI-ARIA Spinbutton pattern](https://reka-ui.com/docs/components/number-field).
- The visible text input renders with `role="spinbutton"`, `type="text"` and a locale-aware `inputmode` (not `type="number"`), plus `aria-valuenow`/`aria-valuemin`/`aria-valuemax` kept in sync with the value.
- The increment/decrement buttons are reka-ui's own `NumberFieldIncrement`/`NumberFieldDecrement`, rendered as our `VButton` (44px, same as every other button in the library) via `as-child`, so their press/hold, wheel and disabled-at-min/max behavior all come from reka-ui — only the visual button is ours.
- The stepper buttons carry `tabindex="-1"` by design (reka-ui's default): they're a pointer/touch affordance alongside the spinbutton, the same relationship the native `<input type="number">` has to its own spin arrows. A sighted mouse/touch user can tap them directly; a keyboard user changes the value from the spinbutton itself (see Keyboard commands).

## Name source

- The VField label, same as every other control in the library.
- The stepper buttons get their own accessible name, independent of the field label: `incrementLabel`/`decrementLabel` if given, otherwise `"Increase {label}"` / `"Decrease {label}"`. A bare glyph or a generic "Increase" isn't enough once a page has more than one number field (a cart with a stepper per line item, say) — the announced name needs to say which field it changes.

## Description source

- VField description and error, via `aria-describedby` on the spinbutton.

## Keyboard commands

| Key                   | Behavior                           |
| --------------------- | ---------------------------------- |
| Arrow Up / Arrow Down | Increase / decrease by `step`      |
| Page Up / Page Down   | Increase / decrease by `step × 10` |
| Home                  | Jump to `min`, if set              |
| End                   | Jump to `max`, if set              |

The stepper buttons themselves are not reachable by Tab (see Role); all keyboard interaction happens with focus on the spinbutton.

## Focus entry

- Tab, landing on the spinbutton (the only tab stop in the control).

## Focus movement

- Native: none. The stepper buttons never receive focus from the keyboard.

## Focus exit

- Tab or Shift+Tab, from the spinbutton.

## Focus restoration

- Not applicable.

## Announcements

- Label, required state, description, invalid state and error are read from the native attributes when the spinbutton gains focus, same as VTextField/VTextArea.
- `aria-valuenow`/`aria-valuemin`/`aria-valuemax` update as the value changes; most screen readers announce the new value on every Arrow key press or button activation.
- A new error while the control is focused is not announced by `aria-describedby` alone.

## Required consumer content

- A visible, meaningful `label`.
- The same error message passed to the field `error` prop and to VErrorSummary.
- `min`/`max` whenever the quantity has real bounds (stock on hand, a minimum order size) — besides the UX benefit, Home/End and the disabled-at-the-boundary buttons depend on them.
- Override `incrementLabel`/`decrementLabel` on any screen where the default `"Increase {label}"` phrasing would read oddly (e.g. a very long or sentence-like label).

## WCAG mapping

- 1.3.1 Info and Relationships, 3.3.2 Labels or Instructions: native label association on the spinbutton; the stepper buttons have their own `aria-label`.
- 3.3.1 Error Identification: the error is text, referenced by `aria-describedby`, with `aria-invalid`.
- 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast: covered by the tokens contrast tests; the `+`/`−` glyphs are `aria-hidden` decoration, not the accessible name.
- 2.1.1 Keyboard: every value change (Arrow Up/Down, Page Up/Down, Home, End) is available from the spinbutton without touching the stepper buttons.
- 2.4.7 Focus Visible, 2.4.11 Focus Not Obscured (Minimum): the visible focus ring is drawn on the whole control (`:has(.v-number-field__input:focus-visible)`), since the spinbutton itself has its border suppressed in favor of the group border.
- 2.5.8 Target Size (Minimum): the stepper buttons are `VButton`'s default (medium, 44px), the same size as every other interactive control in the library — chosen deliberately here given retail/thumb use.
- 4.1.2 Name, Role, Value: `role="spinbutton"` plus `aria-valuenow`/`-min`/`-max` give assistive technology the current value and bounds at all times, which a plain `inputmode="numeric"` text field would not.

## Automated tests

- tests/number-field.test.ts: labelling, v-model, increment/decrement by step, min/max clamping and the resulting disabled state, default and overridden stepper button names, tabindex on the buttons vs. the spinbutton, description and error wiring, required, disabled, id propagation.
- `field-sizing`-style layout details (the shared focus ring, forced-colors borders) aren't asserted by jsdom-based unit tests; verify visually in Storybook or with the manual tests below.

## Manual tests

- [ ] On a touch device, both stepper buttons are comfortably tappable with a thumb, including on a dense product/cart list.
- [ ] Screen readers announce label, required, description, invalid state and the current value on focus, and announce the new value after each Arrow key press or button tap.
- [ ] An error that appears while the control is focused is announced.
- [ ] At `min`, the decrement button is disabled (and vice versa at `max`); this is audible/visible, not just a visual dimming.
- [ ] Mobile: the on-screen numeric keypad appears for the spinbutton, and typing a value works the same as using the buttons.
- [ ] Forced colors: border and focus ring visible in all states.
- [ ] 200% zoom and 400% reflow with long labels and errors.
- [ ] Keyboard: Tab lands once on the spinbutton (not on either stepper button); focus ring visible on every theme and accent.

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |
| VoiceOver (touch)    | iOS Safari        | Not verified |
| TalkBack (touch)     | Android Chrome    | Not verified |

## Known limitations

- The stepper buttons are not independently reachable by Tab (see Role); this matches the native spinbutton pattern but is worth flagging since it differs from a plain pair of buttons.
- No currency/percentage preset is wired up yet; `formatOptions` is exposed but every consumer has to supply its own `Intl.NumberFormatOptions`.
- Press-and-hold and mouse-wheel stepping come from reka-ui as-is; neither has been tuned for this library's token set (repeat rate, wheel sensitivity).

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), reka-ui (NumberField primitives).
