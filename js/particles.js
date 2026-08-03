/* ==========================================================================
   PARTICLES — ambient floating gold motes, vanilla canvas, GPU-friendly
   ==========================================================================
   Pauses automatically when the tab is hidden or the user prefers reduced
   motion, and scales particle count to screen size for performance.
   -------------------------------------------------------------------------- */

(function () {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let width, height, particles, dpr, rafId;
  let running = true;

  function countForScreen() {
    const area = window.innerWidth * window.innerHeight;
    // Roughly one particle per ~28,000px², capped for performance.
    return Math.min(70, Math.max(18, Math.round(area / 28000)));
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.4,
      speedY: Math.random() * 0.18 + 0.04,
      driftX: Math.random() * 0.3 - 0.15,
      alpha: Math.random() * 0.5 + 0.15,
      twinkle: Math.random() * Math.PI * 2
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: countForScreen() }, makeParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (const p of particles) {
      p.twinkle += 0.02;
      const flicker = (Math.sin(p.twinkle) + 1) / 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(228, 201, 120, ${(p.alpha * (0.5 + flicker * 0.5)).toFixed(3)})`;
      ctx.fill();

      p.y -= p.speedY;
      p.x += p.driftX;

      if (p.y < -4) {
        p.y = height + 4;
        p.x = Math.random() * width;
      }
      if (p.x < -4) p.x = width + 4;
      if (p.x > width + 4) p.x = -4;
    }
  }

  function loop() {
    if (!running) return;
    draw();
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    if (rafId) return;
    running = true;
    loop();
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  window.addEventListener("resize", () => {
    resize();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else if (!prefersReducedMotion) start();
  });

  init();

  // Respect reduced-motion: draw one static, faint frame and stop.
  if (prefersReducedMotion) {
    draw();
  } else {
    start();
  }
})();
