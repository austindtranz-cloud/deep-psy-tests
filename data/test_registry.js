/**
 * DEEP PSY TESTS — GLOBAL REGISTRY (v7 Restored & Fixed)
 */
window.DEEP_TEST_REGISTRY = {
  /* 1. Исследование личности */
  'personality_smil_566': {
    id: 'personality_smil_566',
    categoryId: 'personality',
    subcategoryTitle: 'Базовая диагностика',
    title: 'СМИЛ (MMPI-2) — 566 утверждений',
    url: '/tests/personality',
    tags: 'Личность, Клиника, Адаптация, mmpi, психологический профиль',
    items: 566,
    time: '45-60'
  },
  'leongard': {
    id: 'leongard',
    categoryId: 'personality',
    subcategoryTitle: 'Базовая диагностика',
    title: 'Опросник Леонгарда-Шмишека',
    url: '/tests/personality',
    tags: 'Характер, Акцентуация, Личность',
    items: 88,
    time: '12-15'
  },
  'rosenberg': {
    id: 'rosenberg',
    categoryId: 'personality',
    subcategoryTitle: 'Базовая диагностика',
    title: 'Шкала самооценки Розенберга',
    url: '/tests/personality',
    tags: 'Самооценка, Личность',
    items: 10,
    time: '3'
  },
  'tipi': {
    id: 'tipi',
    categoryId: 'personality',
    subcategoryTitle: 'Базовая диагностика',
    title: 'TIPI (Big Five)',
    url: '/tests/personality',
    tags: 'Личность, Черты, Пятифакторный опросник',
    items: 10,
    time: '1-2'
  },
  'sd3': {
    id: 'sd3',
    categoryId: 'personality',
    subcategoryTitle: 'Личностные черты',
    title: 'Короткая Темная Триада (SD3)',
    url: '/tests/personality',
    tags: 'Теневые черты, Нарциссизм, Психопатия',
    items: 27,
    time: '6-8'
  }
};

window.DEEP_TESTS_ARRAY = Object.keys(window.DEEP_TEST_REGISTRY).map(function(k){
  var t = window.DEEP_TEST_REGISTRY[k];
  t.id = k;
  return t;
});
