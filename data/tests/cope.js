/**
 * DEEP PSY TESTS — TEST DATA: Brief-COPE
 * 28 items, 14 subscales. Public Domain.
 */
window.DEEP_TESTS = window.DEEP_TESTS || {};
window.DEEP_TESTS["brief_cope"] = Object.assign(window.DEEP_TESTS["brief_cope"] || {}, {
  id: "brief_cope",
  title: "Краткий опросник совладания (Brief-COPE)",
  shortTitle: "Brief-COPE",
  description: "Оценка стратегий совладания со стрессом (копинг-механизмов).",
  intro: "Вам предложен список действий, которые люди совершают, когда сталкиваются с трудными ситуациями. Укажите, как часто ВЫ поступаете подобным образом.",
  scales: {
    self_distraction: { title: "Самоотвлечение", max: 8 },
    active_coping: { title: "Активный копинг", max: 8 },
    denial: { title: "Отрицание", max: 8 },
    substance_use: { title: "Употребление ПАВ", max: 8 },
    emotional_support: { title: "Эмоциональная поддержка", max: 8 },
    instrumental_support: { title: "Инструментальная поддержка", max: 8 },
    behavioral_disengagement: { title: "Поведенческое отстранение", max: 8 },
    venting: { title: "Выражение чувств", max: 8 },
    positive_reframing: { title: "Позитивный рефрейминг", max: 8 },
    planning: { title: "Планирование", max: 8 },
    humor: { title: "Юмор", max: 8 },
    acceptance: { title: "Принятие", max: 8 },
    religion: { title: "Религия", max: 8 },
    self_blame: { title: "Самообвинение", max: 8 }
  },
  questions: [
    { id: "c1", scale: "self_distraction", text: "Я обращаюсь к работе или другой деятельности, чтобы отвлечься.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c2", scale: "active_coping", text: "Я концентрируюсь на усилиях, чтобы что-то сделать с этой ситуацией.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c3", scale: "denial", text: "Я говорю себе «это нереально».", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c4", scale: "substance_use", text: "Я употребляю алкоголь или лекарства, чтобы чувствовать себя лучше.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c5", scale: "emotional_support", text: "Я получаю эмоциональную поддержку от других.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c6", scale: "behavioral_disengagement", text: "Я отказываюсь от попыток справиться.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c7", scale: "active_coping", text: "Я предпринимаю действия, чтобы улучшить ситуацию.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c8", scale: "denial", text: "Я отказываюсь верить, что это произошло.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c9", scale: "venting", text: "Я говорю о своих чувствах, облегчая душу.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c10", scale: "instrumental_support", text: "Я получаю помощь и советы от других людей.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c11", scale: "substance_use", text: "Я употребляю алкоголь или лекарства, чтобы пережить это.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c12", scale: "positive_reframing", text: "Я пытаюсь увидеть ситуацию в другом свете, чтобы она казалась более позитивной.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c13", scale: "self_blame", text: "Я критикую себя.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c14", scale: "planning", text: "Я стараюсь придумать стратегию действий.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c15", scale: "emotional_support", text: "Я получаю утешение и понимание от кого-то.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c16", scale: "behavioral_disengagement", text: "Я сдаюсь и перестаю пытаться достичь цели.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c17", scale: "positive_reframing", text: "Я ищу что-то хорошее в происходящем.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c18", scale: "humor", text: "Я шучу об этом.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c19", scale: "self_distraction", text: "Я делаю что-то, чтобы думать об этом поменьше.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c20", scale: "acceptance", text: "Я принимаю реальность произошедшего.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c21", scale: "venting", text: "Я выражаю свои негативные чувства.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c22", scale: "instrumental_support", text: "Я ищу помощи или совета у других о том, что делать.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c23", scale: "acceptance", text: "Я учусь жить с этим.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c24", scale: "planning", text: "Я думаю о том, как лучше справиться.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c25", scale: "self_blame", text: "Я виню себя за то, что произошло.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c26", scale: "religion", text: "Я молюсь или медитирую.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c27", scale: "humor", text: "Я смеюсь над ситуацией.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "c28", scale: "religion", text: "Я нахожу утешение в своих духовных убеждениях.", options: [{ text: "Никогда", value: 1 }, { text: "Редко", value: 2 }, { text: "Часто", value: 3 }, { text: "Очень часто", value: 4 }] }
  ]
});
