/**
 * DEEP PSY TESTS — TEST DATA: TIPI-RU (Ten-Item Personality Inventory)
 * Short form of Big Five personality traits.
 */
window.DEEP_TESTS = window.DEEP_TESTS || {};
window.DEEP_TESTS["tipi"] = Object.assign(window.DEEP_TESTS["tipi"] || {}, {
  id: "tipi", 
  title: "Экспресс-оценка Большой Пятерки (TIPI-RU)", 
  shortTitle: "TIPI",
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
});
