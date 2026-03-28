/* ═══════════════════════════════════════════
   DEEP PSY TESTS — INTEGRATIONS
   Telegram Bot + CRM submissions
   ═══════════════════════════════════════════ */
(function () {
  "use strict";

  var TG_BOT_TOKEN = window.DEEP_TG_TOKEN || "";
  var TG_CHAT_ID = window.DEEP_TG_CHAT_ID || ""; /* Можно также прокидывать chat_id, чтобы не делать getUpdates */

  window.DEEP_INTEGRATIONS = {
    CRM_WEBHOOK: "",

    init: function() {
      console.log("DEEP INTEGRATIONS: Module Initialized (TG Bot active)");
    },

    /* ── Telegram Bot API ── */
    sendToTelegram: function(text, callback) {
      if (!TG_CHAT_ID) {
        /* Авто-определение chat_id: берём из первого Update */
        this._detectChatId(function(chatId) {
          if (chatId) {
            TG_CHAT_ID = chatId;
            window.DEEP_INTEGRATIONS._tgSend(chatId, text, callback);
          } else {
            console.warn("DEEP TG: Не удалось определить chat_id. Напишите боту /start");
            if (callback) callback(false);
          }
        });
        return;
      }
      this._tgSend(TG_CHAT_ID, text, callback);
    },

    _tgSend: function(chatId, text, callback) {
      var url = "https://api.telegram.org/bot" + TG_BOT_TOKEN + "/sendMessage";
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: "HTML"
        })
      })
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data.ok) {
          console.log("DEEP TG: Сообщение отправлено");
          if (callback) callback(true);
        } else {
          console.error("DEEP TG: Ошибка", data);
          if (callback) callback(false);
        }
      })
      .catch(function(err) {
        console.error("DEEP TG: Network error", err);
        if (callback) callback(false);
      });
    },

    _detectChatId: function(callback) {
      var url = "https://api.telegram.org/bot" + TG_BOT_TOKEN + "/getUpdates?limit=1";
      fetch(url)
        .then(function(r) { return r.json(); })
        .then(function(data) {
          if (data.ok && data.result && data.result.length > 0) {
            var chatId = data.result[0].message && data.result[0].message.chat
              ? data.result[0].message.chat.id
              : null;
            callback(chatId);
          } else {
            callback(null);
          }
        })
        .catch(function() { callback(null); });
    },

    /* ── Форматирование результата для TG ── */
    formatTestResult: function(payload) {
      var lines = [];
      lines.push("🧠 <b>Новый результат теста</b>");
      lines.push("");
      if (payload.title) lines.push("📋 <b>Тест:</b> " + payload.title);
      if (payload.category) lines.push("📂 <b>Категория:</b> " + payload.category);
      lines.push("");
      
      if (payload.user) {
        lines.push("👤 <b>Пользователь:</b>");
        if (payload.user.name) lines.push("  Имя: " + payload.user.name);
        if (payload.user.email) lines.push("  Email: " + payload.user.email);
        if (payload.user.contact_alt) lines.push("  Контакт: " + payload.user.contact_alt);
        lines.push("");
      }

      if (payload.results && payload.results.length) {
        lines.push("📊 <b>Результаты (" + payload.results.length + " тестов):</b>");
        payload.results.forEach(function(r, i) {
          lines.push("  " + (i + 1) + ". " + r.title);
          if (r.answers) {
            var answersCount = Object.keys(r.answers).length;
            lines.push("     Ответов: " + answersCount);
          }
        });
      } else if (payload.answers) {
        var keys = Object.keys(payload.answers);
        lines.push("📊 <b>Ответы:</b> " + keys.length + " вопросов");
      }

      lines.push("");
      lines.push("🕐 " + new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }));
      
      return lines.join("\n");
    },

    /* ── CRM Webhook (legacy) ── */
    submitToCRM: function (payload, callback) {
      var url = window.DEEP_CRM_WEBHOOK_URL || this.CRM_WEBHOOK;
      
      /* Всегда отправляем в Telegram */
      var tgText = this.formatTestResult(payload);
      this.sendToTelegram(tgText);
      
      if (!url) {
        console.log("DEEP: CRM Webhook не настроен. Результат отправлен в Telegram.");
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
