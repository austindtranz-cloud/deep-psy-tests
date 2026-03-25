# DEEP PSY TESTS — Архитектура проекта (v10e)

> **Этот документ — полный контекст проекта.** Любая нейросеть или разработчик, прочитав его, получит 100% понимание того, что здесь есть, как оно связано и зачем.

---

## 1. Что это

**DEEP PSY TESTS** — модульный каталог психологических тестов, встроенный в сайт на Тильде ([deeppsysolutions.com](https://deeppsysolutions.com)). Код хостится на **GitHub Pages** и подгружается в Тильду через JS-лоадер.

### Ключевая архитектура

```
┌──────────────────────┐      ┌──────────────────────────────┐
│   ТИЛЬДА (CMS)       │      │  GITHUB PAGES (CDN)          │
│                      │      │  austindtranz-cloud.github.io │
│  Алиас/js.txt ──────────────→  /deep-psy-tests/            │
│  (T123 блок)         │      │    ├── core/                  │
│                      │      │    │   ├── engine.js           │
│  Алиас/css.txt       │      │    │   ├── engine_results.js   │
│  (T123 блок)         │      │    │   ├── sidebar.js          │
│                      │      │    │   ├── success_modal.js    │
│  HTML-шаблон         │      │    │   └── style.css           │
│  (T123 блок)         │      │    └── data/                   │
│  с data-category-id  │      │        ├── test_registry.js    │
└──────────────────────┘      │        ├── smil_566.js         │
                              │        └── leongard.js         │
                              └──────────────────────────────┘
```

---

## 2. Дерево файлов

```
deep-psy-tests/
│
├── .nojekyll                 # Отключает Jekyll на GitHub Pages (кириллица ломает сборку)
├── .gitignore
├── README.md                 # Общее описание проекта
├── PROJECT_STRUCTURE.md      # ← ВЫ ЗДЕСЬ
├── FUTURE_TODO.md            # Планы на будущее (фичи, CRM)
│
├── core/                     # ЯДРО ДВИЖКА (загружается на GitHub Pages)
│   ├── engine.js             # Главный движок: открытие тестов, квиз, навигация, авто-переход
│   ├── engine_results.js     # Рендер результатов: шкалы, бары, интерпретации, лид-форма
│   ├── sidebar.js            # Боковая панель: «Меню и результаты», пройденные тесты
│   ├── success_modal.js      # Модальное окно после отправки лид-формы
│   └── style.css             # Все стили каталога (CSS-переменные, адаптив, тёмная тема)
│
├── data/                     # ДАННЫЕ (загружается на GitHub Pages)
│   ├── test_registry.js      # МАСТЕР-РЕЕСТР: 10 категорий, 51 тест, вся метадата
│   ├── smil_566.js           # Полные данные СМИЛ (MMPI-2): 566 вопросов + ключи + scoring
│   └── leongard.js           # Полные данные Леонгарда-Шмишека: 88 вопросов + ключи
│
├── Алиас/                    # ШАБЛОНЫ ДЛЯ ВСТАВКИ В ТИЛЬДУ (T123 блоки)
│   ├── js.txt                # Лоадер (вставляется в T123 на КАЖДОЙ странице с тестами)
│   ├── css.txt               # Дополнительные стили для Тильды (вставляется в T123)
│   └── html_внутренняя.txt   # HTML-шаблон для внутренних страниц категорий
│
├── Главная страница/         # Контент Тильды для главной /tests
│
├── 1. Исследование личности/ # Контент Тильды для /tests/personality
├── 2. Психические функции/   # Контент Тильды для /tests/mental
├── 3. Адаптация/             # ... /tests/adaptation
├── 4. Психиатрия/            # ... /tests/psychiatry
├── 5. Межличностные отношения/
├── 6. Карьера/
├── 7. Команда/
├── 8. Организация/
├── 9. Психоаналитика/
├── 10. Эффективность терапии/
│
├── ДОКУМЕНТАЦИЯ/             # Дополнительная документация
├── Бизнес_требования_*.docx  # Бизнес-требования к системе
└── ссылки_для_тильды.txt     # Прямые ссылки на CDN GitHub Pages
```

---

## 3. Как работает (полный цикл)

### 3.1. Загрузка страницы

1. Пользователь открывает, например, `deeppsysolutions.com/tests/personality`
2. Тильда рендерит свой HTML. В нём есть **два T123-блока**:
   - **JS-лоадер** (`Алиас/js.txt`): вставлен как `<script>` в T123
   - **HTML-контейнер** (`Алиас/html_внутренняя.txt`): содержит `<div id="personality-categories-container" data-category-id="personality"></div>`
3. Лоадер последовательно подключает 1 CSS + 7 JS файлов с GitHub Pages
4. После загрузки всех файлов лоадер:
   - Находит контейнер с `data-category-id`
   - Читает из `DEEP_MASTER_REGISTRY` данные для категории
   - Записывает их в `window.DEEP_CATEGORY_DATA`
   - Вызывает `deepRenderCatalog(containerId)` → карточки тестов появляются

### 3.2. Прохождение теста

1. Пользователь кликает карточку теста
2. `engine.js → openTest(testId)`:
   - Проверяет, есть ли `DEEP_TESTS[testId].questions` — если нет, показывает алерт «Оцифровка не завершена»
   - Создаёт/восстанавливает сессию в `localStorage["deep-tests-state"]`
   - Открывает оверлей → рендерит стартовый экран теста
3. Квиз-режим:
   - Вопросы рендерятся один за одним
   - **Авто-переход** (200ms): выбор ответа → задержка → следующий вопрос
   - Кнопки «Назад» и «Далее» остаются доступными
   - `isIntro`-вопросы (инструкции СМИЛ) пропускаются при авто-переходе
4. Ответ сохраняется как **value/score** опции, НЕ как числовой индекс
5. По завершении → `mode: "result"` → рендер результатов

### 3.3. Рендер результатов

`engine_results.js → deepTestsRenderResult(test, session, appEl, allTests)`:

1. **Если тест имеет `calculateResult`** (СМИЛ, Леонгард):
   - Вызывает `test.calculateResult(session.answers)`
   - СМИЛ возвращает `{ scores, scales, interpretations }` → `renderCustomResult()`
   - Леонгард возвращает массив `[{ title, score, maxScore, label }]` → `renderArrayResult()`
2. **Иначе** — generic scoring:
   - Считает баллы по шкалам из `q.options[].score` или `q.options[].value`
   - Определяет зоны: ok / warn / risk
   - Генерирует интерпретации

Обе ветки используют `assembleResultPage()` для финальной сборки HTML (заключение, карточки шкал, форма отправки, CTA).

### 3.4. Лид-форма и отправка

1. Форма «Получить отчёт» запрашивает имя, email, контакт
2. Данные сохраняются в `localStorage["deep-tests-user-profile"]`
3. Нажатие «Получить отчёт» → `window.deepShowSuccessModal()` → модальное окно
4. *(В планах)* `window.deepSubmitToCRM()` → отправка в Bpium/Webhook

---

## 4. Глобальные объекты (window.*)

| Объект | Файл-источник | Описание |
|---|---|---|
| `DEEP_MASTER_REGISTRY` | `test_registry.js` | Объект: 10 категорий → подкатегории → тесты (метадата) |
| `DEEP_TESTS` | `test_registry.js` + `smil_566.js` + `leongard.js` | Объект: полные данные тестов (вопросы, шкалы, scoring) |
| `DEEP_TEST_REGISTRY` | `test_registry.js` | Плоский массив: 51 тест (для поиска/фильтрации) |
| `DEEP_CATEGORY_DATA` | Устанавливается лоадером | Данные текущей категории (из DEEP_MASTER_REGISTRY) |
| `TESTS` | Лоадер (hotfix) | = `DEEP_TESTS` (для совместимости со старым engine.js) |
| `deepRenderCatalog(containerId)` | `engine.js` | Рендер карточек тестов в контейнер |
| `deepTestsRenderResult(test, s, app, all)` | `engine_results.js` | Рендер результатов теста |
| `deepTestsOpen(testId)` | `engine.js` | Открыть тест |
| `deepShowSuccessModal()` | `success_modal.js` | Модальное окно после отправки |
| `deepSidebarRefresh()` | `sidebar.js` | Обновить боковую панель |

---

## 5. Формат данных тестов

### 5.1. Запись в DEEP_MASTER_REGISTRY (метадата)

```javascript
{
  categoryId: "personality",
  categoryTitle: "Исследование личности",
  subcategories: [
    {
      subId: "structure",
      subTitle: "Структура личности",
      tests: [
        {
          id: "personality_smil_566",
          title: "СМИЛ (MMPI-2) — 566 вопросов",
          measures: "Клинические шкалы",
          estTime: "60-90",
          legalStatus: "restricted",  // restricted | free | licensed
          isRunnable: true            // есть ли оцифрованные вопросы
        }
      ]
    }
  ]
}
```

### 5.2. Полные данные теста (DEEP_TESTS)

```javascript
// Простой тест (rosenberg, tipi):
{
  id: "rosenberg",
  title: "Шкала самоуважения Розенберга",
  questions: [
    {
      id: "r1",
      text: "Я чувствую, что я достойный человек...",
      scale: "self_esteem",
      options: [
        { text: "Полностью согласен", value: 3 },
        { text: "Согласен", value: 2 },
        ...
      ]
    }
  ],
  scales: {
    self_esteem: { title: "Самоуважение", max: 30, ranges: [...] }
  }
}

// Тест с calculateResult (leongard, smil_566):
{
  id: "leongard",
  title: "Опросник Леонгарда-Шмишека",
  questions: [ { id: "q1", text: "...", options: [{text:"Да",value:"yes"}, {text:"Нет",value:"no"}] } ],
  keys: { hyper: { yes: [1, 11, 23...], no: [] }, ... },
  coeffs: { hyper: 3, stuck: 2, ... },
  calculateResult: function(answers) { /* returns array of score objects */ }
}
```

---

## 6. Хранение данных (localStorage)

| Ключ | Формат | Описание |
|---|---|---|
| `deep-tests-state` | `{ activeTestId, sessions: { [testId]: { currentIndex, mode, answers, completedAt } } }` | Состояние всех тестов |
| `deep-tests-user-profile` | `{ name, email, contact_alt }` | Кеш данных пользователя |

### Формат ответа в session.answers

```javascript
// Для тестов с числовыми значениями (rosenberg):
answers["r1"] = 3  // значение опции (value)

// Для тестов с текстовыми значениями (leongard):
answers["q1"] = "yes"  // значение опции (value)

// Для СМИЛ:
answers["smil_1"] = 1  // score опции (1=верно, 0=неверно)
```

---

## 7. Порядок загрузки файлов (критично!)

Лоадер загружает файлы с `async = false` — они выполняются **строго по порядку**:

```
1. style.css             ← стили (параллельно)
2. test_registry.js      ← DEEP_MASTER_REGISTRY + DEEP_TESTS (метадата 51 теста)
3. engine.js             ← движок квиза + deepRenderCatalog
4. engine_results.js     ← рендер результатов
5. sidebar.js            ← боковая панель
6. success_modal.js      ← модалка успеха
7. smil_566.js           ← ПЕРЕЗАПИСЫВАЕТ DEEP_TESTS["personality_smil_566"] полными данными
8. leongard.js           ← ПЕРЕЗАПИСЫВАЕТ DEEP_TESTS["leongard"] полными данными
```

> **Важно:** `test_registry.js` создаёт записи в `DEEP_TESTS` для всех 51 теста (с метадатой). Затем `smil_566.js` и `leongard.js` **перезаписывают** свои записи полными данными (вопросы + скоринг). Порядок критичен — файлы данных ДОЛЖНЫ грузиться ПОСЛЕ `test_registry.js`.

---

## 8. Интеграция с Тильдой

### 8.1. Главная страница (/tests)

Содержит:
- T123 блок с `Алиас/js.txt` (лоадер)
- T123 блок с `Алиас/css.txt` (стили тильды)
- Своя вёрстка: поиск, карточки категорий, кнопка «Меню и результаты»

### 8.2. Внутренние страницы (/tests/personality, /tests/mental, ...)

Содержат:
- T123 блок с `Алиас/js.txt` (тот же лоадер)
- T123 блок с HTML-контейнером, где обязательно есть:
  ```html
  <div id="personality-categories-container" data-category-id="personality"></div>
  ```
- Атрибут `data-category-id` определяет, какую категорию рендерить

### 8.3. Маппинг category-id → URL

| data-category-id | Тильда URL | Названи |
|---|---|---|
| `personality` | /tests/personality | Исследование личности |
| `mental_functions` | /tests/mental | Психические функции |
| `adaptation` | /tests/adaptation | Адаптация и стресс |
| `psychiatry` | /tests/psychiatry | Психиатрия |
| `relationships` | /tests/relationships | Межличностные отношения |
| `career` | /tests/career | Карьера и профориентация |
| `team` | /tests/team | Команда и лидерство |
| `organization` | /tests/organization | Организационная психология |
| `psychoanalytic` | /tests/psychoanalytic | Психоаналитические методики |
| `therapy_efficacy` | /tests/therapy | Эффективность терапии |

---

## 9. Кэширование и деплой

- **GitHub Pages** деплоится автоматически при `git push origin main`
- `.nojekyll` отключает Jekyll (он падает на кириллице)
- Время деплоя: ~30-60 секунд
- Лоадер использует `?v=10e` — **менять при каждом обновлении кода** (10e → 10f → 10g)
- После изменения версии нужно обновить `Алиас/js.txt` в Тильде

---

## 10. Какие тесты оцифрованы (имеют вопросы)

| ID | Название | Вопросов | calculateResult |
|---|---|---|---|
| `rosenberg` | Шкала самоуважения Розенберга | 10 | ❌ (generic) |
| `tipi` | Экспресс-шкала Большой пятёрки (TIPI) | 10 | ❌ (generic) |
| `personality_smil_566` | СМИЛ (MMPI-2) | 566+13 intro | ✅ (T-баллы, K-коррекция) |
| `leongard` | Опросник Леонгарда-Шмишека | 88 | ✅ (акцентуации × коэффициенты) |

Все остальные 47 тестов в реестре имеют `isRunnable: true` но **без вопросов** — при клике показывают алерт «Оцифровка не завершена».

---

## 11. Как добавить новый тест

1. Создать файл `data/<test_id>.js`:
   ```javascript
   window.DEEP_TESTS = window.DEEP_TESTS || {};
   window.DEEP_TESTS["<test_id>"] = {
     id: "<test_id>",
     title: "Название",
     questions: [ { id: "q1", text: "...", options: [...] } ],
     scales: { ... },
     // Опционально:
     calculateResult: function(answers) { return [...]; }
   };
   ```
2. Добавить в лоадер (`Алиас/js.txt`):
   ```javascript
   { type: "script", url: baseUrl + "data/<test_id>.js" + v }
   ```
3. Убедиться, что в `test_registry.js` тест уже есть в `DEEP_MASTER_REGISTRY` с `isRunnable: true`
4. Обновить `?v=...` в лоадере
5. `git push origin main`
6. Обновить `Алиас/js.txt` в Тильде

---

## 12. Известные ограничения

- **Нет серверной части** — все данные в localStorage, потеряются при очистке
- **CRM-интеграция** не реализована (`deepSubmitToCRM` — заглушка)
- **Поиск** по всем тестам — работает только на главной странице
- **Стили сайдбара** на внутренних страницах могут отличаться от главной (зависит от CSS Тильды)
- Файлы `smil_566.js` (70 КБ) — тяжёлые, грузятся на каждой странице с тестами
