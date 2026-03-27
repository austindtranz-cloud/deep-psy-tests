/**
 * DEEP PSY TESTS — TEST DATA: Short Dark Triad (SD3)
 * 27 items, 3 scales: Machiavellianism, Narcissism, Psychopathy.
 */
window.DEEP_TESTS = window.DEEP_TESTS || {};
window.DEEP_TESTS["sd3"] = Object.assign(window.DEEP_TESTS["sd3"] || {}, {
  id: "sd3",
  title: "Короткий опросник Тёмной Триады (SD3)",
  shortTitle: "Тёмная Триада",
  description: "Измеряет три деструктивные черты личности: Макиавеллизм, Нарциссизм и Психопатию.",
  intro: "Пожалуйста, оцените каждое утверждение по 5-балльной шкале, где 1 — Полностью не согласен, а 5 — Полностью согласен.",
  scales: {
    machiavellianism: { title: "Макиавеллизм", max: 45, ranges: [{ min: 9, max: 22, label: "Низкий" }, { min: 23, max: 35, label: "Средний" }, { min: 36, max: 45, label: "Высокий" }] },
    narcissism: { title: "Нарциссизм", max: 45, ranges: [{ min: 9, max: 22, label: "Низкий" }, { min: 23, max: 35, label: "Средний" }, { min: 36, max: 45, label: "Высокий" }] },
    psychopathy: { title: "Психопатия", max: 45, ranges: [{ min: 9, max: 22, label: "Низкий" }, { min: 23, max: 35, label: "Средний" }, { min: 36, max: 45, label: "Высокий" }] }
  },
  questions: [
    // Макиавеллизм
    { id: "sd1", scale: "machiavellianism", text: "Не стоит рассказывать людям о своих планах — они могут использовать это против тебя.", options: [{ text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }] },
    { id: "sd2", scale: "machiavellianism", text: "Следи за тем, что говоришь людям, пока они не докажут, что им можно доверять.", options: [{ text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }] },
    { id: "sd3", scale: "machiavellianism", text: "Многие проблемы решаются, если умело солгать.", options: [{ text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }] },
    { id: "sd4", scale: "machiavellianism", text: "Большинство людей можно обмануть, если знать их слабые стороны.", options: [{ text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }] },
    { id: "sd5", scale: "machiavellianism", text: "Лучше убедиться, что твои планы не известны другим.", options: [{ text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }] },
    { id: "sd6", scale: "machiavellianism", text: "Есть смысл использовать других людей для достижения своих целей.", options: [{ text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }] },
    { id: "sd7", scale: "machiavellianism", text: "Люди видят тебя как лидера, если ты умеешь держать их в напряжении.", options: [{ text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }] },
    { id: "sd8", scale: "machiavellianism", text: "Хорошо, если ты умеешь скрывать правду.", options: [{ text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }] },
    { id: "sd9", scale: "machiavellianism", text: "Убедись, что твои планы принесут тебе пользу, прежде чем действовать.", options: [{ text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }] },
    
    // Нарциссизм
    { id: "sd10", scale: "narcissism", text: "Люди видят меня как прирождённого лидера.", options: [{ text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }] },
    { id: "sd11", scale: "narcissism", text: "Я ненавижу быть в центре внимания.", options: [{ text: "1", value: 5 }, { text: "2", value: 4 }, { text: "3", value: 3 }, { text: "4", value: 2 }, { text: "5", value: 1 }] },
    { id: "sd12", scale: "narcissism", text: "Многие групповые мероприятия становятся скучными без меня.", options: [{ text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }] },
    { id: "sd13", scale: "narcissism", text: "Я знаю, что я особенный, потому что все мне об этом говорят.", options: [{ text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }] },
    { id: "sd14", scale: "narcissism", text: "Я люблю, когда меня замечают, когда я вхожу в комнату.", options: [{ text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }] },
    { id: "sd15", scale: "narcissism", text: "Я нравлюсь большинству людей, которых встречаю.", options: [{ text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }] },
    { id: "sd16", scale: "narcissism", text: "Мне нравится быть лидером.", options: [{ text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }] },
    { id: "sd17", scale: "narcissism", text: "Я чувствую себя обычным человеком.", options: [{ text: "1", value: 5 }, { text: "2", value: 4 }, { text: "3", value: 3 }, { text: "4", value: 2 }, { text: "5", value: 1 }] },
    { id: "sd18", scale: "narcissism", text: "Я знаю, что привлекателен(а).", options: [{ text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }] },
    
    // Психопатия
    { id: "sd19", scale: "psychopathy", text: "Я избегаю опасных ситуаций.", options: [{ text: "1", value: 5 }, { text: "2", value: 4 }, { text: "3", value: 3 }, { text: "4", value: 2 }, { text: "5", value: 1 }] },
    { id: "sd20", scale: "psychopathy", text: "Месть должна быть быстрой и жёсткой.", options: [{ text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }] },
    { id: "sd21", scale: "psychopathy", text: "Люди часто говорят мне, что я вышел(а) из-под контроля.", options: [{ text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }] },
    { id: "sd22", scale: "psychopathy", text: "Правда в том, что я не сожалею о том, что причинил(а) другим вред.", options: [{ text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }] },
    { id: "sd23", scale: "psychopathy", text: "Я никогда не причинял(а) проблем намеренно.", options: [{ text: "1", value: 5 }, { text: "2", value: 4 }, { text: "3", value: 3 }, { text: "4", value: 2 }, { text: "5", value: 1 }] },
    { id: "sd24", scale: "psychopathy", text: "Я стараюсь не причинять вред другим.", options: [{ text: "1", value: 5 }, { text: "2", value: 4 }, { text: "3", value: 3 }, { text: "4", value: 2 }, { text: "5", value: 1 }] },
    { id: "sd25", scale: "psychopathy", text: "Люди, которые меня раздражают, получают то, что заслуживают.", options: [{ text: "1", value: 1 }, { text: "2", value: 2 }, { text: "3", value: 3 }, { text: "4", value: 4 }, { text: "5", value: 5 }] },
    { id: "sd26", scale: "psychopathy", text: "Я никогда не делаю ничего, что может навредить другим.", options: [{ text: "1", value: 5 }, { text: "2", value: 4 }, { text: "3", value: 3 }, { text: "4", value: 2 }, { text: "5", value: 1 }] },
    { id: "sd27", scale: "psychopathy", text: "Я стараюсь быть добрым(ой) ко всем.", options: [{ text: "1", value: 5 }, { text: "2", value: 4 }, { text: "3", value: 3 }, { text: "4", value: 2 }, { text: "5", value: 1 }] }
  ]
});
