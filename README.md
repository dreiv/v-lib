# v-lib

A Vue 3 component library built to WCAG 2.2, on Reka UI. pnpm workspace, driven by Vite+ (`vp`).

```bash
vp install
vp run ready   # build, check, typecheck, test: what CI runs
vp run dev     # Storybook docs
```

Node 24.21 or newer (see `.node-version`).

## Layout

| Path                          | What it is                                                                                         |
| ----------------------------- | -------------------------------------------------------------------------------------------------- |
| `packages/tokens`             | `@v/design-tokens`. Token values in `src/tokens.ts`, the source of truth.                          |
| `packages/design-system`      | `@v/design-system`. Components, one entry point each (`@v/design-system/button`), plus the styles. |
| `packages/icons`              | `@v/icons`. Icon components. `src/index.ts` is generated, see below.                               |
| `packages/design-system/a11y` | One accessibility record per component. A test fails when a component has no complete record.      |
| `apps/docs`                   | Storybook: foundations, introduction, and the button page.                                         |
| `apps/playground`             | A hello-world app that uses the built package.                                                     |
| `tools/scripts`               | Repository scripts (token and icon generation).                                                    |

## Scripts

- `vp run tokens:generate`: regenerate `packages/design-system/src/styles/tokens.css` after editing `packages/tokens/src/tokens.ts`. A test fails when it is stale.
- `vp run icons:generate`: rewrite `packages/icons/src/index.ts` (see Icons). A test fails when it is stale.
- `vp run typecheck`: every workspace that has a `typecheck` script. `docs` and `playground` check against the built packages, so run `vp run build` first.

`vp run dev` reads package sources directly (no build needed). Production Storybook and the playground use the built packages.

## Accessibility records

Every folder under `packages/design-system/src/components` needs `packages/design-system/a11y/<name>.md` with the headings listed in `tests/a11y-records.test.ts` (role, name source, keyboard, focus, announcements, WCAG mapping, tests, manual verification, versions). The record is written with the component and says what was and was not verified by hand.

## Icons

An icon is one file, `packages/icons/src/<kebab-name>.ts`, exporting `VIcon<PascalName>`. A second name for the same drawing goes in `packages/icons/aliases.json` (`{ "<alias>": "<target>" }`), not in a copy of the file. After adding or removing an icon or alias run `vp run icons:generate`; tests fail when `index.ts` is out of sync or two files draw the same thing.

## Text and translation

Generic text a component writes itself ("Dismiss", "Remove") belongs in `VStrings` in `packages/design-system/src/strings.ts`, so apps translate it once. Text only the caller can know (labels, titles) is a required prop. The rule is explained at the top of that file.

## Adding a component

1. `packages/design-system/src/components/<name>/`: `V<Name>.vue`, `<name>.types.ts`, `<name>.css`, `index.ts` (imports the CSS, re-exports the component and types).
2. Add the entry to `pack.entry` in `packages/design-system/vite.config.ts` and to `exports` in `packages/design-system/package.json`.
3. Export it from `packages/design-system/src/index.ts`.
4. `tests/<name>.test.ts`, `a11y/<name>.md`, `apps/docs/stories/V<Name>.stories.ts`, and a link in `apps/docs/stories/Introduction.mdx`.

CSS goes in the declared cascade layers (`v.reset`, `v.tokens`, `v.base`, `v.components`, `v.utilities`), uses only `--v-*` tokens, and has no `!important`; tests enforce this.
