/* ═══════════════════════════════════════════
   DEEP PSY TESTS — ENGINE v4 (Core)
   Shared quiz logic for all category pages.
   Expects: window.DEEP_TESTS and window.DEEP_CATEGORY_DATA
   are defined BEFORE this script loads.
   ═══════════════════════════════════════════ */
(function () {
  "use strict";

  var STORAGE_KEY = "deep-tests-engine-v4";
  var WEBHOOK_URL = "";

  /* ── SVG Icons ── */
  var ICON_QUESTIONS = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
  var ICON_TIME = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>';
  var ICON_SAVE = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>';

  /* ── Publishers map for proprietary tests ── */
  var PUBLISHERS = {
    mmpi2:  "MMPI-2 — проприетарная методика (Pearson Assessments). Оригинал методики не может размещаться в открытом доступе.",
    "16pf": "16PF — лицензированный продукт Pearson. Объём вопросов в открытом доступе запрещен. Обратите внимание на IPIP-аналоги.",
    mbti:   "MBTI — торговая марка The Myers-Briggs Company. Для прохождения требуется сертификация.",
    neopir: "NEO-PI-R / NEO-PI-3 принадлежат PAR/Hogrefe. Доступны открытые IPIP-NEO альтернативы.",
    stai:   "STAI — проприетарная методика (Mind Garden). Онлайн-использование ограничено.",
    mbi:    "Опросник выгорания MBI (Maslach) лицензируется через Mind Garden.",
    opd2:   "OPD-2 — интеллектуальная собственность Hogrefe.",
    hexaco: "HEXACO — некоммерческое академическое использование; массовое онлайн-использование требует согласования с авторами."
  };

  /* ── State management ── */
  var state = loadState();
  function getDefaultState() { return { activeTestId: null, sessions: {} }; }
  function getDefaultSession() { return { mode: "start", currentIndex: 0, answers: {}, completedAt: null, sent: false }; }
  function saveState() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {} }
  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return getDefaultState();
      var p = JSON.parse(raw);
      return { activeTestId: p.activeTestId || null, sessions: p.sessions || {} };
    } catch (e) { return getDefaultState(); }
  }
  function ensureSession(id) { if (!state.sessions[id]) state.sessions[id] = getDefaultSession(); return state.sessions[id]; }
  function resetSession(id) { state.sessions[id] = getDefaultSession(); saveState(); return state.sessions[id]; }

  /* ── DOM refs ── */
  var overlay = document.getElementById("deep-tests-overlay");
  var app     = document.getElementById("deep-tests-app");
  var answerLock = false;
  var currentCatalogContainerId = null;
  var CATEGORY_PAGE_URLS = {
    personality: "/tests/personality",
    mental_functions: "/tests/mental",
    adaptation: "/tests/adaptation",
    psychiatry: "/tests/psychiatry",
    relationships: "/tests/relationships",
    career: "/tests/career",
    team: "/tests/team",
    organization: "/tests/organization",
    psychoanalytic: "/tests/psychoanalytic",
    therapy_efficacy: "/tests/therapy"
  };

  function getActiveTest() { return state.activeTestId ? ((window.DEEP_TESTS || {})[state.activeTestId] || null) : null; }

  /* ── Overlay ── */
  function openOverlay() {
    if (!overlay) return;
    overlay.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    answerLock = false;
    if (overlay) { overlay.classList.remove("active"); overlay.setAttribute("aria-hidden", "true"); }
    document.body.style.overflow = "";
    /* Re-render catalog to update badges in real-time */
    if (currentCatalogContainerId && typeof window.deepRenderCatalog === "function") {
      var catalogContainer = document.getElementById(currentCatalogContainerId);
      if (catalogContainer) { catalogContainer.innerHTML = ""; window.deepRenderCatalog(currentCatalogContainerId); }
    }
    /* Refresh sidebar */
    if (typeof window.deepSidebarRefresh === "function") window.deepSidebarRefresh();
  }

  /* Close on background click */
  if (overlay) {
    overlay.addEventListener("click", function(e) {
      if (e.target === overlay) { closeModal(); }
    });
  }

  /* ── Open test ── */
  function openTest(testId) {
    if (PUBLISHERS[testId]) {
      alert(PUBLISHERS[testId] + " В данном каталоге такие тесты несут исключительно информирующий характер.");
      return;
    }
    var testObj = (window.DEEP_TESTS || {})[testId];
    if (!testObj || !testObj.questions || testObj.questions.length === 0) {
      alert("Оцифровка вопросов для теста «" + testId + "» ещё не завершена. Попробуйте один из доступных тестов.");
      return;
    }
    state.activeTestId = testId;
    ensureSession(testId);
    saveState();
    openOverlay();
    render();
  }

  /* ── Router ── */
  function render() {
    var test = getActiveTest();
    if (!test) return;
    var s = ensureSession(test.id);
    if (s.mode === "quiz")   { renderQuiz(test, s);   return; }
    if (s.mode === "result") { window.deepTestsRenderResult(test, s, app, window.DEEP_TESTS || {}); return; }
    renderStart(test, s);
  }

  /* ── Start screen (ENHANCED with SVG icons) ── */
  function renderStart(test, session) {
    var hasProgress = Object.keys(session.answers || {}).length > 0;
    var realQuestions = test.questions ? test.questions.filter(function(q){ return !q.isIntro; }).length : 0;
    var qLen = realQuestions > 0 ? realQuestions : "?";
    var estTime = realQuestions > 0 ? Math.max(1, Math.ceil(realQuestions * 0.35)) : "?";
    var scaleNames = test.scales ? Object.keys(test.scales).map(function(k){ return test.scales[k].title; }).join("  •  ") : "";

    app.innerHTML =
      '<div class="deep-tests-screen">' +
        '<div class="deep-tests-scroll">' +
          '<div class="deep-tests-top-space">' +
            '<div class="deep-tests-kicker">' + (test.shortTitle || "Тест") + '</div>' +
            '<h2 class="deep-tests-title">' + test.title + '</h2>' +
            '<p class="deep-tests-disclaimer" style="margin-top:0;margin-bottom:16px;">' + (test.description || "") + '</p>' +
            (test.intro ? '<p class="deep-tests-disclaimer" style="margin-top:0;">' + test.intro + '</p>' : '') +
          '</div>' +

          /* Meta info block with SVG icons */
          '<div class="deep-tests-meta-row">' +
            '<div class="deep-tests-meta-item">' + ICON_QUESTIONS + '<span><strong>' + qLen + '</strong> вопросов</span></div>' +
            '<div class="deep-tests-meta-item">' + ICON_TIME + '<span>≈ <strong>' + estTime + '</strong> мин</span></div>' +
            '<div class="deep-tests-meta-item">' + ICON_SAVE + '<span>Прогресс сохраняется</span></div>' +
          '</div>' +

          /* Scales preview */
          (scaleNames ? '<div style="margin-top:16px;"><span style="color:var(--dt-muted);font-size:13px;font-weight:600;">Шкалы: </span><span style="color:var(--dt-accent);font-size:13px;">' + scaleNames + '</span></div>' : '') +

          /* Start/Resume actions */
          (function() {
            var btnHtml = "";
            if (hasProgress) {
              btnHtml = '<div style="display:flex;gap:12px;margin-top:20px;">' +
                '<button type="button" class="deep-tests-btn deep-tests-btn-primary" data-action="resume-test" style="flex:2;">Продолжить</button>' +
                '<button type="button" class="deep-tests-btn deep-tests-btn-secondary" data-action="restart-test" style="flex:1;">Заново</button>' +
              '</div>';
            } else {
              btnHtml = '<button type="button" class="deep-tests-btn deep-tests-btn-primary" data-action="start-test" style="margin-top:20px;width:100%;">Начать тест</button>';
            }
            return btnHtml;
          })() +

          (test.disclaimer ? '<p class="deep-tests-disclaimer">' + test.disclaimer + '</p>' : '') +
        '</div>' +
      '</div>';
  }

  /* ── Quiz screen (with instruction hint + Назад/Далее buttons) ── */
  function renderQuiz(test, session) {
    var q = test.questions[session.currentIndex];
    var realQuestionsTotal = test.questions.filter(function(x){ return !x.isIntro; }).length;
    var currentHuman = test.questions.slice(0, session.currentIndex + 1).filter(function(x){ return !x.isIntro; }).length;
    var progress = Math.round((currentHuman / (realQuestionsTotal || 1)) * 100);
    
    /* Support for intermediate intro parts within the test */
    if (q.isIntro) {
      app.innerHTML =
        '<div class="deep-tests-screen">' +
          '<div class="deep-tests-scroll">' +
            '<div class="deep-tests-quiz-top">' +
              '<div class="deep-tests-progress"><span style="width:' + progress + '%"></span></div>' +
            '</div>' +
            '<div class="deep-tests-top-space" style="text-align:center;margin-top:24px;">' +
              (q.title ? '<h2 class="deep-tests-title" style="font-size:24px;margin-bottom:12px;">' + q.title + '</h2>' : '') +
              '<div class="deep-tests-disclaimer" style="font-size:15px;line-height:1.5;">' + q.text + '</div>' +
            '</div>' +
            '<div class="deep-tests-bottom" style="margin-top:32px;">' +
              '<div class="deep-tests-actions" style="width:100%;justify-content:space-between;">' +
                '<button type="button" class="deep-tests-btn deep-tests-btn-secondary" style="flex:0 0 auto;white-space:nowrap;" data-action="' + (session.currentIndex > 0 ? "back" : "back-to-start") + '">' + (session.currentIndex > 0 ? "Назад" : "К началу") + '</button>' +
                '<button type="button" class="deep-tests-btn deep-tests-btn-primary" style="flex:0 0 auto;" data-action="next">' + (q.buttonText || "Продолжить") + '</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
      return;
    }

    var savedAns = session.answers[q.id];
    var selectedIndex = null;
    if (savedAns !== undefined && savedAns !== null && q.options) {
      for (var si = 0; si < q.options.length; si++) {
        var ov = q.options[si].value !== undefined ? q.options[si].value : (q.options[si].score !== undefined ? q.options[si].score : si);
        if (ov === savedAns) { selectedIndex = si; break; }
      }
      if (selectedIndex === null && typeof savedAns === "number" && savedAns >= 0 && savedAns < q.options.length) selectedIndex = savedAns;
    }
    var hasAnswer = selectedIndex !== null;

    app.innerHTML =
      '<div class="deep-tests-screen">' +
        '<div class="deep-tests-scroll">' +
          '<div class="deep-tests-quiz-top">' +
            '<div class="deep-tests-counter">Вопрос ' + currentHuman + ' из ' + realQuestionsTotal + '</div>' +
            '<div class="deep-tests-progress"><span style="width:' + progress + '%"></span></div>' +
            (test.intro ? '<div class="deep-tests-hint">' + test.intro + '</div>' : '') +
          '</div>' +
          '<div class="deep-tests-question">' + q.text + '</div>' +
          '<div class="deep-tests-options">' +
            q.options.map(function(opt, idx) {
              var isSel = selectedIndex === idx;
              return '<button type="button" class="deep-tests-option ' + (isSel ? "is-selected" : "") + '" data-action="answer" data-index="' + idx + '">' +
                '<span class="deep-tests-option-row">' +
                  '<span class="deep-tests-option-check"></span>' +
                  '<span class="deep-tests-option-text">' + opt.text + '</span>' +
                '</span>' +
              '</button>';
            }).join("") +
          '</div>' +
          '<div class="deep-tests-hint" style="text-align:center;margin-top:8px;font-size:12px;">Ответ выбирается автоматически — просто нажмите на вариант</div>' +
          '<div class="deep-tests-bottom">' +
            '<div class="deep-tests-actions" style="margin-top:0;width:100%;justify-content:space-between;">' +
              '<button type="button" class="deep-tests-btn deep-tests-btn-secondary" style="flex:0 0 auto;white-space:nowrap;" data-action="' + (session.currentIndex > 0 ? "back" : "back-to-start") + '">' + (session.currentIndex > 0 ? "Назад" : "К началу") + '</button>' +
              (hasAnswer ? '<button type="button" class="deep-tests-btn deep-tests-btn-primary" style="flex:0 0 auto;" data-action="next">' + (session.currentIndex < test.questions.length - 1 ? "Далее" : "Завершить") + '</button>' : '') +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* ── Event handler ── */
  if (app) {
    app.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-action]");
      if (!btn) return;
      if (btn.tagName === "BUTTON") { e.preventDefault(); }
      
      var action = btn.getAttribute("data-action");
      var test = getActiveTest();
      if (!test) return;
      var s = ensureSession(test.id);

      if (action === "start-test")   { resetSession(test.id); ensureSession(test.id).mode = "quiz"; saveState(); render(); }
      if (action === "resume-test")  { s.mode = "quiz"; saveState(); render(); }
      if (action === "restart-test") { resetSession(test.id); render(); }
      if (action === "back")         { if (s.currentIndex > 0) { s.currentIndex--; saveState(); render(); } }
      if (action === "back-to-start") { s.mode = "start"; saveState(); render(); }

      /* form submit — triggers success modal */
      if (action === "submit-lead") {
        var form = app.querySelector(".deep-tests-form");
        var nameIn = form ? form.querySelector("[name='lead_name']") : null;
        var emailIn = form ? form.querySelector("[name='lead_email']") : null;
        var altIn = form ? form.querySelector("[name='contact_alt']") : null;
        var consentIn = form ? form.querySelector("[name='lead_consent']") : null;
        var name = nameIn ? nameIn.value.trim() : "";
        var email = emailIn ? emailIn.value.trim() : "";
        var contactAlt = altIn ? altIn.value.trim() : "";
        var consent = consentIn ? consentIn.checked : false;
        if (!name) { alert("Пожалуйста, введите имя."); return; }
        if (!email || email.indexOf("@") < 1) { alert("Пожалуйста, введите корректный e-mail."); return; }
        if (!consent) { alert("Необходимо согласие на обработку персональных данных."); return; }
        
        /* Save profile */
        try { localStorage.setItem("deep-tests-user-profile", JSON.stringify({ name: name, email: email, contact_alt: contactAlt })); } catch(e) {}
        
        /* Mark sent */
        s.sent = true; saveState();
        
        /* Loading feedback */
        var oldBtnHtml = btn.innerHTML;
        btn.innerHTML = "Отправка...";
        btn.disabled = true;
        
        /* New unified CRM submission */
        var payload = {
          testId: test.id,
          title: test.title,
          category: window.DEEP_CATEGORY_DATA ? window.DEEP_CATEGORY_DATA.categoryTitle : "Unknown",
          user: { name: name, email: email, contact_alt: contactAlt, consent: consent },
          answers: s.answers,
          completedAt: s.completedAt
        };
        
        window.deepSubmitToCRM(payload, function(success) {
           if (success) {
             btn.innerHTML = "Отправлено";
             btn.style.setProperty("background", "#52b788", "important");
             btn.style.setProperty("border-color", "#52b788", "important");
             btn.style.setProperty("color", "#fff", "important");
             if (typeof window.deepShowSuccessModal === "function") {
               window.deepShowSuccessModal(
                 "Результаты отправлены!",
                 "Отчёт по тесту «" + test.title + "» будет выслан на ваш e-mail. Если потребуется консультация, наш специалист свяжется с вами."
               );
             } else {
               alert("Отправлено!");
             }
           } else {
             btn.innerHTML = oldBtnHtml;
             btn.disabled = false;
             alert("Ошибка при отправке. Пожалуйста, попробуйте еще раз.");
           }
        });
      }

      /* Select answer — visual feedback then auto-advance */
      if (action === "answer") {
        if (answerLock) return;
        answerLock = true;
        
        // Визуально зажигаем чекбокс
        var allBtns = app.querySelectorAll(".deep-tests-option");
        for (var i=0; i<allBtns.length; i++) allBtns[i].classList.remove("is-selected");
        btn.classList.add("is-selected");

        var idx = Number(btn.getAttribute("data-index"));
        var currentQ = test.questions[s.currentIndex];
        var optVal = currentQ.options[idx].value !== undefined ? currentQ.options[idx].value : idx;
        var optScore = currentQ.options[idx].score !== undefined ? currentQ.options[idx].score : optVal;
        
        /* Store answer: value/score for calculateResult compatibility */
        s.answers[currentQ.id] = optScore;
        saveState();
        
        /* Задержка 150мс для проигрывания анимации радиокнопки */
        setTimeout(function() {
          var nextIdx = s.currentIndex + 1;
          while (nextIdx < test.questions.length && test.questions[nextIdx].isIntro) {
            nextIdx++;
          }
          if (nextIdx < test.questions.length) {
            s.currentIndex = nextIdx; s.mode = "quiz";
          } else {
            s.mode = "result"; s.completedAt = new Date().toISOString();
          }
          saveState(); render();
          answerLock = false;
        }, 150);
      }

      /* Manual advance via Далее button */
      if (action === "next") {
        if (s.currentIndex < test.questions.length - 1) {
          s.currentIndex++; s.mode = "quiz";
        } else {
          s.mode = "result"; s.completedAt = new Date().toISOString();
        }
        saveState(); render();
      }

      /* accordion toggle */
      if (action === "toggle-accordion") {
        var item = btn.closest(".deep-accordion-item");
        if (item) item.classList.toggle("is-open");
      }

      /* next test */
      if (action === "next-test") {
        var nextId = btn.getAttribute("data-test-id");
        if (nextId) { openTest(nextId); }
      }

      /* Bug report */
      if (action === "open-bug-report") {
        e.preventDefault();
        var bugOverlay = document.getElementById("deep-bug-overlay");
        if (!bugOverlay) {
          bugOverlay = document.createElement("div");
          bugOverlay.id = "deep-bug-overlay";
          bugOverlay.style.cssText = "position:fixed;inset:0;z-index:99999999;display:flex;align-items:center;justify-content:center;padding:20px 10px;background:rgba(0,0,0,.6);backdrop-filter:blur(5px);opacity:0;transition:opacity .2s;";
          bugOverlay.innerHTML =
            '<div style="width:100%;max-width:400px;background:rgba(10,10,10,.96);border:1px solid rgba(232,214,179,.14);border-radius:16px;padding:24px 20px;box-shadow:0 24px 70px rgba(0,0,0,.58);font-family:Manrope,Arial,sans-serif;box-sizing:border-box;">' +
              '<div style="font-size:16px;font-weight:700;color:#F4EEE3;margin-bottom:6px;">Сообщить об ошибке</div>' +
              '<p style="font-size:12px;color:rgba(168,159,145,.6);margin:0 0 14px;line-height:1.4;">Только для сообщений о багах и неполадках. Не задавайте вопросов — ответа не будет. Не указывайте персональные данные.</p>' +
              '<textarea id="deep-bug-text" style="width:100%;min-height:100px;background:rgba(255,255,255,.04);border:1px solid rgba(232,214,179,.14);border-radius:10px;padding:12px;color:#F4EEE3;font-family:inherit;font-size:14px;resize:vertical;box-sizing:border-box;outline:none;" placeholder="Опишите, что пошло не так…"></textarea>' +
              '<div style="display:flex;gap:10px;margin-top:14px;">' +
                '<button type="button" data-action="close-bug-report" style="flex:1;padding:12px;border:1px solid rgba(232,214,179,.14);border-radius:8px;background:transparent;color:#A89F91;font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;">Отмена</button>' +
                '<button type="button" data-action="send-bug-report" style="flex:1;padding:12px;border:none;border-radius:8px;background:#E8D6B3;color:#111;font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;">Отправить</button>' +
              '</div>' +
            '</div>';
          document.body.appendChild(bugOverlay);

          bugOverlay.addEventListener("click", function(ev) {
            if (ev.target === bugOverlay) { closeBugOverlay(); }
            var ba = ev.target.getAttribute("data-action");
            if (ba === "close-bug-report") { closeBugOverlay(); }
            if (ba === "send-bug-report") {
              var txt = document.getElementById("deep-bug-text").value.trim();
              if (!txt) { return; }
              var report = {
                text: txt,
                testId: test ? test.id : "unknown",
                testTitle: test ? test.title : "unknown",
                url: location.href,
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString()
              };
              try {
                var existing = JSON.parse(localStorage.getItem("deep-tests-bug-reports")) || [];
                existing.push(report);
                localStorage.setItem("deep-tests-bug-reports", JSON.stringify(existing));
              } catch(err){}
              closeBugOverlay();
              if (typeof window.deepShowSuccessModal === "function") {
                window.deepShowSuccessModal("Спасибо!", "Ваше сообщение об ошибке сохранено. Мы обязательно проверим.");
              } else {
                alert("Сообщение отправлено. Спасибо!");
              }
            }
          });
        }
        var ta = document.getElementById("deep-bug-text");
        if (ta) ta.value = "";
        bugOverlay.style.display = "flex";
        void bugOverlay.offsetWidth;
        bugOverlay.style.opacity = "1";

        function closeBugOverlay() {
          bugOverlay.style.opacity = "0";
          setTimeout(function(){ bugOverlay.style.display = "none"; }, 200);
        }
      }
    });
  }

  /* close button */
  var clBtn = document.querySelector(".deep-tests-close");
  if (clBtn) { clBtn.addEventListener("click", function(e){ e.preventDefault(); closeModal(); }); }

  /* Keyboard: ESC close, 1-9 select answer, Enter advance */
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && overlay && overlay.classList.contains("active")) { closeModal(); return; }

    // Игнорируем нажатия внутри текстовых полей
    var activeTag = document.activeElement ? document.activeElement.tagName : "";
    if (activeTag === "INPUT" || activeTag === "TEXTAREA" || activeTag === "SELECT") return;

    /* Only handle keys when quiz is active */
    var test = getActiveTest();
    if (!test) return;
    var s = ensureSession(test.id);
    if (s.mode !== "quiz") return;

    /* Number keys 1-9 (main row + numpad) → call real click to trigger visual + auto-advance */
    var keyNum = -1;
    if (e.key >= "1" && e.key <= "9") keyNum = parseInt(e.key) - 1;
    if (e.code && e.code.indexOf("Numpad") === 0 && e.key >= "1" && e.key <= "9") keyNum = parseInt(e.key) - 1;

    if (keyNum >= 0) {
      if (app) {
        var options = app.querySelectorAll(".deep-tests-option");
        if (options[keyNum]) {
          options[keyNum].click();
        }
      }
      return;
    }

    /* Enter → advance (same as Далее) */
    if (e.key === "Enter") {
      var q2 = test.questions[s.currentIndex];
      var savedAns = s.answers[q2.id];
      if (savedAns === undefined || savedAns === null) return; /* no answer yet */
      if (s.currentIndex < test.questions.length - 1) {
        s.currentIndex++; s.mode = "quiz";
      } else {
        s.mode = "result"; s.completedAt = new Date().toISOString();
      }
      saveState(); render();
    }
  });

  /* Public API */
  window.deepTestsOpen = openTest;
  window.deepOpenTestById = openTest;
  window.deepTestsRender = render;
  window.deepTestsResetSession = resetSession;
  /* DEEP_TESTS is populated by data/test_registry.js — no reassignment needed */

  /**
   * Universal CRM submission method (for Bpium/Webhooks)
   */
  window.deepSubmitToCRM = function(payload, callback) {
    var url = window.DEEP_CRM_WEBHOOK_URL || WEBHOOK_URL;
    if (!url) {
      console.warn("CRM WEBHOOK_URL is not set. Simulation mode.");
      setTimeout(function(){ if (callback) callback(true); }, 100);
      return;
    }

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    .then(function(response) {
      if (callback) callback(response.ok);
    })
    .catch(function(err) {
      console.error("CRM Submission Error:", err);
      if (callback) callback(false);
    });
  };

  /* Auto-open test from URL parameter (coming from sidebar navigation) */
  try {
    var params = new URLSearchParams(location.search);
    var autoTestId = params.get("openTest");
    if (autoTestId) {
      /* Small delay to ensure DOM is ready */
      setTimeout(function() { openTest(autoTestId); }, 100);
      /* Clean up URL without reloading */
      if (history.replaceState) {
        var cleanUrl = location.pathname + location.hash;
        history.replaceState(null, "", cleanUrl);
      }
    }
  } catch(e) {}

  /* ── Shared Catalog Renderer with Badges ── */
  var BADGE_CHECK = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" fill="rgba(163,201,168,0.15)" stroke="#A3C9A8" stroke-width="1.2"/><path d="M6 9.2L8.2 11.4L12.2 7" stroke="#A3C9A8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var BADGE_WIP = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" fill="rgba(232,214,179,0.12)" stroke="#E8D6B3" stroke-width="1.2"/><path d="M9 6V9.5L11 11" stroke="#E8D6B3" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>';


  /* ════════════════════════════════════════════════════════════
     DASHBOARD RENDERING (v14.0 — LEAK-FREE)
     Single shell build + partial content updates.
     Event listeners are attached ONCE, never re-stacked.
     ════════════════════════════════════════════════════════════ */

  var NAV_ICON_HOME = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>';
  var NAV_ICON_SEARCH = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  var NAV_ICON_CHEVRON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
  var NAV_ICON_BURGER = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="18" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  var NAV_ICON_CLOSE = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

  var _i = function(d) { return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>'; };
  var CAT_ICONS = {
    personality:      _i('<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'),
    mental_functions: _i('<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-2-4-2.5c-.5.5-2 1-4 2.5s-3 3.5-3 5.5a7 7 0 0 0 7 7Z"/><path d="M12 2v4"/><path d="M4.2 4.2l2.8 2.8"/><path d="M19.8 4.2l-2.8 2.8"/>'),
    adaptation:       _i('<path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>'),
    psychiatry:       _i('<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>'),
    relationships:    _i('<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>'),
    career:           _i('<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>'),
    team:             _i('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
    organization:     _i('<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/>'),
    psychoanalytic:   _i('<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>'),
    therapy_efficacy: _i('<path d="M12 3v1.5"/><path d="M12 19.5V21"/><path d="M3 12h1.5"/><path d="M19.5 12H21"/><path d="M5.6 5.6l1.1 1.1"/><path d="M17.3 17.3l1.1 1.1"/><path d="M5.6 18.4l1.1-1.1"/><path d="M17.3 6.7l1.1-1.1"/><path d="M12 8l-1.5 4 1.5 4 1.5-4z"/>')
  };


  /* Short category names for nav */
  var CAT_SHORT = {
    personality: "Личность", mental_functions: "Псих. функции", adaptation: "Адаптация",
    psychiatry: "Психиатрия", relationships: "Отношения", career: "Карьера",
    team: "Команда", organization: "Организация", psychoanalytic: "Психоанализ",
    therapy_efficacy: "Терапия"
  };

  /* SPA state — single instance, never re-created */
  var dashboardState = {
    activeCategoryId: null,
    searchQuery: "",
    mode: "categories",
    initialized: false
  };

  function syncURLState() {
    if (!history.pushState) return;
    var url = new URL(window.location);
    if (dashboardState.activeCategoryId) {
      url.searchParams.set("category", dashboardState.activeCategoryId);
    } else {
      url.searchParams.delete("category");
    }
    history.pushState(null, "", url.toString());
  }

  function getStatusBadge(testId) {
    try {
      var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      var sess = stored.sessions && stored.sessions[testId];
      if (sess && sess.mode === "result") return '<span class="deep-tests-card-badge deep-tests-card-badge--ok" title="Тест пройден">' + BADGE_CHECK + '</span>';
      if (sess && (sess.mode === "quiz" || (sess.answers && Object.keys(sess.answers).length > 0))) return '<span class="deep-tests-card-badge deep-tests-card-badge--wip" title="В процессе">' + BADGE_WIP + '</span>';
    } catch(e){}
    return "";
  }

  function hasRunnableQuestions(testId) {
    var t = (window.DEEP_TESTS || {})[testId];
    return !!(t && t.questions && t.questions.length);
  }

  function isActuallyRunnable(test) {
    if (!test || test.isRunnable === false) return false;
    if (PUBLISHERS[test.id]) return false;
    return hasRunnableQuestions(test.id);
  }

  function getCTA(test) {
    return isActuallyRunnable(test)
      ? '<button class="deep-tests-btn deep-tests-btn-primary" onclick="window.deepTestsOpen(\'' + test.id + '\')">Пройти тест</button>'
      : '<button class="deep-tests-btn deep-tests-btn-secondary" onclick="alert(\'' + (test.replacement ? 'Аналог: ' + test.replacement : 'Ограниченный доступ') + '\')">Инфо</button>';
  }

  function buildCardHTML(test) {
    var status = test.legalStatus || "public";
    var badge = status.indexOf("proprietary") !== -1 ? { c: "deep-tests-pill--proprietary", t: "Закрытая" } :
                status.indexOf("restricted") !== -1 ? { c: "deep-tests-pill--restricted", t: "Клиническая" } :
                { c: "deep-tests-pill--public", t: "Открытая" };

    var canRun = isActuallyRunnable(test);
    var html = '<div class="deep-tests-card" style="padding:0; overflow:hidden; cursor:' + (canRun ? 'pointer' : 'default') + ';"' + (canRun ? ' onclick="window.deepTestsOpen(\'' + test.id + '\')"' : '') + '>';
    html += getStatusBadge(test.id);

    html += '<div class="deep-tests-card-img" style="height:160px; background:linear-gradient(135deg, var(--dt-panel-2) 0%, var(--dt-bg) 100%); display:flex; align-items:center; justify-content:center; position:relative; border-bottom:1px solid var(--dt-border);">';
    html += '</div>';

    html += '<div style="padding:20px;">';
    html += '<h3 class="deep-tests-card-title" style="font-size:17px; margin:0 0 8px; line-height:1.25; font-weight:600;">' + test.title + '</h3>';
    html += '<div class="deep-tests-card-text" style="font-size:13px; margin-bottom:12px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">' + (test.measures || "") + '</div>';
    html += '<div style="display:flex; gap:6px; flex-wrap:wrap;">';
    html += '<span class="deep-tests-pill ' + badge.c + '" style="font-size:11px; padding:4px 8px; font-weight:500;">' + badge.t + '</span>';
    if (!canRun) {
      html += '<span class="deep-tests-pill" style="font-size:11px; padding:4px 8px; background:rgba(255,255,255,0.05); color:var(--dt-muted); border-color:rgba(255,255,255,0.08); font-weight:500;">Пока недоступно</span>';
    }
    html += '<span class="deep-tests-pill" style="font-size:11px; padding:4px 8px; background:rgba(255,255,255,0.05); color:var(--dt-muted); border-color:rgba(255,255,255,0.08); font-weight:500;">' + (test.items || "?") + ' вопр.</span>';
    if (test.time) {
        var timeStr = String(test.time).toLowerCase().indexOf("мин") !== -1 ? test.time : (test.time + " мин.");
        html += '<span class="deep-tests-pill" style="font-size:11px; padding:4px 8px; background:rgba(255,255,255,0.05); color:var(--dt-muted); border-color:rgba(255,255,255,0.08); font-weight:500;">~' + timeStr + '</span>';
    } else {
        html += '<span class="deep-tests-pill" style="font-size:11px; padding:4px 8px; background:rgba(255,255,255,0.05); color:var(--dt-muted); border-color:rgba(255,255,255,0.08); font-weight:500;">~15 мин.</span>';
    }
    html += '</div></div></div>';
    return html;
  }

  /* ── PARTIAL RENDER: Only updates content area, never rebuilds shell ── */
  function updateDashboardGrid() {
    var reg = window.DEEP_MASTER_REGISTRY;
    if (!reg) return;

    var catId = dashboardState.activeCategoryId;
    var query = dashboardState.searchQuery.toLowerCase().trim();
    var isAlpha = dashboardState.mode === "alphabetical";

    var headerEl = document.getElementById("deep-dash-header-area");
    var gridEl = document.getElementById("deep-dash-grid-area");
    if (!headerEl || !gridEl) return;

    /* Breadcrumbs + Header */
    var breadHtml = '<nav class="deep-dash-breadcrumbs"><a href="/tests">Все категории</a>';
    if (catId && reg[catId]) breadHtml += ' <span class="deep-dash-bc-sep">›</span> <span>' + reg[catId].categoryTitle + '</span>';
    breadHtml += '</nav>';
    var title = catId && reg[catId] ? reg[catId].categoryTitle : "Каталог тестов";
    var desc = catId && reg[catId] ? (reg[catId].categoryDescription || "") : "Выберите категорию слева или воспользуйтесь поиском.";
    headerEl.innerHTML = breadHtml + '<h1 class="deep-dash-title">' + title + '</h1><p class="deep-dash-desc">' + desc + '</p>';

    /* Tabs active state */
    var btnCat = document.querySelector('[data-tab="categories"]');
    var btnAlpha = document.querySelector('[data-tab="alphabetical"]');
    if (btnCat && btnAlpha) {
      if (isAlpha) { btnAlpha.classList.add("active"); btnCat.classList.remove("active"); }
      else { btnCat.classList.add("active"); btnAlpha.classList.remove("active"); }
    }

    /* Left Nav active state — DOM manipulation, no event re-binding */
    document.querySelectorAll(".deep-dash-nav-item").forEach(function(el) {
      var navT = el.getAttribute("data-nav");
      if ((navT === "home" && !catId) || navT === catId) el.classList.add("active");
      else el.classList.remove("active");
    });
    if (!dashboardState.initialExpandDone) {
      document.querySelectorAll(".deep-dash-nav-group").forEach(function(el) {
        var a = el.querySelector(".deep-dash-nav-item.active");
        if (a) el.classList.add("expanded");
        else el.classList.remove("expanded");
      });
      dashboardState.initialExpandDone = true;
    }

    /* Grid Contents */
    var cardsHtml = "";
    if (isAlpha) {
      var allTests = [];
      Object.keys(reg).forEach(function(cId) {
        reg[cId].subcategories.forEach(function(sub) {
          sub.tests.forEach(function(t) {
            var tCopy = {};
            for (var k in t) tCopy[k] = t[k];
            tCopy._categoryTitle = reg[cId].categoryTitle;
            allTests.push(tCopy);
          });
        });
      });
      allTests.sort(function(a, b) { return a.title.localeCompare(b.title, "ru"); });
      if (query) allTests = allTests.filter(function(t) {
        return t.title.toLowerCase().indexOf(query) !== -1 || (t.measures || "").toLowerCase().indexOf(query) !== -1;
      });

      var lettersPresent = {};
      allTests.forEach(function(t) {
        var letter = t.title.charAt(0).toUpperCase();
        if (!lettersPresent[letter]) lettersPresent[letter] = [];
        lettersPresent[letter].push(t);
      });

      var sortedLetters = Object.keys(lettersPresent).sort(function(a, b) { return a.localeCompare(b, "ru"); });
      
      var indexHtml = '<div id="deep-dash-alpha-modal" class="deep-dash-alpha-modal">';
      indexHtml += '<div class="deep-dash-alpha-modal-overlay" onclick="document.getElementById(\'deep-dash-alpha-modal\').classList.remove(\'open\')"></div>';
      indexHtml += '<div class="deep-dash-alpha-modal-inner">';
      indexHtml += '<div class="deep-dash-alpha-modal-header"><span>Выберите букву</span><button onclick="document.getElementById(\'deep-dash-alpha-modal\').classList.remove(\'open\')">✕</button></div>';
      indexHtml += '<div class="deep-dash-alpha-index">';
      sortedLetters.forEach(function(l) {
        indexHtml += '<div class="deep-dash-alpha-index-link" data-scroll-to="alpha-' + l + '">' + l + '</div>';
      });
      indexHtml += '</div></div></div>';

      sortedLetters.forEach(function(l) {
        cardsHtml += '<div class="deep-dash-alpha-section" id="alpha-' + l + '">';
        cardsHtml += '<div class="deep-dash-letter-header" style="cursor:pointer;" onclick="document.getElementById(\'deep-dash-alpha-modal\').classList.add(\'open\')">' + l + '</div>';
        cardsHtml += '<div class="deep-dash-alpha-list">';
        lettersPresent[l].forEach(function(t) {
          cardsHtml += '<div class="deep-dash-alpha-item" onclick="window.deepTestsOpen(\'' + t.id + '\')">';
          cardsHtml += '<div class="deep-dash-alpha-item-title">' + t.title + '</div>';
          cardsHtml += '</div>';
        });
        cardsHtml += '</div></div>';
      });

      if (!allTests.length) cardsHtml = '<div class="deep-tests-note">По запросу ничего не найдено.</div>';
      else cardsHtml = indexHtml + '<div class="deep-dash-alpha-grid">' + cardsHtml + '</div>';
      gridEl.innerHTML = cardsHtml;

    } else if (!catId && !query) {
      Object.keys(reg).forEach(function(cId) {
        var cat = reg[cId];
        var count = 0; cat.subcategories.forEach(function(s) { count += s.tests.length; });
        
        cardsHtml += '<a class="deep-tests-card deep-dash-cat-card" style="padding:0; overflow:hidden; cursor:pointer;" href="' + (CATEGORY_PAGE_URLS[cId] || "/tests") + '">';
        
        /* Header area matching test cards */
        cardsHtml += '<div class="deep-tests-card-img" style="height:160px; background:linear-gradient(135deg, var(--dt-panel-2) 0%, var(--dt-bg) 100%); display:flex; align-items:center; justify-content:center; position:relative; border-bottom:1px solid var(--dt-border);">';
        cardsHtml += '<div style="position:relative; z-index:2; color:var(--dt-accent); opacity:0.8; transform:scale(1.5);">' + (CAT_ICONS[cId] || "📋") + '</div>';
        cardsHtml += '</div>';
        
        /* Content area matching test cards */
        cardsHtml += '<div style="padding:20px;">';
        cardsHtml += '<h3 class="deep-tests-card-title" style="font-size:17px; margin:0 0 8px; line-height:1.25; font-weight:600;">' + cat.categoryTitle + '</h3>';
        cardsHtml += '<div class="deep-tests-card-text" style="font-size:13px; margin-bottom:12px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">' + (cat.categoryDescription || "") + '</div>';
        cardsHtml += '<div style="display:flex; gap:6px; flex-wrap:wrap;">';
        cardsHtml += '<span class="deep-tests-pill" style="font-size:11px; padding:4px 8px; font-weight:500; background:rgba(232,214,179,0.1); border-color:rgba(232,214,179,0.15); color:var(--dt-accent);">' + count + ' тестов</span>';
        cardsHtml += '</div></div></a>';
      });
      gridEl.innerHTML = '<div class="deep-dash-cat-grid">' + cardsHtml + '</div>';

    } else {
      var catsToSearch = catId ? [catId] : Object.keys(reg);
      catsToSearch.forEach(function(c) {
        var data = reg[c];
        if (!data) return;
        data.subcategories.forEach(function(sub, idx) {
          var filtered = sub.tests;
          if (query) filtered = filtered.filter(function(t) {
            return t.title.toLowerCase().indexOf(query) !== -1 || (t.measures || "").toLowerCase().indexOf(query) !== -1;
          });
          if (!filtered.length) return;
          cardsHtml += '<div class="deep-subcategory"><h2 id="sub-' + c + '-' + idx + '">' + sub.subTitle + '</h2><div class="deep-tests-grid">';
          filtered.forEach(function(t) { cardsHtml += buildCardHTML(t); });
          cardsHtml += '</div></div>';
        });
      });
      if (!cardsHtml) cardsHtml = '<div class="deep-tests-note">По запросу ничего не найдено.</div>';
      gridEl.innerHTML = cardsHtml;
    }
    
    // Clear active sub-items if we just rendered the grid and didn't explicitly click a sub-item
    document.querySelectorAll(".deep-dash-nav-sub-item").forEach(function(el) { el.classList.remove("active"); });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderCategoryPage(container, categoryId) {
    var reg = window.DEEP_MASTER_REGISTRY || {};
    var cat = reg[categoryId];
    if (!cat) {
      container.innerHTML = '<div class="deep-tests-note">Категория не найдена.</div>';
      return;
    }
    window.DEEP_CATEGORY_DATA = cat;

    var html = '<div class="deep-page-kicker">DEEP TESTS</div>' +
      '<h1 class="deep-page-title">' + cat.categoryTitle + '</h1>' +
      '<p class="deep-page-subtitle">' + (cat.categoryDescription || "") + '</p>';

    cat.subcategories.forEach(function(sub, idx) {
      html += '<div class="deep-subcategory"><h2 id="sub-' + categoryId + '-' + idx + '">' + sub.subTitle + '</h2><div class="deep-tests-grid">';
      sub.tests.forEach(function(t) { html += buildCardHTML(t); });
      html += '</div></div>';
    });

    container.className = "deep-page-container";
    container.innerHTML = html;
  }

  /* ── SHELL BUILD: Called ONCE. Builds nav + content + attaches events ── */
  window.deepRenderCatalog = function(containerId) {
    var container = null;
    if (containerId) container = document.getElementById(containerId);
    if (!container) container = document.querySelector("#deep-categories-container") || document.querySelector("#deep-app-root") || document.querySelector("[data-category-id]");
    if (!container) return;

    currentCatalogContainerId = container.id || null;

    var reg = window.DEEP_MASTER_REGISTRY;
    if (!reg) return;

    if (!window.DEEP_TESTS || Object.keys(window.DEEP_TESTS).length === 0) {
      if (window.DEEP_TEST_REGISTRY) window.DEEP_TESTS = window.DEEP_TEST_REGISTRY;
    }

    var explicitCat = container.getAttribute("data-category-id");
    if (explicitCat && reg[explicitCat]) {
      renderCategoryPage(container, explicitCat);
      return;
    }

    /* Main dashboard in multi-page mode: always starts from category overview */
    if (!dashboardState.initialized) {
      dashboardState.activeCategoryId = null;
      window.DEEP_CATEGORY_DATA = null;
      dashboardState.initialized = true;
    }

    /* ── Build left sidebar nav ── */
    var navHtml = '<div class="deep-dash-nav" id="deep-dash-nav">' +
      '<div class="deep-dash-nav-header">' +
        '<div class="deep-dash-logo"><svg xmlns="http://www.w3.org/2000/svg" width="77" height="42" viewBox="0 0 77 42" fill="none"><path d="M62.3393 35.8819V29.4712H63.8387L65.5268 32.6569L66.1623 34.0727H66.202C66.1755 33.7319 66.1391 33.3517 66.0928 32.9322C66.0464 32.5126 66.0233 32.1128 66.0233 31.7326V29.4712H67.4135V35.8819H65.914L64.226 32.6864L63.5904 31.2902H63.5507C63.5838 31.6441 63.6202 32.0243 63.6599 32.4307C63.7063 32.8371 63.7295 33.2304 63.7295 33.6106V35.8819H62.3393Z" fill="url(#dpl0)"/><path d="M58.1043 25.6538V6H64.9236C66.3848 6 67.704 6.20096 68.8812 6.60288C70.0786 6.9847 71.0325 7.63782 71.7428 8.56223C72.4532 9.48664 72.8084 10.7426 72.8084 12.3302C72.8084 13.8575 72.4532 15.1135 71.7428 16.0982C71.0325 17.0829 70.0888 17.8164 68.9116 18.2987C67.7345 18.7609 66.4457 18.992 65.0453 18.992H62.5794V25.6538H58.1043ZM62.5794 15.4652H64.7713C67.2068 15.4652 68.4245 14.4202 68.4245 12.3302C68.4245 11.3053 68.0998 10.5819 67.4503 10.1599C66.8009 9.73784 65.8673 9.52684 64.6496 9.52684H62.5794V15.4652Z" fill="url(#dpl0)"/><path d="M41.4266 25.6538V6H53.8474V9.73784H45.9017V13.6867H52.6601V17.3944H45.9017V21.916H54.1519V25.6538H41.4266Z" fill="url(#dpl0)"/><path d="M24.7469 25.6538V6H37.1678V9.73784H29.2221V13.6867H35.9805V17.3944H29.2221V21.916H37.4722V25.6538H24.7469Z" fill="url(#dpl0)"/><path d="M5.42212 25.6538V6H11.0237C13.0532 6 14.8088 6.34163 16.2904 7.02489C17.7719 7.70815 18.9186 8.77324 19.7305 10.2201C20.5626 11.647 20.9786 13.4857 20.9786 15.7365C20.9786 17.9872 20.5727 19.8461 19.7609 21.3131C18.9491 22.7801 17.8125 23.8753 16.3513 24.5988C14.9103 25.3021 13.2156 25.6538 11.2672 25.6538H5.42212ZM9.89728 22.0667H10.7497C11.8862 22.0667 12.8706 21.8657 13.7027 21.4638C14.5551 21.0619 15.2147 20.3987 15.6815 19.4743C16.1483 18.5499 16.3817 17.304 16.3817 15.7365C16.3817 14.169 16.1483 12.9431 15.6815 12.0589C15.2147 11.1546 14.5551 10.5216 13.7027 10.1599C12.8706 9.77804 11.8862 9.58712 10.7497 9.58712H9.89728V22.0667Z" fill="url(#dpl0)"/><defs><linearGradient id="dpl0" x1="5" y1="6" x2="56.3281" y2="29.3773" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="#E8D6B3"/></linearGradient></defs></svg></div>' +
        '<button class="deep-dash-nav-close" id="deep-dash-nav-close">' + NAV_ICON_CLOSE + '</button>' +
      '</div>' +
      '<div class="deep-dash-nav-scroll">' +
        '<a class="deep-dash-nav-item deep-dash-nav-home" href="/tests" data-nav="home"><span>Категории</span></a>';

    Object.keys(reg).forEach(function(cId) {
      var cat = reg[cId];
      var emoji = CAT_ICONS[cId] || "📋";
      var testCount = 0; cat.subcategories.forEach(function(s) { testCount += s.tests.length; });
      navHtml += '<div class="deep-dash-nav-group">' +
        '<a class="deep-dash-nav-item" href="' + (CATEGORY_PAGE_URLS[cId] || "/tests") + '" data-nav="' + cId + '">' +
          '<span class="deep-dash-nav-emoji">' + emoji + '</span>' +
          '<span class="deep-dash-nav-label">' + (CAT_SHORT[cId] || cat.categoryTitle) + '</span>' +
          '<span class="deep-dash-nav-count">' + testCount + '</span>' +
          '<span class="deep-dash-nav-chevron">' + NAV_ICON_CHEVRON + '</span>' +
        '</a>';
      navHtml += '<div class="deep-dash-nav-sub"><div class="deep-dash-nav-sub-inner">';
      cat.subcategories.forEach(function(sub, idx) {
        navHtml += '<div class="deep-dash-nav-sub-item" data-scroll-to="sub-' + cId + '-' + idx + '">' + sub.subTitle + ' <span>(' + sub.tests.length + ')</span></div>';
      });
      navHtml += '</div></div></div>';
    });
    navHtml += '</div></div>';

    var burgerHtml = '<button class="deep-dash-burger" id="deep-dash-burger">' + NAV_ICON_BURGER + '</button>';
    var overlayHtml = '<div class="deep-dash-overlay" id="deep-dash-overlay"></div>';
    var contentHtml = '<div class="deep-dash-content" id="deep-dash-content">' +
      '<div id="deep-dash-header-area"></div>' +
      '<div class="deep-dash-toolbar">' +
        '<div class="deep-dash-search-wrap">' + NAV_ICON_SEARCH +
          '<input type="text" class="deep-dash-search" id="deep-dash-search-input" placeholder="Поиск тестов..." />' +
        '</div>' +
        '<div class="deep-dash-tabs">' +
          '<button class="deep-dash-tab" data-tab="categories">Категории</button>' +
          '<button class="deep-dash-tab" data-tab="alphabetical">А — Я</button>' +
        '</div>' +
      '</div>' +
      '<div id="deep-dash-grid-area"></div>' +
    '</div>';

    container.className = "deep-dashboard";
    container.innerHTML = navHtml + burgerHtml + overlayHtml + contentHtml;

    /* ── Attach events ONCE — never re-stacked ── */
    var searchInput = document.getElementById("deep-dash-search-input");
    searchInput.addEventListener("input", function(e) {
      dashboardState.searchQuery = e.target.value;
      updateDashboardGrid();
    });

    container.addEventListener("click", function(e) {
      var navItem = e.target.closest("[data-nav]");
      if (navItem) {
        var targetCat = navItem.getAttribute("data-nav");
        if (targetCat !== "home") return;
        e.preventDefault();
        
        // Handle accordion toggle FIRST if it's a category
        var group = navItem.closest(".deep-dash-nav-group");
        if (group) {
          var wasExpanded = group.classList.contains("expanded");
          // Close others
          var allGroups = document.querySelectorAll(".deep-dash-nav-group");
          for (var i = 0; i < allGroups.length; i++) {
            allGroups[i].classList.remove("expanded");
          }
          // Toggle this one
          if (!wasExpanded) group.classList.add("expanded");
        }
        
        dashboardState.activeCategoryId = targetCat === "home" ? null : targetCat;
        if (dashboardState.activeCategoryId) window.DEEP_CATEGORY_DATA = reg[dashboardState.activeCategoryId];
        else window.DEEP_CATEGORY_DATA = null;
        dashboardState.searchQuery = "";
        searchInput.value = "";
        dashboardState.mode = "categories";
        syncURLState();
        /* FIXED: just update grid + nav states, do NOT rebuild shell */
        updateDashboardGrid();
        
        if (!targetCat || targetCat === "home") {
          document.getElementById("deep-dash-nav").classList.remove("open");
          document.getElementById("deep-dash-overlay").classList.remove("open");
        }
        return;
      }

      var subItem = e.target.closest("[data-scroll-to]");
      if (subItem) {
        e.preventDefault();
        
        document.querySelectorAll(".deep-dash-nav-sub-item").forEach(function(el) { el.classList.remove("active"); });
        subItem.classList.add("active");

        if (dashboardState.mode !== "categories") {
          dashboardState.mode = "categories";
          updateDashboardGrid(); // Must render the anchors before scrolling
        }

        var targetId = subItem.getAttribute("data-scroll-to");
        var targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        document.getElementById("deep-dash-nav").classList.remove("open");
        document.getElementById("deep-dash-overlay").classList.remove("open");
        return;
      }
      var tabBtn = e.target.closest("[data-tab]");
      if (tabBtn) {
        dashboardState.mode = tabBtn.getAttribute("data-tab");
        updateDashboardGrid();
      }
    });

    var mBurger = document.getElementById("deep-dash-burger");
    var mOverlay = document.getElementById("deep-dash-overlay");
    var mNavClose = document.getElementById("deep-dash-nav-close");
    function tgMob() {
      document.getElementById("deep-dash-nav").classList.toggle("open");
      mOverlay.classList.toggle("open");

    }
    if (mBurger) mBurger.addEventListener("click", tgMob);
    if (mOverlay) mOverlay.addEventListener("click", tgMob);
    if (mNavClose) mNavClose.addEventListener("click", tgMob);

    /* Initial render */
    updateDashboardGrid();
  };

})();
