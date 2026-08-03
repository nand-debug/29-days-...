/* ==========================================================================
   AUDIO PLAYER — subtle background music, user-controlled (never autoplay)
   ========================================================================== */

const AmbientAudio = (function () {
  let audioEl, playing = false;
  let hasSeeked = false;

  function init() {
    if (!CONFIG.music || !CONFIG.music.src) return;

    audioEl = document.createElement("audio");
    audioEl.src = CONFIG.music.src;
    audioEl.loop = true;
    audioEl.preload = "none";
    audioEl.volume = 0.35;
    document.body.appendChild(audioEl);

    // Jump to the configured start point as soon as the browser knows the
    // track's duration. Only happens once — after that it plays/loops
    // naturally from wherever it is.
    audioEl.addEventListener("loadedmetadata", () => {
      seekToStart();
    });

    document.querySelectorAll("[data-sound-toggle]").forEach((btn) => {
      btn.hidden = false;
      btn.addEventListener("click", toggle);
      btn.setAttribute("aria-label", `Play ${CONFIG.music.label || "background music"}`);
    });
  }

  function seekToStart() {
    const startAt = Number(CONFIG.music.startAt) || 0;
    if (hasSeeked || startAt <= 0) return;
    if (startAt < audioEl.duration) {
      audioEl.currentTime = startAt;
    }
    hasSeeked = true;
  }

  function setPlayingUI(isPlaying) {
    document.querySelectorAll("[data-sound-toggle]").forEach((btn) => {
      btn.classList.toggle("is-playing", isPlaying);
      btn.setAttribute("aria-pressed", String(isPlaying));
    });
  }

  // Starts playback from CONFIG.music.startAt. Call this from a real user
  // gesture (a click/tap) — browsers block audio with sound otherwise.
  function play() {
    if (!audioEl || playing) return;
    playing = true;

    const begin = () => {
      if (!hasSeeked) seekToStart();
      audioEl.play().catch(() => { playing = false; setPlayingUI(false); });
      setPlayingUI(true);
    };

    // If metadata isn't loaded yet (preload="none"), wait for it so the
    // seek actually lands before playback starts.
    if (audioEl.readyState >= 1) {
      begin();
    } else {
      audioEl.addEventListener("loadedmetadata", begin, { once: true });
      audioEl.load();
    }
  }

  function toggle() {
    if (!audioEl) return;
    if (playing) {
      playing = false;
      audioEl.pause();
      setPlayingUI(false);
    } else {
      play();
    }
  }

  return { init, play };
})();

window.AmbientAudio = AmbientAudio;