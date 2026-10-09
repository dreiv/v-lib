# VMenu, VMenuItem, VMenuSeparator

## Role

- The trigger keeps its own role and gets `aria-haspopup="menu"` and `aria-expanded`.
- Popup `role="menu"`, items `role="menuitem"`, separator `role="separator"`.
- Disabled items have `aria-disabled="true"` and stay in the menu.

## Name source

- Trigger: its own content or `aria-label`.
- Menu: the trigger, through `aria-labelledby`.
- Items: their content.

## Description source

- None.

## Keyboard commands

- Provided by Reka UI: Enter, Space or ArrowDown on the trigger opens the menu.
- Arrow Up and Down move between items, skipping disabled ones; typeahead; Enter or Space activates; Escape closes.

## Focus entry

- Opened with the keyboard: the first item.
- Opened with the pointer: the menu container.

## Focus movement

- Roving focus between enabled items.

## Focus exit

- Selecting an item or Escape closes the menu.
- Tab is ignored while the menu is open (Reka UI); focus stays in the menu.

## Focus restoration

- Focus returns to the trigger.

## Announcements

- The focused item name and its position are read by the screen reader.

## Required consumer content

- A trigger with an accessible name (visible text or `aria-label`).
- Items that perform actions. Navigation belongs in links.
- A trigger that is a single element passing attributes and a ref through (VButton does).

## WCAG mapping

- 4.1.2 Name, Role, Value: menu button pattern.
- 2.1.1 Keyboard: Reka UI.
- 2.4.7 Focus Visible: highlighted item uses `Highlight` and `HighlightText` in forced colors.
- 2.5.8 Target Size (Minimum): items are at least 44px tall.
- 1.4.3 Contrast (Minimum): accent against accent text, tokens contrast tests.

## Automated tests

- tests/menu.test.ts: closed state, keyboard open, roles and names, select and close, disabled item, Escape, first item focus and arrow movement, trigger composition with VButton.
- e2e/menu.spec.ts (Chromium): keyboard and pointer open focus, Tab, selection and focus return.

## Manual tests

- [ ] NVDA, JAWS and VoiceOver announce the menu button, the menu and the items with their position.
- [ ] Opening with the pointer moves focus where expected and arrow keys then work.
- [ ] Typeahead selects the expected item.
- [ ] Keyboard-only run through open, move, activate and dismiss, with focus returning to the trigger.
- [ ] A screen reader user is not confused by Tab doing nothing while the menu is open.
- [ ] Forced colors: the highlighted item and the popup edge are visible.
- [ ] 200% zoom and 400% reflow near the viewport edge.
- [ ] Touch: the menu opens on tap and items are easy to hit.

## Screen-reader matrix

| Assistive technology | Browser           | Result       |
| -------------------- | ----------------- | ------------ |
| NVDA                 | Firefox or Chrome | Not verified |
| JAWS                 | Chrome            | Not verified |
| VoiceOver            | Safari            | Not verified |

## Known limitations

- Actions only: no submenus, checkbox or radio items, groups, labels or icons.
- The `select` event can be prevented with `event.preventDefault()` to keep the menu open.
- Not a menubar or an application menu.

## Verification date

Pending. Automated tests only; no manual verification has been done.

## Verified versions

Vue ^3.5.43 (3.5.43 installed), Reka UI ~2.10.5 (2.10.5 installed).
