# UI_NOTES

This file contains specific observations around visual consistency, design system usage, and potential UI improvements.

## Observations
- **Legacy CSS classes duplication**: There was a clear overlap between old `.quiz-*` classes and new `.deep-tests-*` classes (e.g. `quiz-meta-row` vs `deep-tests-meta-row`, `quiz-hint` vs `deep-tests-hint`).
- **Resolution**: Normalized all dynamic HTML generation in `ui_controller.js` and `templates.js` to rely exclusively on the `deep-tests-*` prefix. Cleaned up redundant CSS in `style.css`.
- **Responsive design**: Re-mapped mobile overrides inside `style.css` (max-width 639px) to strictly target the new `.deep-tests-` classes (e.g., `.deep-tests-quiz-intro`, `.deep-tests-quiz-top`).
