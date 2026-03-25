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

  /* ════════════════════════════════════════════════════════════
     DASHBOARD RENDERING (v13.0)
     Full SPA-like catalog with left nav, search, A-Z index
     ════════════════════════════════════════════════════════════ */

  /* ── SVG Icons for Nav ── */
  var NAV_ICON_HOME = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>';
  var NAV_ICON_SEARCH = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  var NAV_ICON_CHEVRON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
  var NAV_ICON_BURGER = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  var NAV_ICON_CLOSE = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

  /* Category emoji map for left nav */
  var CAT_ICONS = {
    personality: "🧬", mental_functions: "🧠", adaptation: "🔄", psychiatry: "💊",
    relationships: "💞", career: "💼", team: "👥", organization: "🏢",
    psychoanalytic: "🔮", therapy_efficacy: "📊"
  };

  /* Short category names for nav */
  var CAT_SHORT = {
    personality: "Личность", mental_functions: "Псих. функции", adaptation: "Адаптация",
    psychiatry: "Психиатрия", relationships: "Отношения", career: "Карьера",
    team: "Команда", organization: "Организация", psychoanalytic: "Психоанализ",
    therapy_efficacy: "Терапия"
  };

  var dashboardState = {
    activeCategoryId: null, /* null = all categories overview */
    searchQuery: "",
    mode: "categories" /* "categories" | "alphabetical" */
  };

  /* ── Build a single test card HTML ── */
  function buildCardHTML(test) {
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

    return '<div class="deep-tests-card">' + statusBadge +
      '<div class="deep-tests-card-meta"><span class="deep-tests-pill ' + badge.c + '">' + badge.t + '</span></div>' +
      '<h3 class="deep-tests-card-title">' + test.title + '</h3>' +
      '<div class="deep-tests-card-text">' + (test.measures || "") + '</div>' +
      '<div class="deep-tests-card-meta" style="margin-bottom:20px"><span style="font-size:12px;color:var(--dt-muted)">' + (test.time || "?") + ' • ' + (test.items || "?") + ' вопр.</span></div>' +
      '<div class="deep-tests-actions">' + ctaHtml + '</div></div>';
  }

  /* ── Render the content area ── */
  function renderDashboardContent(contentEl) {
    var reg = window.DEEP_MASTER_REGISTRY;
    if (!reg) { contentEl.innerHTML = '<div class="deep-tests-note">Реестр тестов не загружен.</div>'; return; }

    var catId = dashboardState.activeCategoryId;
    var query = dashboardState.searchQuery.toLowerCase().trim();
    var isAlpha = dashboardState.mode === "alphabetical";

    /* ── Breadcrumbs ── */
    var breadHtml = '<nav class="deep-dash-breadcrumbs">';
    breadHtml += '<a href="#" data-nav="home">Все категории</a>';
    if (catId && reg[catId]) {
      breadHtml += ' <span class="deep-dash-bc-sep">›</span> <span>' + reg[catId].categoryTitle + '</span>';
    }
    breadHtml += '</nav>';

    /* ── Title + description ── */
    var title = catId && reg[catId] ? reg[catId].categoryTitle : "Каталог тестов";
    var desc = catId && reg[catId] ? reg[catId].categoryDescription : "Выберите категорию слева или воспользуйтесь поиском для быстрого доступа к 50+ психологическим методикам.";
    var titleHtml = '<h1 class="deep-dash-title">' + title + '</h1><p class="deep-dash-desc">' + desc + '</p>';

    /* ── Search + tabs ── */
    var tabCatClass = !isAlpha ? " active" : "";
    var tabAlphaClass = isAlpha ? " active" : "";
    var toolbarHtml = '<div class="deep-dash-toolbar">' +
      '<div class="deep-dash-search-wrap">' + NAV_ICON_SEARCH +
        '<input type="text" class="deep-dash-search" id="deep-dash-search-input" placeholder="Поиск тестов..." value="' + (dashboardState.searchQuery || '') + '" />' +
      '</div>' +
      '<div class="deep-dash-tabs">' +
        '<button class="deep-dash-tab' + tabCatClass + '" data-tab="categories">Категории</button>' +
        '<button class="deep-dash-tab' + tabAlphaClass + '" data-tab="alphabetical">А — Я</button>' +
      '</div></div>';

    /* ── Cards ── */
    var cardsHtml = "";

    if (isAlpha) {
      /* ALPHABETICAL MODE — all tests sorted A-Z */
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

      if (query) {
        allTests = allTests.filter(function(t) {
          return t.title.toLowerCase().indexOf(query) !== -1 ||
                 (t.measures || "").toLowerCase().indexOf(query) !== -1 ||
                 (t._categoryTitle || "").toLowerCase().indexOf(query) !== -1;
        });
      }

      var currentLetter = "";
      allTests.forEach(function(t) {
        var letter = t.title.charAt(0).toUpperCase();
        if (letter !== currentLetter) {
          currentLetter = letter;
          cardsHtml += '<div class="deep-dash-letter-header">' + letter + '</div>';
        }
        cardsHtml += buildCardHTML(t);
      });

      if (!allTests.length) {
        cardsHtml = '<div class="deep-tests-note">По запросу «' + dashboardState.searchQuery + '» ничего не найдено.</div>';
      }

      cardsHtml = '<div class="deep-dash-alpha-grid">' + cardsHtml + '</div>';

    } else if (!catId) {
      /* HOME — Show category overview cards */
      Object.keys(reg).forEach(function(cId) {
        var cat = reg[cId];
        var testCount = 0;
        cat.subcategories.forEach(function(s) { testCount += s.tests.length; });
        var emoji = CAT_ICONS[cId] || "📋";
        cardsHtml += '<div class="deep-dash-cat-card" data-nav="' + cId + '">' +
          '<div class="deep-dash-cat-emoji">' + emoji + '</div>' +
          '<div class="deep-dash-cat-info">' +
            '<h3 class="deep-dash-cat-name">' + cat.categoryTitle + '</h3>' +
            '<span class="deep-dash-cat-count">' + testCount + ' тестов</span>' +
          '</div>' +
          '<div class="deep-dash-cat-arrow">→</div></div>';
      });
      cardsHtml = '<div class="deep-dash-cat-grid">' + cardsHtml + '</div>';

    } else {
      /* CATEGORY DETAIL — show subcategories with test cards */
      var data = reg[catId];
      if (!data) { cardsHtml = '<div class="deep-tests-note">Категория не найдена.</div>'; }
      else {
        data.subcategories.forEach(function(sub) {
          var filteredTests = sub.tests;
          if (query) {
            filteredTests = sub.tests.filter(function(t) {
              return t.title.toLowerCase().indexOf(query) !== -1 ||
                     (t.measures || "").toLowerCase().indexOf(query) !== -1;
            });
          }
          if (filteredTests.length === 0) return;
          cardsHtml += '<div class="deep-subcategory"><h2>' + sub.subTitle + '</h2><div class="deep-tests-grid">';
          filteredTests.forEach(function(t) { cardsHtml += buildCardHTML(t); });
          cardsHtml += '</div></div>';
        });
        if (!cardsHtml && query) {
          cardsHtml = '<div class="deep-tests-note">По запросу «' + dashboardState.searchQuery + '» ничего не найдено в этой категории.</div>';
        }
      }
    }

    contentEl.innerHTML = breadHtml + titleHtml + toolbarHtml + cardsHtml;

    /* Wire up search */
    var searchInput = document.getElementById("deep-dash-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", function() {
        dashboardState.searchQuery = this.value;
        renderDashboardContent(contentEl);
      });
      /* Re-focus after re-render */
      if (query) { searchInput.focus(); searchInput.setSelectionRange(query.length, query.length); }
    }
  }

  /* ── Build full dashboard shell ── */
  window.deepRenderCatalog = function (containerId) {
    var container = null;
    if (containerId) container = document.getElementById(containerId);
    if (!container) container = document.querySelector("#deep-categories-container") || document.querySelector("#deep-app-root") || document.querySelector("[data-category-id]");
    if (!container) return;
    container.innerHTML = "";

    var reg = window.DEEP_MASTER_REGISTRY;
    if (!reg) return;

    // Refresh DEEP_TESTS dynamically
    if (!window.DEEP_TESTS || Object.keys(window.DEEP_TESTS).length === 0) {
      if (window.DEEP_TEST_REGISTRY) window.DEEP_TESTS = window.DEEP_TEST_REGISTRY;
    }

    // Auto-detect category from URL if on a category page
    var dMap = {
      "personality": "personality", "mental": "mental_functions",
      "adaptation": "adaptation", "psychiatry": "psychiatry",
      "relationships": "relationships", "career": "career",
      "team": "team", "organization": "organization",
      "psychoanalytic": "psychoanalytic", "therapy": "therapy_efficacy"
    };
    var loc = window.location.pathname.toLowerCase();
    for (var k in dMap) {
      if (loc.indexOf("/" + k) !== -1 || loc.indexOf(k + ".html") !== -1) {
        dashboardState.activeCategoryId = dMap[k];
        window.DEEP_CATEGORY_DATA = reg[dMap[k]];
        break;
      }
    }
    // Also check data-category-id attribute
    var explicitCat = container.getAttribute("data-category-id");
    if (explicitCat && reg[explicitCat]) {
      dashboardState.activeCategoryId = explicitCat;
      window.DEEP_CATEGORY_DATA = reg[explicitCat];
    }

    /* ── Build left sidebar nav ── */
    var navHtml = '<div class="deep-dash-nav" id="deep-dash-nav">' +
      '<div class="deep-dash-nav-header">' +
        '<div class="deep-dash-logo"><svg xmlns="http://www.w3.org/2000/svg" width="77" height="42" viewBox="0 0 77 42" fill="none"><path d="M62.3393 35.8819V29.4712H63.8387L65.5268 32.6569L66.1623 34.0727H66.202C66.1755 33.7319 66.1391 33.3517 66.0928 32.9322C66.0464 32.5126 66.0233 32.1128 66.0233 31.7326V29.4712H67.4135V35.8819H65.914L64.226 32.6864L63.5904 31.2902H63.5507C63.5838 31.6441 63.6202 32.0243 63.6599 32.4307C63.7063 32.8371 63.7295 33.2304 63.7295 33.6106V35.8819H62.3393Z" fill="url(#dpl0)"/><path d="M58.1834 35.9992C57.6008 35.9992 57.0878 35.8648 56.6442 35.596C56.2073 35.3273 55.8631 34.9438 55.6115 34.4457C55.3666 33.9409 55.2441 33.3412 55.2441 32.6464C55.2441 31.945 55.3666 31.3518 55.6115 30.8667C55.8631 30.3751 56.2073 30.0015 56.6442 29.7458C57.0878 29.4836 57.6008 29.3525 58.1834 29.3525C58.7659 29.3525 59.2757 29.4836 59.7126 29.7458C60.1561 30.0015 60.5003 30.3751 60.7453 30.8667C60.9968 31.3583 61.1226 31.9515 61.1226 32.6464C61.1226 33.3412 60.9968 33.9409 60.7453 34.4457C60.5003 34.9438 60.1561 35.3273 59.7126 35.596C59.2757 35.8648 58.7659 35.9992 58.1834 35.9992ZM58.1834 34.7505C58.6269 34.7505 58.9778 34.5604 59.2359 34.1802C59.4941 33.8 59.6232 33.2887 59.6232 32.6464C59.6232 32.004 59.4941 31.5025 59.2359 31.142C58.9778 30.7815 58.6269 30.6012 58.1834 30.6012C57.7398 30.6012 57.389 30.7815 57.1308 31.142C56.8726 31.5025 56.7435 32.004 56.7435 32.6464C56.7435 33.2887 56.8726 33.8 57.1308 34.1802C57.389 34.5604 57.7398 34.7505 58.1834 34.7505Z" fill="url(#dpl0)"/><path d="M52.5634 35.8819V29.4712H54.0231V35.8819H52.5634Z" fill="url(#dpl0)"/><path d="M48.3089 35.8819V30.6904H46.5315V29.4712H51.556V30.6904H49.7786V35.8819H48.3089Z" fill="url(#dpl0)"/><path d="M42.9965 35.9998C42.1558 35.9998 41.5136 35.754 41.0701 35.2624C40.6266 34.7708 40.4048 33.9875 40.4048 32.9125V29.4712H41.8744V33.06C41.8744 33.6892 41.9704 34.1284 42.1624 34.3775C42.3544 34.6266 42.6324 34.7511 42.9965 34.7511C43.3606 34.7511 43.642 34.6266 43.8406 34.3775C44.0392 34.1284 44.1385 33.6892 44.1385 33.06V29.4712H45.5485V32.9125C45.5485 33.9875 45.3301 34.7708 44.8931 35.2624C44.4628 35.754 43.8306 35.9998 42.9965 35.9998Z" fill="url(#dpl0)"/><path d="M35.6727 35.8819V29.4712H37.1324V34.6626H39.6944V35.8819H35.6727Z" fill="url(#dpl0)"/><path d="M31.5149 35.9992C30.9323 35.9992 30.4192 35.8648 29.9757 35.596C29.5388 35.3273 29.1946 34.9438 28.943 34.4457C28.6981 33.9409 28.5756 33.3412 28.5756 32.6464C28.5756 31.945 28.6981 31.3518 28.943 30.8667C29.1946 30.3751 29.5388 30.0015 29.9757 29.7458C30.4192 29.4836 30.9323 29.3525 31.5149 29.3525C32.0974 29.3525 32.6071 29.4836 33.0441 29.7458C33.4876 30.0015 33.8318 30.3751 34.0768 30.8667C34.3283 31.3583 34.4541 31.9515 34.4541 32.6464C34.4541 33.3412 34.3283 33.9409 34.0768 34.4457C33.8318 34.9438 33.4876 35.3273 33.0441 35.596C32.6071 35.8648 32.0974 35.9992 31.5149 35.9992ZM31.5149 34.7505C31.9584 34.7505 32.3092 34.5604 32.5674 34.1802C32.8256 33.8 32.9547 33.2887 32.9547 32.6464C32.9547 32.004 32.8256 31.5025 32.5674 31.142C32.3092 30.7815 31.9584 30.6012 31.5149 30.6012C31.0713 30.6012 30.7205 30.7815 30.4623 31.142C30.2041 31.5025 30.075 32.004 30.075 32.6464C30.075 33.2887 30.2041 33.8 30.4623 34.1802C30.7205 34.5604 31.0713 34.7505 31.5149 34.7505Z" fill="url(#dpl0)"/><path d="M25.3431 35.9992C24.9194 35.9992 24.4957 35.9205 24.072 35.7632C23.655 35.6059 23.281 35.3765 22.95 35.0749L23.7841 34.0819C24.0158 34.2785 24.2739 34.4391 24.5586 34.5637C24.8433 34.6882 25.118 34.7505 25.3828 34.7505C25.6873 34.7505 25.9124 34.6948 26.058 34.5833C26.2103 34.4719 26.2864 34.3211 26.2864 34.131C26.2864 33.9278 26.2004 33.7803 26.0282 33.6886C25.8627 33.5903 25.6377 33.4821 25.353 33.3641L24.509 33.0102C24.2905 32.9184 24.082 32.7971 23.8834 32.6464C23.6848 32.489 23.5226 32.2957 23.3968 32.0663C23.271 31.8368 23.2081 31.5681 23.2081 31.26C23.2081 30.906 23.3041 30.5849 23.4961 30.2964C23.6947 30.008 23.9661 29.7786 24.3104 29.6082C24.6612 29.4378 25.0617 29.3525 25.5119 29.3525C25.8826 29.3525 26.2533 29.4246 26.624 29.5689C26.9948 29.7131 27.3191 29.9228 27.5972 30.1981L26.8524 31.1125C26.6406 30.9486 26.4287 30.8241 26.2169 30.7389C26.0051 30.6471 25.7701 30.6012 25.5119 30.6012C25.2603 30.6012 25.0584 30.6537 24.9062 30.7586C24.7605 30.8569 24.6877 30.9978 24.6877 31.1813C24.6877 31.378 24.7804 31.5255 24.9657 31.6238C25.1577 31.7221 25.3927 31.827 25.6708 31.9384L26.5049 32.2727C26.8955 32.43 27.2066 32.6464 27.4383 32.9217C27.67 33.197 27.7858 33.5608 27.7858 34.0131C27.7858 34.367 27.6898 34.6948 27.4979 34.9963C27.3059 35.2978 27.0279 35.5403 26.6638 35.7239C26.2997 35.9074 25.8594 35.9992 25.3431 35.9992Z" fill="url(#dpl0)"/><path d="M70.5572 35.9992C70.1336 35.9992 69.7099 35.9205 69.2862 35.7632C68.8691 35.6059 68.4951 35.3765 68.1641 35.0749L68.9982 34.0819C69.2299 34.2785 69.4881 34.4391 69.7728 34.5637C70.0574 34.6882 70.3322 34.7505 70.597 34.7505C70.9015 34.7505 71.1265 34.6948 71.2722 34.5833C71.4244 34.4719 71.5006 34.3211 71.5006 34.131C71.5006 33.9278 71.4145 33.7803 71.2424 33.6886C71.0769 33.5903 70.8518 33.4821 70.5672 33.3641L69.7231 33.0102C69.5047 32.9184 69.2961 32.7971 69.0975 32.6464C68.8989 32.489 68.7367 32.2957 68.611 32.0663C68.4852 31.8368 68.4223 31.5681 68.4223 31.26C68.4223 30.906 68.5183 30.5849 68.7103 30.2964C68.9089 30.008 69.1803 29.7786 69.5245 29.6082C69.8754 29.4378 70.2759 29.3525 70.726 29.3525C71.0968 29.3525 71.4675 29.4246 71.8382 29.5689C72.2089 29.7131 72.5333 29.9228 72.8113 30.1981L72.0666 31.1125C71.8548 30.9486 71.6429 30.8241 71.4311 30.7389C71.2192 30.6471 70.9842 30.6012 70.726 30.6012C70.4745 30.6012 70.2726 30.6537 70.1203 30.7586C69.9747 30.8569 69.9019 30.9978 69.9019 31.1813C69.9019 31.378 69.9945 31.5255 70.1799 31.6238C70.3719 31.7221 70.6069 31.827 70.8849 31.9384L71.719 32.2727C72.1096 32.43 72.4208 32.6464 72.6525 32.9217C72.8841 33.197 73 33.5608 73 34.0131C73 34.367 72.904 34.6948 72.712 34.9963C72.5201 35.2978 72.242 35.5403 71.8779 35.7239C71.5138 35.9074 71.0736 35.9992 70.5572 35.9992Z" fill="url(#dpl0)"/><path d="M17.2745 35.8819V33.6008L15.3183 29.4712H16.8872L17.4631 30.946C17.5558 31.1886 17.6452 31.4245 17.7312 31.654C17.8173 31.8768 17.9034 32.1128 17.9894 32.3619H18.0291C18.1218 32.1128 18.2145 31.8768 18.3072 31.654C18.3999 31.4245 18.4892 31.1886 18.5753 30.946L19.1612 29.4712H20.6904L18.7342 33.6008V35.8819H17.2745Z" fill="url(#dpl0)"/><path d="M12.7939 35.9992C12.3702 35.9992 11.9465 35.9205 11.5229 35.7632C11.1058 35.6059 10.7318 35.3765 10.4008 35.0749L11.2349 34.0819C11.4666 34.2785 11.7248 34.4391 12.0094 34.5637C12.2941 34.6882 12.5688 34.7505 12.8336 34.7505C13.1381 34.7505 13.3632 34.6948 13.5088 34.5833C13.6611 34.4719 13.7372 34.3211 13.7372 34.131C13.7372 33.9278 13.6512 33.7803 13.4791 33.6886C13.3136 33.5903 13.0885 33.4821 12.8038 33.3641L11.9598 33.0102C11.7413 32.9184 11.5328 32.7971 11.3342 32.6464C11.1356 32.489 10.9734 32.2957 10.8476 32.0663C10.7218 31.8368 10.6589 31.5681 10.6589 31.26C10.6589 30.906 10.7549 30.5849 10.9469 30.2964C11.1455 30.008 11.4169 29.7786 11.7612 29.6082C12.112 29.4378 12.5125 29.3525 12.9627 29.3525C13.3334 29.3525 13.7041 29.4246 14.0748 29.5689C14.4456 29.7131 14.7699 29.9228 15.048 30.1981L14.3032 31.1125C14.0914 30.9486 13.8796 30.8241 13.6677 30.7389C13.4559 30.6471 13.2209 30.6012 12.9627 30.6012C12.7111 30.6012 12.5092 30.6537 12.357 30.7586C12.2113 30.8569 12.1385 30.9978 12.1385 31.1813C12.1385 31.378 12.2312 31.5255 12.4165 31.6238C12.6085 31.7221 12.8435 31.827 13.1216 31.9384L13.9557 32.2727C14.3463 32.43 14.6574 32.6464 14.8891 32.9217C15.1208 33.197 15.2367 33.5608 15.2367 34.0131C15.2367 34.367 15.1407 34.6948 14.9487 34.9963C14.7567 35.2978 14.4787 35.5403 14.1146 35.7239C13.7505 35.9074 13.3102 35.9992 12.7939 35.9992Z" fill="url(#dpl0)"/><path d="M58.1043 25.6538V6H64.9236C66.3848 6 67.704 6.20096 68.8812 6.60288C70.0786 6.9847 71.0325 7.63782 71.7428 8.56223C72.4532 9.48664 72.8084 10.7426 72.8084 12.3302C72.8084 13.8575 72.4532 15.1135 71.7428 16.0982C71.0325 17.0829 70.0888 17.8164 68.9116 18.2987C67.7345 18.7609 66.4457 18.992 65.0453 18.992H62.5794V25.6538H58.1043ZM62.5794 15.4652H64.7713C67.2068 15.4652 68.4245 14.4202 68.4245 12.3302C68.4245 11.3053 68.0998 10.5819 67.4503 10.1599C66.8009 9.73784 65.8673 9.52684 64.6496 9.52684H62.5794V15.4652Z" fill="url(#dpl0)"/><path d="M41.4266 25.6538V6H53.8474V9.73784H45.9017V13.6867H52.6601V17.3944H45.9017V21.916H54.1519V25.6538H41.4266Z" fill="url(#dpl0)"/><path d="M24.7469 25.6538V6H37.1678V9.73784H29.2221V13.6867H35.9805V17.3944H29.2221V21.916H37.4722V25.6538H24.7469Z" fill="url(#dpl0)"/><path d="M5.42212 25.6538V6H11.0237C13.0532 6 14.8088 6.34163 16.2904 7.02489C17.7719 7.70815 18.9186 8.77324 19.7305 10.2201C20.5626 11.647 20.9786 13.4857 20.9786 15.7365C20.9786 17.9872 20.5727 19.8461 19.7609 21.3131C18.9491 22.7801 17.8125 23.8753 16.3513 24.5988C14.9103 25.3021 13.2156 25.6538 11.2672 25.6538H5.42212ZM9.89728 22.0667H10.7497C11.8862 22.0667 12.8706 21.8657 13.7027 21.4638C14.5551 21.0619 15.2147 20.3987 15.6815 19.4743C16.1483 18.5499 16.3817 17.304 16.3817 15.7365C16.3817 14.169 16.1483 12.9431 15.6815 12.0589C15.2147 11.1546 14.5551 10.5216 13.7027 10.1599C12.8706 9.77804 11.8862 9.58712 10.7497 9.58712H9.89728V22.0667Z" fill="url(#dpl0)"/><defs><linearGradient id="dpl0" x1="5" y1="6" x2="56.3281" y2="29.3773" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="#E8D6B3"/></linearGradient></defs></svg></div>' +
        '<button class="deep-dash-nav-close" id="deep-dash-nav-close">' + NAV_ICON_CLOSE + '</button>' +
      '</div>' +
      '<div class="deep-dash-nav-scroll">' +
        '<a class="deep-dash-nav-item deep-dash-nav-home' + (!dashboardState.activeCategoryId ? ' active' : '') + '" href="#" data-nav="home">' +
          NAV_ICON_HOME + '<span>Все тесты</span></a>';

    Object.keys(reg).forEach(function(cId) {
      var cat = reg[cId];
      var isActive = dashboardState.activeCategoryId === cId;
      var emoji = CAT_ICONS[cId] || "📋";
      var testCount = 0;
      cat.subcategories.forEach(function(s) { testCount += s.tests.length; });

      navHtml += '<div class="deep-dash-nav-group' + (isActive ? ' expanded' : '') + '">' +
        '<a class="deep-dash-nav-item' + (isActive ? ' active' : '') + '" href="#" data-nav="' + cId + '">' +
          '<span class="deep-dash-nav-emoji">' + emoji + '</span>' +
          '<span class="deep-dash-nav-label">' + (CAT_SHORT[cId] || cat.categoryTitle) + '</span>' +
          '<span class="deep-dash-nav-count">' + testCount + '</span>' +
          '<span class="deep-dash-nav-chevron">' + NAV_ICON_CHEVRON + '</span>' +
        '</a>';

      if (isActive) {
        navHtml += '<div class="deep-dash-nav-sub">';
        cat.subcategories.forEach(function(sub) {
          navHtml += '<div class="deep-dash-nav-sub-item">' + sub.subTitle + ' <span>(' + sub.tests.length + ')</span></div>';
        });
        navHtml += '</div>';
      }

      navHtml += '</div>';
    });

    navHtml += '</div></div>';

    /* ── Mobile burger button ── */
    var burgerHtml = '<button class="deep-dash-burger" id="deep-dash-burger">' + NAV_ICON_BURGER + '</button>';

    /* ── Content area ── */
    var contentHtml = '<div class="deep-dash-content" id="deep-dash-content"></div>';

    /* ── Overlay for mobile ── */
    var overlayHtml = '<div class="deep-dash-overlay" id="deep-dash-overlay"></div>';

    container.className = "deep-dashboard";
    container.innerHTML = navHtml + burgerHtml + overlayHtml + contentHtml;

    /* ── Render content ── */
    var contentEl = document.getElementById("deep-dash-content");
    renderDashboardContent(contentEl);

    /* ── Event delegation ── */
    container.addEventListener("click", function(e) {
      var navItem = e.target.closest("[data-nav]");
      if (navItem) {
        e.preventDefault();
        var targetCat = navItem.getAttribute("data-nav");
        if (targetCat === "home") {
          dashboardState.activeCategoryId = null;
          dashboardState.searchQuery = "";
          window.DEEP_CATEGORY_DATA = null;
        } else if (reg[targetCat]) {
          dashboardState.activeCategoryId = targetCat;
          window.DEEP_CATEGORY_DATA = reg[targetCat];
        }
        /* Re-render entire dashboard to update nav active states */
        window.deepRenderCatalog(container.id);
        /* Close mobile nav */
        var nav = document.getElementById("deep-dash-nav");
        var overlay = document.getElementById("deep-dash-overlay");
        if (nav) nav.classList.remove("open");
        if (overlay) overlay.classList.remove("open");
        return;
      }

      var tabBtn = e.target.closest("[data-tab]");
      if (tabBtn) {
        dashboardState.mode = tabBtn.getAttribute("data-tab");
        renderDashboardContent(contentEl);
        return;
      }
    });

    /* ── Mobile burger toggle ── */
    var burger = document.getElementById("deep-dash-burger");
    var navEl = document.getElementById("deep-dash-nav");
    var navOverlay = document.getElementById("deep-dash-overlay");
    var navClose = document.getElementById("deep-dash-nav-close");

    function toggleMobileNav() {
      navEl.classList.toggle("open");
      navOverlay.classList.toggle("open");
    }
    if (burger) burger.addEventListener("click", toggleMobileNav);
    if (navOverlay) navOverlay.addEventListener("click", toggleMobileNav);
    if (navClose) navClose.addEventListener("click", toggleMobileNav);
  };

})();
