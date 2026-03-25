/* ═══════════════════════════════════════════
   DEEP PSY TESTS — SIDEBAR v1
   Floating panel showing completed/in-progress tests.
   Cross-category via localStorage cache.
   Group & individual result sending.
   ═══════════════════════════════════════════ */
(function () {
  "use strict";

  var STORAGE_KEY = "deep-tests-engine-v4";
  var META_CACHE_KEY = "deep-tests-meta-cache";
  var WEBHOOK_URL = "";

  /* ── SVG Icons ── */
  var ICON_CHECK = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 8.2L7.2 9.9L10.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_PROGRESS = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M8 5V8.5L10 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ICON_SEND = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7.4 6.32l8.49-2.83c3.81-1.27 5.88.81 4.62 4.62l-2.83 8.49c-1.9 5.71-5.02 5.71-6.92 0l-.84-2.52-2.52-.84c-5.71-1.9-5.71-5.01 0-6.92z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ── Meta cache: store category data from each page visit ── */
  function loadMetaCache() {
    try { return JSON.parse(localStorage.getItem(META_CACHE_KEY)) || {}; } catch(e) { return {}; }
  }
  function saveMetaCache(cache) {
    try { localStorage.setItem(META_CACHE_KEY, JSON.stringify(cache)); } catch(e) {}
  }

  /* Cache current page's DEEP_CATEGORY_DATA */
  function cacheCurrentCategory() {
    var data = window.DEEP_CATEGORY_DATA;
    if (!data || !data.categoryId) return;
    var cache = loadMetaCache();
    var entry = {
      categoryId: data.categoryId,
      categoryTitle: data.categoryTitle,
      subcategories: []
    };
    if (data.subcategories) {
      data.subcategories.forEach(function(sub) {
        var subEntry = { subId: sub.subId, subTitle: sub.subTitle, tests: [] };
        if (sub.tests) {
          sub.tests.forEach(function(t) {
            subEntry.tests.push({ id: t.id, title: t.title, isRunnable: t.isRunnable });
          });
        }
        entry.subcategories.push(subEntry);
      });
    }
    cache[data.categoryId] = entry;
    cache[data.categoryId].pageUrl = location.pathname;
    saveMetaCache(cache);
  }

  /* ── State helpers ── */
  function loadSessions() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      return JSON.parse(raw).sessions || {};
    } catch(e) { return {}; }
  }

  function getTestStatus(sessions, testId) {
    var s = sessions[testId];
    if (!s) return null;
    if (s.mode === "result") return "completed";
    if (s.mode === "quiz" || Object.keys(s.answers || {}).length > 0) return "in_progress";
    return null;
  }

  /* ── Build sidebar data ── */
  function buildSidebarData() {
    var sessions = loadSessions();
    var cache = loadMetaCache();
    var categories = [];

    Object.keys(cache).forEach(function(catId) {
      var cat = cache[catId];
      var catTests = [];
      var catHasActivity = false;

      if (cat.subcategories) {
        cat.subcategories.forEach(function(sub) {
          sub.tests.forEach(function(t) {
            var status = getTestStatus(sessions, t.id);
            if (status) {
              catHasActivity = true;
              catTests.push({
                id: t.id,
                title: t.title,
                subcategory: sub.subTitle,
                subId: sub.subId,
                status: status,
                session: sessions[t.id]
              });
            }
          });
        });
      }

      if (catHasActivity) {
        categories.push({
          categoryId: cat.categoryId,
          categoryTitle: cat.categoryTitle,
          pageUrl: cat.pageUrl || "",
          tests: catTests
        });
      }
    });

    return categories;
  }

  /* ── Count totals ── */
  function countTests(data) {
    var completed = 0, inProgress = 0;
    data.forEach(function(cat) {
      cat.tests.forEach(function(t) {
        if (t.status === "completed") completed++;
        else inProgress++;
      });
    });
    return { completed: completed, inProgress: inProgress, total: completed + inProgress };
  }

  /* ── Render sidebar ── */
  function renderSidebar() {
    var el = document.getElementById("deep-sidebar");
    if (!el) return;

    var data = buildSidebarData();
    var counts = countTests(data);

    // Always show if search/registry is available, otherwise show only if there is activity
    if (counts.total === 0 && !window.DEEP_TEST_REGISTRY) {
      el.style.display = "none";
      return;
    }

    el.style.display = "block";

    /* Group tests by subcategory within each category */
    var contentHtml = data.map(function(cat) {
      /* Group by subcategory */
      var subGroups = {};
      cat.tests.forEach(function(t) {
        if (!subGroups[t.subId]) subGroups[t.subId] = { title: t.subcategory, tests: [] };
        subGroups[t.subId].tests.push(t);
      });

      var subHtml = Object.keys(subGroups).map(function(subId) {
        var sg = subGroups[subId];
        var testsHtml = sg.tests.map(function(t) {
          var isCompleted = t.status === "completed";
          var iconHtml = isCompleted
            ? '<span class="deep-sb-icon deep-sb-icon--ok">' + ICON_CHECK + '</span>'
            : '<span class="deep-sb-icon deep-sb-icon--wip">' + ICON_PROGRESS + '</span>';
          var statusText = isCompleted ? "Завершён" : "В процессе";
          return '<div class="deep-sb-test" data-sb-action="go-to-test" data-test-id="' + t.id + '" data-page-url="' + (cat.pageUrl || '') + '" style="cursor:pointer;">' +
            iconHtml +
            '<div class="deep-sb-test-info"><span class="deep-sb-test-name">' + t.title + '</span><span class="deep-sb-test-status">' + statusText + '</span></div>' +
          '</div>';
        }).join("");

        return '<div class="deep-sb-sub">' +
          '<div class="deep-sb-sub-title">' + sg.title + '</div>' +
          testsHtml +
        '</div>';
      }).join("");

      var catCompletedCount = cat.tests.filter(function(t){ return t.status === "completed"; }).length;

      return '<div class="deep-sb-category">' +
        '<div class="deep-sb-cat-header" data-sb-action="toggle-cat">' +
          '<span class="deep-sb-cat-title">' + cat.categoryTitle + '</span>' +
          '<span class="deep-sb-cat-count">' + catCompletedCount + '/' + cat.tests.length + '</span>' +
        '</div>' +
        '<div class="deep-sb-cat-body">' +
          subHtml +
          (catCompletedCount > 0 ?
            '<button class="deep-sb-send-group" data-sb-action="send-category" data-category="' + cat.categoryId + '">' +
              ICON_SEND + ' Отправить эту группу' +
            '</button>' : '') +
        '</div>' +
      '</div>';
    }).join("");

    var panelHtml =
      '<div class="deep-sb-header" data-sb-action="toggle-panel">' +
        '<span class="deep-sb-title">Меню и результаты</span>' +
        '<span class="deep-sb-badge">' + counts.total + '</span>' +
      '</div>' +
      '<div class="deep-sb-body">' +
        '<!-- Поиск -->' +
        '<div class="deep-sb-search-box">' +
          '<input type="text" id="deep-sb-search-input" placeholder="Поиск теста (напр. стресс)..." autocomplete="off">' +
          '<div id="deep-sb-search-results" class="deep-sb-search-results"></div>' +
        '</div>' +
        '<div class="deep-sb-scroll">' +
          '<div class="deep-sb-section-title">Ваша активность</div>' +
          contentHtml +
          '<div class="deep-sb-section-title" style="margin-top:15px">Навигация</div>' +
          '<div class="deep-sb-nav-item" data-sb-action="open-alphabet">' +
            '<span class="deep-sb-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg></span>' +
            '<span>Алфавитный указатель (А-Я)</span>' +
          '</div>' +
        '</div>' +
        (counts.completed > 0 ?
          '<button class="deep-sb-send-all" data-sb-action="send-all" style="margin-top:10px;flex-shrink:0;">' +
            ICON_SEND + ' Отправить все результаты (' + counts.completed + ')' +
          '</button>' : '') +
      '</div>';

    el.innerHTML = panelHtml;

    /* Attach Search Logic */
    var searchInput = el.querySelector("#deep-sb-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", function(e) {
        var query = e.target.value.toLowerCase().trim();
        var resultsEl = el.querySelector("#deep-sb-search-results");
        if (!query || query.length < 2) {
          resultsEl.style.display = "none";
          return;
        }
        
        if (!window.DEEP_TEST_REGISTRY) return;
        
        var filtered = window.DEEP_TEST_REGISTRY.filter(function(t) {
          return t.title.toLowerCase().indexOf(query) > -1 || (t.tags && t.tags.toLowerCase().indexOf(query) > -1);
        }).slice(0, 5);

        if (filtered.length > 0) {
          resultsEl.innerHTML = filtered.map(function(t) {
            return '<div class="deep-sb-search-item" data-sb-action="go-to-test" data-test-id="' + t.id + '" data-page-url="' + t.url + '">' +
              '<div class="deep-sb-search-item-title">' + t.title + '</div>' +
              '<div class="deep-sb-search-item-cat">' + t.category + '</div>' +
            '</div>';
          }).join("");
          resultsEl.style.display = "block";
        } else {
          resultsEl.innerHTML = '<div class="deep-sb-search-empty">Ничего не найдено</div>';
          resultsEl.style.display = "block";
        }
      });
    }
  }

  /* ── Inject sidebar HTML + CSS ── */
  function injectSidebar() {
    // 1. Автоматическая зачистка (self-healing): удаляем старые жестко закодированные элементы
    var oldSb = document.getElementById("deep-sidebar");
    if (oldSb && oldSb.parentElement) oldSb.parentElement.removeChild(oldSb);
    
    var oldBtn = document.getElementById("deep-sidebar-toggle");
    if (oldBtn && oldBtn.parentElement) oldBtn.parentElement.removeChild(oldBtn);

    // 2. Внедряем CSS единовременно
    if (!document.getElementById("deep-sidebar-css")) {
      var css = document.createElement("style");
      css.id = "deep-sidebar-css";
      css.textContent =
        '#deep-sidebar{position:fixed;bottom:20px;right:20px;width:320px;max-height:80vh;z-index:9999990;font-family:"Manrope",Arial,sans-serif;color:var(--dt-text,#F4EEE3);}' +
      '#deep-sidebar *{box-sizing:border-box}' +
      '.deep-sb-header{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 16px;background:rgba(15,17,19,.96);border:1px solid rgba(232,214,179,.14);border-radius:16px;cursor:pointer;user-select:none;transition:border-color .2s,background .2s;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}' +
      '.deep-sb-header:hover{border-color:rgba(232,214,179,.28);background:rgba(15,17,19,.98)}' +
      '.deep-sb-title{font-size:14px;font-weight:700;color:#F4EEE3}' +
      '.deep-sb-badge{background:rgba(232,214,179,.12);border:1px solid rgba(232,214,179,.2);color:#E8D6B3;font-size:12px;font-weight:700;padding:3px 9px;border-radius:999px}' +
      '.deep-sb-body{max-height:0;overflow:hidden;transition:max-height .35s ease,margin .35s ease,opacity .2s;opacity:0;margin-top:0}' +
      '#deep-sidebar.is-open .deep-sb-body{max-height:60vh;overflow:hidden;margin-top:8px;opacity:1;background:rgba(15,17,19,.96);border:1px solid rgba(232,214,179,.14);border-radius:16px;padding:12px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);display:flex;flex-direction:column}' +
      '.deep-sb-scroll{flex:1;min-height:0;overflow-y:auto;scrollbar-width:none;-webkit-mask-image:linear-gradient(to bottom,transparent 0%,black 16px,black calc(100% - 16px),transparent 100%);mask-image:linear-gradient(to bottom,transparent 0%,black 16px,black calc(100% - 16px),transparent 100%);padding:4px 0}' +
      '.deep-sb-scroll::-webkit-scrollbar{width:0}' +

      '.deep-sb-category{margin-bottom:8px}' +
      '.deep-sb-cat-header{display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-radius:12px;cursor:pointer;transition:background .2s}' +
      '.deep-sb-cat-header:hover{background:rgba(255,255,255,.04)}' +
      '.deep-sb-cat-title{font-size:14px;font-weight:700;color:#F4EEE3}' +
      '.deep-sb-cat-count{font-size:12px;color:rgba(168,159,145,.8)}' +
      '.deep-sb-cat-body{max-height:0;overflow:hidden;transition:max-height .3s ease;padding:0 8px}' +
      '.deep-sb-category.is-open .deep-sb-cat-body{max-height:500px}' +
      '.deep-sb-sub{margin-bottom:6px}' +
      '.deep-sb-sub-title{font-size:12px;font-weight:600;color:rgba(168,159,145,.7);text-transform:uppercase;letter-spacing:.06em;padding:6px 4px 4px}' +
      '.deep-sb-test{display:flex;align-items:center;gap:8px;padding:7px 6px;border-radius:8px;transition:background .15s}' +
      '.deep-sb-test:hover{background:rgba(255,255,255,.03)}' +
      '.deep-sb-icon{display:flex;align-items:center;justify-content:center;width:20px;height:20px;flex:0 0 20px}' +
      '.deep-sb-icon--ok{color:#A3C9A8}' +
      '.deep-sb-icon--wip{color:#E8D6B3}' +
      '.deep-sb-test-info{flex:1;min-width:0;display:flex;flex-direction:column;gap:1px}' +
      '.deep-sb-test-name{font-size:13px;color:#F4EEE3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
      '.deep-sb-test-status{font-size:11px;color:rgba(168,159,145,.7)}' +
      '.deep-sb-send-group,.deep-sb-send-all{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;padding:10px;margin-top:8px;border:1px solid rgba(232,214,179,.14);border-radius:10px;background:rgba(232,214,179,.06);color:#E8D6B3;font-size:12px;font-weight:700;cursor:pointer;transition:background .2s,border-color .2s;font-family:inherit}' +
      '.deep-sb-send-group:hover,.deep-sb-send-all:hover{background:rgba(232,214,179,.12);border-color:rgba(232,214,179,.28)}' +
      '.deep-sb-send-all{margin-top:12px;background:#E8D6B3;color:#111;border:none}' +
      '.deep-sb-send-all:hover{background:#D9C29A}' +
      /* Search Styles */
      '.deep-sb-search-box{position:relative;margin-bottom:12px;flex-shrink:0}' +
      '.deep-sb-search-box input{width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(232,214,179,0.1);border-radius:10px;padding:10px 12px;color:#F4EEE3;font-size:13px;outline:none;transition:border-color .2s}' +
      '.deep-sb-search-box input:focus{border-color:rgba(232,214,179,0.3)}' +
      '.deep-sb-search-results{position:absolute;top:100%;left:0;right:0;background:rgba(20,22,24,0.98);border:1px solid rgba(232,214,179,0.2);border-radius:10px;margin-top:4px;z-index:10;display:none;box-shadow:0 10px 30px rgba(0,0,0,0.5);max-height:300px;overflow-y:auto}' +
      '.deep-sb-search-item{padding:10px 12px;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.03)}' +
      '.deep-sb-search-item:last-child{border-bottom:none}' +
      '.deep-sb-search-item:hover{background:rgba(232,214,179,0.08)}' +
      '.deep-sb-search-item-title{font-size:12px;font-weight:700;color:#F4EEE3;margin-bottom:2px}' +
      '.deep-sb-search-item-cat{font-size:10px;color:rgba(232,214,179,0.5);text-transform:uppercase;letter-spacing:0.04em}' +
      '.deep-sb-search-empty{padding:12px;text-align:center;font-size:12px;color:rgba(168,159,145,0.6)}' +
      /* Nav items */
      '.deep-sb-section-title{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(232,214,179,0.3);margin:4px 0 8px 4px}' +
      '.deep-sb-nav-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;cursor:pointer;transition:background .2s;font-size:13px;color:#F4EEE3;margin-bottom:4px}' +
      '.deep-sb-nav-item:hover{background:rgba(232,214,179,0.08)}' +
      /* Mobile: softer edge */
      '@media(max-width:639px){#deep-sidebar{width:auto;right:16px;bottom:16px}#deep-sidebar .deep-sb-header{padding:12px 14px;border-radius:14px}#deep-sidebar.is-open{width:calc(100vw - 32px);right:16px}#deep-sidebar.is-open .deep-sb-body{max-height:50vh}}' +
      '.deep-sb-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);z-index:9999999;display:none;align-items:center;justify-content:center;padding:20px 10px;opacity:0;transition:opacity .2s}' +
      '.deep-sb-overlay.is-active{opacity:1}' +
      '.deep-sb-modal{width:100%;max-width:460px;max-height:calc(100dvh - 40px);overflow-y:auto;background:rgba(10,10,10,.96);border:1px solid rgba(232,214,179,.14);border-radius:16px;padding:30px 26px;position:relative;transform:translateY(20px);transition:transform .2s;box-sizing:border-box!important;font-family:"Manrope",Arial,sans-serif!important;box-shadow:0 24px 70px rgba(0,0,0,.58);scrollbar-width:none}' +
      '.deep-sb-modal::-webkit-scrollbar{display:none}' +
      '.deep-sb-modal *,.deep-sb-modal input,.deep-sb-modal button{box-sizing:border-box!important;font-family:inherit}' +
      '.deep-sb-overlay.is-active .deep-sb-modal{transform:translateY(0)}' +
      '.deep-sb-modal .deep-tests-form{border:none;padding:0;background:transparent;margin:0}' +
      '.deep-sb-modal .deep-tests-input,.deep-sb-modal .deep-tests-btn{width:100%;margin-bottom:0}' +
      '.deep-sb-modal-cat-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:rgba(232,214,179,.5);margin:10px 0 4px;padding-top:6px}' +
      '.deep-sb-modal-cat-title:first-child{margin-top:0;padding-top:0}' +
      /* Alphabet modal additional */
      '.deep-sb-alphabet-grid{display:grid;grid-template-columns:repeat(auto-fill, minmax(200px, 1fr));gap:12px;margin-top:20px}' +
      '.deep-sb-alphabet-group{margin-bottom:20px}' +
      '.deep-sb-alphabet-letter{font-size:18px;font-weight:800;color:#E8D6B3;border-bottom:1px solid rgba(232,214,179,0.1);padding-bottom:4px;margin-bottom:8px}' +
      '.deep-sb-alphabet-test{font-size:13px;color:#F4EEE3;padding:4px 0;cursor:pointer;transition:color .2s}' +
      '.deep-sb-alphabet-test:hover{color:#E8D6B3}' +
      '@media(max-width:639px){.deep-sb-overlay{padding:10px}.deep-sb-modal{max-width:100%;max-height:calc(100dvh - 20px);padding:24px 16px 16px;border-radius:14px}}';
      document.head.appendChild(css);
    }

    var sidebar = document.createElement("div");
    sidebar.id = "deep-sidebar";
    sidebar.style.display = "none"; /* Hide initially until render */
    document.body.appendChild(sidebar);

    /* Prebuild Modal */
    var modalOverlay = document.createElement("div");
    modalOverlay.className = "deep-sb-overlay";
    modalOverlay.id = "deep-sb-overlay";
    modalOverlay.innerHTML = '<div class="deep-tests-app deep-sb-modal">' +
      '<button type="button" class="deep-tests-close" data-sb-action="close-modal" aria-label="Закрыть" style="top:20px;right:20px;display:flex;align-items:center;justify-content:center;">' +
        '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M1 13L13 1" stroke="#F4EEE3" stroke-width="2" stroke-linecap="round"/></svg>' +
      '</button>' +
      '<div class="deep-tests-form" style="margin-top:20px;">' +
        '<div class="deep-tests-form-title">Получить отчёт на e-mail</div>' +
        '<div class="deep-accordion-item" style="margin-bottom:20px; border:1px solid rgba(255,255,255,0.06); border-radius:14px; overflow:hidden;">' +
          '<div class="deep-accordion-header" data-sb-action="toggle-sb-accordion" style="padding:14px 16px; background:rgba(255,255,255,0.03); display:flex; justify-content:space-between; cursor:pointer;">' +
            '<span style="font-size:14px; color:#F4EEE3; font-weight:600;" id="sb_tests_count_label">Отправляемые тесты (0)</span>' +
            '<svg class="deep-accordion-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A89F91" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>' +
          '</div>' +
          '<div class="deep-accordion-body" style="padding:0 16px; max-height:0; transition:max-height 0.3s ease;">' +
            '<div id="sb_tests_list" style="display:flex; flex-direction:column; gap:8px; padding:12px 0 16px; font-size:13px; color:#E8D6B3;"></div>' +
          '</div>' +
        '</div>' +
        '<div class="deep-tests-input-group"><input class="deep-tests-input" type="text" id="sb_lead_name" placeholder="Имя (как к вам обращаться?)"></div>' +
        '<div class="deep-tests-input-group"><input class="deep-tests-input" type="email" id="sb_lead_email" placeholder="E-mail (куда прислать отчёт)"></div>' +
        '<div class="deep-tests-input-group"><label>Альтернативный способ связи</label><input class="deep-tests-input" type="text" id="sb_contact_alt" placeholder="Напишите ваши контакты / @никнейм"></div>' +
        '<label class="deep-tests-checkbox-group"><input type="checkbox" id="sb_lead_consent"><span>Согласен(на) на <a href="#" onclick="return false">обработку персональных данных</a> и <a href="#" onclick="return false">политику конфиденциальности</a></span></label>' +
        '<label class="deep-tests-checkbox-group"><input type="checkbox" id="sb_lead_newsletter"><span>Согласен(на) на рассылку (необязательно)</span></label>' +
        '<div class="deep-tests-actions" style="margin-top:20px;">' +
          '<button class="deep-tests-btn deep-tests-btn-primary" data-sb-action="submit-sb-lead" style="width:100%">Отправить</button>' +
        '</div>' +
      '</div>' +
    '</div>';
    document.body.appendChild(modalOverlay);

    /* State for pending submission */
    var pendingResults = [];
    var pendingLabel = "";

    function openModal(results, label) {
      pendingResults = results;
      pendingLabel = label;
      
      /* Pre-fill from profile */
      try {
        var p = JSON.parse(localStorage.getItem("deep-tests-user-profile")) || {};
        if (p.name) document.getElementById("sb_lead_name").value = p.name;
        if (p.email) document.getElementById("sb_lead_email").value = p.email;
        if (p.contact_alt) document.getElementById("sb_contact_alt").value = p.contact_alt;
      } catch(e) {}
      
      /* Populate Accordion — grouped by category */
      document.getElementById("sb_tests_count_label").textContent = "Отправляемые тесты (" + results.length + ")";
      var grouped = {};
      results.forEach(function(r) {
        var cat = r.category || "Без категории";
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(r);
      });
      var listHtml = "";
      for (var cat in grouped) {
        listHtml += '<div class="deep-sb-modal-cat-title">' + cat + '</div>';
        grouped[cat].forEach(function(r) {
          listHtml += '<div>• ' + r.title + '</div>';
        });
      }
      document.getElementById("sb_tests_list").innerHTML = listHtml;
      
      /* Reset accordion state */
      var acc = modalOverlay.querySelector(".deep-accordion-item");
      if (acc) { acc.classList.remove("is-open"); acc.querySelector(".deep-accordion-body").style.maxHeight = "0"; }

      modalOverlay.style.display = "flex";
      /* force reflow */
      void modalOverlay.offsetWidth;
      modalOverlay.classList.add("is-active");
    }
    
    window.deepOpenSendForm = openModal;

    function closeModal() {
      modalOverlay.classList.remove("is-active");
      setTimeout(function(){ 
        modalOverlay.style.display = "none";
        /* Restore original content if we were showing alphabet */
        if (window._deepLastModalContent) {
           modalOverlay.querySelector(".deep-sb-modal").innerHTML = window._deepLastModalContent;
           window._deepLastModalContent = null;
        }
      }, 250);
    }
    
    function showAlphabeticalIndex() {
      if (!window.DEEP_TEST_REGISTRY) { alert("База тестов еще загружается..."); return; }
      
      var grouped = {};
      var sorted = window.DEEP_TEST_REGISTRY.slice().sort(function(a, b) {
        return a.title.localeCompare(b.title);
      });
      
      sorted.forEach(function(t) {
        var letter = t.title.charAt(0).toUpperCase();
        if (!grouped[letter]) grouped[letter] = [];
        grouped[letter].push(t);
      });
      
      var alphabetHtml = '<div class="deep-tests-form" style="margin-top:20px; max-width: 100%">' +
        '<div class="deep-tests-form-title">Алфавитный указатель (А-Я)</div>' +
        '<div class="deep-sb-alphabet-container">';
      
      Object.keys(grouped).sort().forEach(function(letter) {
        alphabetHtml += '<div class="deep-sb-alphabet-group">' +
          '<div class="deep-sb-alphabet-letter">' + letter + '</div>' +
          grouped[letter].map(function(t) {
            return '<div class="deep-sb-alphabet-test" data-sb-action="go-to-test" data-test-id="' + t.id + '" data-page-url="' + t.url + '">' + t.title + '</div>';
          }).join("") +
        '</div>';
      });
      
      alphabetHtml += '</div></div>';
      
      /* Reuse modal container but change content */
      var modalBody = modalOverlay.querySelector(".deep-sb-modal");
      var originalHtml = modalBody.innerHTML;
      
      modalBody.innerHTML = '<button type="button" class="deep-tests-close" data-sb-action="close-modal" aria-label="Закрыть" style="top:20px;right:20px;display:flex;align-items:center;justify-content:center;">' +
        '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M1 13L13 1" stroke="#F4EEE3" stroke-width="2" stroke-linecap="round"/></svg>' +
      '</button>' + alphabetHtml;
      
      modalOverlay.style.display = "flex";
      void modalOverlay.offsetWidth;
      modalOverlay.classList.add("is-active");
      
      /* Store cleanup function to restore content on close */
      window._deepLastModalContent = originalHtml;
    }
    
    window.deepShowAlphabeticalIndex = showAlphabeticalIndex;

    /* Event delegation */
    document.body.addEventListener("click", function(e) {
      if (e.target === modalOverlay) { closeModal(); return; }

      var btn = e.target.closest("[data-sb-action]");
      if (!btn) return;
      var action = btn.getAttribute("data-sb-action");

      if (action === "toggle-sb-accordion") {
        var item = btn.closest(".deep-accordion-item");
        if (item) {
          var body = item.querySelector(".deep-accordion-body");
          item.classList.toggle("is-open");
          if (item.classList.contains("is-open")) {
            body.style.maxHeight = body.scrollHeight + "px";
          } else {
            body.style.maxHeight = "0";
          }
        }
      }

      if (action === "close-modal") {
        closeModal();
      }

      if (action === "toggle-panel") {
        var sidebar = document.getElementById("deep-sidebar");
        if (sidebar) {
          sidebar.classList.toggle("is-open");
          if (sidebar.classList.contains("is-open")) renderSidebar();
        }
      }

      if (action === "toggle-cat") {
        var cat = btn.closest(".deep-sb-category");
        if (cat) cat.classList.toggle("is-open");
      }

      if (action === "go-to-test") {
        var testId = btn.getAttribute("data-test-id");
        var pageUrl = btn.getAttribute("data-page-url");
        if (!testId) return;
        /* If we're already on the right page, open test directly */
        if (pageUrl && location.pathname === pageUrl && typeof window.deepOpenTestById === "function") {
          window.deepOpenTestById(testId);
          sidebar.classList.remove("is-open");
        } else if (pageUrl) {
          /* Navigate to the correct page with openTest param */
          window.location.href = pageUrl + "?openTest=" + encodeURIComponent(testId);
        }
      }

      if (action === "send-all") {
        var sessions = loadSessions();
        var data = buildSidebarData();
        var results = [];
        data.forEach(function(cat) {
          cat.tests.forEach(function(t) {
            if (t.status === "completed") {
              results.push({ testId: t.id, title: t.title, category: cat.categoryTitle, subcategory: t.subcategory, answers: t.session.answers, completedAt: t.session.completedAt });
            }
          });
        });
        if (!results.length) { alert("Нет завершённых тестов."); return; }
        openModal(results, "Все результаты (" + results.length + " тестов)");
      }

      if (action === "send-category") {
        var catId = btn.getAttribute("data-category");
        var data2 = buildSidebarData();
        var results2 = [];
        data2.forEach(function(cat) {
          if (cat.categoryId === catId) {
            cat.tests.forEach(function(t) {
              if (t.status === "completed") {
                results2.push({ testId: t.id, title: t.title, category: cat.categoryTitle, subcategory: t.subcategory, answers: t.session.answers, completedAt: t.session.completedAt });
              }
            });
          }
        });
        if (!results2.length) { alert("Нет завершённых тестов в группе."); return; }
        var cData = data2.find(function(c){return c.categoryId === catId;});
        openModal(results2, cData ? cData.categoryTitle : "Группа тестов");
      }

      if (action === "submit-sb-lead") {
        var nameVal = document.getElementById("sb_lead_name").value.trim();
        var emailVal = document.getElementById("sb_lead_email").value.trim();
        var altVal = document.getElementById("sb_contact_alt").value.trim();
        var consent = document.getElementById("sb_lead_consent").checked;
        var news = document.getElementById("sb_lead_newsletter").checked;

        if (!consent) { alert("Необходимо согласие на обработку данных."); return; }
        if (!nameVal || (!emailVal && !altVal)) { alert("Пожалуйста, укажите имя и способ связи (e-mail или альтернативный контакт)."); return; }

        /* Save profile */
        try { localStorage.setItem("deep-tests-user-profile", JSON.stringify({ name: nameVal, email: emailVal, contact_alt: altVal })); } catch(e) {}

        var payload = {
          type: "batch_sidebar",
          label: pendingLabel,
          user: { name: nameVal, email: emailVal, contact_alt: altVal, consent: consent, newsletter: news },
          results: pendingResults
        };

        if (WEBHOOK_URL) {
          try { fetch(WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); } catch(err){}
        }

        closeModal();
        
        if (typeof window.deepShowSuccessModal === "function") {
          window.deepShowSuccessModal(
            "Результаты отправлены!",
            "Отправлено тестов: " + pendingResults.length + ". PDF будет выслан на ваш e-mail."
          );
        } else {
          alert("Отправлено!");
        }
      }

      if (action === "open-alphabet") {
        if (typeof window.deepShowAlphabeticalIndex === "function") {
          window.deepShowAlphabeticalIndex();
          sidebar.classList.remove("is-open");
        } else {
          alert("Алфавитный указатель в разработке...");
        }
      }
    });

    renderSidebar();
  }



  /* ── Init ── */
  function initSidebar() {
    cacheCurrentCategory();
    injectSidebar();
  }
  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSidebar);
  } else {
    initSidebar();
  }

  /* ── Public API ── */
  window.deepSidebarRefresh = renderSidebar;
})();
