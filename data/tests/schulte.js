/**
 * DEEP PSY TESTS — TEST DATA: Schulte Tables (5x5)
 * Interactive performance test for attention.
 */
window.DEEP_TESTS = window.DEEP_TESTS || {};
window.DEEP_TESTS["schulte"] = Object.assign(window.DEEP_TESTS["schulte"] || {}, {
  id: "schulte",
  type: "interactive",
  title: "Таблицы Шульте",
  shortTitle: "Внимание (Шульте)",
  description: "Оценка устойчивости внимания и динамики работоспособности.",
  intro: "Вам будет предъявлена таблица 5x5 с числами от 1 до 25. Ваша задача — находить числа по порядку от 1 до 25 и нажимать на них как можно быстрее.",
  scales: {
    efficiency: { 
      title: "Эффективность работы (ER)", 
      max: 60, 
      ranges: [
        { min: 0, max: 30, label: "Высокая" },
        { min: 31, max: 45, label: "Средняя" },
        { min: 46, max: 60, label: "Низкая" },
        { min: 61, max: 999, label: "Очень низкая" }
      ]
    }
  },

  /* Custom Rendering Logic */
  renderInteractive: function(container, session) {
    var self = this;
    var nextNum = 1;
    var startTime = Date.now();
    var history = [];
    var lastNumTime = startTime;

    // Generate random sequence 1-25
    var numbers = [];
    for (var i = 1; i <= 25; i++) numbers.push(i);
    numbers.sort(() => Math.random() - 0.5);

    // Initial HTML structure
    container.innerHTML = `
      <style>
        .schulte-wrap { text-align: center; padding: 20px 0; }
        .schulte-grid { 
          display: grid; 
          grid-template-columns: repeat(5, 1fr); 
          gap: 10px; 
          max-width: 400px; 
          margin: 20px auto;
          aspect-ratio: 1/1;
        }
        .schulte-cell {
          background: var(--dt-card-bg);
          border: 1px solid var(--dt-border);
          color: var(--dt-text-main);
          font-size: 24px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s ease;
          user-select: none;
        }
        .schulte-cell:hover { border-color: var(--dt-primary); background: var(--dt-primary-transparent); }
        .schulte-cell:active { transform: scale(0.95); }
        .schulte-info { margin-bottom: 20px; font-size: 16px; color: var(--dt-text-muted); }
        .schulte-target { color: var(--dt-primary); font-size: 28px; font-weight: 700; margin: 0 5px; }
        .schulte-cell.found { opacity: 0.3; cursor: default; pointer-events: none; background: transparent; }
        
        @media (max-width: 480px) {
          .schulte-grid { gap: 6px; }
          .schulte-cell { font-size: 18px; border-radius: 4px; }
        }
      </style>
      <div class="schulte-wrap">
        <div class="schulte-info">Найдите число: <span class="schulte-target" id="sch-target">1</span></div>
        <div class="schulte-grid" id="sch-grid"></div>
        <div class="quiz-footer" style="padding: 20px 0 0 0">
           <button class="deep-btn deep-btn--outline" id="sch-cancel">Прервать</button>
        </div>
      </div>
    `;

    var gridEl = document.getElementById("sch-grid");
    var targetEl = document.getElementById("sch-target");
    
    // Fill the grid
    numbers.forEach(num => {
      var cell = document.createElement("div");
      cell.className = "schulte-cell";
      cell.textContent = num;
      cell.onclick = function() {
        if (num === nextNum) {
          var now = Date.now();
          history.push({ num: num, time: (now - lastNumTime) / 1000 });
          lastNumTime = now;
          
          cell.classList.add("found");
          nextNum++;
          
          if (nextNum > 25) {
            finish();
          } else {
            targetEl.textContent = nextNum;
          }
        } else {
          // Visual feedback for error
          cell.style.borderColor = "var(--dt-error)";
          setTimeout(() => { cell.style.borderColor = ""; }, 300);
        }
      };
      gridEl.appendChild(cell);
    });

    document.getElementById("sch-cancel").onclick = function() {
      if (window.DEEP_UI) window.DEEP_UI.closeModal();
    };

    function finish() {
      var totalTime = (Date.now() - startTime) / 1000;
      var er = totalTime; // Efficiency Ratio for one table is just the time
      
      var performanceResults = {
        totalTime: totalTime,
        er: er,
        history: history,
        rawScores: { efficiency: er }
      };

      if (window.DEEP_QUIZ) {
        window.DEEP_QUIZ.completeInteractive("schulte", performanceResults);
      }
    }
  }
});
