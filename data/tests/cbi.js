/**
 * DEEP PSY TESTS — TEST DATA: CBI (Copenhagen Burnout Inventory)
 * 19 items. Public Domain.
 */
window.DEEP_TESTS = window.DEEP_TESTS || {};
window.DEEP_TESTS["cbi"] = Object.assign(window.DEEP_TESTS["cbi"] || {}, {
  id: "cbi",
  title: "Копенгагенский опросник выгорания (CBI)",
  shortTitle: "CBI",
  description: "Оценка уровня выгорания: личного, связанного с работой и связанного с клиентами.",
  intro: "Пожалуйста, ответьте на вопросы о вашем текущем состоянии.",
  scales: {
    personal: { title: "Личное выгорание", max: 100 },
    work: { title: "Рабочее выгорание", max: 100 },
    client: { title: "Клиентское выгорание", max: 100 }
  },
  questions: [
    // Личное выгорание (6 вопросов)
    { id: "cb1", scale: "personal", text: "Как часто Вы чувствуете себя усталым?", options: [{ text: "Всегда", value: 100 }, { text: "Часто", value: 75 }, { text: "Иногда", value: 50 }, { text: "Редко", value: 25 }, { text: "Никогда", value: 0 }] },
    { id: "cb2", scale: "personal", text: "Как часто Вы физически истощены?", options: [{ text: "Всегда", value: 100 }, { text: "Часто", value: 75 }, { text: "Иногда", value: 50 }, { text: "Редко", value: 25 }, { text: "Никогда", value: 0 }] },
    { id: "cb3", scale: "personal", text: "Как часто Вы эмоционально истощены?", options: [{ text: "Всегда", value: 100 }, { text: "Часто", value: 75 }, { text: "Иногда", value: 50 }, { text: "Редко", value: 25 }, { text: "Никогда", value: 0 }] },
    { id: "cb4", scale: "personal", text: "Как часто Вы думаете: «Я больше не могу»?", options: [{ text: "Всегда", value: 100 }, { text: "Часто", value: 75 }, { text: "Иногда", value: 50 }, { text: "Редко", value: 25 }, { text: "Никогда", value: 0 }] },
    { id: "cb5", scale: "personal", text: "Как часто Вы чувствуете себя измотанным?", options: [{ text: "Всегда", value: 100 }, { text: "Часто", value: 75 }, { text: "Иногда", value: 50 }, { text: "Редко", value: 25 }, { text: "Никогда", value: 0 }] },
    { id: "cb6", scale: "personal", text: "Как часто Вы чувствуете себя слабым и подверженным болезням?", options: [{ text: "Всегда", value: 100 }, { text: "Часто", value: 75 }, { text: "Иногда", value: 50 }, { text: "Редко", value: 25 }, { text: "Никогда", value: 0 }] },
    
    // Рабочее выгорание (7 вопросов)
    { id: "cb7", scale: "work", text: "Ваша работа эмоционально изнурительна?", options: [{ text: "В очень высокой степени", value: 100 }, { text: "В высокой степени", value: 75 }, { text: "В некоторой степени", value: 50 }, { text: "В низкой степени", value: 25 }, { text: "В очень низкой степени", value: 0 }] },
    { id: "cb8", scale: "work", text: "Вы чувствуете себя выгоревшим из-за работы?", options: [{ text: "В очень высокой степени", value: 100 }, { text: "В высокой степени", value: 75 }, { text: "В некоторой степени", value: 50 }, { text: "В низкой степени", value: 25 }, { text: "В очень низкой степени", value: 0 }] },
    { id: "cb9", scale: "work", text: "Ваша работа вызывает у Вас чувство разочарования?", options: [{ text: "В очень высокой степени", value: 100 }, { text: "В высокой степени", value: 75 }, { text: "В некоторой степени", value: 50 }, { text: "В низкой степени", value: 25 }, { text: "В очень низкой степени", value: 0 }] },
    { id: "cb10", scale: "work", text: "Вы чувствуете себя истощенным в конце рабочего дня?", options: [{ text: "Всегда", value: 100 }, { text: "Часто", value: 75 }, { text: "Иногда", value: 50 }, { text: "Редко", value: 25 }, { text: "Никогда", value: 0 }] },
    { id: "cb11", scale: "work", text: "У Вас не хватает сил на семью и друзей в свободное время из-за работы?", options: [{ text: "Всегда", value: 100 }, { text: "Часто", value: 75 }, { text: "Иногда", value: 50 }, { text: "Редко", value: 25 }, { text: "Никогда", value: 0 }] },
    { id: "cb12", scale: "work", text: "Ваша работа отнимает у Вас слишком много энергии?", options: [{ text: "Всегда", value: 100 }, { text: "Часто", value: 75 }, { text: "Иногда", value: 50 }, { text: "Редко", value: 25 }, { text: "Никогда", value: 0 }] },
    { id: "cb13", scale: "work", text: "Чувствуете ли Вы, что каждый рабочий час — это бремя?", options: [{ text: "Всегда", value: 100 }, { text: "Часто", value: 75 }, { text: "Иногда", value: 50 }, { text: "Редко", value: 25 }, { text: "Никогда", value: 0 }] },

    // Клиентское выгорание (6 вопросов)
    { id: "cb14", scale: "client", text: "Вам трудно работать с людьми/клиентами?", options: [{ text: "В очень высокой степени", value: 100 }, { text: "В высокой степени", value: 75 }, { text: "В некоторой степени", value: 50 }, { text: "В низкой степени", value: 25 }, { text: "В очень низкой степени", value: 0 }] },
    { id: "cb15", scale: "client", text: "Вы чувствуете, что отдаете больше, чем получаете обратно от клиентов?", options: [{ text: "В очень высокой степени", value: 100 }, { text: "В высокой степени", value: 75 }, { text: "В некоторой степени", value: 50 }, { text: "В низкой степени", value: 25 }, { text: "В очень низкой степени", value: 0 }] },
    { id: "cb16", scale: "client", text: "Вы чувствуете усталость от работы с людьми?", options: [{ text: "Всегда", value: 100 }, { text: "Часто", value: 75 }, { text: "Иногда", value: 50 }, { text: "Редко", value: 25 }, { text: "Никогда", value: 0 }] },
    { id: "cb17", scale: "client", text: "Иногда Вы ловите себя на мысли, что клиенты Вам безразличны?", options: [{ text: "Всегда", value: 100 }, { text: "Часто", value: 75 }, { text: "Иногда", value: 50 }, { text: "Редко", value: 25 }, { text: "Никогда", value: 0 }] },
    { id: "cb18", scale: "client", text: "Вам кажется, что Вы работаете слишком много с людьми?", options: [{ text: "В очень высокой степени", value: 100 }, { text: "В высокой степени", value: 75 }, { text: "В некоторой степени", value: 50 }, { text: "В низкой степени", value: 25 }, { text: "В очень низкой степени", value: 0 }] },
    { id: "cb19", scale: "client", text: "Иногда Вы чувствуете раздражение по отношению к своим клиентам?", options: [{ text: "Всегда", value: 100 }, { text: "Часто", value: 75 }, { text: "Иногда", value: 50 }, { text: "Редко", value: 25 }, { text: "Никогда", value: 0 }] }
  ]
});
