/* ============================================================
   Portfolio page script — category filtering for project grid.
   ============================================================ */

(function () {
  "use strict";

  function initPortfolioFilter() {
    var buttons = document.querySelectorAll(".filter-btn");
    var cards = document.querySelectorAll(".portfolio-card");
    if (!buttons.length || !cards.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var category = btn.getAttribute("data-filter");

        buttons.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");

        cards.forEach(function (card) {
          var cardCategory = card.getAttribute("data-category");
          var shouldShow = category === "all" || cardCategory === category;
          card.classList.toggle("is-hidden", !shouldShow);
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", initPortfolioFilter);
})();
