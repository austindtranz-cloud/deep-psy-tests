/**
 * DEEP PSY TESTS — TEST DATA: Rosenberg Self-Esteem Scale
 * Extracted from main registry for Lazy Loading v15.1
 */
window.DEEP_TESTS = window.DEEP_TESTS || {};
window.DEEP_TESTS["rosenberg"] = Object.assign(window.DEEP_TESTS["rosenberg"] || {}, {
  id: "rosenberg",
  title: "Шкала самоуважения Розенберга (RSES)",
  shortTitle: "RSES",
  description: "Глобальная оценка самоуважения. 10 утверждений. Адаптация: Золотарева А.А., 2020.",
  intro: "Выберите вариант, наиболее точно отражающий ваше согласие с утверждением.",
  scales: {
    selfesteem: {
      title: "Самоуважение",
      max: 30,
      ranges: [
        { min: 0, max: 14, label: "Низкое" },
        { min: 15, max: 25, label: "Нормальное" },
        { min: 26, max: 30, label: "Высокое" }
      ]
    }
  },
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
});
