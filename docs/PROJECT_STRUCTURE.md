# Структура проекта DEEP Tests

Документ для контроля чистоты папок и связей между модулями. Любые перемещения файлов должны отражаться здесь.

## 1. Карта директорий

```text
/
├── _archive/                 # АРХИВ (не для Git, только локально)
│   └── stable_v15.1_*        # Снапшоты стабильных версий
│
├── core/                     # ЯДРО ДВИЖКА (Modular v16)
│   ├── templates.js          # [NEW] HTML-шаблоны, SVG-иконки, палитра, SHORT_TITLES
│   ├── nav_controller.js     # [NEW] Сайдбар: аккордеон, Home, бургер-меню
│   ├── grid_controller.js    # [NEW] Контент: категории, тесты, алфавит, теги
│   ├── ui_controller.js      # Оркестратор: shell, delegation, quiz screens, модалки
│   ├── router.js             # URL-маршрутизация, стейт
│   ├── quiz_core.js          # Прохождение теста, сессии, автосохранение
│   ├── engine.js             # Entry Point + глобальные функции
│   ├── engine_results.js     # Подсчёт баллов, интерпретации
│   ├── sidebar.js            # Правая панель (история)
│   ├── success_modal.js      # Модалка завершения + лид-форма
│   ├── integrations.js       # CRM webhook, Telegram
│   └── style.css             # Дизайн-система v4.1 (73KB, ~3300 строк, с оглавлением)
│
├── data/                     # ДАННЫЕ
│   ├── test_registry.js      # МАСТЕР-РЕЕСТР: 10 категорий, 80+ тестов
│   └── tests/                # Модульные файлы с вопросами (Lazy Loading)
│       ├── gad7.js           # GAD-7
│       ├── phq9.js           # PHQ-9
│       ├── leongard.js       # Леонгард
│       ├── tipi.js           # TIPI-RU
│       ├── sd3.js            # Тёмная Триада
│       └── ...               # 24 файла (и растёт)
│
├── Алиас/                    # БЛОКИ TILDA (Copy-Paste)
│   ├── css.txt               # Стили для <head>
│   ├── html.txt              # HTML-контейнеры
│   └── js.txt                # Smart Loader (GitHub API)
│
├── library.html              # ДАШБОРД — точка входа Matilda Hybrid
└── README.md                 # Документация проекта
```

## 2. Порядок загрузки скриптов

```text
1. test_registry.js     ← данные (window.DEEP_TEST_REGISTRY)
2. router.js            ← состояние (DEEP_ROUTER)
3. quiz_core.js         ← quiz-сессии (DEEP_QUIZ)
4. templates.js         ← шаблоны, иконки, палитра (DEEP_TPL) — 0 зависимостей
5. nav_controller.js    ← навигация (DEEP_NAV) → зависит от DEEP_TPL
6. grid_controller.js   ← контент (DEEP_GRID) → зависит от DEEP_TPL, DEEP_NAV
7. ui_controller.js     ← оркестратор (DEEP_UI) → зависит от DEEP_TPL, DEEP_NAV, DEEP_GRID
8. engine_results.js    ← подсчёт баллов
9. success_modal.js     ← модалка завершения
10. integrations.js     ← CRM/Telegram
11. sidebar.js          ← история результатов
12. engine.js           ← bootstrap (DEEP_CORE) → инициализирует всё
```

## 3. Модули — краткое описание

### `templates.js` → `window.DEEP_TPL`
Чистые данные, никакой работы с DOM. Содержит:
- **ICONS** — SVG-иконки (questions, time, check, wip, burger, close, search, chevron)
- **CAT_COLORS** — градиенты категорий
- **CAT_ICONS** — SVG-иконки категорий
- **SHORT_TITLES** — сокращённые названия для сайдбара
- **TEMPLATES** — HTML-шаблоны (testCard, catCard, scoreCard, resultScreen, startScreen)

### `nav_controller.js` → `window.DEEP_NAV`
- `render(reg, activeCatId)` — рендер всего сайдбара
- `_attachAccordion(nav)` — эксклюзивный аккордеон (toggle-to-close, CSS transitions)
- `_attachHomeButton(nav)` — кнопка «Каталог»

### `grid_controller.js` → `window.DEEP_GRID`
- `renderContent({ renderNav: bool })` — единая точка входа (header + grid ± nav)
- `renderCategoryCards(reg)` — обзорные карточки категорий
- `renderTestGrid(reg, catId, query)` — сетка тестов по подкатегориям
- `renderAlphabeticalGrid(reg, query)` — А-Я список с picker
- `renderKeywordsGrid(reg)` — 3-колоночная сетка тегов с аккордеоном

### `ui_controller.js` → `window.DEEP_UI`
- `renderDashboardShell(containerId)` — создание DOM-каркаса
- `_attachGlobalDelegation(container)` — тултипы, табы, Letter Picker
- `updateDashboardGrid()` — полное обновление (nav + content)
- `_updateContentOnly()` — обновление без перерендера nav (для CSS transitions)
- `renderScreen / renderQuiz / renderStart` — quiz UI

### `router.js` → `window.DEEP_ROUTER`
URL-маршрутизация, автоопределение категории по URL, синхронизация состояния.

### `quiz_core.js` → `window.DEEP_QUIZ`
Только логика. Хранит ответы, управляет `localStorage` ключом `deep-tests-engine-v4`.

---

*Документ актуализирован: 29.03.2026 02:35 (МСК+5) — v16.1 UI Overhaul*
