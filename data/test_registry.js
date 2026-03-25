/**
 * Глобальный реестр всех психологических тестов проекта.
 * Используется для поиска и алфавитного указателя.
 */

window.DEEP_TEST_REGISTRY = [
  // 1. Исследование личности
  { id: 'personality_smil_566', title: 'СМИЛ (MMPI-2) — 566 вопросов', url: '/tests/personality', tags: 'личность, клинический, монстр, mmpi, собчик' },
  { id: 'leongard', title: 'Опросник Леонгарда-Шмишека', url: '/tests/personality', tags: 'акцентуации, характер, темперамент' },
  { id: 'pdo', title: 'ПДО (Личко)', url: '/tests/personality', tags: 'подростки, акцентуации, характер' },
  { id: 'epiq', title: 'EPI / EPQ (Айзенк)', url: '/tests/personality', tags: 'темперамент, экстраверсия, нейротизм' },
  { id: 'rosenberg', title: 'Шкала самоуважения Розенберга (RSES)', url: '/tests/personality', tags: 'самооценка, уверенность' },
  { id: 'tipi', title: 'TIPI-RU (Большая Пятёрка)', url: '/tests/personality', tags: 'личность, черты, экспресс' },
  { id: 'pid5bf', title: 'PID-5-BF (DSM-5)', url: '/tests/personality', tags: 'патология, личность, психиатрия' },
  { id: 'sd3', title: 'Dark Triad (SD3)', url: '/tests/personality', tags: 'темная триада, макиавеллизм, нарциссизм' },
  { id: 'dsq', title: 'DSQ-40 (Стили защит)', url: '/tests/personality', tags: 'защиты, психоанализ' },

  // 2. Психические функции
  { id: 'dass21', title: 'DASS-21 (Депрессия, тревога, стресс)', url: '/tests/mental', tags: 'эмоции, депрессия, тревога, стресс' },
  { id: 'morosanova', title: 'Шкала саморегуляции (Моросанова)', url: '/tests/mental', tags: 'воля, самоконтроль' },
  { id: 'gse', title: 'Общая самоэффективность (Schwarzer)', url: '/tests/mental', tags: 'мотивация, уверенность' },
  { id: 'das_cog', title: 'DAS (Когнитивные искажения)', url: '/tests/mental', tags: 'мышление, установки' },

  // 3. Адаптация
  { id: 'cbi', title: 'CBI (Выгорание)', url: '/tests/adaptation', tags: 'работа, стресс, выгорание' },
  { id: 'pss', title: 'PSS (Воспринимаемый стресс)', url: '/tests/adaptation', tags: 'стресс, адаптация' },
  { id: 'cope', title: 'COPE (Стратегии совладания)', url: '/tests/adaptation', tags: 'копинг, стресс' },
  { id: 'bpaq', title: 'Buss-Perry (Агрессия)', url: '/tests/adaptation', tags: 'гнев, агрессия, враждебность' },

  // 4. Психиатрия
  { id: 'phq9', title: 'PHQ-9 (Депрессия)', url: '/tests/psychiatry', tags: 'депрессия, скрининг' },
  { id: 'gad7', title: 'GAD-7 (Тревога)', url: '/tests/psychiatry', tags: 'тревога, страх' },
  { id: 'mdq', title: 'MDQ (Биполярное расстройство)', url: '/tests/psychiatry', tags: 'бар, настроение' },
  { id: 'pid5', title: 'PID-5 (Клинический)', url: '/tests/psychiatry', tags: 'патология, личность' },
  { id: 'audit', title: 'AUDIT (Алкоголь)', url: '/tests/psychiatry', tags: 'зависимость, алкоголь' },
  { id: 'dast', title: 'DAST (Наркотики)', url: '/tests/psychiatry', tags: 'зависимость, наркотики' },
  { id: 'eat26', title: 'EAT-26 (РПП)', url: '/tests/psychiatry', tags: 'еда, анорексия, булимия' },
  { id: 'aq', title: 'AQ (Аутизм)', url: '/tests/psychiatry', tags: 'рас, аутизм' },
  { id: 'spq', title: 'SPQ (Шизотипичекие черты)', url: '/tests/psychiatry', tags: 'шизофрения, спектр' },

  // 5. Межличностные отношения
  { id: 'ecrr', title: 'ECR-R (Привязанность)', url: '/tests/relationships', tags: 'отношения, любовь, привязанность' },
  { id: 'abi', title: 'ABI (Абьюзивное поведение)', url: '/tests/relationships', tags: 'насилие, отношения, конфликт' },

  // 6. Карьера
  { id: 'caas', title: 'CAAS (Карьерная адаптивность)', url: '/tests/career', tags: 'работа, развитие' },
  { id: 'cdse', title: 'CDSE (Карьерные решения)', url: '/tests/career', tags: 'выбор, профессия' },
  { id: 'lses', title: 'LSES (Самоэффективность лидера)', url: '/tests/career', tags: 'лидерство, управление' },
  { id: 'cips', title: 'CIPS (Синдром самозванца)', url: '/tests/career', tags: 'самозванец, карьера' },

  // 7. Команда
  { id: 'via', title: 'VIA (Сильные стороны)', url: '/tests/team', tags: 'характер, достоинства, команда' },
  { id: 'roci2', title: 'ROCI-II (Конфликты)', url: '/tests/team', tags: 'конфликт, команда, управление' },

  // 8. Организация
  { id: 'ocai', title: 'OCAI (Оргкультура)', url: '/tests/organization', tags: 'бизнес, культура, организация' },
  { id: 'rcra', title: 'RCRA (Ролевой конфликт)', url: '/tests/organization', tags: 'роли, стресс, организация' },

  // 9. Психоаналитика
  { id: 'mipz', title: 'МИПЗ (Защиты)', url: '/tests/psychoanalytic', tags: 'защиты, плутчик' },
  { id: 'rfq', title: 'RFQ (Ментализация)', url: '/tests/psychoanalytic', tags: 'рефлексия, психоанализ' },
  { id: 'scim', title: 'SCIM (Идентичность)', url: '/tests/psychoanalytic', tags: 'я-концепция, личность' },

  // 10. Эффективность терапии
  { id: 'wai', title: 'WAI (Рабочий альянс)', url: '/tests/therapy', tags: 'терапия, психолог' },
  { id: 'seq', title: 'SEQ (Оценка сессии)', url: '/tests/therapy', tags: 'терапия, сеанс' },
  { id: 'ors', title: 'ORS (Результаты терапии)', url: '/tests/therapy', tags: 'терапия, прогресс' }
];
