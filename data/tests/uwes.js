/**
 * DEEP PSY TESTS — TEST DATA: UWES-17 (Utrecht Work Engagement Scale)
 * 17 items. Public Domain.
 */
window.DEEP_TESTS = window.DEEP_TESTS || {};
window.DEEP_TESTS["uwes"] = Object.assign(window.DEEP_TESTS["uwes"] || {}, {
  id: "uwes",
  title: "Шкала увлеченности работой (UWES-17)",
  shortTitle: "UWES",
  description: "Оценка уровня профессиональной вовлеченности: энергичности, преданности делу и поглощенности работой.",
  intro: "Выберите вариант, который лучше всего описывает ваши чувства по отношению к работе.",
  scales: {
    vigor: { title: "Энергичность (Vigor)", max: 36 },
    dedication: { title: "Преданность (Dedication)", max: 30 },
    absorption: { title: "Поглощенность (Absorption)", max: 36 }
  },
  questions: [
    { id: "u1", scale: "vigor", text: "На работе я чувствую себя полным энергии.", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }, { text: "Почти всегда", value: 5 }, { text: "Всегда", value: 6 }] },
    { id: "u2", scale: "dedication", text: "Я считаю свою работу значимой и полезной.", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }, { text: "Почти всегда", value: 5 }, { text: "Всегда", value: 6 }] },
    { id: "u3", scale: "absorption", text: "Когда я работаю, время летит незаметно.", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }, { text: "Почти всегда", value: 5 }, { text: "Всегда", value: 6 }] },
    { id: "u4", scale: "vigor", text: "Я чувствую себя сильным и энергичным на работе.", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }, { text: "Почти всегда", value: 5 }, { text: "Всегда", value: 6 }] },
    { id: "u5", scale: "dedication", text: "Я воодушевлен своей работой.", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }, { text: "Почти всегда", value: 5 }, { text: "Всегда", value: 6 }] },
    { id: "u6", scale: "absorption", text: "Когда я работаю, я забываю обо всём вокруг.", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }, { text: "Почти всегда", value: 5 }, { text: "Всегда", value: 6 }] },
    { id: "u7", scale: "dedication", text: "Моя работа вдохновляет меня.", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }, { text: "Почти всегда", value: 5 }, { text: "Всегда", value: 6 }] },
    { id: "u8", scale: "vigor", text: "Утром, когда я встаю, мне хочется идти на работу.", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }, { text: "Почти всегда", value: 5 }, { text: "Всегда", value: 6 }] },
    { id: "u9", scale: "absorption", text: "Я чувствую себя счастливым, когда интенсивно работаю.", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }, { text: "Почти всегда", value: 5 }, { text: "Всегда", value: 6 }] },
    { id: "u10", scale: "dedication", text: "Я горжусь тем, что занимаюсь этой работой.", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }, { text: "Почти всегда", value: 5 }, { text: "Всегда", value: 6 }] },
    { id: "u11", scale: "absorption", text: "Я полностью поглощен своей работой.", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }, { text: "Почти всегда", value: 5 }, { text: "Всегда", value: 6 }] },
    { id: "u12", scale: "vigor", text: "Я могу работать в течение длительного времени.", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }, { text: "Почти always", value: 5 }, { text: "Всегда", value: 6 }] },
    { id: "u13", scale: "dedication", text: "Для меня моя работа — это вызов.", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }, { text: "Почти всегда", value: 5 }, { text: "Всегда", value: 6 }] },
    { id: "u14", scale: "absorption", text: "Я «ухожу в работу с головой».", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }, { text: "Почти всегда", value: 5 }, { text: "Всегда", value: 6 }] },
    { id: "u15", scale: "vigor", text: "На работе я очень вынослив психологически.", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }, { text: "Почти всегда", value: 5 }, { text: "Всегда", value: 6 }] },
    { id: "u16", scale: "absorption", text: "Мне трудно оторваться от своей работы.", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }, { text: "Почти всегда", value: 5 }, { text: "Всегда", value: 6 }] },
    { id: "u17", scale: "vigor", text: "Даже когда дела идут не очень хорошо, я продолжаю работать.", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }, { text: "Почти всегда", value: 5 }, { text: "Всегда", value: 6 }] }
  ]
});
