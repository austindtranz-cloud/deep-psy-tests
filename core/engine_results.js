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

  /* ── Main render function ── */
  window.deepTestsRenderResult = function (test, session, appEl, allTests) {
    var scores = {};
    var scaleKeys = Object.keys(test.scales);
    scaleKeys.forEach(function (k) { scores[k] = 0; });

    test.questions.forEach(function (q) {
      var ansIdx = session.answers[q.id];
      var ansList = q.answers || q.options;
      if (typeof ansIdx === "number" && ansList && ansList[ansIdx]) {
        var a = ansList[ansIdx];
        if (a.score) {
          for (var scale in a.score) {
            scores[scale] = (scores[scale] || 0) + a.score[scale];
          }
        } else if (typeof a.value === "number") {
          var targetScale = q.scale || scaleKeys[0];
          scores[targetScale] = (scores[targetScale] || 0) + a.value;
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

    /* Summary text */
    var summaryText = getSummaryText(hasRisk, hasWarn);

    /* Next test CTA */
    var nextTestHtml = "";
    if (window.DEEP_CATEGORY_DATA && window.DEEP_CATEGORY_DATA.subcategories) {
      var nextTests = [];
      window.DEEP_CATEGORY_DATA.subcategories.forEach(function (sub) {
        sub.tests.forEach(function (t) {
          if (t.isRunnable && t.id !== test.id && allTests[t.id]) {
            nextTests.push(t);
          }
        });
      });
      if (nextTests.length > 0) {
        var rnd = nextTests[Math.floor(Math.random() * nextTests.length)];
        nextTestHtml = '<div class="deep-tests-cta-block">' +
          '<h4>' + (hasRisk ? "Рекомендуем пройти дополнительную диагностику" : "Продолжите изучение") + '</h4>' +
          '<p>' + rnd.title + ' — ' + rnd.measures + '</p>' +
          '<button type="button" class="deep-tests-btn deep-tests-btn-primary" data-action="next-test" data-test-id="' + rnd.id + '">Пройти следующий тест</button>' +
        '</div>';
      }
    }

    /* Consultation CTA if risk */
    var consultHtml = "";
    if (hasRisk) {
      consultHtml = '<div class="deep-tests-cta-block" style="border-color:var(--dt-danger-border);background:linear-gradient(135deg,rgba(217,140,140,0.06),rgba(217,140,140,0.02));">' +
        '<h4 style="color:var(--dt-danger);">Обратите внимание</h4>' +
        '<p>По некоторым шкалам ваши результаты выходят за пределы нормы. ' +
        'Это не диагноз, но может быть полезным обсудить результаты с квалифицированным специалистом.</p>' +
        '<a href="https://t.me/DeepPsySolutions" target="_blank" class="deep-tests-btn deep-tests-btn-secondary" style="flex:none;">Связаться со специалистом</a>' +
      '</div>';
    }

    /* User Profile Cache */
    var profile = {};
    try { profile = JSON.parse(localStorage.getItem("deep-tests-user-profile")) || {}; } catch(e) {}

    /* Lead form — always editable, even after submission */
    var formHtml = '<div class="deep-tests-form">' +
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

    /* Assemble */
    appEl.innerHTML =
      '<div class="deep-tests-screen">' +
        '<div class="deep-tests-scroll">' +
          '<div class="deep-tests-top-space">' +
            '<div class="deep-tests-kicker">Результат</div>' +
            '<h2 class="deep-tests-title">' + test.title + '</h2>' +
          '</div>' +

          /* Summary block */
          '<div class="deep-tests-note" style="margin-top:16px;">' +
            '<strong>Общее заключение:</strong> ' + summaryText +
          '</div>' +

          '<div class="deep-tests-score-grid">' + cardsHtml + '</div>' +

          '<p class="deep-tests-disclaimer">Результаты носят ориентировочный характер и не являются клиническим диагнозом.</p>' +
          consultHtml +
          nextTestHtml +
          formHtml +
          '<div class="deep-tests-actions" style="margin-top:24px;">' +
            '<button class="deep-tests-btn deep-tests-btn-secondary" type="button" data-action="restart-test">Пройти заново</button>' +
          '</div>' +

          /* Bug report link */
          '<div style="text-align:center;margin-top:32px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.04);">' +
            '<a href="#" data-action="open-bug-report" style="font-size:12px;color:rgba(168,159,145,0.5);text-decoration:none;transition:color .2s;" onmouseover="this.style.color=\'rgba(168,159,145,0.8)\'" onmouseout="this.style.color=\'rgba(168,159,145,0.5)\'">Сообщить об ошибке</a>' +
          '</div>' +

        '</div>' +
      '</div>';

    /* Animate bars after render */
    setTimeout(function() {
      var bars = appEl.querySelectorAll('.deep-tests-bar > span');
      bars.forEach(function(bar) {
        var w = bar.getAttribute('data-width');
        if (w) bar.style.width = w + '%';
      });
    }, 60);
  };
})();
