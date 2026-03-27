/* ═══════════════════════════════════════════
   DEEP PSY TESTS — INTEGRATIONS
   External API calls, CRM submissions, and bug reports.
   ═══════════════════════════════════════════ */
(function () {
  "use strict";

  window.DEEP_INTEGRATIONS = {
    CRM_WEBHOOK: "",

    init: function() {
      console.log("DEEP INTEGRATIONS: Module Initialized");
    },

    submitToCRM: function (payload, callback) {
      var url = window.DEEP_CRM_WEBHOOK_URL || this.CRM_WEBHOOK;
      if (!url) {
        console.warn("DEEP: CRM Webhook URL not set. Simulation mode.");
        setTimeout(function () { if (callback) callback(true); }, 100);
        return;
      }

      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      .then(function (response) {
        if (callback) callback(response.ok);
      })
      .catch(function (err) {
        console.error("DEEP: CRM Submission Error", err);
        if (callback) callback(false);
      });
    },

    sendBugReport: function (report, callback) {
      console.log("DEEP: Bug Report Captured", report);
      try {
        var reports = JSON.parse(localStorage.getItem("deep-tests-bug-reports")) || [];
        reports.push(report);
        localStorage.setItem("deep-tests-bug-reports", JSON.stringify(reports));
        if (callback) callback(true);
      } catch (e) {
        if (callback) callback(false);
      }
    }
  };

  /* Legacy global shim */
  window.deepSubmitToCRM = function(p, c) { window.DEEP_INTEGRATIONS.submitToCRM(p, c); };
})();
