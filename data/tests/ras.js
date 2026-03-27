/**
 * DEEP PSY TESTS — TEST DATA: Relationship Assessment Scale (RAS)
 * Extracted from main registry for Lazy Loading v15.1
 */
window.DEEP_TESTS = window.DEEP_TESTS || {};
window.DEEP_TESTS["ras"] = Object.assign(window.DEEP_TESTS["ras"] || {}, {
  id: "ras",
  title: "Шкала оценки отношений (RAS)",
  shortTitle: "RAS",
  description: "Короткий опросник для измерения общей удовлетворенности романтическими отношениями. Автор: S. S. Hendrick (1988), адаптация О.А. Сычева (1996).",
  intro: "Вам будет предложено 7 вопросов о ваших текущих (или последних) романтических отношениях. Пожалуйста, выберите вариант ответа, который наиболее точно отражает ваше состояние по 5-балльной шкале.",
  scales: {
    satisfaction: {
      title: "Удовлетворенность отношениями",
      max: 35,
      ranges: [
        { min: 7, max: 15, label: "Низкая удовлетворенность" },
        { min: 16, max: 25, label: "Средняя удовлетворенность" },
        { min: 26, max: 35, label: "Высокая удовлетворенность" }
      ]
    }
  },
  questions: [
    { id: "ras1", scale: "satisfaction", text: "Насколько хорошо партнер соответствует вашим потребностям?", options: [{ text: "Очень плохо", value: 1 }, { text: "Плохо", value: 2 }, { text: "Средне", value: 3 }, { text: "Хорошо", value: 4 }, { text: "Очень хорошо", value: 5 }] },
    { id: "ras2", scale: "satisfaction", text: "В целом насколько вы удовлетворены вашими взаимоотношениями с партнером?", options: [{ text: "Совершенно не удовлетворен", value: 1 }, { text: "Скорее не удовлетворен", value: 2 }, { text: "Средне", value: 3 }, { text: "Скорее удовлетворен", value: 4 }, { text: "Полностью удовлетворен", value: 5 }] },
    { id: "ras3", scale: "satisfaction", text: "Насколько близки ваши отношения к идеальным?", options: [{ text: "Очень далеки", value: 1 }, { text: "Далеки", value: 2 }, { text: "Средне", value: 3 }, { text: "Близки", value: 4 }, { text: "Очень близки", value: 5 }] },
    { id: "ras4", scale: "satisfaction", text: "Как часто вы жалеете о том, что вступили в эти отношения?", options: [{ text: "Очень часто (постоянно)", value: 1 }, { text: "Часто", value: 2 }, { text: "Периодически", value: 3 }, { text: "Редко", value: 4 }, { text: "Никогда", value: 5 }] }, // Обратная зависимость уже учтена в value (1-5 наоборот)
    { id: "ras5", scale: "satisfaction", text: "В какой мере ваши взаимоотношения соответствуют тому, что вы от них ожидали изначально?", options: [{ text: "Совершенно не соответствуют", value: 1 }, { text: "Скорее не соответствуют", value: 2 }, { text: "Частично", value: 3 }, { text: "Скорее соответствуют", value: 4 }, { text: "Полностью соответствуют", value: 5 }] },
    { id: "ras6", scale: "satisfaction", text: "Насколько сильно вы любите своего партнера?", options: [{ text: "Очень слабо", value: 1 }, { text: "Слабо", value: 2 }, { text: "Средне", value: 3 }, { text: "Сильно", value: 4 }, { text: "Очень сильно", value: 5 }] },
    { id: "ras7", scale: "satisfaction", text: "Как много проблем в ваших отношениях?", options: [{ text: "Очень много", value: 1 }, { text: "Много", value: 2 }, { text: "Среднее количество", value: 3 }, { text: "Мало", value: 4 }, { text: "Почти нет", value: 5 }] } // Обратная зависимость
  ]
});
