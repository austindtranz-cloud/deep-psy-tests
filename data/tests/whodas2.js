/**
 * DEEP PSY TESTS — TEST DATA: WHODAS 2.0 (12 items)
 * Extracted from main registry for Lazy Loading v15.1
 */
window.DEEP_TESTS = window.DEEP_TESTS || {};
window.DEEP_TESTS["whodas2"] = Object.assign(window.DEEP_TESTS["whodas2"] || {}, {
  id: "whodas2",
  title: "WHODAS 2.0 (ВОЗ)",
  shortTitle: "WHODAS 2.0",
  description: "Опросник Всемирной организации здравоохранения по оценке инвалидности и ограничений жизнедеятельности (краткая версия, 12 вопросов).",
  intro: "Вспомните прошедшие 30 дней и ответьте на вопросы, касающиеся трудностей в выполнении повседневных задач из-за состояния вашего здоровья (болезней, травм, эмоциональных проблем или других причин). Насколько вам было трудно:",
  scales: {
    disability: {
      title: "Ограничение жизнедеятельности",
      max: 60, /* 12 вопросов по 5 баллов */
      ranges: [
        { min: 12, max: 15, label: "Отсутствие ограничений (Норма)" },
        { min: 16, max: 24, label: "Легкие ограничения" },
        { min: 25, max: 36, label: "Умеренные ограничения" },
        { min: 37, max: 48, label: "Тяжелые ограничения" },
        { min: 49, max: 60, label: "Абсолютные (экстремальные) ограничения" }
      ]
    }
  },
  questions: [
    { id: "wd1", scale: "disability", text: "Стоять в течение продолжительного времени (например, 30 минут)?", options: [{ text: "Нет трудностей", value: 1 }, { text: "Легкие трудности", value: 2 }, { text: "Умеренные", value: 3 }, { text: "Тяжелые", value: 4 }, { text: "Крайне трудно / Не могу", value: 5 }] },
    { id: "wd2", scale: "disability", text: "Выполнять свои повседневные домашние обязанности?", options: [{ text: "Нет трудностей", value: 1 }, { text: "Легкие трудности", value: 2 }, { text: "Умеренные", value: 3 }, { text: "Тяжелые", value: 4 }, { text: "Крайне трудно / Не могу", value: 5 }] },
    { id: "wd3", scale: "disability", text: "Осваивать новую задачу (например, разбираться, как добраться до нового места)?", options: [{ text: "Нет трудностей", value: 1 }, { text: "Легкие трудности", value: 2 }, { text: "Умеренные", value: 3 }, { text: "Тяжелые", value: 4 }, { text: "Крайне трудно / Не могу", value: 5 }] },
    { id: "wd4", scale: "disability", text: "Участвовать в общественной жизни (например, в праздниках или мероприятиях) так же, как и другие люди?", options: [{ text: "Нет трудностей", value: 1 }, { text: "Легкие трудности", value: 2 }, { text: "Умеренные", value: 3 }, { text: "Тяжелые", value: 4 }, { text: "Крайне трудно / Не могу", value: 5 }] },
    { id: "wd5", scale: "disability", text: "Насколько вы были эмоционально затронуты проблемами со здоровьем?", options: [{ text: "Нисколько", value: 1 }, { text: "Слегка", value: 2 }, { text: "Умеренно", value: 3 }, { text: "Сильно", value: 4 }, { text: "Крайне сильно", value: 5 }] },
    { id: "wd6", scale: "disability", text: "Концентрироваться на выполнении чего-либо в течение десяти минут?", options: [{ text: "Нет трудностей", value: 1 }, { text: "Легкие трудности", value: 2 }, { text: "Умеренные", value: 3 }, { text: "Тяжелые", value: 4 }, { text: "Крайне трудно / Не могу", value: 5 }] },
    { id: "wd7", scale: "disability", text: "Проходить большие расстояния, например один километр?", options: [{ text: "Нет трудностей", value: 1 }, { text: "Легкие трудности", value: 2 }, { text: "Умеренные", value: 3 }, { text: "Тяжелые", value: 4 }, { text: "Крайне трудно / Не могу", value: 5 }] },
    { id: "wd8", scale: "disability", text: "Мыть все свое тело?", options: [{ text: "Нет трудностей", value: 1 }, { text: "Легкие трудности", value: 2 }, { text: "Умеренные", value: 3 }, { text: "Тяжелые", value: 4 }, { text: "Крайне трудно / Не могу", value: 5 }] },
    { id: "wd9", scale: "disability", text: "Одеваться?", options: [{ text: "Нет трудностей", value: 1 }, { text: "Легкие трудности", value: 2 }, { text: "Умеренные", value: 3 }, { text: "Тяжелые", value: 4 }, { text: "Крайне трудно / Не могу", value: 5 }] },
    { id: "wd10", scale: "disability", text: "Общаться с незнакомыми людьми?", options: [{ text: "Нет трудностей", value: 1 }, { text: "Легкие трудности", value: 2 }, { text: "Умеренные", value: 3 }, { text: "Тяжелые", value: 4 }, { text: "Крайне трудно / Не могу", value: 5 }] },
    { id: "wd11", scale: "disability", text: "Поддерживать дружеские отношения?", options: [{ text: "Нет трудностей", value: 1 }, { text: "Легкие трудности", value: 2 }, { text: "Умеренные", value: 3 }, { text: "Тяжелые", value: 4 }, { text: "Крайне трудно / Не могу", value: 5 }] },
    { id: "wd12", scale: "disability", text: "Выполнять свою повседневную работу (возникали ли трудности на работе, в учебе или по дому)?", options: [{ text: "Нет трудностей", value: 1 }, { text: "Легкие трудности", value: 2 }, { text: "Умеренные", value: 3 }, { text: "Тяжелые", value: 4 }, { text: "Крайне трудно / Не могу", value: 5 }] }
  ]
});
