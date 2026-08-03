/* ==========================================================================
   MODAL — the paper reveal experience for a single day
   ========================================================================== */

const Modal = (function () {
  let overlayEl, paperEl, lastFocused;
  let currentDay = null;

  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function ensureOverlay() {
    if (overlayEl) return;

    overlayEl = el(`
      <div class="overlay" role="presentation">
        <div class="overlay__flap" aria-hidden="true">
          <div class="overlay__flap-shape"></div>
        </div>
        <div class="paper" role="dialog" aria-modal="true" aria-labelledby="paper-title">
          <button class="paper__close" type="button" aria-label="Close letter">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
          <p class="paper__eyebrow" id="paper-eyebrow"></p>
          <h2 class="paper__title" id="paper-title"></h2>
          <div class="paper__body" id="paper-body"></div>
          <nav class="paper__nav" aria-label="Move between days">
            <button class="paper__nav-btn" id="paper-prev" type="button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
              Previous
            </button>
            <button class="paper__nav-btn" id="paper-next" type="button">
              Next
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </nav>
        </div>
      </div>
    `);

    document.body.appendChild(overlayEl);
    paperEl = overlayEl.querySelector(".paper");

    overlayEl.querySelector(".paper__close").addEventListener("click", close);
    overlayEl.addEventListener("click", (e) => {
      if (e.target === overlayEl) close();
    });
    document.addEventListener("keydown", (e) => {
      if (!overlayEl.classList.contains("is-active")) return;
      if (e.key === "Escape") close();
      if (e.key === "Tab") trapFocus(e);
    });

    overlayEl.querySelector("#paper-prev").addEventListener("click", () => navigate(-1));
    overlayEl.querySelector("#paper-next").addEventListener("click", () => navigate(1));
  }

  function trapFocus(e) {
    const focusable = paperEl.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function findDay(dayNumber) {
    return window.DAYS.find((d) => d.day === dayNumber);
  }

  function isReachable(dayNumber) {
    // A day is reachable in the nav strip if it's today or earlier (or override is on).
    const params = new URLSearchParams(window.location.search);
    if (params.get(CONFIG.debugUnlockParam) === "1") return dayNumber >= 1 && dayNumber <= window.DAYS.length;
    return dayNumber >= 1 && dayNumber <= Calendar.currentDayNumber();
  }

  function render(dayNumber) {
    const day = findDay(dayNumber);
    if (!day) return;
    currentDay = dayNumber;

    const eyebrow = overlayEl.querySelector("#paper-eyebrow");
    const title = overlayEl.querySelector("#paper-title");
    const body = overlayEl.querySelector("#paper-body");

    eyebrow.textContent = `Day ${String(day.day).padStart(2, "0")} of 29`;
    title.textContent = day.title || defaultTitleFor(day);
    body.innerHTML = DayTemplates.render(day);

    const prevBtn = overlayEl.querySelector("#paper-prev");
    const nextBtn = overlayEl.querySelector("#paper-next");
    prevBtn.disabled = !isReachable(dayNumber - 1);
    nextBtn.disabled = !isReachable(dayNumber + 1);

    // Reset scroll position for the new letter.
    overlayEl.scrollTop = 0;
  }

  function defaultTitleFor(day) {
    const titles = {
      quote: "A Passing Thought",
      photo: "A Kept Photo",
      gallery: "A Handful of Moments",
      audio: "A Voice Note",
      video: "A Small Film",
      list: "A Short List",
      mixed: "A Folded Note"
    };
    return titles[day.type] || `Day ${day.day}`;
  }

  function navigate(delta) {
    const target = currentDay + delta;
    if (!isReachable(target)) return;
    render(target);
  }

  function open(dayNumber) {
    ensureOverlay();
    lastFocused = document.activeElement;
    render(dayNumber);
    overlayEl.classList.add("is-active");
    document.body.style.overflow = "hidden";
    // Move focus into the dialog once the entrance animation settles.
    setTimeout(() => overlayEl.querySelector(".paper__close").focus(), 320);
  }

  function close() {
    if (!overlayEl) return;
    overlayEl.classList.remove("is-active");
    document.body.style.overflow = "";
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  return { open, close };
})();

window.Modal = Modal;
