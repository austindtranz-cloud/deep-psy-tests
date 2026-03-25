/**
 * DEEP PSY TESTS — GAD-7 (Generalized Anxiety Disorder 7-item Scale)
 * Public Domain — скрининг генерализованного тревожного расстройства
 * 7 вопросов, 1 шкала, 0-21 балл
 */
window.DEEP_TESTS = window.DEEP_TESTS || {};

Object.assign(window.DEEP_TESTS, {
  "gad7": {
    id: "gad7",
    title: "Скрининг тревоги (GAD-7)",
    shortTitle: "GAD-7",
    description: "Шкала генерализованного тревожного расстройства. Используется для скрининга ГТР, панического расстройства, социальной тревоги и ПТСР.",
    intro: "За последние 2 недели, как часто вас беспокоило следующее?",
    disclaimer: "Результаты не являются диагнозом. При высоких баллах рекомендуется обратиться к специалисту.",
    scales: {
      anxiety: {
        title: "Тревога",
        max: 21,
        ranges: [
          { min: 0,  max: 4,  label: "Минимальная тревога" },
          { min: 5,  max: 9,  label: "Лёгкая тревога" },
          { min: 10, max: 14, label: "Умеренная тревога" },
          { min: 15, max: 21, label: "Тяжёлая тревога" }
        ]
      }
    },
    questions: [
      {
        id: "gad1", scale: "anxiety",
        text: "Ощущение нервозности, тревоги или нахождения «на взводе».",
        options: [
          { text: "Ни разу", value: 0 },
          { text: "Несколько дней", value: 1 },
          { text: "Более половины дней", value: 2 },
          { text: "Почти каждый день", value: 3 }
        ]
      },
      {
        id: "gad2", scale: "anxiety",
        text: "Невозможность остановить или контролировать беспокойство.",
        options: [
          { text: "Ни разу", value: 0 },
          { text: "Несколько дней", value: 1 },
          { text: "Более половины дней", value: 2 },
          { text: "Почти каждый день", value: 3 }
        ]
      },
      {
        id: "gad3", scale: "anxiety",
        text: "Чрезмерное беспокойство по различным поводам.",
        options: [
          { text: "Ни разу", value: 0 },
          { text: "Несколько дней", value: 1 },
          { text: "Более половины дней", value: 2 },
          { text: "Почти каждый день", value: 3 }
        ]
      },
      {
        id: "gad4", scale: "anxiety",
        text: "Трудности с расслаблением.",
        options: [
          { text: "Ни разу", value: 0 },
          { text: "Несколько дней", value: 1 },
          { text: "Более половины дней", value: 2 },
          { text: "Почти каждый день", value: 3 }
        ]
      },
      {
        id: "gad5", scale: "anxiety",
        text: "Такое сильное беспокойство, что трудно усидеть на месте.",
        options: [
          { text: "Ни разу", value: 0 },
          { text: "Несколько дней", value: 1 },
          { text: "Более половины дней", value: 2 },
          { text: "Почти каждый день", value: 3 }
        ]
      },
      {
        id: "gad6", scale: "anxiety",
        text: "Раздражительность или вспыльчивость.",
        options: [
          { text: "Ни разу", value: 0 },
          { text: "Несколько дней", value: 1 },
          { text: "Более половины дней", value: 2 },
          { text: "Почти каждый день", value: 3 }
        ]
      },
      {
        id: "gad7", scale: "anxiety",
        text: "Ощущение страха, как будто должно случиться что-то ужасное.",
        options: [
          { text: "Ни разу", value: 0 },
          { text: "Несколько дней", value: 1 },
          { text: "Более половины дней", value: 2 },
          { text: "Почти каждый день", value: 3 }
        ]
      }
    ]
  }
});
