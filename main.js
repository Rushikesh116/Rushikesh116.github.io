// Small enhancements only: the site works without JavaScript.
(function () {
  "use strict";
  var root = document.documentElement;

  // Theme toggle. The label names the theme you will switch to.
  var theme = document.querySelector(".theme");
  function label() {
    if (theme) theme.textContent = root.getAttribute("data-theme") === "dark" ? "Light" : "Dark";
  }
  label();
  if (theme) {
    theme.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      label();
    });
  }

  // Expand or collapse every project
  var expand = document.querySelector(".expand");
  var items = document.querySelectorAll(".index details");
  function sync() {
    if (!expand) return;
    var anyClosed = Array.prototype.some.call(items, function (d) { return !d.open; });
    expand.textContent = anyClosed ? "Expand all" : "Collapse all";
  }
  if (expand) {
    expand.addEventListener("click", function () {
      var anyClosed = Array.prototype.some.call(items, function (d) { return !d.open; });
      items.forEach(function (d) { d.open = anyClosed; });
      sync();
    });
    items.forEach(function (d) { d.addEventListener("toggle", sync); });
    sync();
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

  // Mark the current section in the nav
  if (!("IntersectionObserver" in window)) return;
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
