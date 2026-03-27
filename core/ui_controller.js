/* ═══════════════════════════════════════════
   DEEP PSY TESTS — UI CONTROLLER (Core)
   Инициализация, shell, event delegation,
   quiz screens, overlay/modal.
   Зависит от: DEEP_TPL, DEEP_NAV, DEEP_GRID
   ═══════════════════════════════════════════ */
(function () {
  "use strict";

  window.DEEP_UI = {
    overlay: null,
    app:     null,

    init: function() {
      this.overlay = document.getElementById("deep-tests-overlay");
      this.app = document.getElementById("deep-tests-app");
    },

    /* ── Catalog Shell ── */
    renderDashboardShell: function(containerId) {
      var container = document.getElementById(containerId);
      if (!container) return;
      var ICONS = window.DEEP_TPL.ICONS;

      container.classList.add("deep-dashboard-mode"); 
      container.innerHTML = `
        <div class="deep-dashboard">
          <button class="deep-dash-burger" id="deep-dash-burger" aria-label="Меню">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <div class="deep-dash-overlay" id="deep-dash-overlay"></div>
          <aside class="deep-dash-nav" id="deep-dash-nav-area"></aside>
          <main class="deep-dash-content">
            <header id="deep-dash-header-area" class="deep-dash-header"></header>
            <div class="deep-dash-toolbar">
              <div class="deep-dash-search-wrap">
                ${ICONS.search}
                <input type="text" id="deep-dash-search-input" class="deep-dash-search" placeholder="Поиск инструментов..." autocomplete="off">
              </div>
              <div class="deep-dash-tabs">
                <button class="deep-dash-tab active" data-tab="categories">Категории</button>
                <button class="deep-dash-tab" data-tab="alphabetical">А — Я</button>
                <button class="deep-dash-tab" data-tab="keywords">Теги</button>
              </div>
              <div class="deep-dash-actions">
                <button class="deep-dash-btn-random" data-action="random-test">Случайный тест</button>
              </div>
            </div>
            <div id="deep-dash-grid-area" class="deep-dash-grid"></div>
          </main>
        </div>
      `;

      this._attachGlobalDelegation(container);
    },

    /* ── Global Event Delegation (once per shell) ── */
    _attachGlobalDelegation: function(container) {
      if (container.dataset.delegated) return;
      container.dataset.delegated = 'true';

      // data-action clicks (open-test, open-category, random-test)
      container.addEventListener('click', function(e) {
        if (e.target.closest('[data-tooltip]')) return;
        var btn = e.target.closest('[data-action]');
        if (!btn) return;
        var action = btn.getAttribute('data-action');
        if (action === 'open-test') {
          if (window.DEEP_CORE) window.DEEP_CORE.openTest(btn.getAttribute('data-id'));
        } else if (action === 'open-category') {
          if (window.DEEP_ROUTER) window.DEEP_ROUTER.navigate(btn.getAttribute('data-id'));
        } else if (action === 'random-test') {
          if (window.DEEP_CORE) window.DEEP_CORE.openRandomTest();
        }
      });

      // Tab clicks
      container.addEventListener('click', function(e) {
        var tab = e.target.closest('[data-tab]');
        if (!tab) return;
        if (window.DEEP_ROUTER) {
          window.DEEP_ROUTER.state.mode = tab.getAttribute('data-tab');
          window.DEEP_UI.updateDashboardGrid();
        }
      });

      // Burger menu
      var burger = document.getElementById('deep-dash-burger');
      var navPanel = document.getElementById('deep-dash-nav-area');
      var overlay = document.getElementById('deep-dash-overlay');
      if (burger && navPanel) {
        burger.addEventListener('click', function() {
          navPanel.classList.toggle('open');
          if (overlay) overlay.classList.toggle('open');
        });
        if (overlay) {
          overlay.addEventListener('click', function() {
            navPanel.classList.remove('open');
            overlay.classList.remove('open');
          });
        }
      }

      // Tooltip Portal
      var tooltipEl = document.createElement('div');
      tooltipEl.className = 'deep-tooltip-portal';
      tooltipEl.style.cssText = 'position:fixed;z-index:99999;display:none;pointer-events:none;';
      document.body.appendChild(tooltipEl);

      container.addEventListener('mouseover', function(e) {
        var badge = e.target.closest('[data-tooltip]');
        if (!badge) return;
        var raw = badge.getAttribute('data-tooltip');
        if (!raw) return;
        var rows = raw.split('|||').map(function(r) {
          return '<div class="deep-info-row">' + r + '</div>';
        }).join('');
        tooltipEl.innerHTML = '<div class="deep-tooltip-inner">' + rows + '</div>';
        tooltipEl.style.display = 'block';
        var rect = badge.getBoundingClientRect();
        var tipW = 260, tipH = tooltipEl.offsetHeight;
        var left = rect.left - tipW - 8;
        if (left < 8) left = rect.right + 8;
        var top = rect.top + rect.height / 2 - tipH / 2;
        if (top < 8) top = 8;
        if (top + tipH > window.innerHeight - 8) top = window.innerHeight - tipH - 8;
        tooltipEl.style.left = left + 'px';
        tooltipEl.style.top = top + 'px';
      });

      container.addEventListener('mouseout', function(e) {
        var badge = e.target.closest('[data-tooltip]');
        if (badge) {
          var related = e.relatedTarget;
          if (!related || !badge.contains(related)) {
            tooltipEl.style.display = 'none';
          }
        }
      });

      /* Скрываем тултип при скролле — предотвращает отрыв от триггера */
      window.addEventListener('scroll', function() {
        tooltipEl.style.display = 'none';
      }, { passive: true });

      // Letter Quick-Picker
      container.addEventListener('click', function(e) {
        var letterEl = e.target.closest('.deep-alpha-section-letter');
        if (!letterEl) return;
        e.stopPropagation();
        
        var allLetters = container.querySelectorAll('.deep-alpha-section-letter');
        var letters = [];
        allLetters.forEach(function(el) { letters.push(el.textContent.trim()); });
        if (!letters.length) return;

        var existing = document.querySelector('.deep-letter-popup');
        if (existing) existing.remove();

        var popup = document.createElement('div');
        popup.className = 'deep-letter-popup';
        popup.innerHTML = '<div class="deep-letter-popup-inner">' +
          letters.map(function(l) {
            return '<a class="deep-letter-popup-item" href="#alpha-' + l + '">' + l + '</a>';
          }).join('') + '</div>';
        
        var rect = letterEl.getBoundingClientRect();
        popup.style.cssText = 'position:fixed;z-index:99999;left:' + rect.left + 'px;top:' + (rect.bottom + 4) + 'px;';
        document.body.appendChild(popup);

        popup.addEventListener('click', function(ev) {
          var item = ev.target.closest('.deep-letter-popup-item');
          if (!item) return;
          ev.preventDefault();
          ev.stopPropagation();
          var target = document.getElementById('alpha-' + item.textContent.trim());
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          popup.remove();
        });

        setTimeout(function() {
          document.addEventListener('click', function closePopup(ev) {
            if (!popup.contains(ev.target) && ev.target !== letterEl) {
              popup.remove();
              document.removeEventListener('click', closePopup);
            }
          });
        }, 200);
      });
    },

    /* ── Overlay / Modal ── */
    openOverlay: function() {
      if (!this.overlay) return;
      this.overlay.style.display = "flex";
      this.overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    },

    closeModal: function() {
      if (!this.overlay) return;
      this.overlay.classList.remove("active");
      setTimeout(() => { this.overlay.style.display = "none"; }, 400);
      document.body.style.overflow = "";

      if (window.DEEP_ROUTER && window.DEEP_ROUTER.state.initialized) {
        this.updateDashboardGrid();
      }
      if (typeof window.deepSidebarRefresh === "function") window.deepSidebarRefresh();
    },

    /* ── Dashboard Grid Update (delegates to DEEP_GRID) ── */
    updateDashboardGrid: function() {
      if (!document.getElementById("deep-dash-nav-area")) {
        this.renderDashboardShell('deep-categories-container');
      }
      // Full update: nav + content
      if (window.DEEP_GRID) {
        window.DEEP_GRID.renderContent({ renderNav: true });
      }

      // Attach search (once)
      var searchInput = document.getElementById("deep-dash-search-input");
      if (searchInput && !searchInput.dataset.attached) {
        searchInput.dataset.attached = "true";
        var searchDebounceTimer;
        searchInput.addEventListener('input', (e) => {
          clearTimeout(searchDebounceTimer);
          searchDebounceTimer = setTimeout(() => {
            if (window.DEEP_ROUTER) {
              window.DEEP_ROUTER.state.searchQuery = e.target.value;
              this.updateDashboardGrid();
            }
          }, 200);
        });
      }
    },

    /* Content-only update (preserves nav accordion state) */
    _updateContentOnly: function() {
      if (window.DEEP_GRID) {
        window.DEEP_GRID.renderContent({ renderNav: false });
      }
    },

    /* ── Quiz Screen Rendering ── */
    renderScreen: function(test, session) {
      if (!test || !this.app) return;
      if (session.mode === "quiz") {
        if (test.type === "interactive") this.renderInteractive(test, session);
        else this.renderQuiz(test, session);
      } else if (session.mode === "result") {
        if (typeof window.deepTestsRenderResult === "function") window.deepTestsRenderResult(test, session, this.app, window.DEEP_TESTS || {});
      } else this.renderStart(test, session);
    },

    renderInteractive: function(test, session) {
      this.app.innerHTML = `<div class="deep-tests-screen"><div id="interactive-container" class="deep-tests-scroll"></div></div>`;
      var container = document.getElementById("interactive-container");
      var componentName = test.interactiveComponent || test.id;
      if (typeof window.DEEP_COMPONENTS !== "undefined" && window.DEEP_COMPONENTS[componentName]) {
        window.DEEP_COMPONENTS[componentName](container, test, session);
      } else if (test.renderInteractive) {
        test.renderInteractive(container, session);
      } else {
        container.innerHTML = `<div class="deep-tests-note">Интерактивный компонент "${componentName}" не найден.</div>`;
      }
    },

    renderStart: function(test, session) {
      var TPL = window.DEEP_TPL;
      var realQs = test.questions ? test.questions.filter(q => !q.isIntro).length : 0;
      var estTime = test.estimatedMinutes || Math.max(1, Math.ceil(realQs * 0.75));
      var scaleNames = test.scales ? Object.keys(test.scales).map(k => test.scales[k].title).join("  •  ") : "";
      this.app.innerHTML = TPL.TEMPLATES.startScreen(test, realQs || "?", estTime || "?", scaleNames, Object.keys(session.answers || {}).length > 0);
    },

    renderQuiz: function(test, session) {
      var q = test.questions[session.currentIndex];
      var total = test.questions.filter(x => !x.isIntro).length;
      var current = test.questions.slice(0, session.currentIndex + 1).filter(x => !x.isIntro).length;
      var progress = Math.round((current / (total || 1)) * 100);
      
      var content = q.isIntro ? 
        `<div class="deep-tests-step-wrap">
          <div class="deep-tests-progress"><span style="width:${progress}%"></span></div>
          <div class="intro-content">
            ${q.title ? `<h2 class="intro-title">${q.title}</h2>` : ""}
            <div class="intro-text">${q.text}</div>
          </div>
          <div class="deep-tests-bottom">
            <button class="deep-btn deep-btn--outline" data-action="${session.currentIndex > 0 ? "back" : "back-to-start"}">${session.currentIndex > 0 ? "Назад" : "К началу"}</button>
            <button class="deep-btn deep-btn--primary" data-action="next">${q.buttonText || "Продолжить"}</button>
          </div>
        </div>` :
        `<div class="deep-tests-step-wrap">
          <div class="deep-tests-quiz-top">
            <div class="deep-tests-counter">Вопрос ${current} из ${total}</div>
            <div class="deep-tests-progress"><span style="width:${progress}%"></span></div>
            ${test.intro ? `<div class="deep-tests-hint">${test.intro}</div>` : ""}
          </div>
          <div class="deep-tests-question">${q.text}</div>
          <div class="deep-tests-options">
            ${q.options.map((opt, idx) => {
              var isSel = (session.answers[q.id] === (opt.score !== undefined ? opt.score : (opt.value !== undefined ? opt.value : idx)));
              return `<button class="deep-tests-option ${isSel ? "is-selected" : ""}" data-action="answer" data-index="${idx}">
                <span class="row"><span class="check"></span><span class="text">${opt.text}</span></span>
              </button>`;
            }).join("")}
          </div>
          <div class="deep-tests-bottom">
            <button class="deep-btn deep-btn--outline" data-action="${session.currentIndex > 0 ? "back" : "back-to-start"}">${session.currentIndex > 0 ? "Назад" : "К началу"}</button>
            ${session.answers[q.id] !== undefined ? `<button class="deep-btn deep-btn--primary" data-action="next">${session.currentIndex < test.questions.length - 1 ? "Далее" : "Завершить"}</button>` : ""}
          </div>
        </div>`;
      this.app.innerHTML = `<div class="deep-tests-screen"><div class="deep-tests-scroll">${content}</div></div>`;
    },

    /* ── Sidebar helpers ── */
    toggleSidebar: function() {
      var sb = document.getElementById("deep-sidebar") || document.getElementById("deep-dash-sidebar");
      if (sb) sb.classList.toggle("is-open");
    },
    openSidebar: function() {
      var sb = document.getElementById("deep-sidebar") || document.getElementById("deep-dash-sidebar");
      if (sb) sb.classList.add("is-open");
    },
    closeSidebar: function() {
      var sb = document.getElementById("deep-sidebar") || document.getElementById("deep-dash-sidebar");
      if (sb) sb.classList.remove("is-open");
    }
  };
})();
