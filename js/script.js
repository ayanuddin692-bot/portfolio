/* Small progressive enhancements for the HTML5/CSS3 portfolio. */
(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
      });
    });
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");

  // Set your real business email here before publishing.
  const contactEmail = "YOUR_EMAIL@example.com";

  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      if (!contactEmail || contactEmail === "YOUR_EMAIL@example.com") {
        status.textContent = "Please configure your email in js/script.js before using this form. No message has been sent.";
        status.style.color = "#ffc18a";
        return;
      }

      const data = new FormData(form);
      const subject = `Portfolio inquiry: ${data.get("service")}`;
      const body = [
        `Name: ${data.get("name")}`,
        `Business: ${data.get("business") || "Not provided"}`,
        `Email: ${data.get("email")}`,
        `WhatsApp: ${data.get("phone") || "Not provided"}`,
        `Service: ${data.get("service")}`,
        "",
        "Project details:",
        data.get("details")
      ].join("\\n");

      status.textContent = "Opening your email application. Please review and send the prepared message there.";
      status.style.color = "#a8edc9";
      window.location.href = `mailto:${encodeURIComponent(contactEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  document.querySelectorAll("[data-service]").forEach((link) => {
    link.addEventListener("click", () => {
      const serviceSelect = document.querySelector('select[name="service"]');
      if (serviceSelect) serviceSelect.value = link.dataset.service;
    });
  });
})();
