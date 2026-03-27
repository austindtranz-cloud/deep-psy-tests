/**
 * DEEP PSY TESTS — TEST DATA: RS-14 (Resilience Scale)
 * 14 items. Public Domain.
 */
window.DEEP_TESTS = window.DEEP_TESTS || {};
window.DEEP_TESTS["resilience14"] = Object.assign(window.DEEP_TESTS["resilience14"] || {}, {
  id: "resilience14",
  title: "Краткая шкала жизнестойкости (RS-14)",
  shortTitle: "RS-14",
  description: "Оценка психологической устойчивости и способности восстанавливаться после трудностей.",
  intro: "Пожалуйста, укажите степень согласия с каждым утверждением.",
  scales: {
    total: { 
      title: "Жизнестойкость", 
      max: 98, 
      ranges: [
        { min: 0, max: 56, label: "Низкая жизнестойкость" },
        { min: 57, max: 81, label: "Средняя жизнестойкость" },
        { min: 82, max: 98, label: "Высокая жизнестойкость" }
      ]
    }
  },
  questions: [
    { id: "r1", scale: "total", text: "Я обычно справляюсь с трудностями тем или иным способом.", options: [{ text: "Совершенно не согласен", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }, { text: "6", value: 6 }, { text: "Полностью согласен", value: 7 }] },
    { id: "r2", scale: "total", text: "Я чувствую, что могу справиться со многими вещами одновременно.", options: [{ text: "Совершенно не согласен", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }, { text: "6", value: 6 }, { text: "Полностью согласен", value: 7 }] },
    { id: "r3", scale: "total", text: "Я верю в себя.", options: [{ text: "Совершенно не согласен", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }, { text: "6", value: 6 }, { text: "Полностью согласен", value: 7 }] },
    { id: "r4", scale: "total", text: "Я сохраняю интерес к вещам.", options: [{ text: "Совершенно не согласен", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }, { text: "6", value: 6 }, { text: "Полностью согласен", value: 7 }] },
    { id: "r5", scale: "total", text: "Я могу быть один, если это необходимо.", options: [{ text: "Совершенно не согласен", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }, { text: "6", value: 6 }, { text: "Полностью согласен", value: 7 }] },
    { id: "r6", scale: "total", text: "У меня достаточно решимости, чтобы достичь своих целей.", options: [{ text: "Совершенно не согласен", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }, { text: "6", value: 6 }, { text: "Полностью согласен", value: 7 }] },
    { id: "r7", scale: "total", text: "Я принимаю жизнь такой, какая она есть.", options: [{ text: "Совершенно не согласен", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }, { text: "6", value: 6 }, { text: "Полностью согласен", value: 7 }] },
    { id: "r8", scale: "total", text: "Я не зацикливаюсь на вещах, которые не могу изменить.", options: [{ text: "Совершенно не согласен", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }, { text: "6", value: 6 }, { text: "Полностью согласен", value: 7 }] },
    { id: "r9", scale: "total", text: "Моя жизнь имеет смысл.", options: [{ text: "Совершенно не согласен", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }, { text: "6", value: 6 }, { text: "Полностью согласен", value: 7 }] },
    { id: "r10", scale: "total", text: "Я могу найти повод для смеха даже в трудных ситуациях.", options: [{ text: "Совершенно не согласен", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }, { text: "6", value: 6 }, { text: "Полностью согласен", value: 7 }] },
    { id: "r11", scale: "total", text: "Моя вера в себя помогает мне пережить трудные времена.", options: [{ text: "Совершенно не согласен", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }, { text: "6", value: 6 }, { text: "Полностью согласен", value: 7 }] },
    { id: "r12", scale: "total", text: "В трудных ситуациях я обычно нахожу выход.", options: [{ text: "Совершенно не согласен", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }, { text: "6", value: 6 }, { text: "Полностью согласен", value: 7 }] },
    { id: "r13", scale: "total", text: "Я могу заставить себя делать то, что нужно.", options: [{ text: "Совершенно не согласен", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }, { text: "6", value: 6 }, { text: "Полностью согласен", value: 7 }] },
    { id: "r14", scale: "total", text: "Я чувствую, что я сильный человек.", options: [{ text: "Совершенно не согласен", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }, { text: "6", value: 6 }, { text: "Полностью согласен", value: 7 }] }
  ]
});
