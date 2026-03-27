/**
 * DEEP PSY TESTS — TEST DATA: Stroop Color-Word Test
 * Interactive performance test for cognitive interference.
 */
window.DEEP_TESTS = window.DEEP_TESTS || {};
window.DEEP_TESTS["stroop"] = Object.assign(window.DEEP_TESTS["stroop"] || {}, {
  id: "stroop",
  type: "interactive",
  interactive: true,
  title: "Тест Струпа",
  shortTitle: "Внимание (Струп)",
  description: "Оценка гибкости когнитивных процессов и устойчивости к помехам.",
  intro: "Вам будут предъявляться названия цветов. Ваша задача — выбирать ЦВЕТ ШРИФТА, которым написано слово, игнорируя само значение слова.",
  scales: {
    interference: { 
      title: "Эффект Струпа (Интерференция)", 
      max: 1000, 
      ranges: [
        { min: -999, max: 100, label: "Отличная гибкость" },
        { min: 101, max: 300, label: "Норма" },
        { min: 301, max: 1000, label: "Сниженная гибкость" }
      ]
    }
  },

  renderInteractive: function(container, session) {
    var self = this;
    var colors = [
      { name: "Красный", hex: "#ff4444", id: "red" },
      { name: "Синий", hex: "#33b5e5", id: "blue" },
      { name: "Зелёный", hex: "#00c851", id: "green" },
      { name: "Жёлтый", hex: "#ffbb33", id: "yellow" }
    ];
    
    var trialCount = 20;
    var currentTrial = 0;
    var results = { congruent: [], incongruent: [] };
    var trialStartTime = 0;

    container.innerHTML = `
      <style>
        .stroop-wrap { text-align: center; padding: 40px 0; min-height: 400px; display: flex; flex-direction: column; justify-content: space-between; }
        .stroop-word { font-size: 48px; font-weight: 800; margin: 40px 0; text-transform: uppercase; letter-spacing: 2px; }
        .stroop-btns { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; max-width: 400px; margin: 0 auto; width: 100%; }
        .stroop-btn { 
          padding: 20px; 
          border-radius: 12px; 
          border: 1px solid var(--dt-border); 
          background: var(--dt-card-bg); 
          color: var(--dt-text-main); 
          font-weight: 600; 
          cursor: pointer; 
          transition: all 0.2s;
        }
        .stroop-btn:hover { border-color: var(--dt-primary); background: var(--dt-primary-transparent); }
        .stroop-counter { color: var(--dt-text-muted); font-size: 14px; }
      </style>
      <div class="stroop-wrap">
        <div class="stroop-counter">Задание <span id="str-idx">1</span> из ${trialCount}</div>
        <div class="stroop-word" id="str-word">ЗАГРУЗКА...</div>
        <div class="stroop-btns">
          ${colors.map(c => `<button class="stroop-btn" data-color="${c.id}">${c.name}</button>`).join("")}
        </div>
        <div class="quiz-footer">
          <button class="deep-btn deep-btn--outline" id="str-cancel">Прервать</button>
        </div>
      </div>
    `;

    var wordEl = document.getElementById("str-word");
    var idxEl = document.getElementById("str-idx");
    
    function nextTrial() {
      if (currentTrial >= trialCount) {
        finish();
        return;
      }
      
      idxEl.textContent = currentTrial + 1;
      var wordColor = colors[Math.floor(Math.random() * colors.length)];
      var textContent = colors[Math.floor(Math.random() * colors.length)];
      var isCongruent = wordColor.id === textContent.id;
      
      wordEl.textContent = textContent.name;
      wordEl.style.color = wordColor.hex;
      wordEl.dataset.actual = wordColor.id;
      wordEl.dataset.type = isCongruent ? "congruent" : "incongruent";
      
      trialStartTime = Date.now();
    }

    container.querySelectorAll(".stroop-btn").forEach(btn => {
      btn.onclick = function() {
        var reactionTime = Date.now() - trialStartTime;
        var selected = btn.getAttribute("data-color");
        var actual = wordEl.dataset.actual;
        var type = wordEl.dataset.type;
        
        if (selected === actual) {
          results[type].push(reactionTime);
          currentTrial++;
          nextTrial();
        } else {
          // Error feedback
          btn.style.borderColor = "var(--dt-error)";
          setTimeout(() => { btn.style.borderColor = ""; }, 300);
        }
      };
    });

    document.getElementById("str-cancel").onclick = function() {
      if (window.DEEP_UI) window.DEEP_UI.closeModal();
    };

    function finish() {
      var avgC = results.congruent.length ? results.congruent.reduce((a, b) => a + b) / results.congruent.length : 0;
      var avgInc = results.incongruent.length ? results.incongruent.reduce((a, b) => a + b) / results.incongruent.length : 0;
      var interference = avgInc - avgC;
      
      var performanceResults = {
        avgCongruent: avgC,
        avgIncongruent: avgInc,
        interference: interference,
        rawScores: { interference: Math.round(interference) }
      };

      if (window.DEEP_QUIZ) {
        window.DEEP_QUIZ.completeInteractive("stroop", performanceResults);
      }
    }

    nextTrial();
  }
});
