# PLAN: Merge Coordinator

## Цель
Безопасное слияние 4 агентских веток в ветку `merge/agents-batch-2026-03-28`.

Ветки для слияния:
1. `agent/dev-main-2026-03-28` (Базовая архитектура и workflow)
2. `agent/test-research-2026-03-28` (Добавление новых тестов, JSON-конфигов)
3. `agent/ui-review-2026-03-28` (UI-рефакторинг, CSS, верстка)
4. `agent/integration-guard-2026-03-28` (Реестр, ядро логики)

## Предполагаемый порядок слияния:
1. **`agent/dev-main-2026-03-28`** — содержит базовые правила (AGENTS_PARALLEL_WORKFLOW.md, .gitignore). Минимальный шанс конфликтов.
2. **`agent/test-research-2026-03-28`** — содержит файлы данных тестов (`data/tests/*.js`). Независимые файлы.
3. **`agent/ui-review-2026-03-28`** — содержит CSS/HTML правки (стили, UI). Возможно, затрагивает `index.html` и `css/`.
4. **`agent/integration-guard-2026-03-28`** — содержит ядро и связи (`engine.js`, `test_registry.js`). Вливаем в последнюю очередь, чтобы связать UI и данные.

## Шаги:
1. `git merge origin/agent/dev-main-2026-03-28`
2. `git merge origin/agent/test-research-2026-03-28`
3. `git merge origin/agent/ui-review-2026-03-28`
4. `git merge origin/agent/integration-guard-2026-03-28`
5. В случае конфликта -> Фиксация в MERGE_NOTES.md -> Остановка для ручного фикса или запроса.
