/* ============================================================
   Services page script — FAQ accordion behavior.
   Relies on global.js having already run for nav/reveal setup.
   ============================================================ */

(function () {
  "use strict";

  function initFaqAccordion() {
    var items = document.querySelectorAll(".faq-item");
    if (!items.length) return;

    items.forEach(function (item) {
      var question = item.querySelector(".faq-question");
      var answer = item.querySelector(".faq-answer");
      if (!question || !answer) return;

      question.setAttribute("aria-expanded", "false");

      question.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");

        // Close any other open item for a clean single-open accordion
        items.forEach(function (other) {
          if (other !== item) {
            other.classList.remove("is-open");
            var otherAnswer = other.querySelector(".faq-answer");
            var otherQuestion = other.querySelector(".faq-question");
            if (otherAnswer) otherAnswer.style.maxHeight = null;
            if (otherQuestion) otherQuestion.setAttribute("aria-expanded", "false");
          }
        });

        if (isOpen) {
          item.classList.remove("is-open");
          answer.style.maxHeight = null;
          question.setAttribute("aria-expanded", "false");
        } else {
          item.classList.add("is-open");
          answer.style.maxHeight = answer.scrollHeight + "px";
          question.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", initFaqAccordion);
})();
