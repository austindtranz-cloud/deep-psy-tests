/**
 * DEEP PSY TESTS — TEST DATA: Holmes-Rahe Stress Scale (SRRS)
 * 43 items. Public Domain.
 */
window.DEEP_TESTS = window.DEEP_TESTS || {};
window.DEEP_TESTS["holmes_rahe"] = Object.assign(window.DEEP_TESTS["holmes_rahe"] || {}, {
  id: "holmes_rahe",
  title: "Шкала стресса Холмса-Рахе (SRRS)",
  shortTitle: "Холмс-Рахе",
  description: "Оценка уровня кумулятивного стресса от жизненных событий за последние 12 месяцев.",
  intro: "Пожалуйста, отметьте события, которые произошли в вашей жизни в течение ПОСЛЕДНЕГО ГОДА.",
  scales: {
    total: { 
      title: "Индекс сопротивляемости стрессу (LCU)", 
      max: 1000, 
      ranges: [
        { min: 0, max: 150, label: "Низкий уровень стресса (хорошая адаптация)" },
        { min: 151, max: 299, label: "Умеренный уровень стресса (риск заболевания ~50%)" },
        { min: 300, max: 9999, label: "Высокий уровень стресса (риск заболевания ~80%)" }
      ]
    }
  },
  questions: [
    { id: "hr1", scale: "total", text: "Смерть супруга (супруги)", options: [{ text: "Да", value: 100 }, { text: "Нет", value: 0 }] },
    { id: "hr2", scale: "total", text: "Развод", options: [{ text: "Да", value: 73 }, { text: "Нет", value: 0 }] },
    { id: "hr3", scale: "total", text: "Раздельное проживание супругов (без развода)", options: [{ text: "Да", value: 65 }, { text: "Нет", value: 0 }] },
    { id: "hr4", scale: "total", text: "Тюремное заключение", options: [{ text: "Да", value: 63 }, { text: "Нет", value: 0 }] },
    { id: "hr5", scale: "total", text: "Смерть близкого члена семьи", options: [{ text: "Да", value: 63 }, { text: "Нет", value: 0 }] },
    { id: "hr6", scale: "total", text: "Травма или серьезная болезнь", options: [{ text: "Да", value: 53 }, { text: "Нет", value: 0 }] },
    { id: "hr7", scale: "total", text: "Вступление в брак", options: [{ text: "Да", value: 50 }, { text: "Нет", value: 0 }] },
    { id: "hr8", scale: "total", text: "Увольнение с работы", options: [{ text: "Да", value: 47 }, { text: "Нет", value: 0 }] },
    { id: "hr9", scale: "total", text: "Примирение супругов", options: [{ text: "Да", value: 45 }, { text: "Нет", value: 0 }] },
    { id: "hr10", scale: "total", text: "Выход на пенсию", options: [{ text: "Да", value: 45 }, { text: "Нет", value: 0 }] },
    { id: "hr11", scale: "total", text: "Проблемы со здоровьем члена семьи", options: [{ text: "Да", value: 44 }, { text: "Нет", value: 0 }] },
    { id: "hr12", scale: "total", text: "Беременность", options: [{ text: "Да", value: 40 }, { text: "Нет", value: 0 }] },
    { id: "hr13", scale: "total", text: "Сексуальные проблемы", options: [{ text: "Да", value: 39 }, { text: "Нет", value: 0 }] },
    { id: "hr14", scale: "total", text: "Рождение или усыновление ребенка", options: [{ text: "Да", value: 39 }, { text: "Нет", value: 0 }] },
    { id: "hr15", scale: "total", text: "Реорганизация на работе", options: [{ text: "Да", value: 39 }, { text: "Нет", value: 0 }] },
    { id: "hr16", scale: "total", text: "Изменение финансового состояния", options: [{ text: "Да", value: 38 }, { text: "Нет", value: 0 }] },
    { id: "hr17", scale: "total", text: "Смерть близкого друга", options: [{ text: "Да", value: 37 }, { text: "Нет", value: 0 }] },
    { id: "hr18", scale: "total", text: "Смена вида деятельности", options: [{ text: "Да", value: 36 }, { text: "Нет", value: 0 }] },
    { id: "hr19", scale: "total", text: "Ссоры с родственниками (ухудшение отношений)", options: [{ text: "Да", value: 35 }, { text: "Нет", value: 0 }] },
    { id: "hr20", scale: "total", text: "Взятие ипотеки или крупного кредита", options: [{ text: "Да", value: 32 }, { text: "Нет", value: 0 }] },
    { id: "hr21", scale: "total", text: "Просрочка выплат по ипотеке или кредиту", options: [{ text: "Да", value: 30 }, { text: "Нет", value: 0 }] },
    { id: "hr22", scale: "total", text: "Изменение обязанностей на работе", options: [{ text: "Да", value: 29 }, { text: "Нет", value: 0 }] },
    { id: "hr23", scale: "total", text: "Сын или дочь покидают дом", options: [{ text: "Да", value: 29 }, { text: "Нет", value: 0 }] },
    { id: "hr24", scale: "total", text: "Проблемы у родственников", options: [{ text: "Да", value: 29 }, { text: "Нет", value: 0 }] },
    { id: "hr25", scale: "total", text: "Крупное личное достижение (успех)", options: [{ text: "Да", value: 28 }, { text: "Нет", value: 0 }] },
    { id: "hr26", scale: "total", text: "Супруг(а) начинает или бросает работать", options: [{ text: "Да", value: 26 }, { text: "Нет", value: 0 }] },
    { id: "hr27", scale: "total", text: "Начало или окончание учебы", options: [{ text: "Да", value: 26 }, { text: "Нет", value: 0 }] },
    { id: "hr28", scale: "total", text: "Изменение условий жизни", options: [{ text: "Да", value: 25 }, { text: "Нет", value: 0 }] },
    { id: "hr29", scale: "total", text: "Изменение личных привычек", options: [{ text: "Да", value: 24 }, { text: "Нет", value: 0 }] },
    { id: "hr30", scale: "total", text: "Проблемы с начальством", options: [{ text: "Да", value: 23 }, { text: "Нет", value: 0 }] },
    { id: "hr31", scale: "total", text: "Изменение условий или часов работы", options: [{ text: "Да", value: 20 }, { text: "Нет", value: 0 }] },
    { id: "hr32", scale: "total", text: "Смена места жительства (переезд)", options: [{ text: "Да", value: 20 }, { text: "Нет", value: 0 }] },
    { id: "hr33", scale: "total", text: "Смена места обучения", options: [{ text: "Да", value: 20 }, { text: "Нет", value: 0 }] },
    { id: "hr34", scale: "total", text: "Смена привычного вида отдыха", options: [{ text: "Да", value: 19 }, { text: "Нет", value: 0 }] },
    { id: "hr35", scale: "total", text: "Изменения в участии в жизни общины/церкви", options: [{ text: "Да", value: 19 }, { text: "Нет", value: 0 }] },
    { id: "hr36", scale: "total", text: "Изменения в социальной активности", options: [{ text: "Да", value: 18 }, { text: "Нет", value: 0 }] },
    { id: "hr37", scale: "total", text: "Небольшой кредит (займ)", options: [{ text: "Да", value: 17 }, { text: "Нет", value: 0 }] },
    { id: "hr38", scale: "total", text: "Изменение в привычках сна", options: [{ text: "Да", value: 16 }, { text: "Нет", value: 0 }] },
    { id: "hr39", scale: "total", text: "Изменения в количестве семейных встреч/посиделок", options: [{ text: "Да", value: 15 }, { text: "Нет", value: 0 }] },
    { id: "hr40", scale: "total", text: "Изменение привычек питания", options: [{ text: "Да", value: 15 }, { text: "Нет", value: 0 }] },
    { id: "hr41", scale: "total", text: "Отпуск", options: [{ text: "Да", value: 13 }, { text: "Нет", value: 0 }] },
    { id: "hr42", scale: "total", text: "Праздники (Рождество, Новый Год)", options: [{ text: "Да", value: 12 }, { text: "Нет", value: 0 }] },
    { id: "hr43", scale: "total", text: "Мелкие нарушения закона (штрафы и т.п.)", options: [{ text: "Да", value: 11 }, { text: "Нет", value: 0 }] }
  ]
});
