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
  var ICON_QUESTIONS = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21.6602 10.4395L20.6802 14.6195C19.8402 18.2295 18.1802 19.6895 15.0602 19.3895C14.5602 19.3495 14.0202 19.2595 13.4402 19.1195L11.7602 18.7195C7.59018 17.7295 6.30018 15.6695 7.28018 11.4895L8.26018 7.29952C8.46018 6.44952 8.70018 5.70952 9.00018 5.09952C10.1702 2.67952 12.1602 2.02952 15.5002 2.81952L17.1702 3.20952C21.3602 4.18952 22.6402 6.25952 21.6602 10.4395Z" stroke="#E8D6B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.0584 19.3896C14.4384 19.8096 13.6584 20.1596 12.7084 20.4696L11.1284 20.9896C7.15839 22.2696 5.06839 21.1996 3.77839 17.2296L2.49839 13.2796C1.21839 9.30961 2.27839 7.20961 6.24839 5.92961L7.82839 5.40961C8.23839 5.27961 8.62839 5.16961 8.99839 5.09961C8.69839 5.70961 8.45839 6.44961 8.25839 7.29961L7.27839 11.4896C6.29839 15.6696 7.58839 17.7296 11.7584 18.7196L13.4384 19.1196C14.0184 19.2596 14.5584 19.3496 15.0584 19.3896Z" stroke="#E8D6B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.6406 8.53027L17.4906 9.76027" stroke="#E8D6B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.6602 12.4004L14.5602 13.1404" stroke="#E8D6B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var ICON_TIME = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#E8D6B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.7089 15.1798L12.6089 13.3298C12.0689 13.0098 11.6289 12.2398 11.6289 11.6098V7.50977" stroke="#E8D6B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var ICON_SAVE = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14 2C16 2 17 3.01 17 5.03V12.08C17 14.07 15.59 14.84 13.86 13.8L12.54 13C12.24 12.82 11.76 12.82 11.46 13L10.14 13.8C8.41 14.84 7 14.07 7 12.08V5.03C7 3.01 8 2 10 2H14Z" stroke="#E8D6B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.82 4.98996C3.41 5.55996 2 7.65996 2 11.9V14.93C2 19.98 4 22 9 22H15C20 22 22 19.98 22 14.93V11.9C22 7.58996 20.54 5.47996 17 4.95996" stroke="#E8D6B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

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
    var catalogContainer = document.getElementById("personality-categories-container");
    if (catalogContainer) { catalogContainer.innerHTML = ""; window.deepRenderCatalog("personality-categories-container"); }
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

  window.deepRenderCatalog = function (containerId) {
    var container = null;
    if (containerId) container = document.getElementById(containerId);
    if (!container) container = document.querySelector("#deep-categories-container") || document.querySelector("[data-category-id]");
    if (!container) return;
    
    var data = window.DEEP_CATEGORY_DATA;

    // AUTO-DETECT VIA URL (Foolproof fallback)
    if (!data || !data.categoryId) {
      var dMap = {
        "personality": "personality", "mental": "mental_functions", 
        "adaptation": "adaptation", "psychiatry": "psychiatry",
        "relationships": "relationships", "career": "career",
        "team": "team", "organization": "organization",
        "psychoanalytic": "psychoanalytic", "therapy": "therapy_efficacy"
      };
      var loc = window.location.pathname.toLowerCase();
      var autoCat = null;
      for (var k in dMap) {
        if (loc.indexOf("/" + k) !== -1 || loc.indexOf(k + ".html") !== -1) { autoCat = dMap[k]; break; }
      }
      if (autoCat && window.DEEP_MASTER_REGISTRY) {
        data = window.DEEP_MASTER_REGISTRY[autoCat];
        window.DEEP_CATEGORY_DATA = data;
      }
    }

    if (!data || !data.categoryId) {
      console.warn("DEEP_CATEGORY_DATA or categoryId is missing.");
      return;
    }
    
    /* PREVENT DUPLICATION BUG */
    container.innerHTML = "";

    // Refresh DEEP_TESTS dynamically
    if (!window.DEEP_TESTS || Object.keys(window.DEEP_TESTS).length === 0) {
      if (window.DEEP_TEST_REGISTRY) {
         window.DEEP_TESTS = window.DEEP_TEST_REGISTRY;
      }
    }

    // Determine subcategories
    var subcategoriesToRender = data.subcategories;

    // If subcategories are not explicitly provided, build them from the global registry
    if (!subcategoriesToRender && window.DEEP_TEST_REGISTRY) {
      var grouped = {};
      Object.keys(window.DEEP_TEST_REGISTRY).forEach(function(id) {
        var t = window.DEEP_TEST_REGISTRY[id];
        if (t.categoryId === data.categoryId) {
          var subTitle = t.subcategoryTitle || "Общие тесты";
          if (!grouped[subTitle]) grouped[subTitle] = { subTitle: subTitle, tests: [] };
          grouped[subTitle].tests.push(t);
        }
      });
      subcategoriesToRender = Object.keys(grouped).map(function(k){ return grouped[k]; });
    }

    if (!subcategoriesToRender || subcategoriesToRender.length === 0) {
      container.innerHTML = '<div class="deep-tests-note">Тесты этой категории в данный момент недоступны.</div>';
      return;
    }

    subcategoriesToRender.forEach(function (sub) {
      var sec = document.createElement("div");
      sec.className = "deep-subcategory";
      sec.innerHTML = '<h2>' + sub.subTitle + '</h2><div class="deep-tests-grid"></div>';
      var grid = sec.querySelector(".deep-tests-grid");

      sub.tests.forEach(function (test) {
        var status = test.legalStatus || "public";
        var isProp = status.indexOf("proprietary") !== -1;
        var isRest = status.indexOf("restricted") !== -1;
        var badge = isProp ? { c: "deep-tests-pill--proprietary", t: "Закрытая методика" } :
                    isRest ? { c: "deep-tests-pill--restricted", t: "Клиническая методика" } :
                    { c: "deep-tests-pill--public", t: "Открытая методика" };

        var isRunnable = test.isRunnable !== false;
        var ctaHtml = isRunnable
          ? '<button class="deep-tests-btn deep-tests-btn-primary" onclick="window.deepTestsOpen(\'' + test.id + '\')">Пройти тест</button>'
          : '<button class="deep-tests-btn deep-tests-btn-secondary" onclick="alert(\'' + (test.replacement ? 'Рекомендуемый аналог: ' + test.replacement : 'Методика с ограниченным доступом') + '\')">Информация</button>';

        var statusBadge = "";
        try {
          var stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
          var sess = stored.sessions && stored.sessions[test.id];
          if (sess && sess.mode === "result") {
            statusBadge = '<span class="deep-tests-card-badge deep-tests-card-badge--ok" title="Тест пройден">' + BADGE_CHECK + '</span>';
          } else if (sess && (sess.mode === "quiz" || (sess.answers && Object.keys(sess.answers).length > 0))) {
            statusBadge = '<span class="deep-tests-card-badge deep-tests-card-badge--wip" title="В процессе">' + BADGE_WIP + '</span>';
          }
        } catch (e) {}

        var card = document.createElement("div");
        card.className = "deep-tests-card";
        card.innerHTML = statusBadge +
          '<div class="deep-tests-card-meta"><span class="deep-tests-pill ' + badge.c + '">' + badge.t + '</span></div>' +
          '<h3 class="deep-tests-card-title">' + test.title + '</h3>' +
          '<div class="deep-tests-card-text">' + (test.measures || "") + '</div>' +
          '<div class="deep-tests-card-meta" style="margin-bottom:20px"><span style="font-size:12px;color:var(--dt-muted)">' + (test.time || "?") + ' • ' + (test.items || "?") + ' вопр.</span></div>' +
          '<div class="deep-tests-actions">' + ctaHtml + '</div>';
        grid.appendChild(card);
      });

      container.appendChild(sec);
    });
  };

})();
