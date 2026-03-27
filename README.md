# DEEP PSY TESTS — Modular Engine v16

**Профессиональная психометрическая система**, оптимизированная для встраивания в Tilda / Webflow. Обеспечивает премиальный UX и высокую производительность.

Текущая версия: **v16 (Modular Architecture + Design System v4.1)**.

## Архитектура модулей

Система состоит из **10 JS-модулей**, каждый с чёткой зоной ответственности:

| Модуль | Файл | Зона |
|--------|------|------|
| **Templates** | `templates.js` | HTML-шаблоны, SVG-иконки, цветовая палитра, короткие лейблы |
| **Nav Controller** | `nav_controller.js` | Сайдбар, аккордеон-навигация, кнопка «Каталог» |
| **Grid Controller** | `grid_controller.js` | Рендеринг контента: категории, тесты, алфавит, теги |
| **UI Controller** | `ui_controller.js` | Инициализация shell, event delegation, quiz screens, модалки |
| **Router** | `router.js` | URL-маршрутизация, состояние приложения |
| **Quiz Core** | `quiz_core.js` | Прохождение теста, сессии, ответы, автосохранение |
| **Results** | `engine_results.js` | Подсчёт баллов, интерпретации |
| **Engine** | `engine.js` | Глобальные функции, инициализация |
| **Sidebar** | `sidebar.js` | Правая панель (история результатов) |
| **Integrations** | `integrations.js` | CRM webhook, Telegram |

### Граф зависимостей

```
templates.js (0 зависимостей)
nav_controller.js → DEEP_TPL, DEEP_ROUTER
grid_controller.js → DEEP_TPL, DEEP_NAV
ui_controller.js → DEEP_TPL, DEEP_NAV, DEEP_GRID, DEEP_ROUTER
engine.js → DEEP_UI, DEEP_QUIZ, DEEP_ROUTER
```

### Порядок загрузки (library.html)

```
1. test_registry.js     ← данные
2. router.js            ← состояние
3. quiz_core.js         ← quiz-сессии
4. templates.js         ← шаблоны (0 deps)
5. nav_controller.js    ← навигация
6. grid_controller.js   ← контент
7. ui_controller.js     ← orchestrator
8. engine_results.js    ← подсчёт
9. success_modal.js     ← модалка
10. integrations.js     ← CRM/TG
11. sidebar.js          ← история
12. engine.js           ← bootstrap
```

## Новое в версии v16

- **Модульная архитектура**: `ui_controller.js` (896→270 строк) разбит на 4 модуля с чёткими зонами ответственности
- **Единый API шаблонов**: Все HTML-шаблоны, иконки и цвета доступны через `window.DEEP_TPL`
- **CSS Table of Contents**: Оглавление в начале `style.css` для быстрой навигации
- **Дедупликация**: `updateDashboardGrid` и `_updateContentOnly` используют общий `DEEP_GRID.renderContent()`
- **Design System v4.1**: Полный переход на CSS-токены, шрифты Manrope/Source Sans Pro

## Как добавить новый тест

1. Создайте файл `data/tests/[testId].js` с вопросами
2. Добавьте запись в `data/test_registry.js`
3. Готово — движок автоматически подгрузит тест при открытии

## Документация разработчика

Перед внесением изменений изучите **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)**.
