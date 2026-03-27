/**
 * DEEP PSY TESTS — MASTER REGISTRY (v9 Full Structure)
 * Contains all categories, subcategories and test metadata.
 */

window.DEEP_TESTS = window.DEEP_TESTS || {};

window.DEEP_MASTER_REGISTRY = {
  "personality": {
    categoryId: "personality",
    categoryTitle: "Исследование личности",
    categoryDescription: "Комплексная оценка структуры личности, акцентуаций, темперамента, самооценки, мотивации и личностных черт.",
    subcategories: [
      {
        subId: "clinical_screening", subTitle: "Клинический скрининг", tests: [
          { id: "ipip_dsm5", title: "Теневая сторона личности", shortTitle: "IPIP-DSM5", measures: "5 доменов дезадаптации: негативная аффективность, отстранённость, антагонизм, расторможенность, психотизм", items: "25", time: "3-4 минуты", legalStatus: "public", isRunnable: false, replacement: "MMPI-2 / СМИЛ", titleEn: "IPIP-DSM-5 Proxy", authors: "L. Goldberg (IPIP)", marketingTitle: "Теневая сторона личности: Скрининг уязвимостей" }
        ]
      },
      {
        subId: "fundamental_traits", subTitle: "Фундаментальные черты (Big Five)", tests: [
          { id: "ipip50", title: "ДНК Характера: Модель Большой Пятерки", shortTitle: "IPIP-50", measures: "OCEAN: Открытость, Добросовестность, Экстраверсия, Доброжелательность, Нейротизм", items: "50", time: "5-7 минут", legalStatus: "public", isRunnable: false, replacement: "NEO-PI-R / NEO-FFI", titleEn: "IPIP-50 Big Five Factor Markers", authors: "L. Goldberg (IPIP)", marketingTitle: "ДНК Характера: Модель Большой Пятерки" },
          { id: "tipi", title: "TIPI-RU (Большая Пятёрка — экспресс)", shortTitle: "TIPI", measures: "5 факторов личности (экспресс)", items: "10", time: "2 минуты", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "profiling", subTitle: "Профилирование и Soft-Skills", tests: [
          { id: "ipip16", title: "Матрица 16 граней: Карьерный профиль", shortTitle: "IPIP-16", measures: "16 факторов характера: Теплота, Логика, Смелость, Доминантность, Тревожность и др.", items: "32", time: "3-4 минуты", legalStatus: "public", isRunnable: false, replacement: "16PF (Кеттелл)", titleEn: "IPIP-16 Short Proxy", authors: "L. Goldberg (IPIP)", marketingTitle: "Матрица 16 граней: Карьерный и бизнес-профиль" }
        ]
      },
      {
        subId: "accentuations", subTitle: "Акцентуации", tests: [
          { id: "leongard", title: "Карта скрытых конфликтов (Леонгард–Шмишек)", shortTitle: "ЛШ-88", measures: "10 типов акцентуаций характера", items: "88", time: "5-7 минут", legalStatus: "public", isRunnable: true, authors: "К. Леонгард, Н. Шмишек (1970)", titleEn: "Schmieschek Questionnaire", marketingTitle: "Карта скрытых конфликтов: Твои точки срыва" },
          { id: "lichko_proxy", title: "Матрица Радикалов (IPIP-Lichko Proxy)", shortTitle: "ЛИЧКО", measures: "11 психологических радикалов: шизоидный, эпилептоидный, истероидный и др.", items: "33", time: "3-4 минуты", legalStatus: "public", isRunnable: false, replacement: "ПДО (Личко)", titleEn: "IPIP-Lichko Adult Character Style Matrix", authors: "Адаптация A.E. Личко для B2C", marketingTitle: "Матрица Радикалов: Ваш истинный психологический тип" },
          { id: "sd3", title: "Dark Triad (SD3)", shortTitle: "SD3", measures: "Макиавеллизм, нарциссизм, психопатия", items: "27", time: "5-10 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "temperament", subTitle: "Темперамент", tests: [
          { id: "ipip_pen", title: "Биологический код: Карта темперамента", shortTitle: "PEN-24", measures: "Экстраверсия, Нейротизм, Психотизм + Шкала лжи → Квадрат Галена-Айзенка", items: "24", time: "1.5-2 минуты", legalStatus: "public", isRunnable: false, replacement: "EPQ / EPI (Айзенк)", titleEn: "IPIP-PEN B2C Proxy", authors: "На базе H. Eysenck", marketingTitle: "Биологический код: Карта вашего темперамента" },
          { id: "pavlov_proxy", title: "Neuro-Продуктивность: Запас прочности", shortTitle: "НС-21", measures: "Сила возбуждения, Сила торможения, Подвижность нервной системы", items: "21", time: "2-3 минуты", legalStatus: "public", isRunnable: false, replacement: "FCB-TI (Стреляу)", titleEn: "IPIP-Pavlovian Temperament Proxy", authors: "На базе Я. Стреляу / И.П. Павлова", marketingTitle: "Neuro-Продуктивность: Ваш запас прочности" }
        ]
      },
      {
        subId: "autonomy", subTitle: "Автономия и Сепарация", tests: [
          { id: "separation_proxy", title: "Индекс Взрослости: Тест на сепарацию", shortTitle: "СЕП-20", measures: "4 вектора независимости: эмоциональная, конфликтная, функциональная, ценностная", items: "20", time: "2-3 минуты", legalStatus: "public", isRunnable: false, replacement: "PSI (Hoffman)", titleEn: "B2C Separation Proxy Index", authors: "На базе J. Hoffman (1984)", marketingTitle: "Индекс Взрослости: Тест на психологическую сепарацию" }
        ]
      },
      {
        subId: "motivation", subTitle: "Мотивация и Смысл", tests: [
          { id: "bpnsfs", title: "Драйверы психики: Куда утекает энергия?", shortTitle: "БПНС-24", measures: "3 оси SDT: Автономия, Компетентность, Связанность (удовлетворение + фрустрация)", items: "24", time: "2-3 минуты", legalStatus: "public", isRunnable: false, authors: "E. Deci & R. Ryan (SDT)", titleEn: "BPNSFS (Basic Psychological Need Satisfaction & Frustration Scale)", marketingTitle: "Драйверы психики: Куда утекает ваша энергия?" }
        ]
      },
      {
        subId: "selfesteem", subTitle: "Самооценка", tests: [
          { id: "rosenberg", title: "Индекс Самоценности (Розенберг)", shortTitle: "RSES", measures: "Глобальная базовая самооценка, внутренний критик", items: "10", time: "<1 минуты", legalStatus: "public", isRunnable: true, authors: "Morris Rosenberg (1965)", titleEn: "Rosenberg Self-Esteem Scale (RSES)", marketingTitle: "Индекс Самоценности: Насколько силён ваш Внутренний Критик?" },
          { id: "coopersmith_proxy", title: "Колесо Уверенности: Главный комплекс", shortTitle: "КУП-20", measures: "Самооценка в 4 контекстах: Профессия, Социум, Семья, Тело", items: "20", time: "2 минуты", legalStatus: "public", isRunnable: false, replacement: "Coopersmith SEI", titleEn: "IPIP-Multidimensional Self-Esteem B2C Proxy", authors: "На базе Coopersmith, IPIP", marketingTitle: "Колесо Уверенности: Где живёт ваш главный комплекс?" },
          { id: "pid5bf", title: "PID-5-BF (DSM-5 — экспресс)", shortTitle: "PID5", measures: "5 доменов патологических черт", items: "25", time: "5 минут", legalStatus: "public", isRunnable: true }
        ]
      }
    ]
  },
  "mental_functions": {
    categoryId: "mental_functions",
    categoryTitle: "Психические функции",
    categoryDescription: "Сборник тестов для оценки когнитивных способностей, памяти, внимания, интеллекта и мышления.",
    subcategories: [
      {
        subId: "cognition", subTitle: "Когнитивные функции", tests: [
          { id: "schulte", title: "Таблицы Шульте", measures: "Устойчивость внимания и темп деятельности", items: "5 таблиц", time: "5-10 минут", legalStatus: "public", isRunnable: true },
          { id: "stroop", title: "Тест Струпа", measures: "Когнитивная гибкость и помехоустойчивость", items: "100 стимулов", time: "5 минут", legalStatus: "public", isRunnable: true },
          { id: "bourdon", title: "Корректурная проба (Бурдон)", measures: "Концентрация внимания", items: "1 страница", time: "10 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "intelligence", subTitle: "Интеллект", tests: [
          { id: "raven", title: "Прогрессивные матрицы Равена", measures: "Невербальный интеллект (g-фактор)", items: "60", time: "20-40 минут", legalStatus: "proprietary", isRunnable: false },
          { id: "cfit", title: "CFIT (Тест Кеттелла)", measures: "Свободный от культуры интеллект", items: "50", time: "12-15 минут", legalStatus: "proprietary", isRunnable: false }
        ]
      },
      {
        subId: "memory", subTitle: "Память", tests: [
          { id: "luria_memory", title: "Методика Лурия '10 слов'", measures: "Объем кратковременной и долговременной памяти", items: "10 слов", time: "10 минут", legalStatus: "public", isRunnable: true }
        ]
      }
    ]
  },
  "adaptation": {
    categoryId: "adaptation",
    categoryTitle: "Адаптация и дезадаптация",
    categoryDescription: "Скрининг стрессоустойчивости, выгорания и паттернов совладания с трудностями.",
    subcategories: [
      {
        subId: "stress", subTitle: "Стресс", tests: [
          { id: "holmes_rahe", title: "Шкала стрессовых событий Холмса-Рея", measures: "Уровень стрессовой нагрузки", items: "43", time: "5 минут", legalStatus: "public", isRunnable: true },
          { id: "pss10", title: "PSS-10 (Perceived Stress Scale)", measures: "Воспринимаемый стресс", items: "10", time: "3-5 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "burnout", subTitle: "Выгорание", tests: [
          { id: "cbi", title: "Копенгагенский опросник выгорания (CBI)", measures: "Личное, рабочее и клиентское выгорание", items: "19", time: "5-7 минут", legalStatus: "public", isRunnable: true },
          { id: "uwes", title: "Шкала увлеченности работой (UWES)", measures: "Профессиональная вовлеченность", items: "17", time: "5 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "coping", subTitle: "Копинг-стратегии", tests: [
          { id: "cope", title: "COPE / Brief-COPE", measures: "Стратегии совладания со стрессом", items: "28", time: "5-10 минут", legalStatus: "public", isRunnable: true },
          { id: "wocq", title: "Опросник способов совладания (Lazarus)", measures: "Копинг-механизмы", items: "50", time: "10-15 минут", legalStatus: "public", isRunnable: true },
          { id: "resilience14", title: "RS-14 (Шкала жизнестойкости)", measures: "Индивидуальная жизнестойкость", items: "14", time: "5 минут", legalStatus: "public", isRunnable: true }
        ]
      }
    ]
  },
  "psychiatry": {
    categoryId: "psychiatry",
    categoryTitle: "Психиатрия",
    categoryDescription: "Клинические скрининги тревожных, депрессивных, личностных расстройств и зависимостей.",
    subcategories: [
      {
        subId: "anxiety_depression", subTitle: "Тревога и депрессия", tests: [
          { id: "phq9", title: "PHQ-9", measures: "Депрессия (скрининг)", items: "9", time: "3-5 минут", legalStatus: "public", isRunnable: true },
          { id: "gad7", title: "GAD-7", measures: "Генерализованная тревога", items: "7", time: "2-3 минуты", legalStatus: "public", isRunnable: true },
          { id: "mdq", title: "MDQ", measures: "Скрининг биполярного расстройства", items: "13+", time: "5 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "addictions", subTitle: "Зависимости", tests: [
          { id: "audit", title: "AUDIT", measures: "Алкогольная зависимость", items: "10", time: "3 минуты", legalStatus: "public", isRunnable: true },
          { id: "dast", title: "DAST", measures: "Наркотическая зависимость", items: "10-20", time: "5 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "eating_disorders", subTitle: "РПП", tests: [
          { id: "eat26", title: "EAT-26", measures: "Расстройства пищевого поведения", items: "26", time: "5-10 минут", legalStatus: "public", isRunnable: true },
          { id: "scoff", title: "SCOFF", measures: "Экспресс-скрининг РПП", items: "5", time: "1-2 минуты", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "neurodiversity", subTitle: "Нейроотличнось", tests: [
          { id: "aq", title: "Опросник аутистического спектра (AQ)", measures: "Аутичные черты личности", items: "50", time: "10-15 минут", legalStatus: "public", isRunnable: true }
        ]
      }
    ]
  },
  "relationships": {
    categoryId: "relationships",
    categoryTitle: "Межличностные отношения и сексуальность",
    categoryDescription: "Диагностика привязанности, семейных систем и сексуальной сферы.",
    subcategories: [
      {
        subId: "attachment", subTitle: "Привязанность", tests: [
          { id: "ecrr", title: "ECR-R", measures: "Тревожность и избегание в привязанности", items: "36", time: "10 минут", legalStatus: "public", isRunnable: true },
          { id: "ras", title: "RAS (Relationship Assessment Scale)", measures: "Удовлетворенность отношениями", items: "7", time: "2-3 минуты", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "sexuality", subTitle: "Сексуальная сфера", tests: [
          { id: "asex", title: "ASEX (Arizona Sexual Experience Scale)", measures: "Сексуальная дисфункция", items: "5", time: "2 минуты", legalStatus: "public", isRunnable: true },
          { id: "fsfi", title: "FSFI (Female Sexual Function Index)", measures: "Сексуальное функционирование (жен)", items: "19", time: "7 минут", legalStatus: "public", isRunnable: true },
          { id: "iief", title: "IIEF (International Index of Erectile Function)", measures: "Эректильная функция (муж)", items: "15", time: "5 минут", legalStatus: "public", isRunnable: true }
        ]
      }
    ]
  },
  "career": {
    categoryId: "career",
    categoryTitle: "Индивидуальное карьерное консультирование",
    categoryDescription: "Профориентация, карьерная адаптивность и планирование развития.",
    subcategories: [
      {
        subId: "vocation", subTitle: "Профориентация", tests: [
          { id: "holland", title: "Опросник Холланда (RIASEC)", measures: "Профессиональные типы личности", items: "42 пары", time: "10 минут", legalStatus: "public", isRunnable: true },
          { id: "schein_anchors", title: "Якоря карьеры (Э. Шейн)", measures: "Профессиональные ценностные ориентации", items: "41", time: "15 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "adaptability", subTitle: "Карьерная адаптивность", tests: [
          { id: "savickas", title: "CAAS (Career Adapt-Abilities Scale)", measures: "Готовность к изменениям в карьере", items: "24", time: "10 минут", legalStatus: "public", isRunnable: true }
        ]
      }
    ]
  },
  "team": {
    categoryId: "team",
    categoryTitle: "Командное консультирование",
    categoryDescription: "Диагностика группового взаимодействия, сильных сторон и командного климата.",
    subcategories: [
      {
        subId: "team_dynamics", subTitle: "Командная динамика", tests: [
          { id: "belbin", title: "Командные роли Белбина", measures: "Групповые роли по Белбину", items: "7 блоков", time: "20 минут", legalStatus: "proprietary", isRunnable: false },
          { id: "wleis", title: "WLEIS (Emotion Intelligence)", measures: "Эмоциональный интеллект лидера/команды", items: "16", time: "5 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "strengths", subTitle: "Сильные стороны", tests: [
          { id: "via_character", title: "VIA Character Strengths", measures: "Черты характера (сильные стороны)", items: "120", time: "20-30 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "conflict", subTitle: "Конфликтология", tests: [
          { id: "tki", title: "Тест Томаса–Килманна (TKI)", measures: "Стили поведения в конфликте", items: "30 пар", time: "10 минут", legalStatus: "proprietary", replacement: "ROCI-II", isRunnable: false },
          { id: "roci2", title: "ROCI-II (Rahim)", measures: "Межличностные стили в конфликте", items: "28", time: "7 минут", legalStatus: "public", isRunnable: true }
        ]
      }
    ]
  },
  "organization": {
    categoryId: "organization",
    categoryTitle: "Организационное консультирование",
    categoryDescription: "Оценка организационной культуры, климата и вовлеченности сотрудников.",
    subcategories: [
      {
        subId: "culture", subTitle: "Корпоративная культура", tests: [
          { id: "ocai", title: "OCAI (К. Камерон, Р. Куинн)", measures: "Тип организационной культуры", items: "24", time: "15 минут", legalStatus: "public", isRunnable: true },
          { id: "docs", title: "Denison Organizational Culture Survey", measures: "Культура и эффективность", items: "60", time: "20 минут", legalStatus: "proprietary", isRunnable: false }
        ]
      },
      {
        subId: "engagement", subTitle: "Вовлеченность и лояльность", tests: [
          { id: "enps", title: "Employee NPS (eNPS)", measures: "Индекс лояльности сотрудников", items: "2", time: "2 минуты", legalStatus: "public", isRunnable: true },
          { id: "jss", title: "Job Satisfaction Survey (Spector)", measures: "Удовлетворенность работой", items: "36", time: "10 минут", legalStatus: "public", isRunnable: true }
        ]
      }
    ]
  },
  "psychoanalytic": {
    categoryId: "psychoanalytic",
    categoryTitle: "Психоаналитическая диагностика",
    categoryDescription: "Методики для глубинной оценки структуры личности и механизмов защиты.",
    subcategories: [
      {
        subId: "structure_level", subTitle: "Уровень организации личности", tests: [
          { id: "lsi_plutchik", title: "LSI / ИЖС (Плутчик–Келлерман)", measures: "Психологические защиты", items: "97", time: "15-20 минут", legalStatus: "public", isRunnable: true },
          { id: "dsq40", title: "DSQ-40 (Defense Style)", measures: "Стили защитных механизмов", items: "40", time: "10 минут", legalStatus: "public", isRunnable: true },
          { id: "ipo_kernberg", title: "IPO (Инвентарь Кернберга)", measures: "Пограничная организация личности", items: "83", time: "20 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "mentalization", subTitle: "Ментализация и привязанность", tests: [
          { id: "rfq", title: "RFQ (Reflective Functioning)", measures: "Способность к ментализации", items: "8", time: "3-5 минут", legalStatus: "public", isRunnable: true },
          { id: "sct", title: "SCT (Sentence Completion Test)", measures: "Проективная диагностика смыслов", items: "60", time: "30 минут", legalStatus: "public", isRunnable: true }
        ]
      }
    ]
  },
  "therapy_efficacy": {
    categoryId: "therapy_efficacy",
    categoryTitle: "Оценка эффективности терапии",
    categoryDescription: "Инструменты мониторинга прогресса в терапии и качества терапевтического альянса.",
    subcategories: [
      {
        subId: "outcome", subTitle: "Мониторинг результатов", tests: [
          { id: "core10", title: "CORE-10 (Psychological Distress)", measures: "Общий уровень неблагополучия", items: "10", time: "3 минуты", legalStatus: "public", isRunnable: true },
          { id: "whodas2", title: "WHODAS 2.0 (WHO)", measures: "Уровень функциональной дезадаптации", items: "12", time: "5-7 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "alliance", subTitle: "Терапевтический альянс", tests: [
          { id: "wai", title: "WAI (Working Alliance Inventory)", measures: "Рабочий альянс (терапевт-клиент)", items: "12/36", time: "5-10 минут", legalStatus: "public", isRunnable: true },
          { id: "seq", title: "Session Evaluation Questionnaire", measures: "Качество отдельной сессии", items: "21", time: "5 минут", legalStatus: "public", isRunnable: true }
        ]
      }
    ]
  }
};

/**
 * FLAT REGISTRY FOR SEARCH & SIDEBAR (Backward Compatibility)
 * Sidebar.js expects an ARRAY for .filter() and .sort()
 */
(function () {
  var categoryUrls = {
    "personality": "/tests/personality",
    "mental_functions": "/tests/functions",
    "adaptation": "/tests/adaptation",
    "psychiatry": "/tests/psychiatry",
    "relationships": "/tests/relationships",
    "career": "/tests/career",
    "team": "/tests/team",
    "organization": "/tests/organization",
    "psychoanalytic": "/tests/psychoanalytic",
    "therapy_efficacy": "/tests/therapy"
  };

  window.DEEP_TEST_REGISTRY = []; // Used by Sidebar.js (Array)
  window.DEEP_TESTS = window.DEEP_TESTS || {}; // Used by Engine.js (Object)

  Object.keys(window.DEEP_MASTER_REGISTRY).forEach(function (catId) {
    var cat = window.DEEP_MASTER_REGISTRY[catId];
    cat.subcategories.forEach(function (sub) {
      sub.tests.forEach(function (test) {
        var testData = {
          id: test.id,
          title: test.title,
          measures: test.measures || "", // Used in engine cards
          category: cat.categoryTitle,
          categoryId: catId,
          url: categoryUrls[catId] || "/tests",
          subcategoryTitle: sub.subTitle,
          items: test.items,
          time: test.time,
          isRunnable: test.isRunnable !== false
        };
        window.DEEP_TEST_REGISTRY.push(testData);
        // Prevent data loss: Merge metadata with existing test logic if already loaded
        window.DEEP_TESTS[test.id] = Object.assign({}, testData, window.DEEP_TESTS[test.id] || {});
      });
    });
  });

  /* Уведомляем все модули, что реестр загружен. 
     Используется вместо setInterval-поллинга в engine.js */
  document.dispatchEvent(new CustomEvent('deep-registry-ready'));
})();
