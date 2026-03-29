/* ═══════════════════════════════════════════
   DEEP PSY TESTS — RESULTS RENDERER v15.1
   Color-coded results matching user's palette,
   unified with DEEP_UI templates.
   ═══════════════════════════════════════════ */
(function () {
  "use strict";

  /* ── Color Helper ── */
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
    return i > 0 ? ranges[ranges.length-1].label : "Норма";
  }

  function getSummaryText(hasRisk, hasWarn) {
    if (hasRisk) return "Выявлены клинически значимые показатели. Настоятельно рекомендуется обсудить результаты со специалистом.";
    if (hasWarn) return "Присутствуют субклинические проявления. Ваше состояние требует внимания и профилактики.";
    return "Ваши показатели находятся в пределах нормы. Продолжайте поддерживать своё психоэмоциональное здоровье.";
  }

  /* ── Main Render function ── */
  window.deepTestsRenderResult = function (test, session, appEl, allTests) {
    var TPL = window.DEEP_TPL;
    if (!TPL) return;

    var result = calculateScores(test, session);
    var hasRisk = false, hasWarn = false;

    var cardsHtml = result.map(item => {
      var color = getColorClass(item.score, item.ranges);
      if (color === "risk") hasRisk = true;
      if (color === "warn") hasWarn = true;
      
      var pct = Math.min(100, Math.round((item.score / (item.max || 1)) * 100));
      return TPL.TEMPLATES.scoreCard(item.title, item.score, item.max, color, item.label, pct);
    }).join("");

    appEl.innerHTML = TPL.TEMPLATES.resultScreen(test.title, getSummaryText(hasRisk, hasWarn), cardsHtml);

    /* Render CTA Blocks into placeholders */
    renderCTAs(test, appEl, hasRisk, hasWarn);
    
    // Animate bars
    setTimeout(() => {
        appEl.querySelectorAll('.progress-bar span').forEach(s => {
            s.style.width = s.parentElement.previousElementSibling.querySelector('.deep-tests-score-value').textContent.split('/')[0].trim() + '%'; // Simplified for demo
        });
    }, 100);
  };

  /* ── Calculation logic (Extracted) ── */
  function calculateScores(test, session) {
    var rawScores = {};
    var scaleKeys = test.scales ? Object.keys(test.scales) : ["default"];
    scaleKeys.forEach(k => rawScores[k] = 0);

    test.questions.forEach(q => {
      if (q.isIntro) return;
      var ansVal = session.answers[q.id];
      if (ansVal === undefined || ansVal === null) return;

      /* Строгая проверка типа: защита от NaN при кривых данных */
      var numVal = Number(ansVal);
      if (isNaN(numVal)) { console.warn('DEEP RESULTS: NaN answer for', q.id, ansVal); return; }

      var opt = q.options.find((o, i) => (o.score !== undefined ? o.score : (o.value !== undefined ? o.value : i)) === ansVal);
      if (opt && opt.score && typeof opt.score === "object") {
        for (var s in opt.score) {
          var sv = Number(opt.score[s]);
          rawScores[s] = (rawScores[s] || 0) + (isNaN(sv) ? 0 : sv);
        }
      } else {
        var sk = q.scale || scaleKeys[0];
        rawScores[sk] = (rawScores[sk] || 0) + numVal;
      }
    });

    return scaleKeys.map(k => {
      var scale = test.scales ? test.scales[k] : { title: "Результат", max: 100 };
      var coeff = scale.coefficient || 1;
      var finalScore = rawScores[k] * coeff;

      return {
        id: k,
        title: scale.title,
        score: finalScore,
        max: scale.max || 100,
        ranges: scale.ranges || [],
        label: getLabel(finalScore, scale.ranges || [])
      };
    });
  }

  function renderCTAs(test, appEl, hasRisk, hasWarn) {
    var ctaArea = appEl.querySelector("#quiz-result-cta");
    var nextArea = appEl.querySelector("#quiz-result-next");
    var formArea = appEl.querySelector("#quiz-result-form");

    if (hasRisk && ctaArea) {
      ctaArea.innerHTML = `
        <div class="quiz-stat-item" style="background:var(--dt-danger-bg); border:1px solid var(--dt-danger-border); padding:20px; border-radius:12px; margin-top:24px;">
          <div style="color:var(--dt-danger); font-weight:700; margin-bottom:8px;">Рекомендация</div>
          <p style="font-size:14px; color:var(--dt-text); margin-top:0; margin-bottom:16px;">Ваши результаты требуют внимания специалиста. Рекомендуем записаться на консультацию.</p>
          <a href="https://t.me/DeepPsySolutions" class="deep-tests-btn deep-tests-btn-primary" style="display:inline-block; text-decoration:none;">Написать психологу</a>
        </div>
      `;
    }

    if (nextArea) {
      // Pick random next test
      nextArea.innerHTML = `
        <div style="margin-top:32px; padding-top:24px; border-top:1px solid var(--dt-border);">
          <h4 style="font-family:var(--dt-f-head); font-size:18px; color:var(--dt-text); margin-top:0; margin-bottom:12px;">Что дальше?</h4>
          <p style="font-size:14px; color:var(--dt-muted); margin-top:0; margin-bottom:16px;">Рекомендуем продолжить диагностику для более полной картины.</p>
          <button class="deep-tests-btn deep-tests-btn-outline" onclick="window.DEEP_CORE.openTest('random')">Пройти другой тест</button>
        </div>
      `;
    }

    if (formArea) {
      formArea.innerHTML = `
        <div class="deep-tests-form" style="margin-top:40px;">
          <div class="deep-page-kicker">Бонус</div>
          <h3 style="font-family:var(--dt-f-head); font-size:24px; color:var(--dt-text); margin-top:0; margin-bottom:12px;">Получить расшифровку PDF</h3>
          <input type="email" class="deep-dash-search" placeholder="Ваш e-mail" style="margin-bottom:12px; width:100%; box-sizing:border-box;">
          <button class="deep-tests-btn deep-tests-btn-primary" style="width:100%">Отправить на почту</button>
        </div>
      `;
    }
  }

})();
