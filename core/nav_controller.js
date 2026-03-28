/* ═══════════════════════════════════════════
   DEEP PSY TESTS — NAV CONTROLLER
   Сайдбар навигация, аккордеон, бургер-меню.
   Зависит от: DEEP_TPL (templates.js)
   ═══════════════════════════════════════════ */
(function () {
  "use strict";

  window.DEEP_NAV = {
    /**
     * Рендер сайдбара — вызывается ОДИН раз при инициализации
     * или при полном обновлении (navigate из вне).
     */
    render: function(reg, activeCatId) {
      var nav = document.getElementById("deep-dash-nav-area");
      if (!nav) return;

      var TPL = window.DEEP_TPL;
      var ICONS = TPL.ICONS;
      var SHORT_TITLES = TPL.SHORT_TITLES;

      var html = `
        <div class="deep-dash-nav-header">
          <div class="deep-dash-logo">DEEP<span>Tests</span></div>
          <button class="deep-dash-nav-collapse" id="deep-dash-nav-collapse" aria-label="Свернуть меню" title="Свернуть панель">
            <svg viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 1L2.5 4.5L6 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button class="deep-dash-nav-close" id="deep-dash-nav-close" aria-label="Закрыть меню">✕</button>
        </div>
        <div class="deep-dash-nav-scroll">
          <div class="deep-dash-nav-home ${!activeCatId ? "active" : ""}" data-nav="home">Каталог</div>
      `;

      for (var cId in reg) {
        var cat = reg[cId];
        var iconName = TPL.CAT_ICONS[cId] || "📋";
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
                       onclick="event.stopPropagation(); window.DEEP_ROUTER.navigate('${cId}', '${sub.subId}'); var np=document.getElementById('deep-dash-nav-area'), mo=document.getElementById('deep-dash-overlay'); if(np) np.classList.remove('open'); if(mo) mo.classList.remove('open'); document.body.style.overflow='';">
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
      
      this._attachAccordion(nav);
      this._attachHomeButton(nav);
    },

    /**
     * Эксклюзивный аккордеон: toggle + navigate без перерендера навбара.
     * Анимация сохраняется, т.к. DOM-элементы не пересоздаются.
     */
    _attachAccordion: function(nav) {
      nav.querySelectorAll('.deep-dash-nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
          e.stopPropagation();
          var group = this.closest('.deep-dash-nav-group');
          var wasOpen = group && group.classList.contains('expanded');
          
          // Закрыть все группы (эксклюзивный аккордеон)
          nav.querySelectorAll('.deep-dash-nav-group.expanded').forEach(g => {
            if (g !== group) {
              g.classList.remove('expanded');
              var gItem = g.querySelector('.deep-dash-nav-item');
              if (gItem) gItem.classList.remove('active');
            }
          });
          
          // Toggle текущей группы
          if (group) group.classList.toggle('expanded');
          
          // Активное состояние
          nav.querySelectorAll('.deep-dash-nav-item.active').forEach(a => a.classList.remove('active'));
          if (!wasOpen) this.classList.add('active');
          
          // Обновить контент (без перерендера навбара)
          var catId = this.getAttribute('data-nav');
          if (catId && window.DEEP_ROUTER) {
            if (wasOpen) {
              // Сворачиваем → на главную
              window.DEEP_ROUTER.state.activeCategoryId = null;
              window.DEEP_ROUTER.state.activeSubId = null;
              window.DEEP_CATEGORY_DATA = null;
              var homeEl = nav.querySelector('.deep-dash-nav-home');
              if (homeEl) homeEl.classList.add('active');
            } else {
              // Раскрываем → на категорию
              window.DEEP_ROUTER.state.activeCategoryId = catId;
              window.DEEP_ROUTER.state.activeSubId = null;
              window.DEEP_CATEGORY_DATA = window.DEEP_MASTER_REGISTRY[catId] || null;
              var homeEl = nav.querySelector('.deep-dash-nav-home');
              if (homeEl) homeEl.classList.remove('active');
            }
            window.DEEP_ROUTER.state.searchQuery = '';
            window.DEEP_ROUTER.state.mode = 'categories';
            window.DEEP_ROUTER.syncURL();
            window.scrollTo(0, 0);
            // Обновить ТОЛЬКО контент (header + grid)
            if (window.DEEP_UI) window.DEEP_UI._updateContentOnly();
          }
        });
      });
    },

    _attachHomeButton: function(nav) {
      var homeBtn = nav.querySelector('.deep-dash-nav-home');
      if (homeBtn) {
        homeBtn.addEventListener('click', function() {
          if (window.DEEP_ROUTER) window.DEEP_ROUTER.navigate(null);
          var np = document.getElementById('deep-dash-nav-area');
          var mo = document.getElementById('deep-dash-overlay');
          if (np) np.classList.remove('open');
          if (mo) mo.classList.remove('open');
        });
      }
      
      var closeBtn = document.getElementById("deep-dash-nav-close");
      
      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          var np = document.getElementById('deep-dash-nav-area');
          var mo = document.getElementById('deep-dash-overlay');
          if (np) np.classList.remove('open');
          if (mo) mo.classList.remove('open');
          document.body.style.overflow = '';
        });
      }
    }
  };
})();
