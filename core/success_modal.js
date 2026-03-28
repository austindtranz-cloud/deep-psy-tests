/* ═══════════════════════════════════════════
   DEEP PSY TESTS — SUCCESS MODAL (User GSAP version)
   ═══════════════════════════════════════════ */
(function () {
    "use strict";

    var overlayHtml = `
<div class="deep-success-overlay" id="deep-success-overlay" style="display:none;" aria-hidden="true">
    <div class="deep-success-modal" role="dialog" aria-modal="true" aria-labelledby="deep-success-title">
        <div class="deep-success-icon-wrap" id="deep-success-icon-wrap" aria-hidden="true">
            <svg class="deep-success-icon-svg" viewBox="0 0 80 80">
                <!-- Контейнер для частиц -->
                <g id="gsap-particles"></g>
                <circle class="deep-success-circle" cx="40" cy="40" r="30"></circle>
                <path class="deep-success-check" d="M28 40.5L36.5 49L53 32.5"></path>
            </svg>
        </div>

        <h4 id="deep-success-title">Спасибо, ваш запрос принят</h4>
        <p id="deep-success-text">
            Мы уже получили данные. Если потребуется, администратор свяжется с вами, чтобы уточнить детали.
        </p>

        <button type="button" class="deep-success-btn" id="deep-success-close">Хорошо</button>
    </div>
</div>

<style>
/* Скрываем стандартный success Tilda */
.js-successbox,
.t-form__successbox {
    display: none !important;
}

/* Унификация box-sizing, чтобы кнопка не вылетала */
.deep-success-overlay,
.deep-success-overlay *,
.deep-success-modal,
.deep-success-modal * {
    box-sizing: border-box !important;
}

/* Overlay */
.deep-success-overlay {
    position: fixed;
    inset: 0;
    z-index: 99999999 !important;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: rgba(0, 0, 0, 0.58);
    backdrop-filter: blur(7px);
    -webkit-backdrop-filter: blur(7px);
    opacity: 0;
    transition: opacity 0.32s ease;
}

.deep-success-overlay.active {
    opacity: 1;
}

/* Modal */
.deep-success-modal {
    width: 100%;
    max-width: 460px;
    background: rgba(10, 10, 10, 0.96) !important;
    border: 1px solid rgba(232, 214, 179, 0.14) !important;
    border-radius: 16px !important;
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.58) !important;
    padding: 30px 26px 22px !important;
    font-family: 'Manrope', Arial, sans-serif !important;
    color: #FFFFFF !important;
    text-align: center !important;
    transform: translateY(14px) scale(0.985);
    transition: transform 0.32s ease, opacity 0.32s ease;
    overflow: hidden !important;
}

.deep-success-overlay.active .deep-success-modal {
    transform: translateY(0) scale(1);
}

/* Icon */
.deep-success-icon-wrap {
    width: 80px;
    height: 80px;
    margin: 0 auto 18px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: scale(0.92);
    opacity: 0; /* Контролируется через GSAP */
}

.deep-success-icon-svg {
    width: 80px;
    height: 80px;
    overflow: visible;
}

.deep-success-circle,
.deep-success-check {
    fill: none;
    stroke: #E8D6B3;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.deep-success-circle {
    stroke-width: 2.2;
    stroke-dasharray: 190;
    stroke-dashoffset: 190;
}

.deep-success-check {
    stroke-width: 2.8;
    stroke-dasharray: 36;
    stroke-dashoffset: 36;
}

/* Text */
.deep-success-modal h4 {
    margin: 0 0 10px 0 !important;
    font-size: 27px !important;
    line-height: 1.14 !important;
    font-weight: 600 !important;
    letter-spacing: -0.02em !important;
    color: #F4F4F4 !important;
    text-align: center !important;
}

.deep-success-modal p {
    margin: 0 auto 22px auto !important;
    font-size: 15px !important;
    line-height: 1.65 !important;
    color: rgba(255, 255, 255, 0.70) !important;
    max-width: 360px;
    text-align: center !important;
}

/* Button */
.deep-success-btn {
    display: block !important;
    width: 100% !important;
    max-width: 100% !important;
    min-height: 54px !important;
    margin: 0 !important;
    border: none !important;
    outline: none !important;
    background: #E8D6B3 !important;
    color: #161616 !important;
    border-radius: 8px !important;
    padding: 15px 20px !important;
    font-family: inherit !important;
    font-size: 15px !important;
    line-height: 1.2 !important;
    font-weight: 600 !important;
    letter-spacing: 0 !important;
    text-align: center !important;
    cursor: pointer !important;
    transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease !important;
    box-shadow: inset 0 0 0 1px rgba(17,17,17,0.04);
}

.deep-success-btn:hover {
    background: #ddcaa5 !important;
    transform: translateY(-1px);
}

.deep-success-btn:active {
    transform: translateY(0);
}

@media (max-width: 640px) {
    .deep-success-overlay {
        padding: 16px;
    }

    .deep-success-modal {
        max-width: 100%;
        padding: 24px 18px 18px !important;
        border-radius: 14px !important;
    }

    .deep-success-icon-wrap,
    .deep-success-icon-svg {
        width: 72px;
        height: 72px;
    }

    .deep-success-modal h4 {
        font-size: 23px !important;
    }

    .deep-success-modal p {
        font-size: 14px !important;
        max-width: none;
    }

    .deep-success-btn {
        min-height: 50px !important;
        font-size: 14px !important;
    }
}
</style>
`;

    var SETTINGS = {
        title: 'Спасибо, ваш запрос принят',
        text: 'Мы уже получили данные. Если потребуется, администратор свяжется с вами, чтобы уточнить детали.',
        button: 'Хорошо',
        popupCloseDelay: 220,
        duplicateGuardMs: 1200
    };

    var overlay = null;
    var closeBtn = null;
    var recentHandled = new WeakMap();

    function isVisible(el) {
        return !!(el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length));
    }

    function initModalText() {
        var title = document.getElementById('deep-success-title');
        var text = document.getElementById('deep-success-text');
        var button = document.getElementById('deep-success-close');

        if (title) title.textContent = SETTINGS.title;
        if (text) text.textContent = SETTINGS.text;
        if (button) button.textContent = SETTINGS.button;
    }

    function playGsapAnimation() {
        if (typeof gsap === 'undefined') return;

        var wrap = document.getElementById('gsap-particles');
        if (wrap && wrap.innerHTML === '') {
            var dots = '';
            for(var i = 0; i < 40; i++) {
                dots += '<circle class="p-dot" cx="40" cy="40" r="1.5" fill="#E8D6B3" stroke="none"></circle>';
            }
            wrap.innerHTML = dots;
        }

        var pts = [];
        for(var j = 0; j < 40; j++) {
            var a = (j * (360 / 40)) * (Math.PI / 180);
            pts.push({ x: 40 + 30 * Math.cos(a), y: 40 + 30 * Math.sin(a) });
        }

        gsap.killTweensOf(['.deep-success-icon-wrap', '.deep-success-circle', '.deep-success-check', '.p-dot']);
        
        gsap.set('.deep-success-icon-wrap', { opacity: 1, scale: 1 });
        gsap.set('.deep-success-circle', { strokeDasharray: 190, strokeDashoffset: 190, opacity: 0 });
        gsap.set('.deep-success-check', { strokeDasharray: 36, strokeDashoffset: 36 });

        var tl = gsap.timeline();
        tl.fromTo('.p-dot', 
            { x: function() { return gsap.utils.random(-150, 150); }, y: function() { return gsap.utils.random(-150, 150); }, opacity: 0, scale: 1 }, 
            { x: function(i) { return pts[i].x - 40; }, y: function(i) { return pts[i].y - 40; }, opacity: 1, duration: 0.7, ease: "power3.out" }
        )
        .to('.p-dot', { opacity: 0, scale: 0, duration: 0.2, stagger: 0.01 })
        .to('.deep-success-circle', { strokeDashoffset: 0, opacity: 1, stroke: '#22c55e', duration: 0.3 }, "-=0.3")
        .to('.deep-success-check', { strokeDashoffset: 0, stroke: '#22c55e', duration: 0.4, ease: "back.out(2)" }, "-=0.1");

        /* Перекрашиваем кнопку в зелёный */
        var btn = document.getElementById('deep-success-close');
        if (btn) {
            btn.style.background = '#22c55e';
            btn.style.color = '#fff';
        }
    }

    function showModal() {
        if (!overlay) return;

        overlay.classList.remove('active');
        void overlay.offsetWidth;

        overlay.style.display = 'flex';
        overlay.setAttribute('aria-hidden', 'false');

        requestAnimationFrame(function () {
            overlay.classList.add('active');
            playGsapAnimation();
        });
    }

    function hideModal() {
        if (!overlay) return;

        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');

        setTimeout(function () {
            overlay.style.display = 'none';
        }, 320);
    }

    function wasHandledRecently(form) {
        if (!form || !recentHandled) return false;
        var now = Date.now();
        var last = recentHandled.get(form) || 0;

        if (now - last < SETTINGS.duplicateGuardMs) {
            return true;
        }

        try { recentHandled.set(form, now); } catch (e) {}
        return false;
    }

    function resetFormState(form) {
        setTimeout(function () {
            try {
                form.reset();
            } catch (e) {}

            var formBlock = form.closest('.t-form');
            if (!formBlock) return;

            var successBoxes = formBlock.querySelectorAll('.js-successbox, .t-form__successbox');
            successBoxes.forEach(function (box) {
                box.style.display = 'none';
            });

            var inputsBox = formBlock.querySelector('.t-form__inputsbox');
            if (inputsBox) {
                inputsBox.style.display = 'block';
            }

            var fields = form.querySelectorAll('input, textarea, select');
            fields.forEach(function (field) {
                field.classList.remove('t-input-error', 'js-tilda-rule-error');
                field.removeAttribute('aria-invalid');
                field.disabled = false;
            });

            var errorNodes = formBlock.querySelectorAll('.t-input-error');
            errorNodes.forEach(function (node) {
                node.textContent = '';
                node.style.display = 'none';
            });
        }, 60);
    }

    function closePopupIfNeeded(form) {
        var popupSelectors = '.t-popup, .t-store__prod-popup, .t706__cartwin, .t396__popup';
        var closeSelectors = [
            'a[href="#closepopup"]',
            '[href="#closepopup"]',
            '.t-popup__close',
            '.t-popup__close-wrapper',
            '.t-store__prod-popup__close',
            '.t706__close',
            '[data-tooltip-close="yes"]'
        ].join(',');

        var popup = form.closest(popupSelectors);

        if (!popup || !isVisible(popup)) {
            var visiblePopups = Array.from(document.querySelectorAll(popupSelectors)).filter(isVisible);
            popup = visiblePopups.length ? visiblePopups[visiblePopups.length - 1] : null;
        }

        if (popup) {
            var closeInside = Array.from(popup.querySelectorAll(closeSelectors)).find(isVisible);
            if (closeInside) {
                closeInside.click();
                return true;
            }
        }

        var globalClose = Array.from(document.querySelectorAll(closeSelectors)).filter(isVisible).pop();
        if (globalClose) {
            globalClose.click();
            return true;
        }

        var visiblePopupsFallback = Array.from(document.querySelectorAll(popupSelectors)).filter(isVisible);
        if (visiblePopupsFallback.length) {
            visiblePopupsFallback.forEach(function (item) {
                item.style.display = 'none';
                item.classList.remove('t-popup_show', 't-popup_showed', 't706__cartwin_show', 't-store__prod-popup_show');
            });

            document.body.classList.remove('t-body_scroll-locked', 't-popup-noscroll');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            return true;
        }

        return false;
    }

    function handleSuccess(form) {
        if (!form) return;
        if (window.jQuery && form instanceof window.jQuery) form = form.get(0);
        if (!(form instanceof HTMLElement)) return;
        if (wasHandledRecently(form)) return;

        resetFormState(form);

        var popupClosed = closePopupIfNeeded(form);

        setTimeout(function () {
            showModal();
        }, popupClosed ? SETTINGS.popupCloseDelay : 80);
    }

    function bindForm(form) {
        if (!form || form.dataset.deepSuccessBound === '1') return;
        form.dataset.deepSuccessBound = '1';

        form.addEventListener('tildaform:aftersuccess', function () {
            handleSuccess(form);
        });
    }

    function bindAllForms(root) {
        var scope = root || document;
        var forms = scope.querySelectorAll('.js-form-proccess');
        forms.forEach(bindForm);
    }

    function observeNewForms() {
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                mutation.addedNodes.forEach(function (node) {
                    if (!node || node.nodeType !== 1) return;

                    if (node.matches && node.matches('.js-form-proccess')) {
                        bindForm(node);
                    }

                    if (node.querySelectorAll) {
                        bindAllForms(node);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function initModalEvents() {
        overlay = document.getElementById('deep-success-overlay');
        closeBtn = document.getElementById('deep-success-close');

        if (!overlay || !closeBtn) return;

        closeBtn.addEventListener('click', hideModal);

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                hideModal();
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) {
                hideModal();
            }
        });
    }

    function loadGsap(callback) {
        if (typeof gsap !== 'undefined') {
            if (callback) callback();
            return;
        }
        var script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
        script.onload = function() { if (callback) callback(); };
        document.head.appendChild(script);
    }

    function initZeroBlockFallback() {
        var previousT396 = window.t396_onSuccess;

        window.t396_onSuccess = function (form) {
            if (typeof previousT396 === 'function') {
                try {
                    previousT396(form);
                } catch (e) {}
            }

            handleSuccess(form);
        };
    }

    function init() {
        if (!document.getElementById("deep-success-overlay")) {
            var wrap = document.createElement("div");
            wrap.innerHTML = overlayHtml;
            document.body.appendChild(wrap);
        }
        
        initModalEvents();
        initModalText();
        bindAllForms(document);
        observeNewForms();
        initZeroBlockFallback();
    }

    // Export a manual trigger function for the Deep Psy Tests core engine 
    window.deepShowSuccessModal = function (title, text) {
        init();
        var overlay = document.getElementById("deep-success-overlay");
        var titleEl = document.getElementById("deep-success-title");
        var textEl = document.getElementById("deep-success-text");

        if (title && titleEl) titleEl.textContent = title;
        if (text && textEl) textEl.textContent = text;

        if (!overlay) return;
        overlay.classList.remove('active');
        void overlay.offsetWidth;
        overlay.style.display = 'flex';
        overlay.setAttribute('aria-hidden', 'false');

        requestAnimationFrame(function () {
            overlay.classList.add('active');
            loadGsap(playGsapAnimation);
        });
    };

    if (document.readyState !== 'loading') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
})();
