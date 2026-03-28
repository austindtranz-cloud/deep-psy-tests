# UI_NOTES

This file contains specific observations around visual consistency, design system usage, and potential UI improvements.

## Observations
- **Legacy CSS classes duplication**: There was a clear overlap between old `.quiz-*` classes and new `.deep-tests-*` classes.
- **Resolution**: Normalized all dynamic HTML generation to rely exclusively on `.deep-tests-*`. Cleaned up redundant CSS in `style.css`.
- **Responsive design**: Re-mapped mobile overrides inside `style.css` to strictly target new classes.

## Phase 2 Observations (States & Buttons)
- **Button System Duplication**: The project had TWO identical button systems (`.deep-btn` and `.deep-tests-btn`) causing conflicts.
- **Resolution**: Completely removed `.deep-btn`, unified ALL javascript controllers and templates to use the official `.deep-tests-btn` convention. Added missing `:disabled` states with `opacity: 0.5; cursor: not-allowed;` to prevent active-state UI bugs on disabled buttons.
- **Option Rendering Bug**: The JS renderer in `ui_controller.js` was generating raw spans (`<span class="row">`, `<span class="check">`) inside `.deep-tests-option`. This broke the custom checkbox styling because `style.css` expected `.deep-tests-option-row` and `.deep-tests-option-check`.
- **Resolution**: Fixed the inner span templates in `ui_controller.js` to correctly align with `style.css` for proper rendering of the custom checkboxes and flex alignment during test taking.
- **Modal & Result Typography**: Verified `.deep-tests-modal` scaling (`calc(100vw - 40px)`) and typography standards (`15px` for `.deep-tests-summary`, `font-weight: 600` for titles). All conform to the design token specs.
