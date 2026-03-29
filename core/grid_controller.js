/* ═══════════════════════════════════════════
   DEEP PSY TESTS — GRID CONTROLLER
   Рендеринг контента: категории, тесты,
   алфавитный список, теги.
   Зависит от: DEEP_TPL, DEEP_NAV
   ═══════════════════════════════════════════ */
(function () {
  "use strict";

  window.DEEP_GRID = {

    /* ── Общая логика рендеринга контента ──
       Рендерит header (breadcrumbs + title) и grid.
       Параметр renderNav: если true — также перерендерить навбар. */
    renderContent: function(options) {
      var reg = window.DEEP_MASTER_REGISTRY, router = window.DEEP_ROUTER;
      if (!reg || !router) return;

      var catId = router.state.activeCategoryId;
      var query = (router.state.searchQuery || '').toLowerCase().trim();
      var headerEl = document.getElementById('deep-dash-header-area');
      var gridEl = document.getElementById('deep-dash-grid-area');
      if (!headerEl || !gridEl) return;

      // Навбар (только при полном обновлении)
      if (options && options.renderNav && window.DEEP_NAV) {
        window.DEEP_NAV.render(reg, catId);
      }

      // Header
      var container = document.querySelector('.deep-dashboard');
      var isDedicatedPage = container && container.getAttribute('data-category-id');
      var title = catId && reg[catId] ? reg[catId].categoryTitle : 'Каталог тестов';
      var desc  = catId && reg[catId] ? (reg[catId].categoryDescription || '') : 'Выберите категорию слева или воспользуйтесь поиском.';

      var breadHtml = '';
      if (!isDedicatedPage) {
        if (catId) {
          breadHtml = '<nav class="dash-breadcrumbs"><a href="#" data-nav="home">Все категории</a> <span class="sep">›</span> <span>' + title + '</span></nav>';
        } else {
          breadHtml = '<nav class="dash-breadcrumbs"><span>Библиотека инструментов</span></nav>';
        }
      }
      headerEl.innerHTML = breadHtml + '<h1 class="deep-page-title">' + title + '</h1><p class="deep-page-subtitle">' + desc + '</p>';

      // Grid
      var isAlpha = router.state.mode === 'alphabetical';
      var isKeywords = router.state.mode === 'keywords';
      this._syncTabs(catId, isAlpha, isKeywords);

      if (isKeywords) {
        gridEl.innerHTML = this.renderKeywordsGrid(reg);
      } else if (isAlpha) {
        gridEl.innerHTML = this.renderAlphabeticalGrid(reg, query);
      } else {
        gridEl.innerHTML = (!catId && !query ? this.renderCategoryCards(reg) : this.renderTestGrid(reg, catId, query));
      }

      // Breadcrumb clicks
      headerEl.querySelectorAll('.dash-breadcrumbs a[data-nav]').forEach(a => {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          if (window.DEEP_ROUTER) window.DEEP_ROUTER.navigate(a.getAttribute('data-nav'));
        });
      });
    },

    /* ── Sync tab active states ── */
    _syncTabs: function(catId, isAlpha, isKeywords) {
      var activeMode = isKeywords ? 'keywords' : (isAlpha ? 'alphabetical' : 'categories');
      document.querySelectorAll('[data-tab]').forEach(el => el.classList.toggle("active", el.getAttribute("data-tab") === activeMode));
      document.querySelectorAll(".deep-dash-nav-item").forEach(el => {
        var navT = el.getAttribute("data-nav");
        el.classList.toggle("active", (navT === "home" && !catId) || navT === catId);
      });
    },

    /* ── Category overview cards ── */
    renderCategoryCards: function(reg) {
      var TPL = window.DEEP_TPL.TEMPLATES;
      var html = '<div class="deep-dash-cat-grid">';
      for (var cId in reg) {
        var cat = reg[cId], count = 0;
        cat.subcategories.forEach(s => { count += s.tests.length; });
        html += TPL.catCard(cat, count);
      }
      return html + '</div>';
    },

    /* ── Test grid with subcategory sections ── */
    renderTestGrid: function(reg, catId, query) {
      var html = "", cats = catId ? [catId] : Object.keys(reg);
      var self = this;
      cats.forEach(c => {
        var data = reg[c]; if (!data) return;
        data.subcategories.forEach((sub) => {
          var filtered = sub.tests.filter(t => !query || t.title.toLowerCase().indexOf(query) !== -1 || (t.measures || "").toLowerCase().indexOf(query) !== -1);
          if (!filtered.length) return;
          html += `<div class="deep-subcategory" id="sub-${sub.subId}"><h2>${sub.subTitle}</h2><div class="deep-tests-grid">${filtered.map(t => { t.categoryId = c; return self._buildCard(t); }).join("")}</div></div>`;
        });
      });
      return html || '<div class="deep-tests-note">Ничего не найдено.</div>';
    },

    /* ── Alphabetical (А-Я) list ── */
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
      
      var pickerHtml = '<div class="deep-alpha-picker">' + letters.map(function(l) {
        return '<a class="deep-alpha-pick" href="#alpha-' + l + '" onclick="event.preventDefault();var el=document.getElementById(\'alpha-' + l + '\');if(el)el.scrollIntoView({behavior:\'smooth\',block:\'start\'})">' + l + '</a>';
      }).join('') + '</div>';
      
      var getCatColor = window.DEEP_TPL.getCatColor;
      var listHtml = letters.map(function(l) {
        var rows = groups[l].map(function(t) {
          var cats = getCatColor(t.categoryId);
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

    /* ── Keywords / Tags — 3-column grid with accordion ── */
    renderKeywordsGrid: function(reg) {
      var self = this;
      var getCatColor = window.DEEP_TPL.getCatColor;
      var tagMap = {};
      for (var cId in reg) {
        var cat = reg[cId];
        cat.subcategories.forEach(function(sub) {
          sub.tests.forEach(function(t) {
            t.categoryId = cId;
            var words = [];
            if (t.measures) {
              t.measures.split(/[,;:·→+\/]/).forEach(function(w) {
                w = w.trim();
                if (w.length > 2 && w.length <= 22) words.push(w);
              });
            }
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
      
      var sortedTags = Object.keys(tagMap).sort(function(a, b) { return a.localeCompare(b, 'ru'); });
      
      var html = '<div class="deep-tags-grid">';
      var currentLetter = '';
      sortedTags.forEach(function(tag, idx) {
        var tests = tagMap[tag];
        
        var firstChar = tag.charAt(0).toUpperCase();
        var groupKey = /\d/.test(firstChar) ? '#' : firstChar;
        if (groupKey !== currentLetter) {
          currentLetter = groupKey;
          html += '<div class="deep-tags-letter-divider">' + currentLetter + '</div>';
        }
        
        var testRows = tests.map(function(t) {
          var cats = getCatColor(t.categoryId);
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
        
        html += '<div class="deep-tag-expand" data-expand-idx="' + idx + '" style="display:none">' +
          '<div class="deep-tag-expand-title">' + tag + ' <span>(' + tests.length + ')</span></div>' +
          testRows +
        '</div>';
      });
      html += '</div>';
      
      // Tag accordion logic
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
          
          grid.querySelectorAll('.deep-tag-cell.active').forEach(function(c) { c.classList.remove('active'); });
          grid.querySelectorAll('.deep-tag-expand').forEach(function(ex) { ex.style.display = 'none'; });
          
          if (!isOpen) {
            cell.classList.add('active');
            cell.after(expand);
            expand.style.display = 'block';
          }
        });
      }, 30);
      
      return html;
    },

    /* ── Utility: build test card HTML ── */
    _buildCard: function(test) {
      if (!test) return "";
      var TPL = window.DEEP_TPL;
      var ICONS = TPL.ICONS;
      var status = test.legalStatus || "public";
      var badge = status.indexOf("proprietary") !== -1 ? { c: "deep-tests-pill--proprietary", t: "Закрытая" } :
                  status.indexOf("restricted") !== -1 ? { c: "deep-tests-pill--restricted", t: "Клиническая" } :
                  { c: "deep-tests-pill--public", t: "Открытая" };
      
      // Status badge (completed / in-progress)
      var statusHtml = "";
      if (window.DEEP_QUIZ) {
        var sess = window.DEEP_QUIZ.state.sessions[test.id];
        if (sess && sess.mode === "result") statusHtml = '<span class="deep-tests-card-status ok">' + ICONS.check + '</span>';
        else if (sess && (sess.mode === "quiz" || (sess.answers && Object.keys(sess.answers).length > 0))) statusHtml = '<span class="deep-tests-card-status wip">' + ICONS.wip + '</span>';
      }
      
      return TPL.TEMPLATES.testCard(test, statusHtml, badge);
    },

    /* ── Event Bus: обновление статусов карточек при изменении состояния тестов ── */
    _initEventListeners: function() {
      var self = this;
      document.addEventListener("deep-state-changed", function() {
        /* Точечное обновление badge-статусов на карточках без полного ре-рендера grid */
        document.querySelectorAll('.deep-tests-card[data-action="open-test"]').forEach(function(card) {
          var testId = card.getAttribute('data-id');
          if (!testId || !window.DEEP_QUIZ) return;
          var statusEl = card.querySelector('.deep-tests-card-status');
          var sess = window.DEEP_QUIZ.state.sessions[testId];
          var ICONS = window.DEEP_TPL ? window.DEEP_TPL.ICONS : {};
          
          if (sess && sess.mode === "result") {
            if (!statusEl) {
              statusEl = document.createElement('span');
              statusEl.className = 'deep-tests-card-status ok';
              card.appendChild(statusEl);
            } else {
              statusEl.className = 'deep-tests-card-status ok';
            }
            statusEl.innerHTML = ICONS.check || '✓';
          } else if (sess && (sess.mode === "quiz" || (sess.answers && Object.keys(sess.answers).length > 0))) {
            if (!statusEl) {
              statusEl = document.createElement('span');
              statusEl.className = 'deep-tests-card-status wip';
              card.appendChild(statusEl);
            } else {
              statusEl.className = 'deep-tests-card-status wip';
            }
            statusEl.innerHTML = ICONS.wip || '⏳';
          }
        });
      });
    }
  };

  /* Auto-init event listeners */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() { window.DEEP_GRID._initEventListeners(); });
  } else {
    window.DEEP_GRID._initEventListeners();
  }
})();
