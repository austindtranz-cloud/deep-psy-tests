/* ═══════════════════════════════════════════
   DEEP PSY TESTS — SIDEBAR v2
   Floating history and results management panel.
   ═══════════════════════════════════════════ */
(function () {
  "use strict";

  if (window.DEEP_SIDEBAR_LOADED) return;
  window.DEEP_SIDEBAR_LOADED = true;

  var STORAGE_KEY = "deep-tests-engine-v4";
  var META_CACHE_KEY = "deep-tests-meta-cache";
  var WEBHOOK_URL = "";

  /* ── SVG Icons ── */
  var ICONS = {
    check:    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 8.2L7.2 9.9L10.5 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    progress: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M8 5V8.5L10 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    send:     '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7.4 6.32l8.49-2.83c3.81-1.27 5.88.81 4.62 4.62l-2.83 8.49c-1.9 5.71-5.02 5.71-6.92 0l-.84-2.52-2.52-.84c-5.71-1.9-5.71-5.01 0-6.92z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    nav:      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>'
  };

  /* ── State & Cache ── */
  function loadSessions() {
    try { return (JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}).sessions || {}; } catch(e) { return {}; }
  }
  function loadMetaCache() {
    try { return JSON.parse(localStorage.getItem(META_CACHE_KEY)) || {}; } catch(e) { return {}; }
  }
  function saveMetaCache(cache) {
    try { localStorage.setItem(META_CACHE_KEY, JSON.stringify(cache)); } catch(e) {}
  }

  function cacheCurrentCategory() {
    var data = window.DEEP_CATEGORY_DATA;
    if (!data || !data.categoryId) return;
    var cache = loadMetaCache();
    cache[data.categoryId] = {
      categoryId: data.categoryId,
      categoryTitle: data.categoryTitle,
      pageUrl: location.pathname,
      subcategories: (data.subcategories || []).map(s => ({
        subId: s.subId,
        subTitle: s.subTitle,
        tests: (s.tests || []).map(t => ({ id: t.id, title: t.title }))
      }))
    };
    saveMetaCache(cache);
  }

  /* ── Sidebar Rendering ── */
  function renderSidebar() {
    var el = document.getElementById("deep-sidebar");
    if (!el) return;

    var sessions = loadSessions(), cache = loadMetaCache();
    var activeCats = [], totalActive = 0, completedTotal = 0;

    Object.keys(cache).forEach(catId => {
      var cat = cache[catId], catTests = [];
      cat.subcategories.forEach(sub => {
        sub.tests.forEach(t => {
          var s = sessions[t.id];
          if (s && (s.mode === "result" || Object.keys(s.answers || {}).length > 0)) {
            var isDone = (s.mode === "result");
            if (isDone) completedTotal++;
            totalActive++;
            catTests.push({ id: t.id, title: t.title, subId: sub.subId, subTitle: sub.subTitle, isDone: isDone, session: s });
          }
        });
      });
      if (catTests.length) activeCats.push({ ...cat, activeTests: catTests });
    });

    if (totalActive === 0 && !window.DEEP_MASTER_REGISTRY) { el.style.display = "none"; return; }
    el.style.display = "block";

    var contentHtml = activeCats.map(cat => {
      var subGroups = {};
      cat.activeTests.forEach(t => {
        if (!subGroups[t.subId]) subGroups[t.subId] = { title: t.subTitle, tests: [] };
        subGroups[t.subId].tests.push(t);
      });

      var subHtml = Object.keys(subGroups).map(sid => {
        var g = subGroups[sid];
        return `<div class="deep-sb-sub">
          <div class="deep-sb-sub-title">${g.title}</div>
          ${g.tests.map(t => `
            <div class="deep-sb-test" onclick="window.DEEP_CORE.openTest('${t.id}')">
              <span class="deep-sb-icon ${t.isDone ? "deep-sb-icon--ok" : "deep-sb-icon--wip"}">${t.isDone ? ICONS.check : ICONS.progress}</span>
              <div class="deep-sb-test-info">
                <span class="deep-sb-test-name">${t.title}</span>
                <span class="deep-sb-test-status">${t.isDone ? "Завершён" : "В процессе"}</span>
              </div>
            </div>
          `).join("")}
        </div>`;
      }).join("");

      return `<div class="deep-sb-category">
        <div class="deep-sb-cat-header" onclick="this.parentElement.classList.toggle('is-open')">
          <span class="deep-sb-cat-title">${cat.categoryTitle}</span>
          <span class="deep-sb-cat-count">${cat.activeTests.filter(t => t.isDone).length}/${cat.activeTests.length}</span>
        </div>
        <div class="deep-sb-cat-body">${subHtml}</div>
      </div>`;
    }).join("");

    var newHtml = `
      <div class="deep-sb-header" onclick="document.getElementById('deep-sidebar').classList.toggle('is-open')">
        <span class="deep-sb-title">Ваша история</span>
        <span class="deep-sb-badge">${totalActive}</span>
      </div>
      <div class="deep-sb-body">
        <div class="deep-sb-scroll">
          ${contentHtml || '<div style="padding:10px; opacity:0.5; font-size:12px">Нет активных тестов</div>'}
        </div>
        ${completedTotal > 0 && WEBHOOK_URL ? `<button class="deep-tests-btn deep-tests-btn-primary" style="margin-top:12px; width:100%;" onclick="window.deepOpenSendForm()">Отправить все (${completedTotal})</button>` : ""}
      </div>
    `;
    
    if (el.innerHTML !== newHtml) {
      el.innerHTML = newHtml;
    }
  }

  function injectSidebar() {
    if (document.getElementById("deep-sidebar")) return;

    // Floating toggle button
    var toggle = document.createElement("button");
    toggle.className = "deep-sidebar-toggle";
    toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg><span>История</span>';
    toggle.addEventListener("click", function() {
      var sb = document.getElementById("deep-sidebar");
      if (sb) sb.classList.toggle("is-open");
    });
    document.body.appendChild(toggle);

    // Sidebar panel
    var sidebar = document.createElement("div");
    sidebar.id = "deep-sidebar";
    document.body.appendChild(sidebar);
    renderSidebar();
  }

  function init() {
    cacheCurrentCategory();
    injectSidebar();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  window.deepSidebarRefresh = renderSidebar;
})();
