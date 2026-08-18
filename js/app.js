(function () {
  "use strict";

  // ---- data -------------------------------------------------------------
  // Sight order = display/sequence order. Reorder or insert entries in
  // data/sights-batch-a.js / data/sights-batch-b.js (or add a new batch file
  // and concat it below) to change the sequence — numbering is computed
  // fresh from array position every render, nothing is hardcoded.
  var SIGHTS = [].concat(window.SIGHTS_BATCH_A || [], window.SIGHTS_BATCH_B || [], window.SIGHTS_BATCH_C || []);

  var track = document.getElementById("track");
  var app = document.getElementById("app");
  var prevBtn = document.getElementById("prevBtn");
  var nextBtn = document.getElementById("nextBtn");
  var progressDots = document.getElementById("progressDots");
  var slideCounter = document.getElementById("slideCounter");
  var indexList = document.getElementById("indexList");
  var aboutContent = document.getElementById("aboutContent");
  var introBg = document.getElementById("introBg");

  var FIXED_SLIDES = 3; // intro, about, index
  var currentIndex = 0;
  var total = FIXED_SLIDES + SIGHTS.length;
  var SPEECH_SUPPORTED = "speechSynthesis" in window;

  // ---- render: about-pune -------------------------------------------------
  function renderAbout() {
    if (!window.ABOUT_PUNE) return;
    var paras = window.ABOUT_PUNE.trim().split(/\n\s*\n/);
    aboutContent.innerHTML = paras.map(function (p) {
      return "<p>" + p.trim() + "</p>";
    }).join("");
    if (window.ABOUT_PUNE_IMAGE) {
      introBg.classList.add("has-photo");
      introBg.style.setProperty("--intro-photo", "url('" + window.ABOUT_PUNE_IMAGE + "')");
    }
  }

  // ---- render: index slide -------------------------------------------------
  function renderIndex() {
    indexList.innerHTML = "";
    SIGHTS.forEach(function (sight, i) {
      var li = document.createElement("li");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "index-item";
      btn.setAttribute("data-goto", FIXED_SLIDES + i);
      btn.innerHTML =
        '<span class="index-num">' + (i + 1) + '</span>' +
        '<span class="index-name">' + sight.name + '</span>' +
        '<span class="index-chevron">›</span>';
      li.appendChild(btn);
      indexList.appendChild(li);
    });
  }

  // ---- render: sight slides -------------------------------------------------
  function mapsUrl(query) {
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(query);
  }

  function renderSights() {
    var frag = document.createDocumentFragment();
    SIGHTS.forEach(function (sight, i) {
      var section = document.createElement("section");
      section.className = "slide slide-sight";
      section.setAttribute("data-kind", "sight");
      section.setAttribute("data-hash", sight.id);

      section.innerHTML =
        '<header class="sight-header">' +
          '<div class="sight-header-top">' +
            '<span class="sight-eyebrow">Sight ' + (i + 1) + ' of ' + SIGHTS.length + '</span>' +
            '<button class="index-shortcut" type="button" aria-label="Back to index">' +
              '<span class="index-shortcut-icon">☰</span> Index' +
            '</button>' +
          '</div>' +
          '<h2>' + sight.name + '</h2>' +
          '<div class="sight-actions">' +
            '<a class="maps-link" target="_blank" rel="noopener" href="' + mapsUrl(sight.mapQuery) + '">' +
              '<span class="maps-pin">📍</span> Open in Google Maps' +
            '</a>' +
            (SPEECH_SUPPORTED ?
              '<button class="audio-btn" type="button" data-sight-id="' + sight.id + '" aria-label="Read this slide aloud">' +
                '<span class="audio-icon">🔊</span><span class="audio-text">Listen</span>' +
              '</button>'
              : ''
            ) +
          '</div>' +
        '</header>' +
        '<div class="sight-body">' +
          '<div class="sight-top">' +
            '<div class="sight-section"><h3>About</h3><p>' + sight.about + '</p></div>' +
            '<div class="sight-section"><h3>What to Notice</h3><p>' + sight.whatToNotice + '</p></div>' +
            '<div class="sight-section"><h3>Folklore &amp; Fun Facts</h3><p>' + sight.folklore + '</p></div>' +
          '</div>' +
          '<div class="sight-bottom">' +
            '<img src="' + sight.image + '" alt="' + sight.name + '" loading="lazy" ' +
              'onerror="this.style.display=\'none\';this.parentElement.style.background=\'linear-gradient(155deg,#5a221f,#93402d)\';">' +
            (sight.credit ? '<span class="photo-credit">' + sight.credit + '</span>' : '') +
          '</div>' +
        '</div>';

      frag.appendChild(section);
    });
    track.appendChild(frag);
  }

  // ---- audio (Web Speech API) -------------------------------------------------
  var activeAudioBtn = null;

  function setAudioBtnState(btn, playing) {
    btn.classList.toggle("playing", playing);
    btn.querySelector(".audio-icon").textContent = playing ? "⏹" : "🔊";
    btn.querySelector(".audio-text").textContent = playing ? "Stop" : "Listen";
    btn.setAttribute("aria-label", playing ? "Stop reading this slide" : "Read this slide aloud");
  }

  function stopSpeech() {
    if (!SPEECH_SUPPORTED) return;
    window.speechSynthesis.cancel();
    if (activeAudioBtn) setAudioBtnState(activeAudioBtn, false);
    activeAudioBtn = null;
  }

  function speakText(text, btn) {
    var utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.95;
    utter.onend = stopSpeech;
    utter.onerror = stopSpeech;
    activeAudioBtn = btn;
    setAudioBtnState(btn, true);
    window.speechSynthesis.speak(utter);
  }

  function textForAudioBtn(btn) {
    var sightId = btn.getAttribute("data-sight-id");
    if (sightId) {
      var sight = SIGHTS.find(function (s) { return s.id === sightId; });
      if (!sight) return "";
      return sight.name + ". " + sight.about +
        " What to notice: " + sight.whatToNotice +
        " Folklore and fun facts: " + sight.folklore;
    }
    if (btn.getAttribute("data-audio-source") === "about") {
      return window.ABOUT_PUNE || "";
    }
    return "";
  }

  if (SPEECH_SUPPORTED) {
    document.body.addEventListener("click", function (e) {
      var btn = e.target.closest(".audio-btn");
      if (!btn) return;
      if (activeAudioBtn === btn) { stopSpeech(); return; }
      var text = textForAudioBtn(btn);
      stopSpeech();
      if (text) speakText(text, btn);
    });
  } else {
    document.querySelectorAll(".audio-btn").forEach(function (el) { el.remove(); });
  }

  // ---- navigation -------------------------------------------------
  function slideKindAt(index) {
    var el = track.children[index];
    return el ? el.getAttribute("data-kind") : "sight";
  }

  function hashFor(index) {
    if (index === 0) return "";
    if (index === 1) return "about";
    if (index === 2) return "index";
    var sight = SIGHTS[index - FIXED_SLIDES];
    return sight ? sight.id : "";
  }

  function updateChrome() {
    var kind = slideKindAt(currentIndex);
    app.setAttribute("data-current-kind", kind);
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === total - 1;
    progressDots.style.setProperty("--progress", ((currentIndex + 1) / total * 100) + "%");
    slideCounter.textContent = (currentIndex + 1) + " / " + total;
  }

  function goTo(index, opts) {
    opts = opts || {};
    stopSpeech();
    currentIndex = Math.max(0, Math.min(total - 1, index));
    track.style.transform = "translateX(-" + (currentIndex * 100) + "%)";
    updateChrome();
    if (!opts.skipHash) {
      var h = hashFor(currentIndex);
      var url = h ? "#" + h : location.pathname + location.search;
      history.replaceState(null, "", url);
    }
  }

  function goToHash() {
    var h = location.hash.replace("#", "");
    if (!h) return goTo(0, { skipHash: true });
    if (h === "about") return goTo(1, { skipHash: true });
    if (h === "index") return goTo(2, { skipHash: true });
    var i = SIGHTS.findIndex(function (s) { return s.id === h; });
    if (i >= 0) return goTo(FIXED_SLIDES + i, { skipHash: true });
    goTo(0, { skipHash: true });
  }

  // ---- swipe / drag -------------------------------------------------
  var startX = 0, startY = 0, currentX = 0, lock = null;

  track.addEventListener("touchstart", function (e) {
    if (e.touches.length > 1) return;
    startX = currentX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    lock = null;
    track.classList.add("dragging");
  }, { passive: true });

  track.addEventListener("touchmove", function (e) {
    var t = e.touches[0];
    var dx = t.clientX - startX;
    var dy = t.clientY - startY;
    if (lock === null) {
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
        lock = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
      }
    }
    if (lock === "h") {
      if (e.cancelable) e.preventDefault();
      currentX = t.clientX;
      var basePercent = -currentIndex * 100;
      var dragPercent = (dx / window.innerWidth) * 100;
      // resist dragging past the first/last slide
      if ((currentIndex === 0 && dx > 0) || (currentIndex === total - 1 && dx < 0)) {
        dragPercent *= 0.35;
      }
      track.style.transform = "translateX(" + (basePercent + dragPercent) + "%)";
    }
  }, { passive: false });

  function endDrag() {
    track.classList.remove("dragging");
    if (lock === "h") {
      var dx = currentX - startX;
      var threshold = window.innerWidth * 0.16;
      if (dx < -threshold && currentIndex < total - 1) {
        goTo(currentIndex + 1);
      } else if (dx > threshold && currentIndex > 0) {
        goTo(currentIndex - 1);
      } else {
        goTo(currentIndex);
      }
    }
    lock = null;
  }

  track.addEventListener("touchend", endDrag);
  track.addEventListener("touchcancel", endDrag);

  // ---- buttons / keyboard / index taps -------------------------------------------------
  prevBtn.addEventListener("click", function () { goTo(currentIndex - 1); });
  nextBtn.addEventListener("click", function () { goTo(currentIndex + 1); });

  window.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") goTo(currentIndex + 1);
    else if (e.key === "ArrowLeft") goTo(currentIndex - 1);
  });

  indexList.addEventListener("click", function (e) {
    var btn = e.target.closest(".index-item");
    if (!btn) return;
    goTo(parseInt(btn.getAttribute("data-goto"), 10));
  });

  track.addEventListener("click", function (e) {
    var btn = e.target.closest(".index-shortcut");
    if (!btn) return;
    goTo(2); // the index slide is always the 3rd slide (after intro, about)
  });

  window.addEventListener("hashchange", goToHash);

  // ---- init -------------------------------------------------
  renderAbout();
  renderIndex();
  renderSights();
  total = FIXED_SLIDES + SIGHTS.length;
  goToHash();
})();
