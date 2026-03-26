/**
 * DEEP PSY TESTS — MASTER REGISTRY (v9 Full Structure)
 * Contains all categories, subcategories and test metadata.
 */

window.DEEP_TESTS = window.DEEP_TESTS || {};

window.DEEP_MASTER_REGISTRY = {
  "personality": {
    categoryId: "personality",
    categoryTitle: "Исследование личности",
    categoryDescription: "Комплексная оценка структуры личности, акцентуаций, темперамента, самооценки и личностных черт.",
    subcategories: [
      {
        subId: "structure", subTitle: "Структура личности", tests: [
          { id: "personality_smil_566", title: "СМИЛ (MMPI-2) — 566 вопросов", measures: "Многоаспектная структура личности", items: "566", time: "40-60 минут", legalStatus: "restricted", isRunnable: true },
          { id: "16pf", title: "16PF (Кеттелл)", measures: "16 личностных факторов", items: "187", time: "35-50 минут", legalStatus: "proprietary", replacement: "IPIP 16PF", isRunnable: false },
          { id: "neopir", title: "NEO-PI-R / NEO-FFI", measures: "Большая пятерка", items: "60 или 240", time: "15-45 минут", legalStatus: "proprietary", replacement: "IPIP-NEO", isRunnable: false }
        ]
      },
      {
        subId: "accentuations", subTitle: "Акцентуации", tests: [
          { id: "leongard", title: "Опросник Леонгарда–Шмишека", measures: "Типы акцентуаций характера", items: "88", time: "15-20 минут", legalStatus: "public", isRunnable: true },
          { id: "pdo", title: "ПДО (Личко)", measures: "Типы акцентуаций", items: "143", time: "30-40 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "temperament", subTitle: "Темперамент", tests: [
          { id: "epiq", title: "EPI / EPQ (Айзенк)", measures: "Экстраверсия, нейротизм, психотизм", items: "от 57 до 90", time: "10-20 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "autonomy", subTitle: "Автономия", tests: [
          { id: "bpns", title: "Basic Psychological Needs Scale", measures: "Удовлетворенность базовых потребностей", items: "21", time: "5-10 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "selfesteem", subTitle: "Самооценка", tests: [
          { id: "rosenberg", title: "Шкала самоуважения Розенберга (RSES)", measures: "Глобальная самооценка", items: "10", time: "2-5 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "traits", subTitle: "Личностные черты", tests: [
          { id: "tipi", title: "TIPI-RU (Большая Пятёрка — экспресс)", measures: "5 факторов личности", items: "10", time: "2 минуты", legalStatus: "public", isRunnable: true },
          { id: "pid5bf", title: "PID-5-BF (DSM-5)", measures: "5 доменов патологических черт", items: "25", time: "5 минут", legalStatus: "public", isRunnable: true },
          { id: "sd3", title: "Dark Triad (SD3)", measures: "Макиавеллизм, нарциссизм, психопатия", items: "27", time: "5-10 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "jungian", subTitle: "Юнгианские / психоаналитические", tests: [
          { id: "mbti", title: "MBTI", measures: "Типология Юнга", items: "93 и более", time: "20-30 минут", legalStatus: "proprietary", replacement: "Open Jungian Type", isRunnable: false },
          { id: "dsq", title: "DSQ-40", measures: "Стили психологических защит", items: "40", time: "10-15 минут", legalStatus: "public", isRunnable: true }
        ]
      }
    ]
  },
  "mental_functions": {
    categoryId: "mental_functions",
    categoryTitle: "Психические функции",
    categoryDescription: "Оценка эмоционального состояния, волевой регуляции, мотивации, когнитивных функций и восприятия.",
    subcategories: [
      {
        subId: "emotions", subTitle: "Эмоции", tests: [
          { id: "dass21", title: "DASS-21", measures: "Депрессия, тревога, стресс", items: "21", time: "5-10 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "will_motivation", subTitle: "Воля и мотивация", tests: [
          { id: "morosanova", title: "Шкала саморегуляции (Моросанова)", measures: "Стиль саморегуляции", items: "46", time: "15-20 минут", legalStatus: "public", isRunnable: true },
          { id: "gse", title: "General Self-Efficacy Scale (Schwarzer)", measures: "Самоэффективность", items: "10", time: "3-5 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "perception", subTitle: "Восприятие", tests: [
          { id: "das_cog", title: "DAS (когнитивные искажения)", measures: "Дисфункциональные установки", items: "40", time: "15-20 минут", legalStatus: "public", isRunnable: true }
        ]
      }
    ]
  },
  "adaptation": {
    categoryId: "adaptation",
    categoryTitle: "Адаптация и дезадаптация",
    categoryDescription: "Быстрый скрининг выгорания, оценка стресса и копинг-стратегий, выявление деструктивных паттернов поведения.",
    subcategories: [
      {
        subId: "burnout", subTitle: "Быстрый скрининг выгорания", tests: [
          { id: "cbi", title: "CBI (Copenhagen Burnout Inventory)", measures: "Персональное / рабочее / клиентское выгорание", items: "19", time: "5-10 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "stress_coping", subTitle: "Стресс и копинги", tests: [
          { id: "pss", title: "PSS (Perceived Stress Scale)", measures: "Воспринимаемый стресс", items: "10", time: "3-5 минут", legalStatus: "public", isRunnable: true },
          { id: "cope", title: "COPE / Brief COPE", measures: "Стратегии совладания", items: "28", time: "10-15 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "destructors", subTitle: "Деструкторы", tests: [
          { id: "bpaq", title: "Buss–Perry Aggression Questionnaire", measures: "Агрессия (физическая, вербальная, гнев, враждебность)", items: "29", time: "7-10 минут", legalStatus: "public", isRunnable: true }
        ]
      }
    ]
  },
  "psychiatry": {
    categoryId: "psychiatry",
    categoryTitle: "Психиатрия",
    categoryDescription: "Скрининговые и клинические инструменты для оценки тревожных, депрессивных, личностных расстройств, зависимостей и психотических спектров.",
    subcategories: [
      {
        subId: "anxiety_depression_fast", subTitle: "Быстрый скрининг тревоги и депрессии", tests: [
          { id: "phq9", title: "PHQ-9", measures: "Депрессия (скрининг)", items: "9", time: "3-5 минут", legalStatus: "public", isRunnable: true },
          { id: "gad7", title: "GAD-7", measures: "Генерализованная тревога", items: "7", time: "2-3 минуты", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "mood", subTitle: "Настроение (депрессия, БАР)", tests: [
          { id: "mdq", title: "MDQ", measures: "Скрининг биполярного расстройства", items: "13 и более", time: "5 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "personality_disorders", subTitle: "Расстройства личности", tests: [
          { id: "pid5", title: "PID-5 (полный)", measures: "Патологические черты (DSM-5)", items: "220", time: "30-40 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "addictions", subTitle: "Зависимости", tests: [
          { id: "audit", title: "AUDIT", measures: "Алкогольная зависимость", items: "10", time: "3 минуты", legalStatus: "public", isRunnable: true },
          { id: "dast", title: "DAST", measures: "Наркотическая зависимость", items: "20", time: "5 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "eating", subTitle: "РПП", tests: [
          { id: "eat26", title: "EAT-26", measures: "Расстройства пищевого поведения", items: "26", time: "5-10 минут", legalStatus: "public", isRunnable: true },
          { id: "scoff", title: "SCOFF", measures: "Экспресс-скрининг РПП", items: "5", time: "1-2 минуты", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "asd", subTitle: "РАС", tests: [
          { id: "aq", title: "AQ (Autism Spectrum Quotient)", measures: "Аутистические черты", items: "50", time: "10-15 минут", legalStatus: "public", isRunnable: true },
          { id: "raadsr", title: "RAADS-R", measures: "РАС у взрослых", items: "80", time: "15-20 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "psychotic", subTitle: "Психотические спектры", tests: [
          { id: "spq", title: "SPQ", measures: "Шизотипические черты", items: "74", time: "15-20 минут", legalStatus: "public", isRunnable: true },
          { id: "pq16", title: "PQ-16", measures: "Продромальные симптомы", items: "16", time: "3-5 минут", legalStatus: "public", isRunnable: true }
        ]
      }
    ]
  },
  "relationships": {
    categoryId: "relationships",
    categoryTitle: "Межличностные отношения",
    categoryDescription: "Диагностика привязанности, семейных систем и деструктивных паттернов в близких отношениях.",
    subcategories: [
      {
        subId: "attachment", subTitle: "Привязанность", tests: [
          { id: "ecrr", title: "ECR-R", measures: "Тревожность и избегание в привязанности", items: "36", time: "10-15 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "destructive", subTitle: "Деструктивные отношения", tests: [
          { id: "abi", title: "ABI (Abusive Behavior Inventory)", measures: "Абьюзивное поведение", items: "30", time: "10 минут", legalStatus: "public", isRunnable: true }
        ]
      }
    ]
  },
  "career": {
    categoryId: "career",
    categoryTitle: "Карьера",
    categoryDescription: "Профориентация, карьерные перспективы, лидерство, управленческие кризисы, синдром самозванца и профессиональная идентичность.",
    subcategories: [
      {
        subId: "prospects", subTitle: "Карьерные перспективы", tests: [
          { id: "caas", title: "CAAS (Career Adapt-Abilities Scale)", measures: "Карьерная адаптивность", items: "24", time: "5-10 минут", legalStatus: "public", isRunnable: true },
          { id: "cdse", title: "CDSE", measures: "Самоэффективность в карьерных решениях", items: "25", time: "5-10 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "leadership", subTitle: "Лидерство / Кризисы лидерства", tests: [
          { id: "lses", title: "LSES", measures: "Самоэффективность лидера", items: "~20", time: "5-10 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "impostor", subTitle: "Синдром самозванца", tests: [
          { id: "cips", title: "CIPS (Clance Impostor Phenomenon Scale)", measures: "Выраженность синдрома самозванца", items: "20", time: "5-10 минут", legalStatus: "public", isRunnable: true }
        ]
      }
    ]
  },
  "team": {
    categoryId: "team",
    categoryTitle: "Командное консультирование",
    categoryDescription: "Оценка софт-скиллов, стилей поведения в команде, сильных/слабых сторон и конфликтных стратегий.",
    subcategories: [
      {
        subId: "strengths", subTitle: "Сильные / слабые стороны", tests: [
          { id: "via", title: "VIA Character Strengths Survey", measures: "24 черты характера", items: "120", time: "15-20 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "conflict", subTitle: "Конфликтология", tests: [
          { id: "roci2", title: "ROCI-II (Rahim)", measures: "Организационный конфликт", items: "28", time: "7-10 минут", legalStatus: "public", isRunnable: true }
        ]
      }
    ]
  },
  "organization": {
    categoryId: "organization",
    categoryTitle: "Организационное консультирование",
    categoryDescription: "Оценка организационной культуры, климата, ролевых конфликтов и системных проблем внутри компании.",
    subcategories: [
      {
        subId: "org_assessment", subTitle: "Оценка организации", tests: [
          { id: "ocai", title: "OCAI", measures: "Тип организационной культуры", items: "24", time: "10-15 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "role_conflict", subTitle: "Ролевой конфликт", tests: [
          { id: "rcra", title: "Role Conflict & Ambiguity Scale (Rizzo et al.)", measures: "Ролевой конфликт и неопределённость", items: "14", time: "5 минут", legalStatus: "public", isRunnable: true }
        ]
      }
    ]
  },
  "psychoanalytic": {
    categoryId: "psychoanalytic",
    categoryTitle: "Психоаналитическая диагностика",
    categoryDescription: "Глубинная оценка уровня организации личности, психологических защит, объектных отношений, привязанности, ментализации и идентичности.",
    subcategories: [
      {
        subId: "defenses", subTitle: "Психологические защиты", tests: [
          { id: "dsq", title: "DSQ-40", measures: "Стили психологических защит", items: "40", time: "10-15 минут", legalStatus: "public", isRunnable: true },
          { id: "mipz", title: "МИПЗ (Плутчик–Келлерман–Конте)", measures: "Напряженность 8 типов защит", items: "97", time: "15-20 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "mentalization", subTitle: "Ментализация", tests: [
          { id: "rfq", title: "RFQ", measures: "Рефлексивная функция", items: "8", time: "3-5 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "identity", subTitle: "Идентичность", tests: [
          { id: "scim", title: "SCIM", measures: "Самоконцепция и идентичность", items: "27", time: "5-10 минут", legalStatus: "public", isRunnable: true }
        ]
      }
    ]
  },
  "therapy_efficacy": {
    categoryId: "therapy_efficacy",
    categoryTitle: "Оценка эффективности терапии",
    categoryDescription: "Инструменты для мониторинга терапевтического альянса и результативности каждой сессии.",
    subcategories: [
      {
        subId: "track", subTitle: "Терапевтический альянс", tests: [
          { id: "wai", title: "WAI (Working Alliance Inventory)", measures: "Рабочий альянс", items: "36 / 12 (короткая)", time: "5-10 минут", legalStatus: "public", isRunnable: true },
          { id: "seq", title: "SEQ (Session Evaluation Questionnaire)", measures: "Оценка сессии", items: "21", time: "3-5 минут", legalStatus: "public", isRunnable: true }
        ]
      },
      {
        subId: "session", subTitle: "Результативность", tests: [
          { id: "ors", title: "ORS (Outcome Rating Scale)", measures: "Субъективные результаты терапии", items: "4", time: "1-2 минуты", legalStatus: "public", isRunnable: true },
          { id: "srs", title: "SRS (Session Rating Scale)", measures: "Удовлетворённость сессией", items: "4", time: "1-2 минуты", legalStatus: "public", isRunnable: true }
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
    "mental_functions": "/tests/mental",
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
        window.DEEP_TESTS[test.id] = testData;
      });
    });
  });
})();

/**
 * DEEP PSY TESTS — CORE TEST DATA (Runnable Questions)
 * Merges INTO existing DEEP_TESTS (populated by flat registry above)
 */
Object.assign(window.DEEP_TESTS, {
  /* ── Rosenberg Self-Esteem Scale ── */
  "rosenberg": {
    id: "rosenberg", title: "Шкала самоуважения Розенберга (RSES)", shortTitle: "RSES",
    description: "Глобальная оценка самоуважения. 10 утверждений. Адаптация: Золотарева А.А., 2020.",
    intro: "Выберите вариант, наиболее точно отражающий ваше согласие с утверждением.",
    scales: { selfesteem: { title: "Самоуважение", max: 30, ranges: [{ min: 0, max: 14, label: "Низкое" }, { min: 15, max: 25, label: "Нормальное" }, { min: 26, max: 30, label: "Высокое" }] } },
    questions: [
      { id: "rs1", scale: "selfesteem", text: "В целом я доволен собой.", options: [{ text: "Полностью не согласен", value: 0 }, { text: "Не согласен", value: 1 }, { text: "Согласен", value: 2 }, { text: "Полностью согласен", value: 3 }] },
      { id: "rs2", scale: "selfesteem", text: "Временами мне кажется, что я не совсем хорош.", options: [{ text: "Полностью не согласен", value: 3 }, { text: "Не согласен", value: 2 }, { text: "Согласен", value: 1 }, { text: "Полностью согласен", value: 0 }] },
      { id: "rs3", scale: "selfesteem", text: "Думаю, у меня есть ряд достоинств.", options: [{ text: "Полностью не согласен", value: 0 }, { text: "Не согласен", value: 1 }, { text: "Согласен", value: 2 }, { text: "Полностью согласен", value: 3 }] },
      { id: "rs4", scale: "selfesteem", text: "Многие вещи я способен делать не хуже большинства.", options: [{ text: "Полностью не согласен", value: 0 }, { text: "Не согласен", value: 1 }, { text: "Согласен", value: 2 }, { text: "Полностью согласен", value: 3 }] },
      { id: "rs5", scale: "selfesteem", text: "Мне кажется, что мне нечем гордиться.", options: [{ text: "Полностью не согласен", value: 3 }, { text: "Не согласен", value: 2 }, { text: "Согласен", value: 1 }, { text: "Полностью согласен", value: 0 }] },
      { id: "rs6", scale: "selfesteem", text: "Иногда я чувствую себя бесполезным.", options: [{ text: "Полностью не согласен", value: 3 }, { text: "Не согласен", value: 2 }, { text: "Согласен", value: 1 }, { text: "Полностью согласен", value: 0 }] },
      { id: "rs7", scale: "selfesteem", text: "Я считаю себя достойным и равным другим.", options: [{ text: "Полностью не согласен", value: 0 }, { text: "Не согласен", value: 1 }, { text: "Согласен", value: 2 }, { text: "Полностью согласен", value: 3 }] },
      { id: "rs8", scale: "selfesteem", text: "Мне бы хотелось больше уважать себя.", options: [{ text: "Полностью не согласен", value: 3 }, { text: "Не согласен", value: 2 }, { text: "Согласен", value: 1 }, { text: "Полностью согласен", value: 0 }] },
      { id: "rs9", scale: "selfesteem", text: "По большому счету я считаю себя неудачником.", options: [{ text: "Полностью не согласен", value: 3 }, { text: "Не согласен", value: 2 }, { text: "Согласен", value: 1 }, { text: "Полностью согласен", value: 0 }] },
      { id: "rs10", scale: "selfesteem", text: "Я хорошо отношусь к себе.", options: [{ text: "Полностью не согласен", value: 0 }, { text: "Не согласен", value: 1 }, { text: "Согласен", value: 2 }, { text: "Полностью согласен", value: 3 }] }
    ]
  },
  /* ── TIPI-RU ── */
  "tipi": {
    id: "tipi", title: "Экспресс-оценка Большой Пятерки (TIPI-RU)", shortTitle: "TIPI",
    description: "Самый короткий (10 пунктов) инструмент для быстрой оценки пяти факторов личности.",
    intro: "Я вижу себя как человека...",
    scales: {
      extraversion: { title: "Экстраверсия", max: 14, ranges: [{ min: 2, max: 5, label: "Низкий" }, { min: 6, max: 10, label: "Средний" }, { min: 11, max: 14, label: "Высокий" }] },
      agreeableness: { title: "Доброжелательность", max: 14, ranges: [{ min: 2, max: 5, label: "Низкий" }, { min: 6, max: 10, label: "Средний" }, { min: 11, max: 14, label: "Высокий" }] },
      conscientiousness: { title: "Добросовестность", max: 14, ranges: [{ min: 2, max: 5, label: "Низкий" }, { min: 6, max: 10, label: "Средний" }, { min: 11, max: 14, label: "Высокий" }] },
      neuroticism: { title: "Нейротизм", max: 14, ranges: [{ min: 2, max: 5, label: "Низкий" }, { min: 6, max: 10, label: "Средний" }, { min: 11, max: 14, label: "Высокий" }] },
      openness: { title: "Открытость опыту", max: 14, ranges: [{ min: 2, max: 5, label: "Низкий" }, { min: 6, max: 10, label: "Средний" }, { min: 11, max: 14, label: "Высокий" }] }
    },
    questions: [
      { id: "t1", scale: "extraversion", text: "Экстравертного, полного энтузиазма.", options: [{ text: "Полностью не согласен", value: 1 }, { text: "Не согласен", value: 2 }, { text: "Немного не согласен", value: 3 }, { text: "Нейтрально", value: 4 }, { text: "Немного согласен", value: 5 }, { text: "Согласен", value: 6 }, { text: "Полностью согласен", value: 7 }] },
      { id: "t2", scale: "agreeableness", text: "Критичного, склонного к ссорам.", options: [{ text: "Полностью не согласен", value: 7 }, { text: "Не согласен", value: 6 }, { text: "Немного не согласен", value: 5 }, { text: "Нейтрально", value: 4 }, { text: "Немного согласен", value: 3 }, { text: "Согласен", value: 2 }, { text: "Полностью согласен", value: 1 }] },
      { id: "t3", scale: "conscientiousness", text: "Надежного, дисциплинированного.", options: [{ text: "Полностью не согласен", value: 1 }, { text: "Не согласен", value: 2 }, { text: "Немного не согласен", value: 3 }, { text: "Нейтрально", value: 4 }, { text: "Немного согласен", value: 5 }, { text: "Согласен", value: 6 }, { text: "Полностью согласен", value: 7 }] },
      { id: "t4", scale: "neuroticism", text: "Тревожного, легко расстраивающегося.", options: [{ text: "Полностью не согласен", value: 1 }, { text: "Не согласен", value: 2 }, { text: "Немного не согласен", value: 3 }, { text: "Нейтрально", value: 4 }, { text: "Немного согласен", value: 5 }, { text: "Согласен", value: 6 }, { text: "Полностью согласен", value: 7 }] },
      { id: "t5", scale: "openness", text: "Открытого новому, разностороннего.", options: [{ text: "Полностью не согласен", value: 1 }, { text: "Не согласен", value: 2 }, { text: "Немного не согласен", value: 3 }, { text: "Нейтрально", value: 4 }, { text: "Немного согласен", value: 5 }, { text: "Согласен", value: 6 }, { text: "Полностью согласен", value: 7 }] },
      { id: "t6", scale: "extraversion", text: "Сдержанного, тихого.", options: [{ text: "Полностью не согласен", value: 7 }, { text: "Не согласен", value: 6 }, { text: "Немного не согласен", value: 5 }, { text: "Нейтрально", value: 4 }, { text: "Немного согласен", value: 3 }, { text: "Согласен", value: 2 }, { text: "Полностью согласен", value: 1 }] },
      { id: "t7", scale: "agreeableness", text: "Относящегося с симпатией, теплого.", options: [{ text: "Полностью не согласен", value: 1 }, { text: "Не согласен", value: 2 }, { text: "Немного не согласен", value: 3 }, { text: "Нейтрально", value: 4 }, { text: "Немного согласен", value: 5 }, { text: "Согласен", value: 6 }, { text: "Полностью согласен", value: 7 }] },
      { id: "t8", scale: "conscientiousness", text: "Неорганизованного, небрежного.", options: [{ text: "Полностью не согласен", value: 7 }, { text: "Не согласен", value: 6 }, { text: "Немного не согласен", value: 5 }, { text: "Нейтрально", value: 4 }, { text: "Немного согласен", value: 3 }, { text: "Согласен", value: 2 }, { text: "Полностью согласен", value: 1 }] },
      { id: "t9", scale: "neuroticism", text: "Спокойного, эмоционально стабильного.", options: [{ text: "Полностью не согласен", value: 7 }, { text: "Не согласен", value: 6 }, { text: "Немного не согласен", value: 5 }, { text: "Нейтрально", value: 4 }, { text: "Немного согласен", value: 3 }, { text: "Согласен", value: 2 }, { text: "Полностью согласен", value: 1 }] },
      { id: "t10", scale: "openness", text: "Традиционного, не креативного.", options: [{ text: "Полностью не согласен", value: 7 }, { text: "Не согласен", value: 6 }, { text: "Немного не согласен", value: 5 }, { text: "Нейтрально", value: 4 }, { text: "Немного согласен", value: 3 }, { text: "Согласен", value: 2 }, { text: "Полностью согласен", value: 1 }] }
    ]
  }
});
