/* ═══════════════════════════════════════════
   DEEP PSY TESTS — QUIZ CORE
   Pure logic for managing test sessions and scores.
   ═══════════════════════════════════════════ */
(function () {
  "use strict";

  var STORAGE_KEY = "deep-tests-engine-v4";

  window.DEEP_QUIZ = {
    state: null,

    init: function () {
      this.state = this.loadState();
      console.log("DEEP QUIZ: Module Initialized");
    },

    getDefaultState: function () {
      return { activeTestId: null, sessions: {} };
    },

    getDefaultSession: function () {
      return { 
        mode: "start", 
        currentIndex: 0, 
        answers: {}, 
        completedAt: null, 
        sent: false 
      };
    },

    loadState: function () {
      try {
        var raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return this.getDefaultState();
        var p = JSON.parse(raw);
        return { 
          activeTestId: p.activeTestId || null, 
          sessions: p.sessions || {} 
        };
      } catch (e) { 
        return this.getDefaultState(); 
      }
    },

    saveState: function () {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {
        console.error("DEEP QUIZ: Failed to save state", e);
      }

      /* Event Bus: уведомляем все UI-модули об изменении состояния.
         Sidebar обновляет badge/список, grid обновляет статусы карточек.
         Интеграция из ветки Jules (deep-state-changed). */
      try {
        document.dispatchEvent(new CustomEvent("deep-state-changed", { detail: this.state }));
      } catch(e) {}
    },

    ensureSession: function (testId) {
      if (!this.state.sessions[testId]) {
        this.state.sessions[testId] = this.getDefaultSession();
      }
      return this.state.sessions[testId];
    },

    resetSession: function (testId) {
      this.state.sessions[testId] = this.getDefaultSession();
      this.saveState();
      return this.state.sessions[testId];
    },

    /**
     * Инкапсулированная запись ответа.
     * Единая точка мутации — вместо прямого session.answers[qId] = value
     * из внешних модулей. Автоматически сохраняет состояние.
     * @param {string} testId - ID теста
     * @param {string} qId   - ID вопроса
     * @param {*}      value - Значение ответа (score / value / index)
     */
    setAnswer: function (testId, qId, value) {
      var session = this.ensureSession(testId);
      session.answers[qId] = value;
      this.saveState();
    },

    _findTestInRegistry: function(testId) {
      if (!testId) return null;
      var testsReg = window.DEEP_TESTS || {};
      if (testsReg[testId]) return testsReg[testId];
      
      var reg = window.DEEP_MASTER_REGISTRY || {};
      for (var cId in reg) {
        var subcats = reg[cId].subcategories || [];
        for (var i = 0; i < subcats.length; i++) {
          var tests = subcats[i].tests || [];
          for (var j = 0; j < tests.length; j++) {
            if (tests[j].id === testId) return tests[j];
          }
        }
      }
      return null;
    },

    getActiveTest: function () {
      if (!this.state.activeTestId) return null;
      return this._findTestInRegistry(this.state.activeTestId);
    },

    setActiveTest: function (testId) {
      this.state.activeTestId = testId;
      this.ensureSession(testId);
      this.saveState();
    },

    advanceQuiz: function (session) {
      var test = this.getActiveTest();
      if (!test) return;

      var nextIdx = session.currentIndex + 1;
      while (nextIdx < test.questions.length && test.questions[nextIdx].isIntro) {
        nextIdx++;
      }

      if (nextIdx < test.questions.length) {
        session.currentIndex = nextIdx;
        session.mode = "quiz";
      } else {
        session.mode = "result";
        session.completedAt = new Date().toISOString();
      }
      this.saveState();
      return session;
    },

    completeInteractive: function (testId, performanceMetrics) {
      var session = this.ensureSession(testId);
      session.mode = "result";
      session.performance = performanceMetrics || {};
      session.completedAt = new Date().toISOString();
      this.saveState();
      
      // Update UI if on screen
      if (window.DEEP_UI) {
        var test = this._findTestInRegistry(testId);
        window.DEEP_UI.renderScreen(test, session);
      }
    },

    goBack: function (session) {
      if (session.currentIndex > 0) {
        session.currentIndex--;
        this.saveState();
        return true;
      }
      return false;
    },

    /* ── Lazy Loading Mechanism ── */
    loadTestData: function (testId) {
      var self = this;
      return new Promise(function (resolve, reject) {
        
        // If questions already exist or it's interactive, resolve immediately
        var existing = self._findTestInRegistry(testId);
        if (existing && (existing.questions || existing.interactive)) {
          return resolve(existing);
        }

        console.log("DEEP QUIZ: Loading full data for", testId);
        
        /* Compute baseUrl from the script that loaded us (works on CDN and local) */
        var baseUrl = "./";
        var scripts = document.querySelectorAll('script[src*="quiz_core"]');
        if (scripts.length) {
          var src = scripts[scripts.length - 1].src;
          baseUrl = src.substring(0, src.lastIndexOf("/core/") + 1);
        } else {
          // Fallback to absolute base if no script matches (e.g. loaded via blob or bundler)
          baseUrl = "https://austindtranz-cloud.github.io/deep-psy-tests/";
        }
        
        // Cache buster for test files to match Smart Loader cache behavior
        var currentHour = new Date().toISOString().slice(0, 13);
        var cacheBuster = "?v=" + currentHour;

        var script = document.createElement("script");
        script.src = baseUrl + "data/tests/" + testId + ".js" + cacheBuster;
        script.async = true;
        
        var timeout = setTimeout(function() {
          reject("Timeout loading test: " + testId);
          script.remove();
        }, 10000);

        script.onload = function() {
          clearTimeout(timeout);
          var loaded = self._findTestInRegistry(testId);
          if (loaded && (loaded.questions || loaded.interactive)) {
            resolve(loaded);
          } else {
            reject("Data loaded but requirements missing for " + testId);
          }
        };
        
        script.onerror = function() {
          clearTimeout(timeout);
          var retryReg = self._findTestInRegistry(testId);
          if (retryReg && (retryReg.questions || retryReg.interactive)) {
             resolve(retryReg);
          } else {
             reject("Failed to load test data for " + testId);
          }
        };
        
        document.head.appendChild(script);
      });
    }
  };
})();
