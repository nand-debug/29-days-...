/* ==========================================================================
   TEMPLATES — turn a single day's data object into markup
   ==========================================================================
   Each function takes the day object and returns an HTML string. Add a new
   content type by adding a case in renderDayContent() plus a function here
   and a matching block in css/templates.css.
   -------------------------------------------------------------------------- */

const DayTemplates = (function () {
  // Minimal escaping for any text pulled into innerHTML — cheap insurance,
  // since this is your own data file but costs nothing to keep safe.
  function esc(str = "") {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function paragraphs(arr = []) {
    return arr.map((p) => `<p>${esc(p)}</p>`).join("");
  }

  function letter(day) {
    return `
      <div class="tpl-letter reveal">
        <div class="tpl-letter__text">${paragraphs(day.body)}</div>
        ${day.signature ? `<p class="tpl-letter__sign reveal reveal--delay-1">${esc(day.signature)}</p>` : ""}
      </div>`;
  }

  function photo(day) {
    return `
      <figure class="tpl-photo reveal">
        <div class="tpl-photo__frame">
          ${day.image ? `<img src="${esc(day.image)}" alt="${esc(day.caption || "A keepsake photo")}" loading="lazy">` : placeholderBlock()}
        </div>
        ${day.caption ? `<figcaption class="tpl-photo__caption">${esc(day.caption)}</figcaption>` : ""}
      </figure>`;
  }

  function gallery(day) {
    const items = (day.images || [])
      .map(
        (img) => `
        <figure class="tpl-gallery__item">
          <img src="${esc(img.src)}" alt="${esc(img.caption || "A keepsake photo")}" loading="lazy">
          ${img.caption ? `<span>${esc(img.caption)}</span>` : ""}
        </figure>`
      )
      .join("");
    return `<div class="tpl-gallery reveal">${items || placeholderBlock()}</div>`;
  }

  function audio(day) {
    const bars = Array.from({ length: 22 })
      .map((_, i) => `<span style="height:${8 + ((i * 7) % 34)}px; animation-delay:${(i * 0.07).toFixed(2)}s;"></span>`)
      .join("");
    return `
      <div class="tpl-audio reveal">
        <div class="tpl-audio__waveform" aria-hidden="true">${bars}</div>
        ${day.note ? `<p>${esc(day.note)}</p>` : ""}
        ${
          day.audioSrc
            ? `<audio controls preload="none" src="${esc(day.audioSrc)}">Your browser does not support audio playback.</audio>`
            : `<p class="sr-only">No audio file has been added for this day yet.</p>`
        }
      </div>`;
  }

  function video(day) {
    return `
      <div class="reveal">
        ${day.note ? `<p>${esc(day.note)}</p>` : ""}
        <div class="tpl-video__frame">
          ${
            day.videoSrc
              ? `<video controls preload="none" src="${esc(day.videoSrc)}">Your browser does not support video playback.</video>`
              : placeholderBlock()
          }
        </div>
      </div>`;
  }

  function quote(day) {
    return `
      <div class="tpl-quote reveal">
        <span class="tpl-quote__mark" aria-hidden="true">&ldquo;</span>
        <p class="tpl-quote__text">${esc(day.quote)}</p>
        ${day.attribution ? `<p class="tpl-quote__attr">${esc(day.attribution)}</p>` : ""}
      </div>`;
  }

  function list(day) {
    const items = (day.items || []).map((i) => `<li>${esc(i)}</li>`).join("");
    return `
      <div class="tpl-list reveal">
        ${day.intro ? `<p class="tpl-list__intro">${esc(day.intro)}</p>` : ""}
        <ol>${items}</ol>
      </div>`;
  }

  function mixed(day) {
    return `
      <div class="tpl-mixed reveal">
        <div class="tpl-mixed__text tpl-letter__text">${paragraphs(day.body)}
          ${day.signature ? `<p class="tpl-letter__sign">${esc(day.signature)}</p>` : ""}
        </div>
        <figure class="tpl-mixed__insert">
          ${day.image ? `<img src="${esc(day.image)}" alt="${esc(day.imageCaption || "A keepsake photo")}" loading="lazy">` : placeholderBlock()}
          ${day.imageCaption ? `<span>${esc(day.imageCaption)}</span>` : ""}
        </figure>
      </div>`;
  }

  function placeholderBlock() {
    return `<div class="sr-only">Add media for this day in js/data.js</div>`;
  }

  const RENDERERS = { letter, photo, gallery, audio, video, quote, list, mixed };

  function render(day) {
    const fn = RENDERERS[day.type] || letter;
    return fn(day);
  }

  return { render };
})();

window.DayTemplates = DayTemplates;
