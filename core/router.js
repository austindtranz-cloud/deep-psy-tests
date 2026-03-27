/* ═══════════════════════════════════════════
   DEEP PSY TESTS — ROUTER
   Handles URL auto-detection and dashboard state.
   ═══════════════════════════════════════════ */
(function () {
  "use strict";

  window.DEEP_ROUTER = {
    state: {
      activeCategoryId: null,
      searchQuery: "",
      mode: "categories", // categories | alphabetical
      initialized: false,
      initialExpandDone: false
    },

    /* Map category IDs to URLs for Tilda navigation (Legacy Support) */
    CAT_URLS: {
      home: "/tests",
      "personality": "/tests/personality",
      "intelligence": "/tests/intellect",
      "clinical": "/tests/clinical",
      "mental_functions": "/tests/mental",
      "psychosomatics": "/tests/psychosomatics",
      "career": "/tests/career",
      "relationships": "/tests/relationships"
    },

    /* URL to Internal Category ID map for auto-detection */
    URL_MAP: {
      personality: "personality",
      mental: "mental_functions",
      adaptation: "adaptation",
      psychiatry: "psychiatry",
      relationships: "relationships",
      career: "career",
      team: "team",
      organization: "organization",
      psychoanalytic: "psychoanalytic",
      therapy: "therapy_efficacy"
    },

    init: function (container) {
      if (this.state.initialized) return;

      var reg = window.DEEP_MASTER_REGISTRY;
      if (!reg) return;

      var loc = window.location.pathname.toLowerCase();
      var urlParams = new URLSearchParams(window.location.search);
      var qCat = urlParams.get("category");

      if (qCat && reg[qCat]) {
        this.state.activeCategoryId = qCat;
      } else {
        for (var k in this.URL_MAP) {
          if (loc.indexOf("/" + k) !== -1) {
            this.state.activeCategoryId = this.URL_MAP[k];
            break;
          }
        }
      }

      var explicitCat = container && typeof container.getAttribute === "function" ? container.getAttribute("data-category-id") : null;
      if (explicitCat && reg[explicitCat]) {
        this.state.activeCategoryId = explicitCat;
      }

      if (this.state.activeCategoryId) {
        window.DEEP_CATEGORY_DATA = reg[this.state.activeCategoryId];
      }

      this.state.initialized = true;
      console.log("DEEP ROUTER: Initialized with category:", this.state.activeCategoryId);
    },

    syncURL: function () {
      if (!history.replaceState) return;
      var url = new URL(window.location);
      if (this.state.activeCategoryId) {
        url.searchParams.set("category", this.state.activeCategoryId);
      } else {
        url.searchParams.delete("category");
      }
      history.replaceState(null, "", url.toString());
    },

    navigate: function (catId, subId) {
      var reg = window.DEEP_MASTER_REGISTRY;
      this.state.activeCategoryId = (catId === "home" || !catId) ? null : catId;
      this.state.activeSubId = subId || null;
      
      if (this.state.activeCategoryId) {
        window.DEEP_CATEGORY_DATA = reg[this.state.activeCategoryId];
      } else {
        window.DEEP_CATEGORY_DATA = null;
      }

      this.state.searchQuery = "";
      this.state.mode = "categories";
      this.syncURL();

      /* Scroll: to top if no sub target, else to subcategory anchor */
      if (!subId) {
        window.scrollTo(0, 0);
        var content = document.querySelector('.deep-dash-content');
        if (content) content.scrollTop = 0;
      }
      
      if (typeof window.DEEP_UI !== "undefined") {
        window.DEEP_UI.updateDashboardGrid();
        if (subId) {
          setTimeout(function() {
            var subEl = document.getElementById('sub-' + subId);
            if (subEl) subEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 80);
        }
      }
    }
  };
})();
