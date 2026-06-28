/* ============================================================
   Contact page script — form validation and submit handling.
   Uses shared helpers from window.AdaptWeb defined in global.js.
   No backend is wired up; this simulates a successful submit
   so the front-end can be connected to a real endpoint later.
   ============================================================ */

(function () {
  "use strict";

  function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    var statusEl = document.getElementById("form-status");
    var submitBtn = form.querySelector("[type='submit']");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var firstInvalid = window.AdaptWeb.validateRequiredFields(form);

      if (firstInvalid) {
        window.AdaptWeb.showFormStatus(
          statusEl,
          "Please fill in all required fields with a valid email address.",
          "error"
        );
        firstInvalid.focus();
        return;
      }

      // Simulate a network request. Replace this block with a real
      // fetch() call to your backend or form provider when ready.
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      setTimeout(function () {
        window.AdaptWeb.showFormStatus(
          statusEl,
          "Thanks — your message has been sent. We'll reply within two working days.",
          "success"
        );
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = "Send message";
      }, 900);
    });

    // Clear the invalid state as soon as the visitor starts fixing a field
    form.querySelectorAll("[required]").forEach(function (field) {
      field.addEventListener("input", function () {
        field.classList.remove("field-invalid");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", initContactForm);
})();
