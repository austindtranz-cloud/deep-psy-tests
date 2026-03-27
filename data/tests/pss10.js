/**
 * DEEP PSY TESTS — TEST DATA: PSS-10 (Perceived Stress Scale)
 * 10 items. Public Domain.
 */
window.DEEP_TESTS = window.DEEP_TESTS || {};
window.DEEP_TESTS["pss10"] = Object.assign(window.DEEP_TESTS["pss10"] || {}, {
  id: "pss10",
  title: "Шкала воспринимаемого стресса (PSS-10)",
  shortTitle: "PSS-10",
  description: "Оценка того, насколько ситуации в вашей жизни воспринимаются как стрессовые, непредсказуемые и неконтролируемые.",
  intro: "Вопросы в этой шкале касаются ваших чувств и мыслей в течение ПОСЛЕДНЕГО МЕСЯЦА. В каждом случае вам нужно будет указать, как часто вы чувствовали или думали определенным образом.",
  scales: {
    stress: { 
      title: "Уровень стресса", 
      max: 40, 
      ranges: [
        { min: 0, max: 13, label: "Низкий уровень стресса" },
        { min: 14, max: 26, label: "Умеренный уровень стресса" },
        { min: 27, max: 40, label: "Высокий уровень стресса" }
      ]
    }
  },
  questions: [
    { id: "p1", scale: "stress", text: "Как часто Вы расстраивались из-за чего-то, что произошло неожиданно?", options: [{ text: "Никогда", value: 0 }, { text: "Почти никогда", value: 1 }, { text: "Иногда", value: 2 }, { text: "Довольно часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "p2", scale: "stress", text: "Как часто Вы чувствовали, что не можете контролировать важные вещи в своей жизни?", options: [{ text: "Никогда", value: 0 }, { text: "Почти никогда", value: 1 }, { text: "Иногда", value: 2 }, { text: "Довольно часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "p3", scale: "stress", text: "Как часто Вы чувствовали нервозность и стресс?", options: [{ text: "Никогда", value: 0 }, { text: "Почти никогда", value: 1 }, { text: "Иногда", value: 2 }, { text: "Довольно часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "p4", scale: "stress", text: "Как часто Вы чувствовали уверенность в своей способности справляться с личными проблемами?", options: [{ text: "Никогда", value: 4 }, { text: "Почти никогда", value: 3 }, { text: "Иногда", value: 2 }, { text: "Довольно часто", value: 1 }, { text: "Очень часто", value: 0 }] }, // Reverse
    { id: "p5", scale: "stress", text: "Как часто Вы чувствовали, что дела идут так, как Вы хотите?", options: [{ text: "Никогда", value: 4 }, { text: "Почти никогда", value: 3 }, { text: "Иногда", value: 2 }, { text: "Довольно часто", value: 1 }, { text: "Очень часто", value: 0 }] }, // Reverse
    { id: "p6", scale: "stress", text: "Как часто Вы обнаруживали, что не можете справиться со всеми делами, которые Вам необходимо сделать?", options: [{ text: "Никогда", value: 0 }, { text: "Почти никогда", value: 1 }, { text: "Иногда", value: 2 }, { text: "Довольно часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "p7", scale: "stress", text: "Как часто Вы могли контролировать раздражение в своей жизни?", options: [{ text: "Никогда", value: 4 }, { text: "Почти никогда", value: 3 }, { text: "Иногда", value: 2 }, { text: "Довольно часто", value: 1 }, { text: "Очень часто", value: 0 }] }, // Reverse
    { id: "p8", scale: "stress", text: "Как часто Вы чувствовали, что полностью владеете ситуацией?", options: [{ text: "Никогда", value: 4 }, { text: "Почти никогда", value: 3 }, { text: "Иногда", value: 2 }, { text: "Довольно часто", value: 1 }, { text: "Очень часто", value: 0 }] }, // Reverse
    { id: "p9", scale: "stress", text: "Как часто Вы злились из-за вещей, которые были вне Вашего контроля?", options: [{ text: "Никогда", value: 0 }, { text: "Почти никогда", value: 1 }, { text: "Иногда", value: 2 }, { text: "Довольно часто", value: 3 }, { text: "Очень часто", value: 4 }] },
    { id: "p10", scale: "stress", text: "Как часто Вы чувствовали, что трудности накапливаются настолько, что Вы не можете с ними справиться?", options: [{ text: "Никогда", value: 0 }, { text: "Почти никогда", value: 1 }, { text: "Иногда", value: 2 }, { text: "Довольно часто", value: 3 }, { text: "Очень часто", value: 4 }] }
  ]
});
