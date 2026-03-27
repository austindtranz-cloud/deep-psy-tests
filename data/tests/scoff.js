/**
 * DEEP PSY TESTS — TEST DATA: SCOFF Questionnaire
 * 5 items. Public Domain.
 */
window.DEEP_TESTS = window.DEEP_TESTS || {};
window.DEEP_TESTS["scoff"] = Object.assign(window.DEEP_TESTS["scoff"] || {}, {
  id: "scoff",
  title: "Опросник SCOFF (Скрининг РПП)",
  shortTitle: "SCOFF",
  description: "Ультракороткий скрининг для выявления риска расстройств пищевого поведения.",
  intro: "Пожалуйста, ответьте на 5 вопросов «Да» или «Нет»:",
  scales: {
    total: { 
      title: "Риск РПП", 
      max: 5, 
      ranges: [
        { min: 0, max: 1, label: "Низкий риск РПП" },
        { min: 2, max: 5, label: "Положительный скрининг (рекомендуется консультация специалиста)" }
      ]
    }
  },
  questions: [
    { id: "s1", scale: "total", text: "Вызываете ли вы у себя рвоту, когда чувствуете дискомфорт от сытости?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "s2", scale: "total", text: "Беспокоит ли вас, что вы потеряли контроль над тем, сколько вы едите?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "s3", scale: "total", text: "Похудели ли вы недавно более чем на 6 кг за три месяца?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "s4", scale: "total", text: "Считаете ли вы себя полным, когда другие говорят, что вы худой?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "s5", scale: "total", text: "Можете ли вы сказать, что еда доминирует в вашей жизни?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] }
  ]
});
