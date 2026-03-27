/**
 * DEEP PSY TESTS — TEST DATA: PID-5-BF (Personality Inventory for DSM-5 – Brief Form)
 * 25 items, 5 domains: Negative Affectivity, Detachment, Antagonism, Disinhibition, Psychoticism.
 * Авторы оригинала: R. Krueger et al. (2013)
 * Русская адаптация: Г. В. Кустов, М. С. Зинчук и др. (2022)
 * Лицензия: public domain (APA)
 */
window.DEEP_TESTS = window.DEEP_TESTS || {};
window.DEEP_TESTS["pid5bf"] = Object.assign(window.DEEP_TESTS["pid5bf"] || {}, {
  id: "pid5bf",
  title: "Краткий опросник личностных расстройств (PID-5-BF)",
  shortTitle: "PID-5-BF",
  description: "Скрининг 5 доменов дезадаптивных личностных черт по DSM-5: негативная аффективность, отстранённость, антагонизм, расторможенность и психотизм.",
  intro: "Пожалуйста, оцените каждое утверждение по шкале от 0 до 3, выбрав вариант, который лучше всего описывает вас.",
  scales: {
    negative_affectivity: {
      title: "Негативная аффективность",
      max: 15,
      ranges: [
        { min: 0, max: 4, label: "Низкий уровень — эмоциональная стабильность" },
        { min: 5, max: 9, label: "Средний уровень — умеренная эмоциональная чувствительность" },
        { min: 10, max: 15, label: "Высокий уровень — выраженная тревожность и эмоциональная лабильность" }
      ]
    },
    detachment: {
      title: "Отстранённость",
      max: 15,
      ranges: [
        { min: 0, max: 4, label: "Низкий уровень — открытость и вовлечённость" },
        { min: 5, max: 9, label: "Средний уровень — умеренная склонность к избеганию" },
        { min: 10, max: 15, label: "Высокий уровень — выраженная отчуждённость и эмоциональная отстранённость" }
      ]
    },
    antagonism: {
      title: "Антагонизм",
      max: 15,
      ranges: [
        { min: 0, max: 4, label: "Низкий уровень — склонность к сотрудничеству" },
        { min: 5, max: 9, label: "Средний уровень — умеренные антагонистические тенденции" },
        { min: 10, max: 15, label: "Высокий уровень — выраженный антагонизм, манипулятивность" }
      ]
    },
    disinhibition: {
      title: "Расторможенность",
      max: 15,
      ranges: [
        { min: 0, max: 4, label: "Низкий уровень — самоконтроль и предусмотрительность" },
        { min: 5, max: 9, label: "Средний уровень — умеренная импульсивность" },
        { min: 10, max: 15, label: "Высокий уровень — выраженная импульсивность и безрассудность" }
      ]
    },
    psychoticism: {
      title: "Психотизм",
      max: 15,
      ranges: [
        { min: 0, max: 4, label: "Низкий уровень — реалистичное восприятие" },
        { min: 5, max: 9, label: "Средний уровень — умеренная необычность переживаний" },
        { min: 10, max: 15, label: "Высокий уровень — выраженная эксцентричность, необычные переживания" }
      ]
    }
  },
  questions: [
    /* === Расторможенность (Disinhibition): 1, 2, 3, 5, 6 === */
    { id: "pid1", scale: "disinhibition", text: "По мнению людей, я безрассудный человек.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] },
    { id: "pid2", scale: "disinhibition", text: "Мне кажется, я действую только под влиянием импульса.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] },
    { id: "pid3", scale: "disinhibition", text: "Я понимаю, что это неверно, но всё равно принимаю опрометчивые решения.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] },
    { id: "pid4", scale: "detachment", text: "Я часто ощущаю, что мои действия не имеют значения.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] },
    { id: "pid5", scale: "disinhibition", text: "Другие видят меня безответственным человеком.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] },
    { id: "pid6", scale: "disinhibition", text: "Я не умею планировать наперёд.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] },

    /* === Психотизм (Psychoticism): 7, 12, 21, 23, 24 === */
    { id: "pid7", scale: "psychoticism", text: "Мои мысли часто непонятны другим.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] },

    /* === Негативная аффективность (Negative Affectivity): 8, 9, 10, 11, 15 === */
    { id: "pid8", scale: "negative_affectivity", text: "Я беспокоюсь практически из-за всего.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] },
    { id: "pid9", scale: "negative_affectivity", text: "Я легко расстраиваюсь, часто почти без причины.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] },
    { id: "pid10", scale: "negative_affectivity", text: "Больше всего я боюсь остаться один.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] },
    { id: "pid11", scale: "negative_affectivity", text: "Я зацикливаюсь на одном варианте, даже если очевидно, что он не работает.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] },

    { id: "pid12", scale: "psychoticism", text: "Я видел вещи, которых на самом деле не было.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] },

    /* === Отстранённость (Detachment): 4, 13, 14, 16, 18 === */
    { id: "pid13", scale: "detachment", text: "Я сторонюсь романтических отношений.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] },
    { id: "pid14", scale: "detachment", text: "Меня не интересует дружба.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] },

    { id: "pid15", scale: "negative_affectivity", text: "Меня легко приводят в раздражение самые разнообразные вещи.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] },

    { id: "pid16", scale: "detachment", text: "Мне не нравится сближаться с людьми.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] },

    /* === Антагонизм (Antagonism): 17, 19, 20, 22, 25 === */
    { id: "pid17", scale: "antagonism", text: "Ничего страшного не случится, если я задену чувства другого человека.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] },

    { id: "pid18", scale: "detachment", text: "Я редко испытываю воодушевление по какому-либо поводу.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] },

    { id: "pid19", scale: "antagonism", text: "Я жажду внимания.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] },
    { id: "pid20", scale: "antagonism", text: "Мне часто приходится иметь дело с людьми, которые менее значительны, чем я.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] },

    { id: "pid21", scale: "psychoticism", text: "Меня часто посещают мысли, которые кажутся мне вполне разумными, но другим они кажутся странными.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] },

    { id: "pid22", scale: "antagonism", text: "Я пользуюсь людьми, чтобы получить то, чего хочу.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] },

    { id: "pid23", scale: "psychoticism", text: "Я часто «отключаюсь» и потом внезапно прихожу в сознание и понимаю, что прошло уже много времени.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] },
    { id: "pid24", scale: "psychoticism", text: "Всё вокруг часто кажется мне нереальным или, наоборот, реальнее, чем обычно.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] },

    { id: "pid25", scale: "antagonism", text: "Я легко пользуюсь другими в своих интересах.", options: [{ text: "Совершенно неверно", value: 0 }, { text: "Иногда неверно", value: 1 }, { text: "Иногда верно", value: 2 }, { text: "Совершенно верно", value: 3 }] }
  ]
});
