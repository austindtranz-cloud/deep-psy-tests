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

      if (action === "start-test" || action === "restart-test") {
        session = window.DEEP_QUIZ.resetSession(testId);
        window.DEEP_QUIZ.advanceQuiz(session);
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
  };

})();
