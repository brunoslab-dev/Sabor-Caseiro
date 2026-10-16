# UI components — Sabor Caseiro

This guide documents the existing frontend conventions. It intentionally does not introduce a new framework or rename existing classes during the safe-cleanup phase.

## Shared design tokens

The public stylesheet (`css/styles.css`) defines shared values in `:root`, including `--color-ink`, `--color-cream`, `--color-paper`, `--color-gold`, `--color-line`, `--radius` and transition/shadow values. Prefer reusing these tokens when changing styles instead of adding a new literal for a value already represented by a token.

The administration area uses a separate set of `--admin-*` tokens in `css/admin.css`. Keep the public and admin themes separate unless a future change explicitly verifies that sharing them will not change the visual design.

## Buttons

The current public UI uses `.btn` as the base class and combines it with variants and Bootstrap utility classes. Continue using these classes until a visual regression pass confirms any proposed consolidation.

```html
<a class="btn btn-primary" href="#menu">Explore menu</a>
<a class="btn btn-ghost" href="#gallery">View gallery</a>
<button class="btn btn-filter" type="button" aria-pressed="false">
  Desserts
</button>
```

- `.btn`: shared geometry, typography, alignment and transition.
- `.btn-primary`: primary action appearance.
- `.btn-ghost`: low-emphasis action on the dark hero/header context.
- `.btn-filter`: category/filter control; pair with `.is-active` for the active state where the existing filtering code expects it.
- Bootstrap utilities such as `.btn-sm`, `.btn-lg` and `.w-100` are currently used in the markup. Do not remove them without checking their effect on sizing and layout.

For a new button, use the existing base and the closest existing variant. Add a new variant only if the design has a real distinct state that cannot be expressed with existing rules.

## Safe change rules

1. Keep `type="button"` on buttons that should not submit a form; use `type="submit"` for form submission.
2. Preserve accessible names and states such as `aria-label`, `aria-pressed` and disabled behavior.
3. Preserve existing DOM hooks (`id`, classes and `data-*` attributes) consumed by JavaScript.
4. Before deleting a CSS selector, check HTML, JavaScript-created markup, class toggles, Bootstrap behavior, media queries and pseudo-states (`:hover`, `:focus-visible`, `:disabled`).
5. Check desktop, tablet and mobile layouts after changing shared rules because one selector can affect many pages and generated cards.

## Adding a component

1. Search for an existing component with the same purpose.
2. Reuse its base class and tokens.
3. Add only the minimal variant-specific CSS required.
4. Keep behavior in the existing JavaScript module that owns that feature; do not add inline event handlers.
5. Validate keyboard/focus behavior, responsive layout and existing feature flows.
