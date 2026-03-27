/**
 * DEEP PSY TESTS — TEST DATA: DASS-21 (Depression, Anxiety, Stress)
 * 21 items, 3 scales. Public Domain.
 */
window.DEEP_TESTS = window.DEEP_TESTS || {};
window.DEEP_TESTS["dass21"] = Object.assign(window.DEEP_TESTS["dass21"] || {}, {
  id: "dass21",
  title: "Шкала депрессии, тревоги и стресса (DASS-21)",
  shortTitle: "DASS-21",
  description: "Скрининговый инструмент для оценки уровня депрессии, тревоги и стресса за последнюю неделю.",
  intro: "Пожалуйста, прочитайте каждое утверждение и выберите ответ, который лучше всего описывает, насколько оно относилось к вам в течение ПОСЛЕДНЕЙ НЕДЕЛИ.",
  scales: {
    depression: { title: "Депрессия", max: 42, coefficient: 2, ranges: [{ min: 0, max: 9, label: "Норма" }, { min: 10, max: 13, label: "Легкая" }, { min: 14, max: 20, label: "Умеренная" }, { min: 21, max: 27, label: "Тяжелая" }, { min: 28, max: 99, label: "Крайне тяжелая" }] },
    anxiety: { title: "Тревога", max: 42, coefficient: 2, ranges: [{ min: 0, max: 7, label: "Норма" }, { min: 8, max: 9, label: "Легкая" }, { min: 10, max: 14, label: "Умеренная" }, { min: 15, max: 19, label: "Тяжелая" }, { min: 20, max: 99, label: "Крайне тяжелая" }] },
    stress: { title: "Стресс", max: 42, coefficient: 2, ranges: [{ min: 0, max: 14, label: "Норма" }, { min: 15, max: 18, label: "Легкая" }, { min: 19, max: 25, label: "Умеренная" }, { min: 26, max: 33, label: "Тяжелая" }, { min: 34, max: 99, label: "Крайне тяжелая" }] }
  },
  questions: [
    // Stress
    { id: "d1", scale: "stress", text: "Мне было трудно успокоиться.", options: [{ text: "0 — Совсем не относится", value: 0 }, { text: "1 — В некоторой степени", value: 1 }, { text: "2 — В значительной степени", value: 2 }, { text: "3 — Относится ко мне полностью", value: 3 }] },
    // Anxiety
    { id: "d2", scale: "anxiety", text: "Я замечал сухость во рту.", options: [{ text: "0", value: 0 }, { text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }] },
    // Depression
    { id: "d3", scale: "depression", text: "Я не мог испытывать никаких положительных чувств.", options: [{ text: "0", value: 0 }, { text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }] },
    // Anxiety
    { id: "d4", scale: "anxiety", text: "Я испытывал трудности с дыханием (например, частое дыхание, одышка в отсутствие физической нагрузки).", options: [{ text: "0", value: 0 }, { text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }] },
    // Depression
    { id: "d5", scale: "depression", text: "Мне было трудно начать что-либо делать.", options: [{ text: "0", value: 0 }, { text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }] },
    // Stress
    { id: "d6", scale: "stress", text: "Я реагировал слишком остро на ситуации.", options: [{ text: "0", value: 0 }, { text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }] },
    // Anxiety
    { id: "d7", scale: "anxiety", text: "Я чувствовал дрожь (например, в руках).", options: [{ text: "0", value: 0 }, { text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }] },
    // Stress
    { id: "d8", scale: "stress", text: "Я чувствовал, что трачу много нервной энергии.", options: [{ text: "0", value: 0 }, { text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }] },
    // Anxiety
    { id: "d9", scale: "anxiety", text: "Я беспокоился о ситуациях, в которых мог запаниковать или выставить себя в глупом виде.", options: [{ text: "0", value: 0 }, { text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }] },
    // Depression
    { id: "d10", scale: "depression", text: "Я чувствовал, что мне нечего ждать от будущего.", options: [{ text: "0", value: 0 }, { text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }] },
    // Stress
    { id: "d11", scale: "stress", text: "Я был нетерпелив.", options: [{ text: "0", value: 0 }, { text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }] },
    // Stress
    { id: "d12", scale: "stress", text: "Я легко расстраивался.", options: [{ text: "0", value: 0 }, { text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }] },
    // Depression
    { id: "d13", scale: "depression", text: "Я чувствовал себя подавленным и грустным.", options: [{ text: "0", value: 0 }, { text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }] },
    // Stress
    { id: "d14", scale: "stress", text: "Я чувствовал, что нахожусь на грани срыва.", options: [{ text: "0", value: 0 }, { text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }] },
    // Anxiety
    { id: "d15", scale: "anxiety", text: "Я чувствовал, что вот-вот запаникую.", options: [{ text: "0", value: 0 }, { text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }] },
    // Depression
    { id: "d16", scale: "depression", text: "Я не мог проявлять энтузиазм ни к чему.", options: [{ text: "0", value: 0 }, { text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }] },
    // Depression
    { id: "d17", scale: "depression", text: "Я чувствовал, что я человек малоценный.", options: [{ text: "0", value: 0 }, { text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }] },
    // Stress
    { id: "d18", scale: "stress", text: "Я был довольно чувствительным (обидчивым).", options: [{ text: "0", value: 0 }, { text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }] },
    // Anxiety
    { id: "d19", scale: "anxiety", text: "Я осознавал действие своего сердца в отсутствие физической нагрузки (например, ощущение сердцебиения, перебои).", options: [{ text: "0", value: 0 }, { text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }] },
    // Anxiety
    { id: "d20", scale: "anxiety", text: "Я чувствовал страх без видимых причин.", options: [{ text: "0", value: 0 }, { text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }] },
    // Depression
    { id: "d21", scale: "depression", text: "Я чувствовал, что жизнь лишена смысла.", options: [{ text: "0", value: 0 }, { text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }] }
  ]
});
