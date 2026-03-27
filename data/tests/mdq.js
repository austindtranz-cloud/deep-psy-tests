/**
 * DEEP PSY TESTS — TEST DATA: Mood Disorder Questionnaire (MDQ)
 * 15 items. Public Domain.
 */
window.DEEP_TESTS = window.DEEP_TESTS || {};
window.DEEP_TESTS["mdq"] = Object.assign(window.DEEP_TESTS["mdq"] || {}, {
  id: "mdq",
  title: "Опросник расстройств настроения (MDQ)",
  shortTitle: "MDQ",
  description: "Скрининг биполярного аффективного расстройства I и II типа.",
  intro: "Ответьте на вопросы о вашем состоянии в течение жизни.",
  scales: {
    manic: { 
      title: "Симптомы мании/гипомании", 
      max: 13, 
      ranges: [
        { min: 0, max: 6, label: "Отрицательный скрининг" },
        { min: 7, max: 13, label: "Вероятное БАР (если симптомы были вместе и мешали жизни)" }
      ]
    }
  },
  questions: [
    { id: "m1", scale: "manic", text: "Бывало ли, что вы чувствовали себя настолько хорошо или «на подъёме», что окружающие думали, что вы не в себе?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "m2", scale: "manic", text: "Бывали ли вы настолько раздражительны, что кричали на людей или затевали ссоры?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "m3", scale: "manic", text: "Чувствовали ли вы себя гораздо более уверенно, чем обычно?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "m4", scale: "manic", text: "Требовалось ли вам гораздо меньше сна, чем обычно?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "m5", scale: "manic", text: "Была ли ваша речь гораздо более быстрой или многословной, чем обычно?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "m6", scale: "manic", text: "Мысли неслись в голове так быстро, что вы не могли их замедлить?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "m7", scale: "manic", text: "Вы были настолько легко отвлекаемы, что с трудом могли сосредоточиться?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "m8", scale: "manic", text: "Были ли вы гораздо более энергичны, чем обычно?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "m9", scale: "manic", text: "Вы были гораздо более активны или делали гораздо больше дел, чем обычно?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "m10", scale: "manic", text: "Были ли вы гораздо более общительны или дружелюбны, чем обычно?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "m11", scale: "manic", text: "Был ли ваш сексуальный интерес гораздо выше обычного?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "m12", scale: "manic", text: "Делали ли вы вещи, которые были необычны для вас или рискованны?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "m13", scale: "manic", text: "Трата денег приводила к проблемам для вас или вашей семьи?", options: [{ text: "Да", value: 1 }, { text: "Нет", value: 0 }] },
    { id: "m14_together", scale: "none", text: "Происходило ли несколько из этих симптомов в один и тот же период времени?", options: [{ text: "Да", value: 0 }, { text: "Нет", value: 0 }] },
    { id: "m15_problems", scale: "none", text: "Насколько сильно эти проблемы (если они были) повлияли на вашу жизнь?", options: [{ text: "Нет проблем", value: 0 }, { text: "Небольшие", value: 0 }, { text: "Умеренные", value: 0 }, { text: "Серьезные", value: 0 }] }
  ]
});
