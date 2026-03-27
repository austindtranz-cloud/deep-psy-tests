/**
 * DEEP PSY TESTS — TEST DATA: GAD-7 (Anxiety)
 * 7 items. Public Domain.
 */
window.DEEP_TESTS = window.DEEP_TESTS || {};
window.DEEP_TESTS["gad7"] = Object.assign(window.DEEP_TESTS["gad7"] || {}, {
  id: "gad7",
  title: "Шкала генерализованного тревожного расстройства (GAD-7)",
  shortTitle: "GAD-7",
  description: "Скрининг симптомов тревоги за последние две недели.",
  intro: "За последние 2 недели, как часто вас беспокоило следующее?",
  scales: {
    anxiety: { 
      title: "Уровень тревоги", 
      max: 21, 
      ranges: [
        { min: 0, max: 4, label: "Минимальная тревога" },
        { min: 5, max: 9, label: "Легкая тревога" },
        { min: 10, max: 14, label: "Умеренная тревога" },
        { min: 15, max: 21, label: "Тяжелая тревога" }
      ]
    }
  },
  questions: [
    { id: "g1", scale: "anxiety", text: "Чувство нервозности, тревоги или нахождения «на взводе»", options: [{ text: "Ни разу", value: 0 }, { text: "Несколько дней", value: 1 }, { text: "Более половины дней", value: 2 }, { text: "Почти каждый день", value: 3 }] },
    { id: "g2", scale: "anxiety", text: "Невозможность остановить или контролировать беспокойство", options: [{ text: "Ни разу", value: 0 }, { text: "Несколько дней", value: 1 }, { text: "Более половины дней", value: 2 }, { text: "Почти каждый день", value: 3 }] },
    { id: "g3", scale: "anxiety", text: "Чрезмерное беспокойство по различным поводам", options: [{ text: "Ни разу", value: 0 }, { text: "Несколько дней", value: 1 }, { text: "Более половины дней", value: 2 }, { text: "Почти каждый день", value: 3 }] },
    { id: "g4", scale: "anxiety", text: "Трудности с расслаблением", options: [{ text: "Ни разу", value: 0 }, { text: "Несколько дней", value: 1 }, { text: "Более половины дней", value: 2 }, { text: "Почти каждый день", value: 3 }] },
    { id: "g5", scale: "anxiety", text: "Такое беспокойство, что трудно усидеть на месте", options: [{ text: "Ни разу", value: 0 }, { text: "Несколько дней", value: 1 }, { text: "Более половины дней", value: 2 }, { text: "Почти каждый день", value: 3 }] },
    { id: "g6", scale: "anxiety", text: "Легко возникающая раздражительность или вспыльчивость", options: [{ text: "Ни разу", value: 0 }, { text: "Несколько дней", value: 1 }, { text: "Более половины дней", value: 2 }, { text: "Почти каждый день", value: 3 }] },
    { id: "g7", scale: "anxiety", text: "Чувство страха, как будто должно случиться что-то ужасное", options: [{ text: "Ни разу", value: 0 }, { text: "Несколько дней", value: 1 }, { text: "Более половины дней", value: 2 }, { text: "Почти каждый день", value: 3 }] }
  ]
});
