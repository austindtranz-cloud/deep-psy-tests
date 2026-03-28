/* ═══════════════════════════════════════════
   DEEP PSY TESTS — ENGINE v16 (Modular)
   Orchestrator: init, events, actions.
   ═══════════════════════════════════════════ */
(function () {
  "use strict";

  window.DEEP_CORE = {
    // Basic XSS Protection
    escapeHTML: function (str) {
      if (!str) return "";
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    },

    init: function () {
      if (window.DEEP_ROUTER) window.DEEP_ROUTER.init(document.body);
      if (window.DEEP_QUIZ) window.DEEP_QUIZ.init();
      if (window.DEEP_UI) window.DEEP_UI.init();
      if (window.DEEP_INTEGRATIONS) window.DEEP_INTEGRATIONS.init();

      this.attachEvents();
      this.checkUrlParams();
      
      console.log("DEEP CORE: Modular v15.0 Initialized");
    },

    attachEvents: function () {
      var self = this;
      var app = document.getElementById("deep-tests-app");
      var overlay = document.getElementById("deep-tests-overlay");
      if (!app || !overlay) return;

      // Close button listener
      var closeBtn = document.querySelector(".deep-tests-close");
      if (closeBtn) {
        closeBtn.addEventListener("click", function() { window.DEEP_UI.closeModal(); });
      }

      // Click on overlay to close
      overlay.addEventListener("click", function(e) {
        if (e.target === overlay) window.DEEP_UI.closeModal();
      });

      // Mobile Bottom Nav listeners
      document.querySelectorAll(".deep-mobile-nav-item").forEach(item => {
        item.addEventListener("click", function() {
          var nav = this.getAttribute("data-nav");
          if (nav && window.DEEP_ROUTER) {
            window.DEEP_ROUTER.navigate(nav === 'home' ? null : nav);
            document.querySelectorAll(".deep-mobile-nav-item").forEach(el => el.classList.remove("active"));
            this.classList.add("active");
          }
        });
      });

      app.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-action]");
        if (!btn) return;
        self.handleAction(btn.getAttribute("data-action"), btn);
      });

      window.addEventListener("keydown", function (e) {
        if (!overlay.classList.contains("active")) return;
        if (e.key === "Escape") window.DEEP_UI.closeModal();
        if (e.key >= "1" && e.key <= "9") {
          var options = document.querySelectorAll(".deep-tests-option");
          if (options[e.key - 1]) options[e.key - 1].click();
        }
      });
    },

    checkUrlParams: function () {
      var urlParams = new URLSearchParams(window.location.search);
      var testId = urlParams.get("openTest");
      if (!testId) return;

      /* Вместо setInterval-поллинга слушаем CustomEvent от test_registry.js.
         Если реестр уже загружен — открываем сразу. */
      var exists = window.DEEP_QUIZ && window.DEEP_QUIZ._findTestInRegistry(testId);
      if (exists) {
        window.DEEP_CORE.openTest(testId);
      } else {
        document.addEventListener('deep-registry-ready', function onReady() {
          document.removeEventListener('deep-registry-ready', onReady);
          var r = window.DEEP_QUIZ && window.DEEP_QUIZ._findTestInRegistry(testId);
          if (r) window.DEEP_CORE.openTest(testId);
        });
      }
    },

    openTest: function (testId) {
      if (!testId || !window.DEEP_QUIZ || !window.DEEP_UI) return;
      if (testId === 'random') return this.openRandomTest();
      
      window.DEEP_UI.openOverlay();
      
      // Show loading state in overlay
      var app = document.getElementById("deep-tests-app");
      if (app) app.innerHTML = '<div class="deep-tests-screen"><div class="deep-tests-scroll"><div class="quiz-intro"><h2 class="deep-page-title">Загрузка...</h2></div></div></div>';

      window.DEEP_QUIZ.loadTestData(testId)
        .then(function(test) {
          window.DEEP_QUIZ.setActiveTest(testId);
          var session = window.DEEP_QUIZ.ensureSession(testId);
          window.DEEP_UI.renderScreen(test, session);
        })
        .catch(function(err) {
          console.error("DEEP: Loading failed", err);
          if (app) {
            app.innerHTML = '<div class="deep-tests-screen"><div class="deep-tests-scroll"><div class="quiz-intro">' +
              '<h2 class="deep-page-title">Ошибка загрузки</h2>' +
              '<div class="err-msg"></div>' +
              '<p class="deep-page-subtitle" style="margin:16px 0">Проверьте подключение к интернету.</p>' +
              '<div class="deep-btn-group" style="gap:12px">' +
                '<button class="deep-tests-btn deep-tests-btn-primary" data-retry-id="' + testId + '">Попробовать снова</button>' +
                '<button class="deep-tests-btn deep-tests-btn-outline" onclick="window.DEEP_UI.closeModal()">Закрыть</button>' +
              '</div>' +
            '</div></div></div>';
            app.querySelector(".err-msg").textContent = String(err);
            /* Retry handler */
            var retryBtn = app.querySelector('[data-retry-id]');
            if (retryBtn) {
              retryBtn.addEventListener('click', function() {
                window.DEEP_CORE.openTest(retryBtn.getAttribute('data-retry-id'));
              });
            }
          }
        });
    },

    openRandomTest: function() {
      var runnable = [];
      var reg = window.DEEP_MASTER_REGISTRY || {};
      for (var cId in reg) {
        var subcats = reg[cId].subcategories || [];
        for (var i = 0; i < subcats.length; i++) {
          var tests = subcats[i].tests || [];
          for (var j = 0; j < tests.length; j++) {
            if (tests[j].isRunnable) runnable.push(tests[j]);
          }
        }
      }
      if (!runnable.length) return;
      var random = runnable[Math.floor(Math.random() * runnable.length)];
      this.openTest(random.id);
    },

    handleAction: function (action, btn) {
      if (action === "open-test") {
        this.openTest(btn.getAttribute("data-id"));
        return;
      }
      if (action === "open-category") {
        if (window.DEEP_ROUTER) window.DEEP_ROUTER.navigate(btn.getAttribute("data-id"));
        return;
      }

      var testId = window.DEEP_QUIZ.state.activeTestId;
      var session = window.DEEP_QUIZ.state.sessions[testId];
      var test = window.DEEP_QUIZ.getActiveTest();

      if (action === "start-test") {
        session = window.DEEP_QUIZ.resetSession(testId);
        session.mode = "quiz";
        window.DEEP_QUIZ.saveState();
      } else if (action === "restart-test") {
        session = window.DEEP_QUIZ.resetSession(testId);
        session.mode = "start";
        window.DEEP_QUIZ.saveState();
      } else if (action === "resume-test") {
        session.mode = "quiz";
        window.DEEP_QUIZ.saveState();
      } else if (action === "answer") {
        var idx = parseInt(btn.getAttribute("data-index"));
        var q = test.questions[session.currentIndex];
        var opt = q.options[idx];
        var value = (opt.score !== undefined ? opt.score : (opt.value !== undefined ? opt.value : idx));

        /* Инкапсулированная запись ответа через DEEP_QUIZ.setAnswer() */
        window.DEEP_QUIZ.setAnswer(testId, q.id, value);

        /* Блокируем кнопки вариантов на время перехода (вместо _advancing flag) */
        var options = document.querySelectorAll('.deep-tests-option');
        options.forEach(function(o) { o.disabled = true; });
        setTimeout(function() {
          options.forEach(function(o) { o.disabled = false; });
          window.DEEP_CORE.handleAction("next");
        }, 150);
      } else if (action === "next") {
        window.DEEP_QUIZ.advanceQuiz(session);
      } else if (action === "back") {
        if (!window.DEEP_QUIZ.goBack(session)) {
          session.mode = "start";
        }
      } else if (action === "back-to-start") {
        session.mode = "start";
      } else if (action === "report-error" || action === "open-bug-report") {
        /* ── v12 Bug Report Overlay (full form with textarea) ── */
        var bugOverlay = document.getElementById("deep-bug-overlay");
        if (!bugOverlay) {
          bugOverlay = document.createElement("div");
          bugOverlay.id = "deep-bug-overlay";
          bugOverlay.style.cssText = "position:fixed;inset:0;z-index:99999999;display:flex;align-items:center;justify-content:center;padding:20px 10px;background:rgba(0,0,0,.6);backdrop-filter:blur(5px);opacity:0;transition:opacity .2s;";
          bugOverlay.innerHTML =
            '<div style="width:100%;max-width:400px;background:rgba(10,10,10,.96);border:1px solid rgba(232,214,179,.14);border-radius:16px;padding:24px 20px;box-shadow:0 24px 70px rgba(0,0,0,.58);font-family:Manrope,Arial,sans-serif;box-sizing:border-box;">' +
              '<div style="font-size:16px;font-weight:700;color:#F4EEE3;margin-bottom:6px;">Сообщить об ошибке</div>' +
              '<p style="font-size:12px;color:rgba(168,159,145,.6);margin:0 0 14px;line-height:1.4;">Только для сообщений о багах и неполадках. Не указывайте персональные данные.</p>' +
              '<textarea id="deep-bug-text" style="width:100%;min-height:100px;background:rgba(255,255,255,.04);border:1px solid rgba(232,214,179,.14);border-radius:10px;padding:12px;color:#F4EEE3;font-family:inherit;font-size:14px;resize:vertical;box-sizing:border-box;outline:none;" placeholder="Опишите, что пошло не так…"></textarea>' +
              '<div style="display:flex;gap:10px;margin-top:14px;">' +
                '<button type="button" data-action="close-bug-report" style="flex:1;padding:12px;border:1px solid rgba(232,214,179,.14);border-radius:8px;background:transparent;color:#A89F91;font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;">Отмена</button>' +
                '<button type="button" data-action="send-bug-report" style="flex:1;padding:12px;border:none;border-radius:8px;background:#E8D6B3;color:#111;font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;">Отправить</button>' +
              '</div>' +
            '</div>';
          document.body.appendChild(bugOverlay);
          bugOverlay.addEventListener("click", function(ev) {
            if (ev.target === bugOverlay) { _closeBugOverlay(); }
            var ba = ev.target.getAttribute("data-action");
            if (ba === "close-bug-report") { _closeBugOverlay(); }
            if (ba === "send-bug-report") {
              var txt = document.getElementById("deep-bug-text").value.trim();
              if (!txt) return;
              var report = { text: txt, testId: test ? test.id : "unknown", testTitle: test ? test.title : "unknown", url: location.href, userAgent: navigator.userAgent, timestamp: new Date().toISOString() };
              try { var existing = JSON.parse(localStorage.getItem("deep-tests-bug-reports")) || []; existing.push(report); localStorage.setItem("deep-tests-bug-reports", JSON.stringify(existing)); } catch(err){}
              _closeBugOverlay();
              if (typeof window.deepShowSuccessModal === "function") {
                window.deepShowSuccessModal("Спасибо!", "Ваше сообщение об ошибке сохранено. Мы обязательно проверим.");
              } else { alert("Сообщение отправлено. Спасибо!"); }
            }
          });
        }
        var ta = document.getElementById("deep-bug-text");
        if (ta) ta.value = "";
        bugOverlay.style.display = "flex";
        void bugOverlay.offsetWidth;
        bugOverlay.style.opacity = "1";
        function _closeBugOverlay() { bugOverlay.style.opacity = "0"; setTimeout(function(){ bugOverlay.style.display = "none"; }, 200); }
        return; /* don't re-render */
      }

      window.DEEP_UI.renderScreen(test, session);
    }
  };

  /* ── Legacy Shim & Global Entry ── */
  window.deepUpdateDashboardGrid = function() {
    if (window.DEEP_UI) window.DEEP_UI.updateDashboardGrid();
  };
  
  window.deepOpenTestById = function(id) {
    window.DEEP_CORE.openTest(id);
  };

  window.deepRenderCatalog = function(containerId) {
    if (window.DEEP_UI) window.DEEP_UI.renderDashboardShell(containerId);
    window.DEEP_CORE.init();
    if (window.DEEP_UI) window.DEEP_UI.updateDashboardGrid();
    if (typeof window.deepSidebarRefresh === "function") window.deepSidebarRefresh();
  };

})();
