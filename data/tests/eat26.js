/**
 * DEEP PSY TESTS — TEST DATA: EAT-26 (Eating Attitudes Test)
 * 26 items. Free/Public.
 */
window.DEEP_TESTS = window.DEEP_TESTS || {};
window.DEEP_TESTS["eat26"] = Object.assign(window.DEEP_TESTS["eat26"] || {}, {
  id: "eat26",
  title: "Тест пищевых установок (EAT-26)",
  shortTitle: "EAT-26",
  description: "Скрининг симптомов нервной анорексии и булимии.",
  intro: "Пожалуйста, ответьте, как часто вы чувствуете или ведете себя следующим образом.",
  scales: {
    total: { 
      title: "Суммарный балл", 
      max: 78, 
      ranges: [
        { min: 0, max: 19, label: "Низкий риск РПП" },
        { min: 20, max: 78, label: "Высокий риск РПП (рекомендуется консультация)" }
      ]
    },
    dieting: { title: "Диетическое поведение", max: 39 },
    bulimia: { title: "Булимия и озабоченность едой", max: 18 },
    oral_control: { title: "Оральный контроль", max: 21 }
  },
  questions: [
    { id: "e1", scale: "dieting", text: "Я ужасно боюсь веса.", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e2", scale: "dieting", text: "Я стараюсь не есть, когда голоден.", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e3", scale: "bulimia", text: "Я думаю о еде постоянно.", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e4", scale: "bulimia", text: "Бывали приступы обжорства, когда я не мог(ла) остановиться.", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e5", scale: "oral_control", text: "Я режу еду на мелкие кусочки.", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e6", scale: "dieting", text: "Я обращаю внимание на калорийность всего, что ем.", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e7", scale: "dieting", text: "Особенно стараюсь не есть продукты с углеводами.", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e8", scale: "oral_control", text: "Я чувствую, что другие хотели бы, чтобы я ел(а) больше.", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e9", scale: "bulimia", text: "У меня бывает рвота после еды.", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e10", scale: "dieting", text: "Я чувствую сильную вину после еды.", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e11", scale: "dieting", text: "Я хочу быть еще стройнее.", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e12", scale: "dieting", text: "Я думаю о сожженных калориях во время упражнений.", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e13", scale: "oral_control", text: "Другие считают, что я слишком худой(ая).", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e14", scale: "dieting", text: "Я думаю о том, чтобы у меня был жир на теле.", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e15", scale: "oral_control", text: "Мне требуется больше времени, чем другим, чтобы поесть.", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e16", scale: "dieting", text: "Я избегаю продуктов с сахаром.", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e17", scale: "dieting", text: "Я ем диетические продукты.", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e18", scale: "bulimia", text: "Я чувствую, что еда контролирует мою жизнь.", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e19", scale: "oral_control", text: "Я проявляю самоконтроль в отношении еды.", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e20", scale: "oral_control", text: "Я чувствую, что другие давят на меня, чтобы я ел(а).", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e21", scale: "oral_control", text: "Я трачу слишком много времени на мысли о еде.", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e22", scale: "dieting", text: "Я чувствую беспокойство после поедания сладостей.", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e23", scale: "dieting", text: "Я занимаюсь диетами.", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e24", scale: "dieting", text: "Мне нравится чувство пустого желудка.", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e25", scale: "bulimia", text: "У меня бывает желание вызвать рвоту после еды.", options: [{ text: "Всегда", value: 3 }, { text: "Очень часто", value: 2 }, { text: "Часто", value: 1 }, { text: "Иногда", value: 0 }, { text: "Редко", value: 0 }, { text: "Никогда", value: 0 }] },
    { id: "e26", scale: "bulimia", text: "Мне нравится пробовать новые калорийные блюда.", options: [{ text: "Никогда", value: 3 }, { text: "Редко", value: 2 }, { text: "Иногда", value: 1 }, { text: "Часто", value: 0 }, { text: "Очень часто", value: 0 }, { text: "Всегда", value: 0 }] } // Reverse
  ]
});
