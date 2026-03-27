/* ═══════════════════════════════════════════
   DEEP PSY TESTS — SUCCESS MODAL v15.1
   GSAP-animated success popup.
   Uses Design System v4 (style.css).
   ═══════════════════════════════════════════ */
(function () {
  "use strict";

  var modalHtml = `
    <div class="deep-success-overlay" id="deep-success-overlay" aria-hidden="true">
      <div class="deep-success-modal">
        <div class="deep-success-icon-wrap" id="deep-success-icon-wrap">
          <svg class="deep-success-icon-svg" viewBox="0 0 80 80">
            <g id="gsap-particles"></g>
            <circle class="deep-success-circle" cx="40" cy="40" r="30"></circle>
            <path class="deep-success-check" d="M28 40.5L36.5 49L53 32.5"></path>
          </svg>
        </div>
        <h4 id="deep-success-title">Результаты отправлены!</h4>
        <p id="deep-success-text">PDF с результатами будет выслан на указанный e-mail. Мы свяжемся с вами в ближайшее время.</p>
        <button type="button" class="deep-btn deep-btn--primary" id="deep-success-close" style="width:100%">Хорошо</button>
      </div>
    </div>`;

  var gsapLoaded = false;
  var gsapLoading = false;

  function loadGsap(callback) {
    if (gsapLoaded || typeof gsap !== "undefined") {
      gsapLoaded = true;
      if (callback) callback();
      return;
    }
    if (gsapLoading) {
      if (callback) setTimeout(() => loadGsap(callback), 100);
      return;
    }
    gsapLoading = true;
    var script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    script.onload = () => { gsapLoaded = true; gsapLoading = false; if (callback) callback(); };
    document.head.appendChild(script);
  }

  function init() {
    if (document.getElementById("deep-success-overlay")) return;
    var wrap = document.createElement("div");
    wrap.innerHTML = modalHtml;
    document.body.appendChild(wrap);

    var overlay = document.getElementById("deep-success-overlay");
    var closeBtn = document.getElementById("deep-success-close");

    function hideModal() {
      overlay.classList.remove("active");
      setTimeout(() => { overlay.style.display = "none"; }, 300);
    }

    if (closeBtn) closeBtn.addEventListener("click", hideModal);
    if (overlay) overlay.addEventListener("click", (e) => { if (e.target === overlay) hideModal(); });
  }

  window.deepShowSuccessModal = function (title, text) {
    init();
    var overlay = document.getElementById("deep-success-overlay");
    var titleEl = document.getElementById("deep-success-title");
    var textEl = document.getElementById("deep-success-text");

    if (title && titleEl) titleEl.textContent = title;
    if (text && textEl) textEl.textContent = text;

    overlay.style.display = "flex";
    void overlay.offsetWidth;
    overlay.classList.add("active");

    loadGsap(() => playAnimation());
  };

  function playAnimation() {
    if (typeof gsap === "undefined") return;

    var wrap = document.getElementById("gsap-particles");
    if (wrap && wrap.innerHTML === "") {
      var dots = "";
      for (var i = 0; i < 30; i++) dots += '<circle class="p-dot" cx="40" cy="40" r="1.5" fill="var(--dt-accent)" opacity="0"></circle>';
      wrap.innerHTML = dots;
    }

    var pts = [];
    for (var j = 0; j < 30; j++) {
      var a = (j * (360 / 30)) * (Math.PI / 180);
      pts.push({ x: 40 + 35 * Math.cos(a), y: 40 + 35 * Math.sin(a) });
    }

    gsap.timeline()
      .set(".deep-success-icon-wrap", { opacity: 1, scale: 1 })
      .set(".deep-success-circle", { strokeDashoffset: 190, opacity: 0 })
      .set(".deep-success-check", { strokeDashoffset: 36 })
      .fromTo(".p-dot", 
        { x: 0, y: 0, opacity: 1 }, 
        { 
          x: (i, target, targets) => pts[i].x - 40, 
          y: (i, target, targets) => pts[i].y - 40, 
          opacity: 0, 
          duration: 0.8, 
          ease: "power2.out", 
          stagger: 0.01 
        }
      )
      .to(".deep-success-circle", { strokeDashoffset: 0, opacity: 1, duration: 0.4 }, "-=0.6")
      .to(".deep-success-check", { strokeDashoffset: 0, duration: 0.4, ease: "back.out(2)" }, "-=0.2");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
