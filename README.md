# DEEP PSY TESTS — Психометрическая система

Лидогенерационная система психометрии для компании DEEP.  
Работает на Tilda через GitHub Pages.

## Структура проекта

```
├── core/           — Модули движка (JS)
├── data/           — Реестр тестов + файлы тестов
├── dist/           — Собранный бандл (engine.min.js)
├── tilda/          — Код для вставки в Tilda (loader, стили, HTML)
├── docs/           — Документация, спеки, логи
├── content/        — SEO-контент по категориям (для Tilda-страниц)
├── prompts/        — Промпты для сбора тестов по 10 категориям
├── mcp-server/     — MCP-сервер (Python)
├── _archive/       — Бэкапы стабильных версий
└── .agents/        — Инструкции для AI-агентов
```

## Быстрый старт

1. Вставьте содержимое `tilda/loader.js` в HTML-блок Tilda
2. Добавьте `<div id="deep-categories-container"></div>` на страницу
3. Движок загрузится автоматически с GitHub Pages

## Сборка

```bash
node build.js
```

Подробная документация: [docs/README.md](docs/README.md)
