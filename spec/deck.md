# Pune Sightseeing Deck — spec

A mobile-first, swipeable slide deck (pure HTML/CSS/JS, no build step, no
frameworks) that acts as a pocket walking guide to historic Pune.

## Structure

- `index.html` — static shell: intro slide, about-Pune slide, explore-hub
  slide, index slide. Sight slides are injected at runtime by `js/app.js`.
- `css/styles.css` — all styling. Warm Peshwa-era palette (maroon/terracotta/
  gold on cream). Includes the `.desktop-block` overlay (see "Mobile-only
  gate" below). The old desktop/tablet "centered phone card" rules
  (`@media (min-width: 720px)`) are still present as a no-JS fallback, but in
  practice a desktop-width visitor never reaches them — the mobile-only gate
  redirects/blocks first.
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

## Explore hub (slide 3)

Sits between About Pune and the index. Five entry points into the deck:
- **All Sights** — internal button (`.hub-card.index-shortcut`) that jumps to
  the index slide.
- **The Culinary Heritage of Pune** — external link (`target="_blank"`) to
  `food.html`, a separate standalone page (outside the swipe deck) listing
  Pune's legendary old eateries — see "Culinary Heritage page" below.
- **Walk: Manache 5 Ganpati** — external link to a `https://www.google.com/
  maps/dir/?api=1&origin=...&destination=...&waypoints=stop1%7Cstop2...
  &travelmode=walking` URL built by hand, following the mandals' traditional
  ceremonial order (Kasba → Tambdi Jogeshwari → Guruji Talim → Tulshibaug →
  Kesariwada), which also happens to flow well geographically. 5 stops fits
  safely within Google's documented waypoint caps (see below).
- **Walk: A Typical Pune City Walk** — external link to a `maps.app.goo.gl`
  short link **Ameya created directly in the Google Maps app** (not
  constructed by hand): `https://maps.app.goo.gl/eJ3b7uVjVSsJ6MVEA`, an
  11-stop walking route, Shaniwar Wada → Tambat Aali → Kasba Ganpati → Lal
  Mahal → Nana Wada → Bhausaheb Rangari Ganpati → Dagdusheth Halwai Ganpati
  → Tambdi Jogeshwari → Guruji Talim → Tulshibaug Ganpati → Sharada Ganesh
  Mandir (skips Mahatma Phule Mandai, since Sharada Ganesh Mandir sits right
  beside it). Because it's an app-native saved route rather than a
  hand-built `maps/dir` URL, it sidesteps the waypoint-count limitation
  entirely (see below) — **prefer this pattern over hand-building a
  `maps/dir` URL whenever a route has more than ~5 stops.**
  - **Known limitation (hand-built `maps/dir` URLs only):** Google's own
    docs cap that URL format at 3 waypoints on mobile browsers / 9
    otherwise (~5 / ~11 total stops). The 5-Ganpati link fits safely within
    this. Any future hand-built route with more stops should either stay
    under that cap, get split into multiple links, or — as done here —
    be authored as a real route in the Maps app and shared via its short
    link instead.
  - Both routes are **hardcoded place lists**, not derived from `SIGHTS`
    array position — so inserting/reordering sights elsewhere in the deck
    does not silently change who's on these walks. Update the URLs by hand
    in `index.html` if a walk's stops should change.
- **Call Ameya** — `https://wa.me/919545524246`, WhatsApp click-to-chat
  (no prefilled message — the visitor writes their own). Offers a local buddy
  ("Puneri") to show the visitor around in person.

## Back-to-index shortcut

Every sight slide's header, plus the hub's "All Sights" card, has a
`.index-shortcut` element that jumps straight to the index slide via
`goTo(INDEX_SLIDE)`, where `INDEX_SLIDE = FIXED_SLIDES - 1` (the index is
always the last of the fixed slides) — never hardcode its position.
Delegated click handler lives in `js/app.js` alongside the other navigation
listeners.

## Sequencing (important — will change over time)

Slide numbering is **never hardcoded**. It's computed from array position at
render time: intro/about/hub/index are always slides 1–4 (`FIXED_SLIDES =
4`), and each sight's number is `FIXED_SLIDES + its index` in the
concatenated `SIGHTS` array. Ameya may insert new sights **anywhere** in the
sequence later — to do that, just add/reorder entries in the batch data
files (or add a new `data/sights-batch-*.js` file and include it in
`index.html`); every slide number and the index-slide list update
automatically, no other code changes needed. (The two hub walking routes are
the one exception — see above, they're hardcoded place lists.)

## Audio ("Listen" button)

Every sight slide, plus the About Pune slide, has a Listen/Stop button using
the browser's built-in `SpeechSynthesis` (Web Speech API) — no plugin, no
audio files, no network call. A sight slide's button reads `name` +
`about` + `whatToNotice` + `folklore`; the About Pune button reads
`window.ABOUT_PUNE`. Sight buttons are identified by `data-sight-id`, the
About button by `data-audio-source="about"` — `textForAudioBtn()` in
`js/app.js` branches on whichever attribute is present. If
`"speechSynthesis" in window` is false (feature-detected once at load),
dynamic sight buttons are simply never rendered and the static About button
is removed from the DOM — no dead UI. Speech is stopped whenever the slide
changes (`goTo()` calls `stopSpeech()`), so audio never keeps playing after
a swipe to another slide. Voice/quality is whatever the device's OS/browser
provides — a deliberate tradeoff for zero cost and zero build step over
higher-quality pre-generated audio files.

## Mobile-only gate (`js/mobile-guard.js`)

The whole site is mobile-only by design. Every HTML page (`index.html`,
`food.html`, and any page added later) loads `js/mobile-guard.js` as the
very first `<script>` in `<head>` — before its stylesheet or any content —
so a desktop-width visitor is stopped before the page meaningfully renders.

- **Detection is viewport-width based**, not user-agent sniffing: a browser
  window narrower than 720px (the same breakpoint `css/*.css` already used
  for the old desktop/tablet layout) counts as mobile. A desktop browser
  resized narrow will pass; a real phone in landscape on a big tablet could
  in theory fail — accepted trade-off for simplicity, matches the existing
  CSS breakpoint exactly.
- **Non-landing pages** (`food.html`, future pages): if desktop-width,
  `location.replace("index.html")` — replace, not assign, so the blocked
  page doesn't sit in browser history.
- **The landing page** (`index.html`) can't redirect to itself, so it
  instead sets `window.IS_LANDING_PAGE = true` in an inline `<script>`
  immediately before loading `mobile-guard.js`. When desktop-width, the
  guard sets `data-desktop-blocked="true"` on `<html>` instead of
  redirecting; `css/styles.css`'s `.desktop-block` rules (gated on that
  attribute) show a full-screen "please open this on your phone" message
  and hide `#app`.
- **Adding a new page**: copy the same two lines used in `food.html`'s
  `<head>` (just the `<script src="js/mobile-guard.js"></script>`, no
  `IS_LANDING_PAGE` flag) as the first script tag, before any stylesheet.
- If JavaScript is disabled, the gate never runs and a desktop visitor
  falls through to the old CSS-only "centered phone card" layout instead of
  being blocked — a deliberate no-JS fallback rather than a broken page.

## Culinary Heritage page (`food.html`)

A separate, standalone page — not part of the swipeable deck — linked from
the explore hub (slide 3). Lists Pune's legendary old food joints ("the
OGs"): bakeries, misal stalls, Irani cafes, thali houses, several dating to
the pre-independence era. Deliberately **not ranked** — a plain numbered
list Ameya keeps adding to over time.

- `food.html` — page shell: hero header + `<ol id="foodList">`, populated at
  runtime by `js/food.js`.
- `css/food.css` — self-contained stylesheet (own `:root` token block,
  duplicated from `css/styles.css` rather than shared, since this is a
  normal scrolling page, not the fixed-viewport swipe app — sharing
  `styles.css` would inherit its `html, body { overflow: hidden; height:
  100vh }` rules). Single column on phones, two-column grid from 620px up.
- `data/food-joints.js` — `window.FOOD_JOINTS`, an array of joint objects
  (shape below). Array order = display/list order; numbering is computed
  from array position at render time, same convention as the sights list —
  never hardcoded. **Array order is also geographic**: sorted east to west
  by geocoded longitude (descending — highest `lng` first), so the list
  reads as a walk across the old city from Camp/Pune Station in the east to
  the river-side Peths in the west. When adding a new joint, geocode its
  `mapUrl` (resolve the short link to a `google.com/maps/place/...` URL and
  read the `!3d{lat}!4d{lng}` values out of it) and insert it wherever its
  `lng` falls in the descending sequence, rather than appending at the end.
- `js/food.js` — renders `FOOD_JOINTS` into `#foodList`.
- Images live at `images/food/<slug>.jpg`, downloaded locally and
  resized/compressed the same way as sight images (see Structure above).
  `scripts/resize-food-images.ps1` automates this: drop a raw source image
  in `images/food/` named `<slug>-orig.<ext>` (any format — it decodes via
  WPF/WIC, so JPEG/PNG/WebP all work) and run the script to produce
  `images/food/<slug>.jpg` at a 1600px long edge, JPEG quality 78, then
  delete the `-orig` file. `scripts/check-food-data.js` (run with `node`)
  sanity-checks that every `FOOD_JOINTS` entry's `image` path actually
  exists on disk — run it after editing `data/food-joints.js`.

### Food joint object shape

```js
{
  id: "kebab-case-slug",
  name: "Commonly Known Name",
  mapUrl: "https://maps.app.goo.gl/...", // Ameya's own Google Maps share link, used as-is
  lat: 18.5148,                          // geocoded from mapUrl, kept for re-sorting
  lng: 73.8800,                          // longitude drives sort order — see above
  established: "1930",                   // year or best-attested claim; "" if unknown
  mustTry: "item1, item2, item3",        // simple comma-separated string
  image: "images/food/slug.jpg",
  credit: "Source, license"              // "" if no photo / no attribution needed
}
```

## Deliberate non-goals

- No embedded Google Maps iframe (would need an API key/billing) — sight
  slides link out to Maps instead.
- No build tooling/bundler — plain `<script>` tags, opens directly via
  `file://` or any static file server.
