// This guide is designed for mobile phones only. Every page includes this
// script as early as possible in <head> (before its stylesheet/content) so
// desktop-width visitors are stopped before the page renders.
//
// Detection is viewport-width based, matching the existing desktop
// breakpoint used across css/*.css (`@media (min-width: 720px)`) — a
// browser window narrower than that is treated as mobile.
//
// The landing page (index.html) sets `window.IS_LANDING_PAGE = true` in an
// inline <script> before this file loads, so it can show an in-page
// "please switch to mobile" message instead of redirecting to itself.
// Every other page redirects to index.html, whose own guard then shows
// that same message.
(function () {
  "use strict";
  var DESKTOP_BREAKPOINT = 720;

  if (window.innerWidth < DESKTOP_BREAKPOINT) return;

  if (window.IS_LANDING_PAGE) {
    document.documentElement.setAttribute("data-desktop-blocked", "true");
    return;
  }

  location.replace("index.html");
})();
