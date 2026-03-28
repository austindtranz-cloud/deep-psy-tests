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
        appEl.querySelectorAll('.deep-tests-bar span').forEach(s => {
            var w = s.getAttribute('style');
            if (w) { var m = w.match(/width:\s*(\d+)%/); if (m) { s.style.width = '0'; setTimeout(() => { s.style.width = m[1] + '%'; }, 50); }}
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
        <div class="deep-tests-cta-block" style="border-color:var(--dt-danger-border); background:var(--dt-danger-bg);">
          <h4 style="color:var(--dt-danger);">Рекомендация</h4>
          <p>Ваши результаты требуют внимания специалиста. Рекомендуем записаться на консультацию.</p>
          <a href="https://t.me/DeepPsySolutions" class="deep-tests-btn deep-tests-btn-primary">Написать психологу</a>
        </div>
      `;
    } else if (hasWarn && ctaArea) {
      ctaArea.innerHTML = `
        <div class="deep-tests-cta-block" style="border-color:var(--dt-warning-border);">
          <h4>Обратите внимание</h4>
          <p>Некоторые показатели находятся в субклиническом диапазоне. Рекомендуем проконсультироваться со специалистом.</p>
          <a href="https://t.me/DeepPsySolutions" class="deep-tests-btn deep-tests-btn-outline">Записаться на консультацию</a>
        </div>
      `;
    }

    if (nextArea) {
      nextArea.innerHTML = `
        <div class="deep-tests-cta-block">
          <h4>Что дальше?</h4>
          <p>Рекомендуем продолжить диагностику для более полной картины.</p>
          <button class="deep-tests-btn deep-tests-btn-outline" onclick="window.DEEP_CORE.openTest('random')">Пройти другой тест</button>
        </div>
      `;
    }

    if (formArea) {
      /* Try to pre-fill from profile */
      var p = {};
      try { p = JSON.parse(localStorage.getItem("deep-tests-user-profile")) || {}; } catch(e) {}
      
      formArea.innerHTML = `
        <div class="deep-tests-form" id="deep-result-lead-form">
          <div class="deep-page-kicker">Бонус</div>
          <h3 class="deep-tests-form-title">Получить полную расшифровку PDF</h3>
          <div class="deep-tests-input-group">
            <input type="text" class="deep-tests-input" id="end_lead_name" placeholder="Имя (как к вам обращаться?)" value="${p.name || ''}">
          </div>
          <div class="deep-tests-input-group">
            <input type="email" class="deep-tests-input" id="end_lead_email" placeholder="E-mail (куда прислать отчёт)" value="${p.email || ''}">
          </div>
          <div class="deep-tests-input-group">
            <label>Альтернативный способ связи</label>
            <input type="text" class="deep-tests-input" id="end_contact_alt" placeholder="Напишите ваши контакты / @никнейм (Telegram)" value="${p.contact_alt || ''}">
          </div>
          <label class="deep-tests-checkbox-group">
            <input type="checkbox" id="end_lead_consent" checked>
            <span>Согласен(на) на обработку персональных данных и политику конфиденциальности</span>
          </label>
          <button class="deep-tests-btn deep-tests-btn-primary deep-full-width" style="margin-top: 14px;" onclick="window._submitEndForm('${test.id}', '${test.title}')">
            Отправить результаты
          </button>
        </div>
      `;
    }
    
    window._submitEndForm = function(testId, testTitle) {
      var name = document.getElementById("end_lead_name").value.trim();
      var email = document.getElementById("end_lead_email").value.trim();
      var alt = document.getElementById("end_contact_alt").value.trim();
      var consent = document.getElementById("end_lead_consent").checked;
      
      if (!consent) { alert("Необходимо согласие на обработку данных."); return; }
      if (!name || (!email && !alt)) { alert("Пожалуйста, укажите имя и способ связи (e-mail или Telegram)."); return; }
      
      try { localStorage.setItem("deep-tests-user-profile", JSON.stringify({ name: name, email: email, contact_alt: alt })); } catch(e) {}
      
      var session = window.DEEP_QUIZ ? window.DEEP_QUIZ.state.sessions[testId] : {};
      
      var payload = {
        type: "single_test_result",
        title: testTitle,
        user: { name: name, email: email, contact_alt: alt, consent: consent },
        answers: session.answers || {}
      };
      
      if (window.DEEP_INTEGRATIONS) {
        window.DEEP_INTEGRATIONS.submitToCRM(payload);
      }
      
      if (typeof window.deepShowSuccessModal === "function") {
        window.deepShowSuccessModal("Результаты отправлены!", "Наш специалист свяжется с вами.");
      } else {
        var formBlock = document.getElementById("deep-result-lead-form");
        if (formBlock) {
           formBlock.innerHTML = `
             <div style="text-align:center; padding: 40px 20px;">
               <div style="font-size:48px; margin-bottom:16px;">✨</div>
               <h3 style="color:#A3C9A8; margin:0 0 10px;">Успешно отправлено!</h3>
               <p style="color:var(--dt-muted); margin:0; line-height:1.4;">Наш специалист свяжется с вами в ближайшее время.</p>
             </div>
           `;
        } else {
           alert("Результаты успешно отправлены!");
        }
      }
    };
  }

})();
