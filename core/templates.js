/* ═══════════════════════════════════════════
   DEEP PSY TESTS — TEMPLATES
   HTML-шаблоны, иконки, визуальные утилиты.
   Модуль: чистые функции, не зависят от DOM.
   ═══════════════════════════════════════════ */
(function () {
  "use strict";

  /* ── SVG Icons Registry ── */
  var ICONS = {
    questions: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    time:      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    save:      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 0 0 1 2-2h11l5 5v11a2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>',
    check:     '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" fill="var(--dt-success-bg)" stroke="var(--dt-success)" stroke-width="1.2"/><path d="M6 9.2L8.2 11.4L12.2 7" stroke="var(--dt-success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    wip:       '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" fill="var(--dt-warning-bg)" stroke="var(--dt-warning)" stroke-width="1.2"/><path d="M9 6V9.5L11 11" stroke="var(--dt-warning)" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    burger:    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="18" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    close:     '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    search:    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    chevron:   '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>'
  };

  /* ── Category Color Palette ── */
  var CAT_COLORS = {
    personality:      { from: '#2D1B4E', to: '#4A2868' },
    mental_functions: { from: '#1E3340', to: '#2A4A55' },
    adaptation:       { from: '#1D3D2E', to: '#2B5A42' },
    psychiatry:       { from: '#3D1B2A', to: '#5C2840' },
    relationships:    { from: '#4E2D1B', to: '#6B4028' },
    career:           { from: '#2B2D1B', to: '#464A2D' },
    team:             { from: '#361B3D', to: '#502855' },
    organization:     { from: '#1B3535', to: '#2A5050' },
    psychoanalytic:   { from: '#4E3A1B', to: '#6B5028' },
    therapy_efficacy: { from: '#2E3D1B', to: '#455A2A' },
    _default:         { from: '#1E1E22', to: '#2A2A30' }
  };

  /* ── Category SVG Icons ── */
  var CAT_ICONS = {
    personality:      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    mental_functions: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-2-4-2.5c-.5.5-2 1-4 2.5s-3 3.5-3 5.5a7 7 0 0 0 7 7Z"/><path d="M12 2v4"/><path d="M4.2 4.2l2.8 2.8"/><path d="M19.8 4.2l-2.8 2.8"/></svg>',
    adaptation:       '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>',
    psychiatry:       '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
    relationships:    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    career:           '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
    team:             '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    organization:     '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>',
    psychoanalytic:   '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
    therapy_efficacy: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v1.5"/><path d="M12 19.5V21"/><path d="M3 12h1.5"/><path d="M19.5 12H21"/><path d="M5.6 5.6l1.1 1.1"/><path d="M17.3 17.3l1.1 1.1"/><path d="M5.6 18.4l1.1-1.1"/><path d="M17.3 6.7l1.1-1.1"/><path d="M12 8l-1.5 4 1.5 4 1.5-4z"/></svg>'
  };

  /* ── Short Labels for Sidebar ── */
  var SHORT_TITLES = {
    'Исследование личности': 'Личность',
    'Психические функции': 'Когнитивика',
    'Адаптация и дезадаптация': 'Адаптация',
    'Межличностные отношения и сексуальность': 'Отношения',
    'Индивидуальное карьерное консультирование': 'Карьера',
    'Командное консультирование': 'Команда',
    'Организационное консультирование': 'Организация',
    'Психоаналитическая диагностика': 'Психоанализ',
    'Оценка эффективности терапии': 'Эффективность'
  };

  /* ── HTML Templates ── */
  var TEMPLATES = {
    /* Test Card — Matilda Hybrid */
    testCard: function(test, statusHtml, badge) {
      var items = test.items || "?";
      var time = test.time ? (String(test.time).toLowerCase().indexOf("мин") !== -1 ? test.time : (test.time + " мин.")) : "15 мин.";
      var colors = getCatColor(test.categoryId || "");
      var catIcon = CAT_ICONS[test.categoryId] || "";
      
      var infoBadgeBtn = "";
      if (test.replacement) {
        var tooltipData = [
          test.authors ? 'Авторы: ' + test.authors : '',
          test.marketingTitle ? 'Название: ' + test.marketingTitle : '',
          test.titleEn ? 'EN: ' + test.titleEn : '',
          'Аналог: ' + test.replacement
        ].filter(Boolean).join('|||');
        infoBadgeBtn = '<div class="deep-card-info-badge" tabindex="0" aria-label="Информация" data-tooltip="' + tooltipData.replace(/"/g, '&quot;') + '"><span>i</span></div>';
      }
      
      return `
        <div class="deep-tests-card" data-action="open-test" data-id="${test.id}">
          ${statusHtml}
          <div class="deep-tests-card-image" style="background: linear-gradient(135deg, ${colors.from}, ${colors.to})">
            <div class="deep-tests-card-image-icon">${catIcon}</div>
            <div class="deep-tests-card-image-label">${test.shortTitle || test.id.toUpperCase()}</div>
            ${infoBadgeBtn}
          </div>
          <div class="deep-tests-card-content">
            <h3 class="deep-tests-card-title">${test.title}</h3>
            <div class="deep-tests-card-text">${test.measures || ""}</div>
            <div class="deep-tests-card-meta">
              <span class="deep-tests-pill ${badge.c}">${badge.t}</span>
              <span class="deep-tests-pill--muted">${items} вопр.</span>
              <span class="deep-tests-pill--muted">~${time}</span>
            </div>
          </div>
        </div>
      `;
    },

    /* Category Card — overview */
    catCard: function(cat, count) {
      var icon = CAT_ICONS[cat.categoryId] || "📋";
      var colors = getCatColor(cat.categoryId);
      return `
        <div class="deep-dash-cat-card" data-action="open-category" data-id="${cat.categoryId}">
          <div class="deep-dash-cat-image" style="background: linear-gradient(135deg, ${colors.from}, ${colors.to})">
            <div class="deep-dash-cat-image-icon">${icon}</div>
            <div class="deep-dash-cat-image-count">${count} инструментов</div>
          </div>
          <div class="deep-dash-cat-info">
            <h3 class="deep-dash-cat-name">${cat.categoryTitle}</h3>
            <p class="deep-dash-cat-desc">${cat.categoryDescription || ""}</p>
          </div>
        </div>
      `;
    },

    /* Score Card */
    scoreCard: function(title, val, max, color, label, pct) {
      return `
        <div class="deep-tests-score-card">
          <div class="deep-tests-score-head">
            <span class="deep-tests-score-title">${title}</span>
            <span class="deep-tests-score-value score-${color}">${val} <span>/ ${max}</span></span>
          </div>
          <div class="progress-bar"><span style="width:${pct}%" class="bar-${color}"></span></div>
          <span class="deep-tests-status status-${color}">${label}</span>
        </div>
      `;
    },

    /* Result Screen Wrapper */
    resultScreen: function(title, summary, cardsHtml) {
      return `
        <div class="deep-tests-screen">
          <div class="deep-tests-scroll">
            <div class="quiz-intro">
              <div class="deep-page-kicker">Результат</div>
              <h2 class="deep-page-title">${title}</h2>
              <div class="quiz-summary"><strong>Заключение:</strong> ${summary}</div>
            </div>
            <div class="deep-tests-score-grid">${cardsHtml}</div>
            <div class="quiz-disclaimer">Результаты носят ориентировочный характер и не являются клиническим диагнозом.</div>
            <div id="quiz-result-cta"></div>
            <div id="quiz-result-next"></div>
            <div id="quiz-result-form"></div>
            <div class="quiz-footer">
              <button class="deep-btn deep-btn--outline" data-action="restart-test">Пройти заново</button>
            </div>
          </div>
        </div>
      `;
    },

    /* Quiz Start Screen */
    startScreen: function(test, qLen, estTime, scaleNames, hasProgress) {
      var actionBtn = hasProgress ? 
        `<div class="btn-group">
          <button class="deep-btn deep-btn--primary" data-action="resume-test" style="flex:2">Продолжить</button>
          <button class="deep-btn deep-btn--outline" data-action="restart-test" style="flex:1">Заново</button>
        </div>` :
        `<button class="deep-btn deep-btn--primary full-width" data-action="start-test">Начать тест</button>`;

      return `
        <div class="deep-tests-screen">
          <div class="deep-tests-scroll">
            <div class="quiz-intro">
              <div class="deep-page-kicker">Тест</div>
              <h1 class="deep-page-title">${test.title}</h1>
              <p class="deep-page-subtitle">${test.description}</p>
              <div class="quiz-meta-row">
                 <div class="quiz-meta-item">${ICONS.questions} <span>${qLen} вопросов</span></div>
                 <div class="quiz-meta-item">${ICONS.time} <span>~${estTime} мин.</span></div>
              </div>
              ${scaleNames ? `<div class="quiz-scales"><span>Оценивает:</span> ${scaleNames}</div>` : ""}
              <div class="quiz-actions">${actionBtn}</div>
            </div>
          </div>
        </div>
      `;
    }
  };

  /* ── Public API ── */
  function getCatColor(catId) { return CAT_COLORS[catId] || CAT_COLORS._default; }

  window.DEEP_TPL = {
    ICONS: ICONS,
    CAT_COLORS: CAT_COLORS,
    CAT_ICONS: CAT_ICONS,
    SHORT_TITLES: SHORT_TITLES,
    TEMPLATES: TEMPLATES,
    getCatColor: getCatColor
  };
})();
