/* ==========================================================================
   PATH — geometry for "The Path of 29 Nights"
   ==========================================================================
   Produces a gentle S-curve of (x, y) points, one per day, and an SVG
   path string threading through them. Kept separate from calendar.js so
   the math can be tuned independently of the DOM building.
   -------------------------------------------------------------------------- */

const PathGeometry = (function () {
  /**
   * @param {number} count      number of nodes (days)
   * @param {number} trackWidth width of the containing track, in px
   * @param {number} stepY      vertical distance between nodes, in px
   * @param {number} amplitude  how far left/right the garland sways, in px
   * @returns {{points: {x:number,y:number}[], svgPath: string, height: number}}
   */
  function build(count, trackWidth, stepY, amplitude) {
    const midX = trackWidth / 2;
    const points = [];

    for (let i = 0; i < count; i++) {
      const y = stepY * (i + 1) - stepY / 2;
      // Two gentle waves across the full length, so it reads as a ribbon
      // rather than a rigid zig-zag.
      const x = midX + Math.sin((i / (count - 1)) * Math.PI * 2.1) * amplitude;
      points.push({ x, y });
    }

    const svgPath = toSmoothPath(points);
    const height = stepY * count;

    return { points, svgPath, height };
  }

  // Catmull-Rom → cubic Bezier conversion for a smooth, hand-drawn thread.
  function toSmoothPath(points) {
    if (points.length < 2) return "";
    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  }

  return { build, toSmoothPath };
})();

window.PathGeometry = PathGeometry;
