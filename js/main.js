/* ==========================================================================
   MAIN — application bootstrap
   ========================================================================== */

(function () {
  document.addEventListener("DOMContentLoaded", () => {
    hydrateStaticText();
    AmbientAudio.init();
    wireLanding();
    wireParallax();
    renderCalendarWhenReady();
  });

  function hydrateStaticText() {
    document.title = CONFIG.siteTitle;
    setText("[data-site-title]", CONFIG.siteTitle);
    setText("[data-landing-subtitle]", CONFIG.landingSubtitle);
    setText("[data-landing-meta]", CONFIG.landingMeta);
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((elm) => {
      if (value) elm.textContent = value;
    });
  }

  function wireLanding() {
    const enterBtn = document.getElementById("enter-btn");
    const landing = document.getElementById("landing-screen");
    const calendarScreen = document.getElementById("calendar-screen");

    enterBtn.addEventListener("click", () => {
      AmbientAudio.play();
      landing.classList.add("screen--leaving");
      setTimeout(() => {
        landing.hidden = true;
        calendarScreen.hidden = false;
        calendarScreen.scrollIntoView({ behavior: "instant", block: "start" });
      }, 520);
    });
  }

  // Gentle parallax on the landing title/subtitle, driven by pointer position.
  // Disabled entirely for reduced-motion users and skipped on touch-only devices.
  function wireParallax() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (prefersReducedMotion || !canHover) return;

    const layer = document.getElementById("landing-parallax");
    if (!layer) return;

    let raf = null;
    document.getElementById("landing-screen").addEventListener("mousemove", (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const { innerWidth: w, innerHeight: h } = window;
        const dx = (e.clientX / w - 0.5) * 10;
        const dy = (e.clientY / h - 0.5) * 10;
        layer.style.transform = `translate(${dx}px, ${dy}px)`;
        raf = null;
      });
    });
  }

  function renderCalendarWhenReady() {
    const track = document.getElementById("path-track");
    const progressEl = document.getElementById("calendar-progress");

    const { todayNum, totalDays } = Calendar.build(track, (dayNumber) => Modal.open(dayNumber));

    const clamped = Math.max(0, Math.min(todayNum, totalDays));
    if (todayNum <= 0) {
      progressEl.textContent = `The first letter opens soon.`;
    } else if (todayNum > totalDays) {
      progressEl.textContent = `All ${totalDays} letters are open. Happy birthday.`;
    } else {
      progressEl.textContent = `Day ${clamped} of ${totalDays} — ${totalDays - clamped} to go.`;
    }

    // Rebuild the garland geometry on meaningful resize (debounced),
    // so the thread and nodes stay aligned at any viewport width.
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        track.innerHTML = "";
        Calendar.build(track, (dayNumber) => Modal.open(dayNumber));
      }, 200);
    });
  }
})();