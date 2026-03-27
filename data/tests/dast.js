/**
 * DEEP PSY TESTS — TEST DATA: DAST-10 (Drug Abuse Screening Test)
 * 10 items. Public Domain.
 */
window.DEEP_TESTS = window.DEEP_TESTS || {};
window.DEEP_TESTS["dast"] = Object.assign(window.DEEP_TESTS["dast"] || {}, {
  id: "dast",
  title: "Тест на выявление злоупотребления наркотиками (DAST-10)",
  shortTitle: "DAST-10",
  description: "Скрининг проблем, связанных с употреблением наркотических веществ (кроме алкоголя и табака) за последние 12 месяцев.",
  intro: "За последние 12 месяцев:",
  scales: {
    total: { 
      title: "Степень злоупотребления", 
      max: 10, 
      ranges: [
        { min: 0, max: 0, label: "Проблем не выявлено" },
        { min: 1, max: 2, label: "Низкий уровень проблем" },
        { min: 3, max: 5, label: "Умеренный уровень (требуется обследование)" },
        { min: 6, max: 8, label: "Существенный уровень (высокий риск)" },
        { min: 9, max: 10, label: "Тяжелый уровень (рекомендуется немедленное лечение)" }
      ]
    }
  },
  questions: [
    { id: "d1", scale: "total", text: "Употребляли ли Вы наркотики, кроме тех, которые Вам назначил врач?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "d2", scale: "total", text: "Злоупотребляли ли Вы более чем одним видом наркотиков одновременно?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "d3", scale: "total", text: "Всегда ли Вы можете прекратить употреблять наркотики, когда захотите?", options: [{ text: "Да", value: 0 }, { text: "Нет", value: 1 }] }, // Reverse
    { id: "d4", scale: "total", text: "Были ли у Вас когда-либо «провалы в памяти» или «флэшбэки» из-за наркотиков?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "d5", scale: "total", text: "Чувствуете ли Вы себя плохо или виноватым из-за употребления?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "d6", scale: "total", text: "Думает ли Ваш супруг (партнер) или родители, что у Вас есть проблемы?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "d7", scale: "total", text: "Пренебрегаете ли Вы своей семьей из-за употребления наркотиков?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "d8", scale: "total", text: "Занимались ли Вы незаконной деятельностью, чтобы получить наркотики?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "d9", scale: "total", text: "Испытывали ли Вы симптомы отмены при прекращении употребления?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "d10", scale: "total", text: "Были ли у Вас медицинские проблемы в результате употребления?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] }
  ]
});
