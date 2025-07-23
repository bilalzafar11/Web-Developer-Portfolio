document.addEventListener("DOMContentLoaded", () => {
  // Smooth Scrolling for Anchor Links
  const links = document.querySelectorAll('a[href^="#"]');
  const header = document.querySelector("header");

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      const offset = header ? header.offsetHeight : 0;
      const position = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: position, behavior: "smooth" });
      history.pushState(null, "", link.getAttribute("href"));
    });
  });

  // Contact Form Validation
  const form = document.getElementById("contactForm");
  const messageBox = document.getElementById("formMessage");

  if (form) {
    form.addEventListener("submit", async e => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const button = form.querySelector("button[type='submit']");
      const emailPattern = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

      if (!name || !email || !message) {
        showMsg("All fields are required.", "error");
        return;
      }

      if (!emailPattern.test(email)) {
        showMsg("Enter a valid email address.", "error");
        return;
      }

      button.disabled = true;
      button.textContent = "Sending...";

      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        showMsg("Thanks for reaching out!", "success");
        form.reset();
      } catch {
        showMsg("Something went wrong. Please try again.", "error");
      } finally {
        button.disabled = false;
        button.textContent = "Send";
      }
    });

    function showMsg(text, type) {
      messageBox.textContent = text;
      messageBox.className = `form-message ${type}`;
      if (type === "success") {
        setTimeout(() => {
          messageBox.textContent = "";
          messageBox.className = "form-message";
        }, 4000);
      }
    }
  }

  // Scroll-to-Top Button
  const scrollBtn = document.getElementById("scrollToTopBtn");

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";

    // Navigation Highlighting
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href").slice(1) === section.id);
        });
      }
    });

    // Fade-In Animation
    document.querySelectorAll(".fade-in").forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 50) {
        el.classList.add("visible");
      }
    });
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Fade-In Observer
  const faders = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  faders.forEach(el => observer.observe(el));
});
