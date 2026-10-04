# VField

## Semantics

- Root `div.v-field` with a native `label[for]` pointing at the control id.
- Description and error are `p` elements referenced by `aria-describedby`.
- The required asterisk is `aria-hidden`; requiredness comes from the control (`required`).

## Name and description

- Accessible name: label text.
- Accessible description: description id, then error id, space separated, omitted when neither exists.
- The control id is the `id` prop, or a generated id from `useId()`. Description and error ids are `<id>-description` and `<id>-error`. All are provided to the control through `useFieldContext()` and follow a changing `id`.

## Keyboard

- No behavior of its own. Clicking the label focuses the control.

## States

- `error` non-empty: `data-invalid` on the root, `aria-invalid="true"` on the control.
- `disabled`: `data-disabled` on the root, label dimmed, control disabled natively.
- Error text is rendered as text, so invalid state does not rely on color alone.

## Forced colors and zoom

- Text uses system colors through tokens; no background images or color-only cues.
- Layout is a single grid column that reflows at any width.

## Automated coverage

- tests/field.test.ts: label association, describedby composition and order, invalid, required, disabled, unique ids, context outside VField.
- Storybook a11y addon on the VTextField stories.

## Manual verification

- [ ] NVDA + Firefox, JAWS + Chrome, VoiceOver + Safari: label, description, required and error are announced on focus.
- [ ] Error change while focused is announced (describedby alone may not re-announce).
- [ ] Windows High Contrast / forced colors: label, description and error stay legible.
- [ ] 200% and 400% zoom: no clipping or horizontal scroll.
