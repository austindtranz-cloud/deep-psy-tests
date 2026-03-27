/* ═══════════════════════════════════════════
   DEEP PSY TESTS — UI CONTROLLER
   All DOM manipulations, screen rendering, and animations.
   ═══════════════════════════════════════════ */
(function () {
  "use strict";

  /* ── SVG Icons Registry ── */
  var ICONS = {
    questions: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    time:      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    save:      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 0 0 1 2-2h11l5 5v11a2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>',
    check:     '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" fill="var(--dt-success-bg)" stroke="var(--dt-success)" stroke-width="1.2"/><path d="M6 9.2L8.2 11.4L12.2 7" stroke="var(--dt-success)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    wip:       '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" fill="var(--dt-warning-bg)" stroke="var(--dt-warning)" stroke-width="1.2"/><path d="M9 6V9.5L11 11" stroke="var(--dt-warning)" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    burger:    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="18" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    close:     '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    search:    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    chevron:   '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>'
  };

  window.DEEP_UI = {
    overlay: null,
    app:     null,
    
    /* Category color gradients for card image headers */
    CAT_COLORS: {
      personality:      { from: '#2D1B4E', to: '#4A2868' },
      mental_functions: { from: '#1E3340', to: '#2A4A55' },
      adaptation:       { from: '#1D3D2E', to: '#2B5A42' },
      psychiatry:       { from: '#3D1B2A', to: '#5C2840' },
      relationships:    { from: '#4E2D1B', to: '#6B4028' },
      career:           { from: '#2B2D1B', to: '#464A2D' },
      team:             { from: '#361B3D', to: '#502855' },
      organization:     { from: '#1B3535', to: '#2A5050' },
      psychoanalytic:   { from: '#4E3A1B', to: '#6B5028' },
      therapy_efficacy: { from: '#2E3D1B', to: '#455A2A' },
      _default:         { from: '#1E1E22', to: '#2A2A30' }
    },

    getCatColor: function(catId) {
      return this.CAT_COLORS[catId] || this.CAT_COLORS._default;
    },

    TEMPLATES: {
      /* Test Card Component — Matilda Hybrid (image-on-top, dark theme) */
      testCard: function(test, statusHtml, badge) {
        var items = test.items || "?";
        var time = test.time ? (String(test.time).toLowerCase().indexOf("мин") !== -1 ? test.time : (test.time + " мин.")) : "15 мин.";
        var colors = window.DEEP_UI.getCatColor(test.categoryId || "");
        var catIcon = window.DEEP_UI.CAT_ICONS[test.categoryId] || "";
        
        /* Info badge "i" button only (tooltip rendered as global portal) */
        var infoBadgeBtn = "";
        if (test.replacement) {
          var tooltipData = [
            test.authors ? 'Авторы: ' + test.authors : '',
            test.marketingTitle ? 'Название: ' + test.marketingTitle : '',
            test.titleEn ? 'EN: ' + test.titleEn : '',
            'Аналог: ' + test.replacement
          ].filter(Boolean).join('|||');
          infoBadgeBtn = '<div class="deep-card-info-badge" tabindex="0" aria-label="Информация" data-tooltip="' + tooltipData.replace(/"/g, '&quot;') + '"><span>i</span></div>';
        }
        
        return `
          <div class="deep-tests-card" data-action="open-test" data-id="${test.id}">
            ${statusHtml}
            <div class="deep-tests-card-image" style="background: linear-gradient(135deg, ${colors.from}, ${colors.to})">
              <div class="deep-tests-card-image-icon">${catIcon}</div>
              <div class="deep-tests-card-image-label">${test.shortTitle || test.id.toUpperCase()}</div>
              ${infoBadgeBtn}
            </div>
            <div class="deep-tests-card-content">
              <h3 class="deep-tests-card-title">${test.title}</h3>
              <div class="deep-tests-card-text">${test.measures || ""}</div>
              <div class="deep-tests-card-meta">
                <span class="deep-tests-pill ${badge.c}">${badge.t}</span>
                <span class="deep-tests-pill--muted">${items} вопр.</span>
                <span class="deep-tests-pill--muted">~${time}</span>
              </div>
            </div>
          </div>
        `;
      },

      /* Category Card Component — Matilda Hybrid (image-on-top, dark theme) */
      catCard: function(cat, count) {
        var icon = window.DEEP_UI.CAT_ICONS[cat.categoryId] || "📋";
        var colors = window.DEEP_UI.getCatColor(cat.categoryId);
        return `
          <div class="deep-dash-cat-card" data-action="open-category" data-id="${cat.categoryId}">
            <div class="deep-dash-cat-image" style="background: linear-gradient(135deg, ${colors.from}, ${colors.to})">
              <div class="deep-dash-cat-image-icon">${icon}</div>
              <div class="deep-dash-cat-image-count">${count} инструментов</div>
            </div>
            <div class="deep-dash-cat-info">
              <h3 class="deep-dash-cat-name">${cat.categoryTitle}</h3>
              <p class="deep-dash-cat-desc">${cat.categoryDescription || ""}</p>
            </div>
          </div>
        `;
      },

      /* Folder Card Prototype (Archived) */
      // Removed from active JS for clean code v16.1


      /* Score Card Component (Restored Premium) */
      scoreCard: function(title, score, max, colorClass, label, pct) {
        return `
          <div class="deep-tests-score-card ${colorClass}">
            <div class="deep-tests-score-header">
              <div class="deep-tests-score-title">${title}</div>
              <div class="deep-tests-score-value">${score} / ${max}</div>
            </div>
            <div class="deep-tests-score-bar"><div class="progress-bar"><span style="width:0%"></span></div></div>
            <div class="deep-tests-score-footer">${label}</div>
          </div>
        `;
      },

      /* Result Screen Wrapper */
      resultScreen: function(title, summary, cardsHtml) {
        return `
          <div class="deep-tests-screen">
            <div class="deep-tests-scroll">
              <div class="quiz-result-header">
                <div class="deep-page-kicker">Результаты</div>
                <h2 class="deep-page-title">${title}</h2>
                <div class="quiz-result-summary">${summary}</div>
              </div>
              <div class="quiz-results-grid">${cardsHtml}</div>
              <div id="quiz-result-cta"></div>
              <div id="quiz-result-next"></div>
              <div id="quiz-result-form"></div>
              <div class="quiz-footer">
                <button class="deep-btn deep-btn--primary" onclick="window.DEEP_UI.closeModal()">Завершить</button>
              </div>
            </div>
          </div>
        `;
      },

      /* Quiz Start Screen */
      startScreen: function(test, qLen, estTime, scaleNames, hasProgress) {
        var actionBtn = hasProgress ? 
          `<div class="btn-group">
            <button class="deep-btn deep-btn--primary" data-action="resume-test" style="flex:2">Продолжить</button>
            <button class="deep-btn deep-btn--outline" data-action="restart-test" style="flex:1">Заново</button>
          </div>` :
          `<button class="deep-btn deep-btn--primary full-width" data-action="start-test">Начать тест</button>`;

        return `
          <div class="deep-tests-screen">
            <div class="deep-tests-scroll">
              <div class="quiz-intro">
                <div class="deep-page-kicker">Тест</div>
                <h1 class="deep-page-title">${test.title}</h1>
                <p class="deep-page-subtitle">${test.description}</p>
                <div class="quiz-meta-row">
                   <div class="quiz-meta-item">${ICONS.questions} <span>${qLen} вопросов</span></div>
                   <div class="quiz-meta-item">${ICONS.time} <span>~${estTime} мин.</span></div>
                </div>
                ${scaleNames ? `<div class="quiz-scales"><span>Оценивает:</span> ${scaleNames}</div>` : ""}
                <div class="quiz-actions">${actionBtn}</div>
              </div>
            </div>
          </div>
        `;
      },

      /* Score Card for Results */
      scoreCard: function(title, val, max, color, label, pct) {
        return `
          <div class="deep-tests-score-card">
            <div class="deep-tests-score-head">
              <span class="deep-tests-score-title">${title}</span>
              <span class="deep-tests-score-value score-${color}">${val} <span>/ ${max}</span></span>
            </div>
            <div class="progress-bar"><span style="width:${pct}%" class="bar-${color}"></span></div>
            <span class="deep-tests-status status-${color}">${label}</span>
          </div>
        `;
      },

      /* Result Screen Wrapper */
      resultScreen: function(title, summary, cardsHtml) {
        return `
          <div class="deep-tests-screen">
            <div class="deep-tests-scroll">
              <div class="quiz-intro">
                <div class="deep-page-kicker">Результат</div>
                <h2 class="deep-page-title">${title}</h2>
                <div class="quiz-summary"><strong>Заключение:</strong> ${summary}</div>
              </div>
              <div class="deep-tests-score-grid">${cardsHtml}</div>
              <div class="quiz-disclaimer">Результаты носят ориентировочный характер и не являются клиническим диагнозом.</div>
              <div id="quiz-result-cta"></div>
              <div id="quiz-result-next"></div>
              <div id="quiz-result-form"></div>
              <div class="quiz-footer">
                <button class="deep-btn deep-btn--outline" data-action="restart-test">Пройти заново</button>
              </div>
            </div>
          </div>
        `;
      }
    },

    init: function() {
      this.overlay = document.getElementById("deep-tests-overlay");
      this.app = document.getElementById("deep-tests-app");
    },

    /* ── Catalog Shell Rendering ── */
    renderDashboardShell: function(containerId) {
      var container = document.getElementById(containerId);
      if (!container) return;

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

      /* ── Global event delegation (once) ── */
      this._attachGlobalDelegation(container);
    },

    /* One-time event delegation: tabs, burger, data-action clicks */
    _attachGlobalDelegation: function(container) {
      if (container.dataset.delegated) return;
      container.dataset.delegated = 'true';
      var self = this;

      // Delegated data-action clicks (open-test, open-category, random-test)
      container.addEventListener('click', function(e) {
        // Ignore clicks on info badge
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

      // Delegated tab clicks (no exponential growth)
      container.addEventListener('click', function(e) {
        var tab = e.target.closest('[data-tab]');
        if (!tab) return;
        if (window.DEEP_ROUTER) {
          window.DEEP_ROUTER.state.mode = tab.getAttribute('data-tab');
          self.updateDashboardGrid();
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

      // ── Global Tooltip Portal ──
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
          // Only hide if we are truly leaving the badge
          var related = e.relatedTarget;
          if (!related || !badge.contains(related)) {
            tooltipEl.style.display = 'none';
          }
        }
      });

      // ── Letter Section Click → Alphabet Quick-Picker ──
      container.addEventListener('click', function(e) {
        var letterEl = e.target.closest('.deep-alpha-section-letter');
        if (!letterEl) return;
        e.stopPropagation(); // Prevent immediate close
        
        // Create popup with all available letters
        var allLetters = container.querySelectorAll('.deep-alpha-section-letter');
        var letters = [];
        allLetters.forEach(function(el) { letters.push(el.textContent.trim()); });
        if (!letters.length) return;

        // Remove existing picker if any
        var existing = document.querySelector('.deep-letter-popup');
        if (existing) existing.remove();

        var popup = document.createElement('div');
        popup.className = 'deep-letter-popup';
        popup.innerHTML = '<div class="deep-letter-popup-inner">' +
          letters.map(function(l) {
            return '<a class="deep-letter-popup-item" href="#alpha-' + l + '">' + l + '</a>';
          }).join('') + '</div>';
        
        // Position near the clicked letter
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

        // Close on outside click (delay to avoid immediate close)
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

    renderDashboardNav: function(reg, activeCatId) {
      var nav = document.getElementById("deep-dash-nav-area");
      if (!nav) return;

      // Short labels for sidebar to avoid text overflow
      var SHORT_TITLES = {
        'Исследование личности': 'Личность',
        'Психические функции': 'Когнитивика',
        'Адаптация и дезадаптация': 'Адаптация',
        'Межличностные отношения и сексуальность': 'Отношения',
        'Индивидуальное карьерное консультирование': 'Карьера',
        'Командное консультирование': 'Команда',
        'Организационное консультирование': 'Организация',
        'Психоаналитическая диагностика': 'Психоанализ',
        'Оценка эффективности терапии': 'Эффективность'
      };

      var html = `
        <div class="deep-dash-nav-header">
          <div class="deep-dash-logo">DEEP<span>Tests</span></div>
        </div>
        <div class="deep-dash-nav-scroll">
          <div class="deep-dash-nav-home ${!activeCatId ? "active" : ""}" data-nav="home">Каталог</div>
      `;

      for (var cId in reg) {
        var cat = reg[cId];
        var iconName = this.CAT_ICONS[cId] || "📋";
        var isExpanded = (activeCatId === cId);
        var shortLabel = SHORT_TITLES[cat.categoryTitle] || cat.categoryTitle;
        
        var totalTests = 0;
        cat.subcategories.forEach(s => totalTests += s.tests.length);
        
        html += `
          <div class="deep-dash-nav-group ${isExpanded ? "expanded" : ""}" data-cat="${cId}">
            <div class="deep-dash-nav-item ${activeCatId === cId ? "active" : ""}" data-nav="${cId}">
              <span class="deep-dash-nav-emoji">${iconName}</span>
              <span class="deep-dash-nav-label">${shortLabel}</span>
              <span class="deep-dash-nav-count">${totalTests}</span>
              <span class="deep-dash-nav-chevron">${ICONS.chevron || "▼"}</span>
            </div>
            <div class="deep-dash-nav-sub">
              <div class="deep-dash-nav-sub-inner">
                ${cat.subcategories.map(sub => `
                  <div class="deep-dash-nav-sub-item ${activeCatId === cId && window.DEEP_ROUTER.state.activeSubId === sub.subId ? "active" : ""}" 
                       onclick="event.stopPropagation(); window.DEEP_ROUTER.navigate('${cId}', '${sub.subId}'); var np=document.getElementById('deep-dash-nav-area'), mo=document.getElementById('deep-dash-overlay'); if(np) np.classList.remove('open'); if(mo) mo.classList.remove('open');">
                    ${sub.subTitle} <span>(${sub.tests.length})</span>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        `;
      }

      html += '</div>';
      nav.innerHTML = html;
      
      // Attach sidebar clicks — exclusive accordion + navigate WITHOUT re-rendering nav
      nav.querySelectorAll('.deep-dash-nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
          e.stopPropagation();
          var group = this.closest('.deep-dash-nav-group');
          var wasOpen = group && group.classList.contains('expanded');
          
          // Close ALL other groups (exclusive accordion)
          nav.querySelectorAll('.deep-dash-nav-group.expanded').forEach(g => {
            if (g !== group) {
              g.classList.remove('expanded');
              var gItem = g.querySelector('.deep-dash-nav-item');
              if (gItem) gItem.classList.remove('active');
            }
          });
          
          // Toggle clicked group
          if (group) group.classList.toggle('expanded');
          
          // Set active state on this item
          nav.querySelectorAll('.deep-dash-nav-item.active').forEach(a => a.classList.remove('active'));
          if (!wasOpen) this.classList.add('active');
          
          // Update content area without re-rendering nav
          var catId = this.getAttribute('data-nav');
          if (catId && window.DEEP_ROUTER) {
            if (wasOpen) {
              // Collapsing — go to home
              window.DEEP_ROUTER.state.activeCategoryId = null;
              window.DEEP_ROUTER.state.activeSubId = null;
              window.DEEP_CATEGORY_DATA = null;
              // Activate home
              var homeEl = nav.querySelector('.deep-dash-nav-home');
              if (homeEl) homeEl.classList.add('active');
            } else {
              // Expanding — go to this category
              window.DEEP_ROUTER.state.activeCategoryId = catId;
              window.DEEP_ROUTER.state.activeSubId = null;
              window.DEEP_CATEGORY_DATA = window.DEEP_MASTER_REGISTRY[catId] || null;
              // Deactivate home
              var homeEl = nav.querySelector('.deep-dash-nav-home');
              if (homeEl) homeEl.classList.remove('active');
            }
            window.DEEP_ROUTER.state.searchQuery = '';
            window.DEEP_ROUTER.state.mode = 'categories';
            window.DEEP_ROUTER.syncURL();
            window.scrollTo(0, 0);
            // Update ONLY content (header + grid), NOT nav
            DEEP_UI._updateContentOnly();
          }
        });
      });

      // Home button navigates + closes burger
      var homeBtn = nav.querySelector('.deep-dash-nav-home');
      if (homeBtn) {
        homeBtn.addEventListener('click', function() {
          if (window.DEEP_ROUTER) window.DEEP_ROUTER.navigate(null);
          // Close mobile menu
          var np = document.getElementById('deep-dash-nav-area');
          var mo = document.getElementById('deep-dash-overlay');
          if (np) np.classList.remove('open');
          if (mo) mo.classList.remove('open');
        });
      }

      // Sub-item clicks navigate + close burger (defined inline via onclick in template)      
    },

    /* Category Metadata for Dashboard */
    CAT_ICONS: {
      personality:      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
      mental_functions: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-2-4-2.5c-.5.5-2 1-4 2.5s-3 3.5-3 5.5a7 7 0 0 0 7 7Z"/><path d="M12 2v4"/><path d="M4.2 4.2l2.8 2.8"/><path d="M19.8 4.2l-2.8 2.8"/></svg>',
      adaptation:       '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>',
      psychiatry:       '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
      relationships:    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
      career:           '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
      team:             '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
      organization:     '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>',
      psychoanalytic:   '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>',
      therapy_efficacy: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v1.5"/><path d="M12 19.5V21"/><path d="M3 12h1.5"/><path d="M19.5 12H21"/><path d="M5.6 5.6l1.1 1.1"/><path d="M17.3 17.3l1.1 1.1"/><path d="M5.6 18.4l1.1-1.1"/><path d="M17.3 6.7l1.1-1.1"/><path d="M12 8l-1.5 4 1.5 4 1.5-4z"/></svg>'
    },

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

    getStatusBadge: function(testId) {
      if (!window.DEEP_QUIZ) return "";
      var sess = window.DEEP_QUIZ.state.sessions[testId];
      if (sess && sess.mode === "result") return `<span class="deep-tests-card-status ok">${ICONS.check}</span>`;
      if (sess && (sess.mode === "quiz" || (sess.answers && Object.keys(sess.answers).length > 0))) return `<span class="deep-tests-card-status wip">${ICONS.wip}</span>`;
      return "";
    },

    buildCardHTML: function(test) {
      if (!test) return "";
      var status = test.legalStatus || "public";
      var badge = status.indexOf("proprietary") !== -1 ? { c: "deep-tests-pill--proprietary", t: "Закрытая" } :
                  status.indexOf("restricted") !== -1 ? { c: "deep-tests-pill--restricted", t: "Клиническая" } :
                  { c: "deep-tests-pill--public", t: "Открытая" };

      return this.TEMPLATES.testCard(test, this.getStatusBadge(test.id), badge);
    },

    /* Update only content area (header + grid), NOT sidebar nav.
       This is used by accordion clicks to preserve CSS transitions. */
    _updateContentOnly: function() {
      var reg = window.DEEP_MASTER_REGISTRY, router = window.DEEP_ROUTER;
      if (!reg || !router) return;

      var catId = router.state.activeCategoryId, query = (router.state.searchQuery || '').toLowerCase().trim();
      var headerEl = document.getElementById('deep-dash-header-area'), gridEl = document.getElementById('deep-dash-grid-area');
      if (!headerEl || !gridEl) return;

      var container = document.querySelector('.deep-dashboard'), isDedicatedPage = container && container.getAttribute('data-category-id');
      var title = catId && reg[catId] ? reg[catId].categoryTitle : 'Каталог тестов';
      var desc = catId && reg[catId] ? (reg[catId].categoryDescription || '') : 'Выберите категорию слева или воспользуйтесь поиском.';

      var breadHtml = '';
      if (!isDedicatedPage) {
        if (catId) {
          breadHtml = '<nav class="dash-breadcrumbs"><a href="#" data-nav="home">Все категории</a> <span class="sep">›</span> <span>' + title + '</span></nav>';
        } else {
          breadHtml = '<nav class="dash-breadcrumbs"><span>Библиотека инструментов</span></nav>';
        }
      }
      headerEl.innerHTML = breadHtml + '<h1 class="deep-page-title">' + title + '</h1><p class="deep-page-subtitle">' + desc + '</p>';

      var isAlpha = router.state.mode === 'alphabetical';
      var isKeywords = router.state.mode === 'keywords';
      this.syncUIStates(catId, isAlpha, isKeywords);
      if (isKeywords) {
        gridEl.innerHTML = this.renderKeywordsGrid(reg);
      } else if (isAlpha) {
        gridEl.innerHTML = this.renderAlphabeticalGrid(reg, query);
      } else {
        gridEl.innerHTML = (!catId && !query ? this.renderCategoryCards(reg) : this.renderTestGrid(reg, catId, query));
      }

      // Re-attach breadcrumb clicks
      headerEl.querySelectorAll('.dash-breadcrumbs a[data-nav]').forEach(a => {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          if (window.DEEP_ROUTER) window.DEEP_ROUTER.navigate(null);
        });
      });
    },

    updateDashboardGrid: function() {
      var reg = window.DEEP_MASTER_REGISTRY, router = window.DEEP_ROUTER;
      if (!reg || !router) return;

      var catId = router.state.activeCategoryId, query = (router.state.searchQuery || "").toLowerCase().trim();
      var isAlpha = router.state.mode === "alphabetical";
      
      // Ensure shell is ready
      if (!document.getElementById("deep-dash-nav-area")) {
        this.renderDashboardShell('deep-categories-container');
      }

      var headerEl = document.getElementById("deep-dash-header-area"), gridEl = document.getElementById("deep-dash-grid-area");
      if (!headerEl || !gridEl) return;

      // Render Sidebar
      this.renderDashboardNav(reg, catId);

      var container = document.querySelector(".deep-dashboard"), isDedicatedPage = container && container.getAttribute("data-category-id");
      var title = catId && reg[catId] ? reg[catId].categoryTitle : "Каталог тестов";
      var desc = catId && reg[catId] ? (reg[catId].categoryDescription || "") : "Выберите категорию слева или воспользуйтесь поиском.";

      var breadHtml = "";
      if (!isDedicatedPage) {
        if (catId) {
          breadHtml = `<nav class="dash-breadcrumbs"><a href="#" data-nav="home">Все категории</a> <span class="sep">›</span> <span>${title}</span></nav>`;
        } else {
          breadHtml = `<nav class="dash-breadcrumbs"><span>Библиотека инструментов</span></nav>`;
        }
      }
      
      headerEl.innerHTML = `${breadHtml}<h1 class="deep-page-title">${title}</h1><p class="deep-page-subtitle">${desc}</p>`;

      var isKeywords = router.state.mode === "keywords";
      this.syncUIStates(catId, isAlpha, isKeywords);
      if (isKeywords) {
        gridEl.innerHTML = this.renderKeywordsGrid(reg);
      } else if (isAlpha) {
        gridEl.innerHTML = this.renderAlphabeticalGrid(reg, query);
      } else {
        gridEl.innerHTML = (!catId && !query ? this.renderCategoryCards(reg) : this.renderTestGrid(reg, catId, query));
      }

      // Attach search if not already attached with debounce
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

      // Breadcrumb clicks (headerEl is re-rendered so these are fresh)
      headerEl.querySelectorAll('.dash-breadcrumbs a[data-nav]').forEach(a => {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          if (window.DEEP_ROUTER) window.DEEP_ROUTER.navigate(a.getAttribute('data-nav'));
        });
      });

      // Note: mobile menu close is now handled by sub-item onclick, not here
    },

    syncUIStates: function(catId, isAlpha, isKeywords) {
      var activeMode = isKeywords ? 'keywords' : (isAlpha ? 'alphabetical' : 'categories');
      document.querySelectorAll('[data-tab]').forEach(el => el.classList.toggle("active", el.getAttribute("data-tab") === activeMode));
      document.querySelectorAll(".deep-dash-nav-item").forEach(el => {
        var navT = el.getAttribute("data-nav");
        el.classList.toggle("active", (navT === "home" && !catId) || navT === catId);
      });
    },

    renderCategoryCards: function(reg) {
      var html = '<div class="deep-dash-cat-grid">';
      for (var cId in reg) {
        var cat = reg[cId], count = 0;
        cat.subcategories.forEach(s => { count += s.tests.length; });
        html += this.TEMPLATES.catCard(cat, count);
      }
      return html + '</div>';
    },

    renderTestGrid: function(reg, catId, query) {
      var html = "", cats = catId ? [catId] : Object.keys(reg);
      var self = this;
      cats.forEach(c => {
        var data = reg[c]; if (!data) return;
        data.subcategories.forEach((sub, idx) => {
          var filtered = sub.tests.filter(t => !query || t.title.toLowerCase().indexOf(query) !== -1 || (t.measures || "").toLowerCase().indexOf(query) !== -1);
          if (!filtered.length) return;
          html += `<div class="deep-subcategory" id="sub-${sub.subId}"><h2>${sub.subTitle}</h2><div class="deep-tests-grid">${filtered.map(t => { t.categoryId = c; return self.buildCardHTML(t); }).join("")}</div></div>`;
        });
      });
      return html || '<div class="deep-tests-note">Ничего не найдено.</div>';
    },

    /* ── Alphabetical (А-Я) List ── */
    renderAlphabeticalGrid: function(reg, query) {
      var allTests = [];
      for (var cId in reg) {
        var cat = reg[cId];
        cat.subcategories.forEach(function(sub) {
          sub.tests.forEach(function(t) {
            t.categoryId = cId;
            t._catTitle = cat.categoryTitle;
            if (!query || t.title.toLowerCase().indexOf(query) !== -1 || (t.measures || "").toLowerCase().indexOf(query) !== -1) {
              allTests.push(t);
            }
          });
        });
      }
      
      allTests.sort(function(a, b) { return a.title.localeCompare(b.title, 'ru'); });
      
      var groups = {};
      allTests.forEach(function(t) {
        var letter = t.title.charAt(0).toUpperCase();
        if (!groups[letter]) groups[letter] = [];
        groups[letter].push(t);
      });
      
      var letters = Object.keys(groups).sort(function(a, b) { return a.localeCompare(b, 'ru'); });
      if (!letters.length) return '<div class="deep-tests-note">Ничего не найдено.</div>';
      
      // Compact alphabet picker bar
      var pickerHtml = '<div class="deep-alpha-picker">' + letters.map(function(l) {
        return '<a class="deep-alpha-pick" href="#alpha-' + l + '" onclick="event.preventDefault();var el=document.getElementById(\'alpha-' + l + '\');if(el)el.scrollIntoView({behavior:\'smooth\',block:\'start\'})">' + l + '</a>';
      }).join('') + '</div>';
      
      // Simple list rows grouped by letter
      var listHtml = letters.map(function(l) {
        var rows = groups[l].map(function(t) {
          var cats = window.DEEP_UI.getCatColor(t.categoryId);
          var items = t.items || '?';
          var time = t.time || '';
          return '<div class="deep-alpha-row" data-action="open-test" data-id="' + t.id + '">' +
            '<div class="deep-alpha-row-dot" style="background: ' + cats.from + '"></div>' +
            '<div class="deep-alpha-row-body">' +
              '<div class="deep-alpha-row-title">' + t.title + '</div>' +
              '<div class="deep-alpha-row-meta">' + (t._catTitle || '') + ' · ' + items + ' вопр. · ' + time + '</div>' +
            '</div>' +
          '</div>';
        }).join('');
        return '<div class="deep-alpha-section" id="alpha-' + l + '">' +
          '<div class="deep-alpha-section-letter">' + l + '</div>' +
          '<div class="deep-alpha-section-list">' + rows + '</div>' +
        '</div>';
      }).join('');
      
      return pickerHtml + listHtml;
    },

    /* ── Keywords / Tags — 3-column grid, accordion, short keywords ── */
    renderKeywordsGrid: function(reg) {
      var self = this;
      var tagMap = {};
      for (var cId in reg) {
        var cat = reg[cId];
        cat.subcategories.forEach(function(sub) {
          sub.tests.forEach(function(t) {
            t.categoryId = cId;
            var words = [];
            // Extract short keywords only
            if (t.measures) {
              t.measures.split(/[,;:·→+\/]/).forEach(function(w) {
                w = w.trim();
                // Only keep short, keyword-like items (2-20 chars)
                if (w.length > 2 && w.length <= 22) words.push(w);
              });
            }
            // Add subcategory name as keyword
            if (sub.subTitle && sub.subTitle.length <= 25) words.push(sub.subTitle);
            
            words.forEach(function(tag) {
              tag = tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
              if (!tagMap[tag]) tagMap[tag] = [];
              if (!tagMap[tag].find(function(x) { return x.id === t.id; })) {
                tagMap[tag].push(t);
              }
            });
          });
        });
      }
      
      // Sort alphabetically
      var sortedTags = Object.keys(tagMap).sort(function(a, b) { return a.localeCompare(b, 'ru'); });
      
      // Build 3-column grid with accordion + letter dividers
      var html = '<div class="deep-tags-grid">';
      var currentLetter = '';
      sortedTags.forEach(function(tag, idx) {
        var tests = tagMap[tag];
        
        // Letter divider when first character changes
        // Group digits under '#'
        var firstChar = tag.charAt(0).toUpperCase();
        var groupKey = /\d/.test(firstChar) ? '#' : firstChar;
        if (groupKey !== currentLetter) {
          currentLetter = groupKey;
          html += '<div class="deep-tags-letter-divider">' + currentLetter + '</div>';
        }
        
        var testRows = tests.map(function(t) {
          var cats = self.getCatColor(t.categoryId);
          return '<div class="deep-alpha-row" data-action="open-test" data-id="' + t.id + '">' +
            '<div class="deep-alpha-row-dot" style="background:' + cats.from + '"></div>' +
            '<div class="deep-alpha-row-body">' +
              '<div class="deep-alpha-row-title">' + t.title + '</div>' +
              '<div class="deep-alpha-row-meta">' + (t.items || '?') + ' вопр. · ' + (t.time || '') + '</div>' +
            '</div>' +
          '</div>';
        }).join('');
        
        html += '<div class="deep-tag-cell" data-tag-idx="' + idx + '">' +
          '<button class="deep-tag-btn" data-tag-idx="' + idx + '">' +
            '<span class="deep-tag-btn-name">' + tag + '</span>' +
            '<span class="deep-tag-btn-count">' + tests.length + '</span>' +
          '</button>' +
        '</div>';
        
        // Hidden expanded panel (will be teleported via JS)
        html += '<div class="deep-tag-expand" data-expand-idx="' + idx + '" style="display:none">' +
          '<div class="deep-tag-expand-title">' + tag + ' <span>(' + tests.length + ')</span></div>' +
          testRows +
        '</div>';
      });
      html += '</div>';
      
      // Accordion logic via setTimeout
      setTimeout(function() {
        var grid = document.querySelector('.deep-tags-grid');
        if (!grid) return;
        grid.addEventListener('click', function(e) {
          var btn = e.target.closest('.deep-tag-btn');
          if (!btn) return;
          e.preventDefault();
          var idx = btn.getAttribute('data-tag-idx');
          var cell = btn.closest('.deep-tag-cell');
          var expand = grid.querySelector('[data-expand-idx="' + idx + '"]');
          if (!cell || !expand) return;
          
          var isOpen = cell.classList.contains('active');
          
          // Close all other expanded panels (accordion)
          grid.querySelectorAll('.deep-tag-cell.active').forEach(function(c) { c.classList.remove('active'); });
          grid.querySelectorAll('.deep-tag-expand').forEach(function(ex) { ex.style.display = 'none'; });
          
          if (!isOpen) {
            cell.classList.add('active');
            // Insert expand panel right after the cell
            cell.after(expand);
            expand.style.display = 'block';
          }
        });
      }, 30);
      
      return html;
    },

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
      var self = this;
      this.app.innerHTML = `<div class="deep-tests-screen"><div id="interactive-container" class="deep-tests-scroll"></div></div>`;
      var container = document.getElementById("interactive-container");
      
      // Look for a custom component in the test data or a global registry
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
      var realQs = test.questions ? test.questions.filter(q => !q.isIntro).length : 0;
      var estTime = test.estimatedMinutes || Math.max(1, Math.ceil(realQs * 0.75));
      var scaleNames = test.scales ? Object.keys(test.scales).map(k => test.scales[k].title).join("  •  ") : "";
      this.app.innerHTML = this.TEMPLATES.startScreen(test, realQs || "?", estTime || "?", scaleNames, Object.keys(session.answers || {}).length > 0);
    },

    renderQuiz: function(test, session) {
      var q = test.questions[session.currentIndex];
      var total = test.questions.filter(x => !x.isIntro).length;
      var current = test.questions.slice(0, session.currentIndex + 1).filter(x => !x.isIntro).length;
      var progress = Math.round((current / (total || 1)) * 100);
      
      var content = q.isIntro ? 
        `<div class="quiz-step-intro">
          <div class="quiz-progress-wrap"><div class="progress-bar"><span style="width:${progress}%"></span></div></div>
          <div class="intro-content">
            ${q.title ? `<h2 class="intro-title">${q.title}</h2>` : ""}
            <div class="intro-text">${q.text}</div>
          </div>
          <div class="quiz-footer">
            <button class="deep-btn deep-btn--outline" data-action="${session.currentIndex > 0 ? "back" : "back-to-start"}">${session.currentIndex > 0 ? "Назад" : "К началу"}</button>
            <button class="deep-btn deep-btn--primary" data-action="next">${q.buttonText || "Продолжить"}</button>
          </div>
        </div>` :
        `<div class="quiz-step-question">
          <div class="quiz-header">
            <div class="quiz-counter">Вопрос ${current} из ${total}</div>
            <div class="quiz-progress-wrap"><div class="progress-bar"><span style="width:${progress}%"></span></div></div>
            ${test.intro ? `<div class="quiz-hint">${test.intro}</div>` : ""}
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
          <div class="quiz-footer">
            <button class="deep-btn deep-btn--outline" data-action="${session.currentIndex > 0 ? "back" : "back-to-start"}">${session.currentIndex > 0 ? "Назад" : "К началу"}</button>
            ${session.answers[q.id] !== undefined ? `<button class="deep-btn deep-btn--primary" data-action="next">${session.currentIndex < test.questions.length - 1 ? "Далее" : "Завершить"}</button>` : ""}
          </div>
        </div>`;
      this.app.innerHTML = `<div class="deep-tests-screen"><div class="deep-tests-scroll">${content}</div></div>`;
    },

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
