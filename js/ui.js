/* ==========================================================================
   UI — small shared helpers used across modules
   ========================================================================== */

const UI = (function () {
  let toastEl, hideTimer;

  function ensureToast() {
    if (toastEl) return;
    toastEl = document.createElement("div");
    toastEl.className = "toast";
    toastEl.setAttribute("role", "status");
    toastEl.setAttribute("aria-live", "polite");
    document.body.appendChild(toastEl);
  }

  function showToast(message, duration = 2600) {
    ensureToast();
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => toastEl.classList.remove("is-visible"), duration);
  }

  return { showToast };
})();

window.UI = UI;
