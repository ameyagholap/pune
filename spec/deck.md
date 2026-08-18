# Pune Sightseeing Deck — spec

A mobile-first, swipeable slide deck (pure HTML/CSS/JS, no build step, no
frameworks) that acts as a pocket walking guide to historic Pune.

## Structure

- `index.html` — static shell: intro slide, about-Pune slide, index slide.
  Sight slides are injected at runtime by `js/app.js`.
- `css/styles.css` — all styling. Warm Peshwa-era palette (maroon/terracotta/
  gold on cream). Desktop/tablet gets a centered "phone" card; phones get the
  full viewport.
- `js/app.js` — swipe engine + all rendering. Touch drag with axis-lock (so
  vertical scroll inside a slide's content area doesn't fight the swipe),
  click/keyboard-arrow fallback for desktop, hash-based deep links
  (`#sight-id`) so a slide can be linked/reloaded directly.
- `data/about-pune.js` — `window.ABOUT_PUNE` (history prose, blank-line
  separated paragraphs) and optionally `window.ABOUT_PUNE_IMAGE` (reused as
  the intro slide's background photo).
- `data/sights-batch-*.js` — each defines `window.SIGHTS_BATCH_X`, an array
  of sight objects (see shape below). `app.js` concatenates every batch, in
  file-include order, into one `SIGHTS` array — **that concatenated order is
  the display order.**
- `images/` — one photo per sight, downloaded locally (not hotlinked) so the
  deck works offline and never breaks when a source page changes. Preferred
  source: Wikimedia Commons, for stable URLs + open licensing. Each image's
  credit/license is stored on its sight object and shown as a small overlay
  caption on the photo. **Resize/compress before committing** — source
  downloads from Commons can be 4-11 MB; this deck's images are downscaled to
  a 1600px long edge at JPEG quality ~78 (brought the full set from ~57 MB to
  ~3.7 MB), which keeps things mobile-friendly. When adding a new sight,
  resize its photo the same way before wiring it in.

## Sight object shape

```js
{
  id: "kebab-case-slug",       // stable identity, used for #hash deep links
  name: "Commonly Known Name", // resolved from the raw Google Maps address
  mapQuery: "...",             // fed into a maps.google.com search URL — no API key/embed
  about: "...",                // significance / what it is
  whatToNotice: "...",         // specific things to look for on a visit
  folklore: "...",             // legend or fun fact
  image: "images/slug.jpg",
  credit: "Source, license"
}
```

## Sequencing (important — will change over time)

Slide numbering is **never hardcoded**. It's computed from array position at
render time: intro/about/index are always slides 1–3, and each sight's
number is `4 + its index` in the concatenated `SIGHTS` array. Ameya may
insert new sights **at the beginning** of the sequence later — to do that,
just add/reorder entries in the batch data files (or add a new
`data/sights-batch-*.js` file and include it in `index.html` before/after
the existing ones); every slide number and the index-slide list update
automatically, no other code changes needed.

## Audio ("Listen" button)

Each sight slide has a Listen/Stop button using the browser's built-in
`SpeechSynthesis` (Web Speech API) — no plugin, no audio files, no network
call. It reads `name` + `about` + `whatToNotice` + `folklore` aloud. The
button is only rendered if `"speechSynthesis" in window` (feature-detected
once at load). Speech is stopped whenever the slide changes (`goTo()` calls
`stopSpeech()`), so audio never keeps playing after a swipe to another
sight. Voice/quality is whatever the device's OS/browser provides — this is
a deliberate tradeoff for zero cost and zero build step over higher-quality
pre-generated audio files.

## Deliberate non-goals

- No embedded Google Maps iframe (would need an API key/billing) — sight
  slides link out to Maps instead.
- No build tooling/bundler — plain `<script>` tags, opens directly via
  `file://` or any static file server.
