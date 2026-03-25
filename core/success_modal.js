/* ═══════════════════════════════════════════
   DEEP PSY TESTS — SUCCESS MODAL v1
   GSAP-animated success popup.
   Replaces inline "✓ Отправлено" with rich modal.
   ═══════════════════════════════════════════ */
(function () {
  "use strict";

  /* ── Inject HTML + CSS into page ── */
  var modalHtml = '<div class="deep-success-overlay" id="deep-success-overlay" style="display:none;" aria-hidden="true">' +
    '<div class="deep-success-modal" role="dialog" aria-modal="true" aria-labelledby="deep-success-title">' +
      '<div class="deep-success-icon-wrap" id="deep-success-icon-wrap" aria-hidden="true">' +
        '<svg class="deep-success-icon-svg" viewBox="0 0 80 80">' +
          '<g id="gsap-particles"></g>' +
          '<circle class="deep-success-circle" cx="40" cy="40" r="30"></circle>' +
          '<path class="deep-success-check" d="M28 40.5L36.5 49L53 32.5"></path>' +
        '</svg>' +
      '</div>' +
      '<h4 id="deep-success-title">Результаты отправлены!</h4>' +
      '<p id="deep-success-text">PDF с результатами будет выслан на указанный e-mail. Если потребуется консультация, наш специалист свяжется с вами.</p>' +
      '<button type="button" class="deep-success-btn" id="deep-success-close">Хорошо</button>' +
    '</div>' +
  '</div>';

  var modalCss = '<style>' +
    '.deep-success-overlay,.deep-success-overlay *,.deep-success-modal,.deep-success-modal *{box-sizing:border-box!important}' +
    '.deep-success-overlay{position:fixed;inset:0;z-index:999999999!important;display:none;align-items:center;justify-content:center;padding:20px;background:rgba(0,0,0,.58);backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px);opacity:0;transition:opacity .32s ease}' +
    '.deep-success-overlay.active{opacity:1}' +
    '.deep-success-modal{width:100%;max-width:460px;background:rgba(10,10,10,.96)!important;border:1px solid rgba(232,214,179,.14)!important;border-radius:16px!important;box-shadow:0 24px 70px rgba(0,0,0,.58)!important;padding:30px 26px 22px!important;font-family:"Manrope",Arial,sans-serif!important;color:#fff!important;text-align:center!important;transform:translateY(14px) scale(.985);transition:transform .32s ease,opacity .32s ease;overflow:hidden!important}' +
    '.deep-success-overlay.active .deep-success-modal{transform:translateY(0) scale(1)}' +
    '.deep-success-icon-wrap{width:80px;height:80px;margin:0 auto 18px;display:flex;align-items:center;justify-content:center;transform:scale(.92);opacity:0}' +
    '.deep-success-icon-svg{width:80px;height:80px;overflow:visible}' +
    '.deep-success-circle,.deep-success-check{fill:none;stroke:#E8D6B3;stroke-linecap:round;stroke-linejoin:round}' +
    '.deep-success-circle{stroke-width:2.2;stroke-dasharray:190;stroke-dashoffset:190}' +
    '.deep-success-check{stroke-width:2.8;stroke-dasharray:36;stroke-dashoffset:36}' +
    '.deep-success-modal h4{margin:0 0 10px!important;font-size:27px!important;line-height:1.14!important;font-weight:600!important;letter-spacing:-.02em!important;color:#F4F4F4!important;text-align:center!important}' +
    '.deep-success-modal p{margin:0 auto 22px!important;font-size:15px!important;line-height:1.65!important;color:rgba(255,255,255,.70)!important;max-width:360px;text-align:center!important}' +
    '.deep-success-btn{display:block!important;width:100%!important;max-width:100%!important;min-height:54px!important;margin:0!important;border:none!important;outline:none!important;background:#E8D6B3!important;color:#161616!important;border-radius:8px!important;padding:15px 20px!important;font-family:inherit!important;font-size:15px!important;line-height:1.2!important;font-weight:600!important;text-align:center!important;cursor:pointer!important;transition:background .25s ease,transform .25s ease!important;white-space:normal!important;word-break:break-word!important}' +
    '.deep-success-btn:hover{background:#ddcaa5!important;transform:translateY(-1px)}' +
    '.deep-success-btn:active{transform:translateY(0)}' +
    '@media(max-width:640px){.deep-success-overlay{padding:16px}.deep-success-modal{max-width:100%;padding:24px 18px 18px!important;border-radius:14px!important}.deep-success-icon-wrap,.deep-success-icon-svg{width:72px;height:72px}.deep-success-modal h4{font-size:23px!important}.deep-success-modal p{font-size:14px!important;max-width:none}.deep-success-btn{min-height:50px!important;font-size:14px!important}}' +
  '</style>';

  /* GSAP will be loaded dynamically on demand to prevent blocking page load */
  var gsapLoaded = false;
  var gsapLoading = false;

  function loadGsap(callback) {
    if (gsapLoaded || typeof gsap !== "undefined") {
      gsapLoaded = true;
      if (callback) callback();
      return;
    }
    if (gsapLoading) {
      /* already loading, just wait a bit and retry callback */
      if (callback) setTimeout(function(){ loadGsap(callback); }, 100);
      return;
    }
    gsapLoading = true;
    var script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    script.onload = function() {
      gsapLoaded = true;
      gsapLoading = false;
      if (callback) callback();
    };
    script.onerror = function() { gsapLoading = false; };
    document.head.appendChild(script);
  }

  /* Inject modal HTML + CSS */
  document.addEventListener("DOMContentLoaded", function () {
    var wrap = document.createElement("div");
    wrap.innerHTML = modalCss + modalHtml;
    document.body.appendChild(wrap);

    var overlay = document.getElementById("deep-success-overlay");
    var closeBtn = document.getElementById("deep-success-close");

    function hideModal() {
      if (!overlay) return;
      overlay.classList.remove("active");
      overlay.setAttribute("aria-hidden", "true");
      setTimeout(function () { overlay.style.display = "none"; }, 320);
    }

    if (closeBtn) closeBtn.addEventListener("click", hideModal);
    if (overlay) overlay.addEventListener("click", function (e) { if (e.target === overlay) hideModal(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay && overlay.classList.contains("active")) hideModal();
    });
  });

  /* ── Public: show success modal ── */
  window.deepShowSuccessModal = function (title, text) {
    var overlay = document.getElementById("deep-success-overlay");
    if (!overlay) return;

    var titleEl = document.getElementById("deep-success-title");
    var textEl = document.getElementById("deep-success-text");
    if (title && titleEl) titleEl.textContent = title;
    if (text && textEl) textEl.textContent = text;

    overlay.classList.remove("active");
    void overlay.offsetWidth;
    overlay.style.display = "flex";
    overlay.setAttribute("aria-hidden", "false");

    requestAnimationFrame(function () {
      overlay.classList.add("active");
      loadGsap(function() {
        playGsapAnimation();
      });
    });
  };

  function playGsapAnimation() {
    if (typeof gsap === "undefined") {
      /* GSAP failed to load or not loaded yet — just show icon without animation */
      var wp = document.getElementById("deep-success-icon-wrap");
      if (wp) { wp.style.opacity = "1"; wp.style.transform = "scale(1)"; }
      return;
    }

    var wrap = document.getElementById("gsap-particles");
    if (wrap && wrap.innerHTML === "") {
      var dots = "";
      for (var i = 0; i < 40; i++) {
        dots += '<circle class="p-dot" cx="40" cy="40" r="1.5" fill="#E8D6B3" stroke="none"></circle>';
      }
      wrap.innerHTML = dots;
    }

    var pts = [];
    for (var j = 0; j < 40; j++) {
      var a = (j * (360 / 40)) * (Math.PI / 180);
      pts.push({ x: 40 + 30 * Math.cos(a), y: 40 + 30 * Math.sin(a) });
    }

    gsap.killTweensOf([".deep-success-icon-wrap", ".deep-success-circle", ".deep-success-check", ".p-dot"]);
    gsap.set(".deep-success-icon-wrap", { opacity: 1, scale: 1 });
    gsap.set(".deep-success-circle", { strokeDasharray: 190, strokeDashoffset: 190, opacity: 0 });
    gsap.set(".deep-success-check", { strokeDasharray: 36, strokeDashoffset: 36 });

    var tl = gsap.timeline();
    tl.fromTo(".p-dot",
      { x: function () { return gsap.utils.random(-150, 150); }, y: function () { return gsap.utils.random(-150, 150); }, opacity: 0, scale: 1 },
      { x: function (i) { return pts[i].x - 40; }, y: function (i) { return pts[i].y - 40; }, opacity: 1, duration: 0.7, ease: "power3.out" }
    )
    .to(".p-dot", { opacity: 0, scale: 0, duration: 0.2, stagger: 0.01 })
    .to(".deep-success-circle", { strokeDashoffset: 0, opacity: 1, duration: 0.3 }, "-=0.3")
    .to(".deep-success-check", { strokeDashoffset: 0, duration: 0.4, ease: "back.out(2)" }, "-=0.1");
  }
})();
