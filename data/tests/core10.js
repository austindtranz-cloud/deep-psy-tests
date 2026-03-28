/**
 * DEEP PSY TESTS — TEST DATA: CORE-10
 * Extracted from main registry for Lazy Loading v15.1
 */
window.DEEP_TESTS = window.DEEP_TESTS || {};
window.DEEP_TESTS["core10"] = Object.assign(window.DEEP_TESTS["core10"] || {}, {
  id: "core10",
  title: "Опросник CORE-10",
  shortTitle: "CORE-10",
  description: "Краткий опросник общего психологического дистресса (Clinical Outcomes in Routine Evaluation). Позволяет оценить текущее состояние и эффективность проводимой терапии за последнюю неделю.",
  intro: "Пожалуйста, ответьте на вопросы о том, как вы себя чувствовали **за последнюю неделю**. Выберите вариант, который наиболее точно описывает ваше состояние.",
  scales: {
    distress: {
      title: "Психологический дистресс",
      max: 40,
      ranges: [
        { min: 0, max: 5, label: "Здоровое состояние" },
        { min: 6, max: 10, label: "Проблемы низкого уровня" },
        { min: 11, max: 15, label: "Легкий психологический дистресс" },
        { min: 16, max: 20, label: "Умеренный дистресс" },
        { min: 21, max: 25, label: "Умеренно тяжелый дистресс" },
        { min: 26, max: 40, label: "Тяжелый психологический дистресс" }
      ]
    }
  },
  questions: [
    { id: "core1", scale: "distress", text: "Я чувствовал(а) напряжение и беспокойство.", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Постоянно", value: 4 }] },
    { id: "core2", scale: "distress", text: "Я чувствовал(а), что мне есть к кому обратиться за поддержкой.", options: [{ text: "Постоянно", value: 0 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 2 }, { text: "Редко", value: 3 }, { text: "Никогда", value: 4 }] },
    { id: "core3", scale: "distress", text: "Я чувствовал(а), что могу справиться с любыми проблемами.", options: [{ text: "Постоянно", value: 0 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 2 }, { text: "Редко", value: 3 }, { text: "Никогда", value: 4 }] },
    { id: "core4", scale: "distress", text: "Мне было тяжело общаться с другими людьми.", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Постоянно", value: 4 }] },
    { id: "core5", scale: "distress", text: "Я чувствовал(а) панику и страх.", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Постоянно", value: 4 }] },
    { id: "core6", scale: "distress", text: "Я планировал(а) покончить жизнь самоубийством.", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Постоянно", value: 4 }] },
    { id: "core7", scale: "distress", text: "Мне было трудно заснуть или сон был беспокойный.", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Постоянно", value: 4 }] },
    { id: "core8", scale: "distress", text: "Я чувствовал(а) отчаяние и безнадёжность.", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Постоянно", value: 4 }] },
    { id: "core9", scale: "distress", text: "Я чувствовал(а) себя несчастным(ой).", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Постоянно", value: 4 }] },
    { id: "core10", scale: "distress", text: "Меня тревожили неприятные образы и воспоминания.", options: [{ text: "Никогда", value: 0 }, { text: "Редко", value: 1 }, { text: "Иногда", value: 2 }, { text: "Часто", value: 3 }, { text: "Постоянно", value: 4 }] }
  ]
});
