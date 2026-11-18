// Small enhancements only: the site works without JavaScript.
(function () {
  "use strict";
  // Mobile menu
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Copy the install command
  var copy = document.querySelector(".copy");
  if (copy) {
    copy.addEventListener("click", function () {
      var text = copy.getAttribute("data-copy") || "";
      var done = function () {
        var old = copy.textContent;
        copy.textContent = "copied";
        setTimeout(function () { copy.textContent = old; }, 1400);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, function () {});
      } else {
        var ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (err) {}
        document.body.removeChild(ta);
      }
    });
  }

  if (!("IntersectionObserver" in window)) return;

  // Highlight the current section in the nav
  var links = {};
  document.querySelectorAll("nav a[href^='#']").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting && links[en.target.id]) {
        Object.keys(links).forEach(function (k) { links[k].classList.remove("active"); });
        links[en.target.id].classList.add("active");
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  Object.keys(links).forEach(function (id) {
    var s = document.getElementById(id);
    if (s) spy.observe(s);
  });
})();
