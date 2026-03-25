/* ═══════════════════════════════════════════
   DEEP PSY TESTS — RESULTS RENDERER v4
   Color-coded results matching user's palette,
   range tables, accordion, lead form + success modal.
   Must load AFTER engine.js.
   ═══════════════════════════════════════════ */
(function () {
  "use strict";

  /* Color mapping: ok → norm (green), warn → sub (gold), risk → clin (red) */
  function getColorClass(score, ranges) {
    if (!ranges || !ranges.length) return "ok";
    for (var i = 0; i < ranges.length; i++) {
      if (score >= ranges[i].min && score <= ranges[i].max) {
        var pos = i / (ranges.length - 1 || 1);
        if (pos <= 0.34) return "ok";
        if (pos <= 0.67) return "warn";
        return "risk";
      }
    }
    return "ok";
  }

  function getLabel(score, ranges) {
    for (var i = 0; i < ranges.length; i++) {
      if (score >= ranges[i].min && score <= ranges[i].max) return ranges[i].label;
    }
    return "";
  }

  function getInterpretation(scaleName, label, colorClass) {
    if (colorClass === "ok") {
      return "Ваш показатель по шкале «" + scaleName + "» находится в пределах нормы (" + label + "). " +
             "Это означает, что в данной сфере значимых отклонений не выявлено.";
    }
    if (colorClass === "warn") {
      return "Показатель по шкале «" + scaleName + "» умеренно повышен (" + label + "). " +
             "Это может указывать на определённую тенденцию, заслуживающую внимания. " +
             "Рекомендуется более детальная диагностика.";
    }
    return "Показатель по шкале «" + scaleName + "» значительно повышен (" + label + "). " +
           "Это может свидетельствовать о наличии выраженных трудностей в данной сфере. " +
           "Рекомендуется обратиться к специалисту для подробной интерпретации.";
  }

  function getSummaryText(hasRisk, hasWarn) {
    if (hasRisk) {
      return "Выявлены клинически значимые показатели. Настоятельно рекомендуется обсудить результаты со специалистом для получения точной оценки вашего состояния.";
    }
    if (hasWarn) {
      return "Присутствуют субклинические проявления. Ваше состояние требует внимания. Рекомендуется наблюдение или консультация психолога для профилактики.";
    }
    return "Ваши показатели находятся в пределах нормы. Продолжайте поддерживать своё психоэмоциональное здоровье.";
  }

  var chevronSVG = '<svg class="deep-accordion-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><polyline points="5 8 10 13 15 8"/></svg>';

  /* ── Build ranges table for a scale ── */
  function buildRangesHtml(ranges, colorClass) {
    if (!ranges || !ranges.length) return "";
    var colorMap = {};
    for (var i = 0; i < ranges.length; i++) {
      var pos = i / (ranges.length - 1 || 1);
      if (pos <= 0.34) colorMap[i] = "ok";
      else if (pos <= 0.67) colorMap[i] = "warn";
      else colorMap[i] = "risk";
    }
    var html = '<div class="deep-tests-ranges">';
    for (var j = 0; j < ranges.length; j++) {
      var isActive = colorMap[j] === colorClass;
      var colorStyle = "";
      if (isActive) {
        if (colorClass === "ok") colorStyle = "color:var(--dt-success);font-weight:700;";
        else if (colorClass === "warn") colorStyle = "color:var(--dt-warning);font-weight:700;";
        else colorStyle = "color:var(--dt-danger);font-weight:700;";
      }
      html += '<div' + (colorStyle ? ' style="' + colorStyle + '"' : '') + '><span>' + ranges[j].min + '–' + ranges[j].max + '</span><span>' + ranges[j].label + '</span></div>';
    }
    html += '</div>';
    return html;
  }
  /* ── Render for tests returning {scores, scales, interpretations} (SMIL) ── */
  function renderCustomResult(test, session, appEl, allTests, result) {
    var scaleKeys = Object.keys(result.scores);
    var hasRisk = false, hasWarn = false;

    var cardsHtml = scaleKeys.map(function(k) {
      var score = result.scores[k];
      var scaleInfo = (result.scales || test.scales || {})[k] || { title: k, maxScore: 100 };
      var max = scaleInfo.maxScore || scaleInfo.max || 100;
      var pct = Math.min(100, Math.round((score / max) * 100));
      var color = score > 70 ? "risk" : score > 55 ? "warn" : "ok";
      var label = score > 70 ? "Выше нормы" : score > 55 ? "Умеренно" : "Норма";

      if (color === "risk") hasRisk = true;
      if (color === "warn") hasWarn = true;

      return '<div class="deep-tests-score-card">' +
        '<div class="deep-tests-score-head">' +
          '<span class="deep-tests-score-title">' + scaleInfo.title + '</span>' +
          '<span class="deep-tests-score-value score-' + color + '">' + score + ' <span>T</span></span>' +
        '</div>' +
        '<div class="deep-tests-bar"><span class="bar-' + color + '" data-width="' + pct + '"></span></div>' +
        '<span class="deep-tests-status status-' + color + '">' + label + '</span>' +
      '</div>';
    }).join("");

    /* Interpretations from calculateResult */
    var interpHtml = "";
    if (result.interpretations && result.interpretations.length) {
      interpHtml = '<div class="deep-accordion" style="margin-top:16px;">';
      result.interpretations.forEach(function(item) {
        interpHtml += '<div class="deep-accordion-item">' +
          '<div class="deep-accordion-header" data-action="toggle-accordion"><span>' + item.title + '</span>' + chevronSVG + '</div>' +
          '<div class="deep-accordion-body"><p>' + item.text + '</p></div>' +
        '</div>';
      });
      interpHtml += '</div>';
    }

    assembleResultPage(test, session, appEl, allTests, cardsHtml, interpHtml, hasRisk, hasWarn);
  }

  /* ── Render for tests returning array of score objects (Leongard) ── */
  function renderArrayResult(test, session, appEl, allTests, resultArr) {
    var hasRisk = false, hasWarn = false;

    var cardsHtml = resultArr.map(function(item) {
      var score = item.score || 0;
      var max = item.maxScore || 24;
      var pct = Math.min(100, Math.round((score / max) * 100));
      var color = score >= 18 ? "risk" : score >= 12 ? "warn" : "ok";
      var label = item.label || (score >= 18 ? "Акцентуация выражена" : score >= 12 ? "Склонность" : "Норма");

      if (color === "risk") hasRisk = true;
      if (color === "warn") hasWarn = true;

      return '<div class="deep-tests-score-card">' +
        '<div class="deep-tests-score-head">' +
          '<span class="deep-tests-score-title">' + item.title + '</span>' +
          '<span class="deep-tests-score-value score-' + color + '">' + score + ' <span>/ ' + max + '</span></span>' +
        '</div>' +
        '<div class="deep-tests-bar"><span class="bar-' + color + '" data-width="' + pct + '"></span></div>' +
        '<span class="deep-tests-status status-' + color + '">' + label + '</span>' +
      '</div>';
    }).join("");

    assembleResultPage(test, session, appEl, allTests, cardsHtml, "", hasRisk, hasWarn);
  }

  /* ── Shared result page assembly ── */
  function assembleResultPage(test, session, appEl, allTests, cardsHtml, extraHtml, hasRisk, hasWarn) {
    var summaryText = getSummaryText(hasRisk, hasWarn);
    var nextTestHtml = buildNextTestHtml(test, allTests, hasRisk);
    var consultHtml = hasRisk ? buildConsultHtml() : "";
    var formHtml = buildFormHtml();

    appEl.innerHTML =
      '<div class="deep-tests-screen">' +
        '<div class="deep-tests-scroll">' +
          '<div class="deep-tests-top-space">' +
            '<div class="deep-tests-kicker">Результат</div>' +
            '<h2 class="deep-tests-title">' + test.title + '</h2>' +
          '</div>' +
          '<div class="deep-tests-note" style="margin-top:16px;">' +
            '<strong>Общее заключение:</strong> ' + summaryText +
          '</div>' +
          '<div class="deep-tests-score-grid">' + cardsHtml + '</div>' +
          extraHtml +
          '<p class="deep-tests-disclaimer">Результаты носят ориентировочный характер и не являются клиническим диагнозом.</p>' +
          consultHtml + nextTestHtml + formHtml +
          '<div class="deep-tests-actions" style="margin-top:24px;">' +
            '<button class="deep-tests-btn deep-tests-btn-secondary" type="button" data-action="restart-test">Пройти заново</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    animateBars(appEl);
  }

  function animateBars(el) {
    setTimeout(function() {
      var bars = el.querySelectorAll('.deep-tests-bar > span');
      bars.forEach(function(bar) { var w = bar.getAttribute('data-width'); if (w) bar.style.width = w + '%'; });
    }, 60);
  }

  /* ── Main render function ── */
  window.deepTestsRenderResult = function (test, session, appEl, allTests) {
    var scores = {};
    var scaleKeys = test.scales ? Object.keys(test.scales) : [];

    /* If test has its own calculateResult method, use it */
    if (typeof test.calculateResult === "function") {
      try {
        var customResult = test.calculateResult(session.answers);
        /* SMIL returns { scores, scales, interpretations } */
        if (customResult && customResult.scores) {
          return renderCustomResult(test, session, appEl, allTests, customResult);
        }
        /* Leongard returns array of { id, title, score, maxScore, label, color } */
        if (Array.isArray(customResult)) {
          return renderArrayResult(test, session, appEl, allTests, customResult);
        }
      } catch (e) {
        console.warn("DEEP: calculateResult error for " + test.id, e);
      }
    }

    /* Generic scoring fallback */
    scaleKeys.forEach(function (k) { scores[k] = 0; });

    test.questions.forEach(function (q) {
      if (q.isIntro) return; /* skip intro screens */
      var ansVal = session.answers[q.id];
      var ansList = q.answers || q.options;
      if (ansVal !== undefined && ansVal !== null && ansList) {
        /* ansVal is now the actual value/score, find matching option */
        for (var i = 0; i < ansList.length; i++) {
          var a = ansList[i];
          var matchVal = a.value !== undefined ? a.value : a.score !== undefined ? a.score : i;
          if (matchVal === ansVal || i === ansVal) {
            if (a.score && typeof a.score === "object") {
              for (var scale in a.score) {
                scores[scale] = (scores[scale] || 0) + a.score[scale];
              }
            } else if (typeof a.value === "number") {
              var targetScale = q.scale || scaleKeys[0];
              scores[targetScale] = (scores[targetScale] || 0) + a.value;
            }
            break;
          }
        }
      }
    });

    var hasRisk = false;
    var hasWarn = false;

    var cardsHtml = scaleKeys.map(function (k) {
      var scale = test.scales[k];
      var score = scores[k] || 0;
      var max = scale.max || 1;
      var color = getColorClass(score, scale.ranges);
      var label = getLabel(score, scale.ranges);
      var interp = getInterpretation(scale.title, label, color);

      if (color === "risk") hasRisk = true;
      if (color === "warn") hasWarn = true;

      return '<div class="deep-tests-score-card">' +
        '<div class="deep-tests-score-head">' +
          '<span class="deep-tests-score-title">' + scale.title + '</span>' +
          '<span class="deep-tests-score-value score-' + color + '">' + score + ' <span>/ ' + max + '</span></span>' +
        '</div>' +
        '<div class="deep-tests-bar"><span class="bar-' + color + '" data-width="' + Math.min(100, Math.round((score / max) * 100)) + '"></span></div>' +
        '<span class="deep-tests-status status-' + color + '">' + label + '</span>' +

        /* Ranges table */
        buildRangesHtml(scale.ranges, color) +

        /* Accordion interpretation */
        '<div class="deep-accordion">' +
          '<div class="deep-accordion-item">' +
            '<div class="deep-accordion-header" data-action="toggle-accordion">' +
              '<span>Подробная интерпретация</span>' + chevronSVG +
            '</div>' +
            '<div class="deep-accordion-body"><p>' + interp + '</p></div>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join("");

    assembleResultPage(test, session, appEl, allTests, cardsHtml, "", hasRisk, hasWarn);
  };

  /* ── Shared helper functions ── */
  function buildNextTestHtml(test, allTests, hasRisk) {
    var html = "";
    if (window.DEEP_CATEGORY_DATA && window.DEEP_CATEGORY_DATA.subcategories) {
      var nextTests = [];
      window.DEEP_CATEGORY_DATA.subcategories.forEach(function (sub) {
        sub.tests.forEach(function (t) {
          if (t.isRunnable && t.id !== test.id && allTests[t.id] && allTests[t.id].questions && allTests[t.id].questions.length > 0) {
            nextTests.push(t);
          }
        });
      });
      if (nextTests.length > 0) {
        var rnd = nextTests[Math.floor(Math.random() * nextTests.length)];
        html = '<div class="deep-tests-cta-block">' +
          '<h4>' + (hasRisk ? "Рекомендуем пройти дополнительную диагностику" : "Продолжите изучение") + '</h4>' +
          '<p>' + rnd.title + (rnd.measures ? ' — ' + rnd.measures : '') + '</p>' +
          '<button type="button" class="deep-tests-btn deep-tests-btn-primary" data-action="next-test" data-test-id="' + rnd.id + '">Пройти следующий тест</button>' +
        '</div>';
      }
    }
    return html;
  }

  function buildConsultHtml() {
    return '<div class="deep-tests-cta-block" style="border-color:var(--dt-danger-border);background:linear-gradient(135deg,rgba(217,140,140,0.06),rgba(217,140,140,0.02));">' +
      '<h4 style="color:var(--dt-danger);">Обратите внимание</h4>' +
      '<p>По некоторым шкалам ваши результаты выходят за пределы нормы. ' +
      'Это не диагноз, но может быть полезным обсудить результаты с квалифицированным специалистом.</p>' +
      '<a href="https://t.me/DeepPsySolutions" target="_blank" class="deep-tests-btn deep-tests-btn-secondary" style="flex:none;">Связаться со специалистом</a>' +
    '</div>';
  }

  function buildFormHtml() {
    var profile = {};
    try { profile = JSON.parse(localStorage.getItem("deep-tests-user-profile")) || {}; } catch(e) {}

    return '<div class="deep-tests-form">' +
      '<div class="deep-tests-form-title">Получить подробный отчёт на e-mail</div>' +
      '<div class="deep-tests-input-group">' +
        '<input class="deep-tests-input" type="text" name="lead_name" placeholder="Имя (как к вам обращаться?)" value="' + (profile.name || '') + '">' +
      '</div>' +
      '<div class="deep-tests-input-group">' +
        '<input class="deep-tests-input" type="email" name="lead_email" placeholder="E-mail (куда прислать отчёт)" value="' + (profile.email || '') + '">' +
      '</div>' +
      '<div class="deep-tests-input-group">' +
        '<label>Альтернативный способ связи</label>' +
        '<input class="deep-tests-input" type="text" name="contact_alt" placeholder="Напишите ваши контакты / @никнейм" value="' + (profile.contact_alt || '') + '">' +
      '</div>' +
      '<label class="deep-tests-checkbox-group">' +
        '<input type="checkbox" name="lead_consent">' +
        '<span>Согласен(на) на <a href="#" onclick="return false">обработку персональных данных</a> и <a href="#" onclick="return false">политику конфиденциальности</a></span>' +
      '</label>' +
      '<label class="deep-tests-checkbox-group">' +
        '<input type="checkbox" name="lead_newsletter">' +
        '<span>Согласен(на) на рассылку (необязательно)</span>' +
      '</label>' +
      '<div class="deep-tests-actions" style="margin-top:16px;">' +
        '<button type="button" class="deep-tests-btn deep-tests-btn-primary" data-action="submit-lead">Получить отчёт</button>' +
      '</div>' +
    '</div>';
  }

})();
