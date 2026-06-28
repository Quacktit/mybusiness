/* ============================================================
   AdaptWeb Studio — Global JavaScript
   Shared behavior for every page: mobile nav, active-link state,
   scroll reveals, current year, and form handling helpers.
   Page-specific scripts live in their own /js/<page>.js file.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  function initNavToggle() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when a nav link is tapped (mobile)
    links.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Highlight current page in nav ---------- */
  function initActiveNavLink() {
    var path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(function (link) {
      var href = link.getAttribute("href");
      if (href === path) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------- Reveal-on-scroll ---------- */
  function initScrollReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Auto-update footer year ---------- */
  function initFooterYear() {
    var yearEls = document.querySelectorAll("[data-current-year]");
    var year = new Date().getFullYear();
    yearEls.forEach(function (el) { el.textContent = year; });
  }

  /* ---------- Sticky header shadow on scroll ---------- */
  function initHeaderScrollState() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    function update() {
      if (window.scrollY > 8) {
        header.style.boxShadow = "0 1px 0 rgba(11,31,58,0.06)";
      } else {
        header.style.boxShadow = "none";
      }
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  /* ---------- Shared form validation helpers ----------
     Page scripts (e.g. contact.js) call these rather than
     re-implementing validation per page.
  ---------------------------------------------------------- */
  var AdaptWeb = window.AdaptWeb || {};

  AdaptWeb.isValidEmail = function (value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  };

  AdaptWeb.showFormStatus = function (statusEl, message, type) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.classList.remove("is-success", "is-error");
    statusEl.classList.add("is-visible", type === "error" ? "is-error" : "is-success");
  };

  AdaptWeb.validateRequiredFields = function (form) {
    var requiredFields = form.querySelectorAll("[required]");
    var firstInvalid = null;

    requiredFields.forEach(function (field) {
      var value = (field.value || "").trim();
      var isEmail = field.type === "email";
      var valid = value.length > 0 && (!isEmail || AdaptWeb.isValidEmail(value));

      field.classList.toggle("field-invalid", !valid);
      if (!valid && !firstInvalid) firstInvalid = field;
    });

    return firstInvalid;
  };

  window.AdaptWeb = AdaptWeb;

  /* ---------- Init on DOM ready ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initActiveNavLink();
    initScrollReveal();
    initFooterYear();
    initHeaderScrollState();
  });
})();
