/* ==========================================================================
   CALENDAR — builds the 29-envelope garland and manages lock state
   ========================================================================== */

const Calendar = (function () {
  const OPENED_KEY = "29days-opened-days";

  function dayCountBetween(a, b) {
    const MS_DAY = 24 * 60 * 60 * 1000;
    const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.round((utcB - utcA) / MS_DAY);
  }

  function getUnlockAllOverride() {
    const params = new URLSearchParams(window.location.search);
    return params.get(CONFIG.debugUnlockParam) === "1";
  }

  /** Returns the day number (1-29) that is "today" relative to startDate, or 0/30 if outside range. */
  function currentDayNumber() {
    const start = new Date(CONFIG.startDate + "T00:00:00");
    const today = new Date();
    const diff = dayCountBetween(start, today);
    return diff + 1; // Day 1 == start date
  }

  function getOpenedSet() {
    try {
      const raw = localStorage.getItem(OPENED_KEY);
      return new Set(raw ? JSON.parse(raw) : []);
    } catch (e) {
      return new Set();
    }
  }

  function markOpened(dayNumber) {
    const set = getOpenedSet();
    set.add(dayNumber);
    try {
      localStorage.setItem(OPENED_KEY, JSON.stringify([...set]));
    } catch (e) {
      /* localStorage unavailable — non-fatal, state just won't persist */
    }
  }

  function stateFor(dayNumber, todayNum, unlockAll, openedSet) {
    if (unlockAll) return dayNumber === todayNum ? "today" : openedSet.has(dayNumber) ? "opened" : "unlocked";
    if (dayNumber > todayNum) return "locked";
    if (dayNumber === todayNum) return "today";
    return openedSet.has(dayNumber) ? "opened" : "unlocked";
  }

  function build(container, onOpen) {
    const todayNum = currentDayNumber();
    const unlockAll = getUnlockAllOverride();
    const openedSet = getOpenedSet();
    const days = window.DAYS;

    // --- Geometry ---
    const trackWidth = Math.min(container.clientWidth || 640, 780);
    const stepY = 128;
    const amplitude = trackWidth * 0.28;
    const { points, svgPath, height } = PathGeometry.build(days.length, trackWidth, stepY, amplitude);

    container.style.height = `${height}px`;

    // --- SVG thread behind the nodes ---
    // A dim dashed thread runs the full length; a solid gold thread overlays
    // it up to "today," so progress reads at a glance.
    const litUpTo = Math.max(0, Math.min(todayNum, days.length));
    let litPath = "";
    if (unlockAll) {
      litPath = svgPath;
    } else if (litUpTo > 0) {
      litPath = PathGeometry.toSmoothPath(points.slice(0, litUpTo));
    }

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "path-track__svg");
    svg.setAttribute("viewBox", `0 0 ${trackWidth} ${height}`);
    svg.setAttribute("preserveAspectRatio", "none");
    svg.innerHTML = `
      <defs>
        <linearGradient id="thread-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#C9A24B" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#6E2436" stop-opacity="0.5" />
        </linearGradient>
      </defs>
      <path class="path-track__line" d="${svgPath}"></path>
      ${litPath ? `<path class="path-track__line path-track__line--lit" d="${litPath}"></path>` : ""}
    `;
    container.appendChild(svg);

    // --- Nodes ---
    const frag = document.createDocumentFragment();

    days.forEach((day, i) => {
      const state = stateFor(day.day, todayNum, unlockAll, openedSet);
      const point = points[i];

      const node = document.createElement("div");
      node.className = `day-node day-node--${state}`;
      node.style.setProperty("--x", `${point.x}px`);
      node.style.setProperty("--y", `${point.y}px`);
      node.dataset.day = day.day;

      const isInteractive = state !== "locked";
      const label = state === "today" ? "Today" : `Day ${day.day}`;

      node.innerHTML = `
        <button
          class="day-node__btn"
          type="button"
          ${isInteractive ? "" : "disabled aria-disabled=\"true\""}
          aria-label="${state === "locked" ? `Day ${day.day}, locked until its date arrives` : `Day ${day.day}${state === "today" ? ", today" : ""}, ${state === "opened" ? "already opened" : "tap to open"}`}"
        >
          <span class="envelope">
            <span class="envelope__seal">${day.day}</span>
            ${state === "locked" ? `<span class="lock-icon" aria-hidden="true">${lockSvg()}</span>` : ""}
          </span>
          <span class="day-node__label">${label}</span>
        </button>
      `;

      const btn = node.querySelector("button");
      if (isInteractive) {
        btn.addEventListener("click", () => {
          markOpened(day.day);
          node.classList.remove("day-node--unlocked");
          if (state !== "today") node.classList.add("day-node--opened");
          onOpen(day.day);
        });
      } else {
        btn.addEventListener("click", () => onLockedTap(day.day, todayNum));
      }

      frag.appendChild(node);
    });

    container.appendChild(frag);

    return { todayNum, totalDays: days.length };
  }

  function onLockedTap(dayNumber, todayNum) {
    const daysLeft = dayNumber - todayNum;
    const word = daysLeft === 1 ? "day" : "days";
    UI.showToast(`This one opens in ${daysLeft} ${word}. Patience — it's part of the gift.`);
  }

  function lockSvg() {
    return `<svg viewBox="0 0 24 24"><path d="M6 10V8a6 6 0 1 1 12 0v2h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h1zm2 0h8V8a4 4 0 0 0-8 0v2z"/></svg>`;
  }

  return { build, currentDayNumber, getOpenedSet };
})();

window.Calendar = Calendar;
