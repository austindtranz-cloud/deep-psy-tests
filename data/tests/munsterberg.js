/**
 * DEEP PSY TESTS — TEST DATA: Münsterberg Attention Test
 * Interactive test to find hidden words in a random character string.
 */
window.DEEP_TESTS = window.DEEP_TESTS || {};
window.DEEP_TESTS["munsterberg"] = Object.assign(window.DEEP_TESTS["munsterberg"] || {}, {
  id: "munsterberg",
  type: "interactive",
  title: "Тест Мюнстерберга",
  shortTitle: "Внимание (Мюнстерберг)",
  description: "Оценка избирательности и концентрации внимания.",
  intro: "Перед вами строка из случайных букв. В ней спрятаны слова. Найдите и нажмите на каждое слово. У вас есть 2 минуты.",
  scales: {
    selectivity: { 
      title: "Избирательность внимания", 
      max: 25, 
      ranges: [
        { min: 0, max: 15, label: "Низкая" },
        { min: 16, max: 20, label: "Средняя" },
        { min: 21, max: 25, label: "Высокая" }
      ]
    }
  },

  renderInteractive: function(container, session) {
    var self = this;
    var timeLimit = 120; // 2 minutes
    var timeLeft = timeLimit;
    var foundCount = 0;
    
    // Character soup with hidden words
    var data = "бсолнцетвргспотыкнестатьюпакуствластьаокгцукпшдличностьапрлормсолнцеукпущпрофессияааопркарьеращщукппсихологиящукукрадостьдлопркатегориящукппрогрессщукппамятьщукпвниманиещукпэмоциящукукразвитиещукпстабильностьщукпгармониящукпздоровьещукпуспехщукпцельщукпэнергиящукпбалансщукпфундаментщукпструктуращукпсистема";
    var words = ["солнце", "статью", "власть", "личность", "профессия", "карьера", "психология", "радость", "категория", "прогресс", "память", "внимание", "эмоция", "развитие", "стабильность", "гармония", "здоровье", "успех", "цель", "энергия", "баланс", "фундамент", "структура", "система"];
    
    var foundWords = [];

    container.innerHTML = `
      <style>
        .munster-wrap { padding: 20px 0; text-align: center; }
        .munster-timer { font-size: 24px; font-weight: 700; margin-bottom: 20px; color: var(--dt-primary); }
        .munster-soup { 
          font-family: 'Courier New', monospace; 
          font-size: 18px; 
          line-height: 1.8; 
          letter-spacing: 2px; 
          text-align: justify; 
          background: var(--dt-card-bg); 
          padding: 20px; 
          border-radius: 12px; 
          border: 1px solid var(--dt-border);
          user-select: none;
          max-width: 600px;
          margin: 0 auto;
        }
        .munster-char { cursor: pointer; transition: color 0.2s; padding: 2px; }
        .munster-char:hover { color: var(--dt-primary); }
        .munster-char.active { background: var(--dt-primary-transparent); border-bottom: 2px solid var(--dt-primary); }
        .munster-char.found { color: var(--dt-success); font-weight: 700; text-decoration: underline; background: transparent; cursor: default; }
        .munster-feedback { margin-top: 20px; color: var(--dt-text-muted); min-height: 24px; }
      </style>
      <div class="munster-wrap">
        <div class="munster-timer" id="mun-timer">02:00</div>
        <div class="munster-soup" id="mun-soup"></div>
        <div class="munster-feedback" id="mun-feedback"></div>
        <div class="quiz-footer">
           <button class="deep-btn deep-btn--primary" id="mun-finish">Завершить</button>
           <button class="deep-btn deep-btn--outline" id="mun-cancel">Прервать</button>
        </div>
      </div>
    `;

    var soupEl = document.getElementById("mun-soup");
    var timerEl = document.getElementById("mun-timer");
    var feedbackEl = document.getElementById("mun-feedback");
    var selectedIndices = [];

    // Render soup letter by letter
    data.split("").forEach((char, idx) => {
      var span = document.createElement("span");
      span.className = "munster-char";
      span.textContent = char;
      span.dataset.idx = idx;
      span.onclick = function() {
        if (span.classList.contains("found")) return;
        
        if (span.classList.contains("active")) {
          span.classList.remove("active");
          selectedIndices = selectedIndices.filter(i => i !== idx);
        } else {
          span.classList.add("active");
          selectedIndices.push(idx);
          checkWord();
        }
      };
      soupEl.appendChild(span);
    });

    function checkWord() {
      if (selectedIndices.length < 3) return;
      selectedIndices.sort((a,b) => a-b);
      
      // Check if indices are contiguous
      var isContiguous = true;
      for (var i = 1; i < selectedIndices.length; i++) {
        if (selectedIndices[i] !== selectedIndices[i-1] + 1) { isContiguous = false; break; }
      }
      if (!isContiguous) return;

      var currentStr = selectedIndices.map(i => data[i]).join("");
      if (words.indexOf(currentStr) !== -1 && foundWords.indexOf(currentStr) === -1) {
        foundWords.push(currentStr);
        foundCount++;
        feedbackEl.textContent = "Найдено: " + currentStr;
        feedbackEl.style.color = "var(--dt-success)";
        
        selectedIndices.forEach(idx => {
          var el = soupEl.querySelector(`[data-idx="${idx}"]`);
          el.classList.remove("active");
          el.classList.add("found");
        });
        selectedIndices = [];
        
        if (foundCount === words.length) finish();
      }
    }

    var timerInterval = setInterval(() => {
      timeLeft--;
      var mins = Math.floor(timeLeft / 60);
      var secs = timeLeft % 60;
      timerEl.textContent = (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        finish();
      }
    }, 1000);

    document.getElementById("mun-finish").onclick = finish;
    document.getElementById("mun-cancel").onclick = function() {
      clearInterval(timerInterval);
      if (window.DEEP_UI) window.DEEP_UI.closeModal();
    };

    function finish() {
      clearInterval(timerInterval);
      var performanceResults = {
        foundCount: foundCount,
        foundWords: foundWords,
        timeLeft: timeLeft,
        rawScores: { selectivity: foundCount }
      };

      if (window.DEEP_QUIZ) {
        window.DEEP_QUIZ.completeInteractive("munsterberg", performanceResults);
      }
    }
  }
});
