/**
 * DEEP PSY TESTS — TEST DATA: PHQ-9 (Depression)
 * 9 items. Public Domain.
 */
window.DEEP_TESTS = window.DEEP_TESTS || {};
window.DEEP_TESTS["phq9"] = Object.assign(window.DEEP_TESTS["phq9"] || {}, {
  id: "phq9",
  title: "Опросник здоровья пациента — депрессия (PHQ-9)",
  shortTitle: "PHQ-9",
  description: "Быстрый скрининг симптомов депрессии за последние две недели.",
  intro: "За последние 2 недели, как часто вас беспокоило следующее?",
  scales: {
    depression: { 
      title: "Уровень депрессии", 
      max: 27, 
      ranges: [
        { min: 0, max: 4, label: "Минимальная депрессия / Норма" },
        { min: 5, max: 9, label: "Легкая депрессия" },
        { min: 10, max: 14, label: "Умеренная депрессия" },
        { min: 15, max: 19, label: "Умеренно тяжелая депрессия" },
        { min: 20, max: 27, label: "Тяжелая депрессия" }
      ]
    }
  },
  questions: [
    { id: "q1", scale: "depression", text: "Малый интерес или удовольствие от дел", options: [{ text: "Ни разу", value: 0 }, { text: "Несколько дней", value: 1 }, { text: "Более половины дней", value: 2 }, { text: "Почти каждый день", value: 3 }] },
    { id: "q2", scale: "depression", text: "Подавленность, депрессия или безнадежность", options: [{ text: "Ни разу", value: 0 }, { text: "Несколько дней", value: 1 }, { text: "Более половины дней", value: 2 }, { text: "Почти каждый день", value: 3 }] },
    { id: "q3", scale: "depression", text: "Трудности с засыпанием, прерывистый сон или слишком долгий сон", options: [{ text: "Ни разу", value: 0 }, { text: "Несколько дней", value: 1 }, { text: "Более половины дней", value: 2 }, { text: "Почти каждый день", value: 3 }] },
    { id: "q4", scale: "depression", text: "Чувство усталости или нехватка энергии", options: [{ text: "Ни разу", value: 0 }, { text: "Несколько дней", value: 1 }, { text: "Более половины дней", value: 2 }, { text: "Почти каждый день", value: 3 }] },
    { id: "q5", scale: "depression", text: "Плохой аппетит или переедание", options: [{ text: "Ни разу", value: 0 }, { text: "Несколько дней", value: 1 }, { text: "Более половины дней", value: 2 }, { text: "Почти каждый день", value: 3 }] },
    { id: "q6", scale: "depression", text: "Чувство неудачи или что вы подвели себя или свою семью", options: [{ text: "Ни разу", value: 0 }, { text: "Несколько дней", value: 1 }, { text: "Более половины дней", value: 2 }, { text: "Почти каждый день", value: 3 }] },
    { id: "q7", scale: "depression", text: "Трудности с концентрацией внимания (чтение, ТВ)", options: [{ text: "Ни разу", value: 0 }, { text: "Несколько дней", value: 1 }, { text: "Более половины дней", value: 2 }, { text: "Почти каждый день", value: 3 }] },
    { id: "q8", scale: "depression", text: "Замедленность движений/речи или, наоборот, суетливость", options: [{ text: "Ни разу", value: 0 }, { text: "Несколько дней", value: 1 }, { text: "Более половины дней", value: 2 }, { text: "Почти каждый день", value: 3 }] },
    { id: "q9", scale: "depression", text: "Мысли о том, что лучше было бы умереть или причинить себе вред", options: [{ text: "Ни разу", value: 0 }, { text: "Несколько дней", value: 1 }, { text: "Более половины дней", value: 2 }, { text: "Почти каждый день", value: 3 }] }
  ]
});
