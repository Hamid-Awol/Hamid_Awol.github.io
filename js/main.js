/**
 * ============================================================
 * PORTFOLIO MAIN JAVASCRIPT
 * Hamid Awol — Fullstack Developer Portfolio
 * ============================================================
 */

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // ============================================================
  // 1. PRELOADER
  // ============================================================
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", function () {
    setTimeout(function () {
      preloader.classList.add("hide");
      setTimeout(function () {
        preloader.remove();
      }, 600);
    }, 1000);
  });

  // ============================================================
  // 2. FOOTER YEAR
  // ============================================================
  const footerYear = document.getElementById("footerYear");
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // ============================================================
  // 3. DARK MODE
  // ============================================================
  const html = document.getElementById("htmlRoot");
  const darkIcons = [
    document.getElementById("darkIcon"),
    document.getElementById("darkIconMobile"),
  ];

  function applyTheme(isDark) {
    html.classList.toggle("dark-theme", isDark);
    darkIcons.forEach(function (icon) {
      if (icon) {
        icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
      }
    });
  }

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme === "dark" || (!savedTheme && prefersDark));

  // Dark mode toggle buttons
  const darkToggle = document.getElementById("darkToggle");
  const darkToggleMobile = document.getElementById("darkToggleMobile");

  function toggleDarkMode() {
    const isDark = html.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    darkIcons.forEach(function (icon) {
      if (icon) {
        icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
      }
    });
  }

  if (darkToggle) darkToggle.addEventListener("click", toggleDarkMode);
  if (darkToggleMobile)
    darkToggleMobile.addEventListener("click", toggleDarkMode);

  // ============================================================
  // 4. NAVBAR SCROLL EFFECT
  // ============================================================
  const navbar = document.querySelector(".navbar");
  window.addEventListener(
    "scroll",
    function () {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    },
    { passive: true }
  );

  // ============================================================
  // 5. ACTIVE NAV LINK
  // ============================================================
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener(
    "scroll",
    function () {
      let current = "";
      sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 130;
        if (window.scrollY >= sectionTop) {
          current = section.id;
        }
      });
      navLinks.forEach(function (link) {
        link.classList.toggle(
          "active-link",
          link.getAttribute("href") === "#" + current
        );
      });
    },
    { passive: true }
  );

  // ============================================================
  // 6. MOBILE NAV AUTO-CLOSE
  // ============================================================
  document.querySelectorAll("#navMenu .nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      const navMenu = document.getElementById("navMenu");
      const collapse = bootstrap.Collapse.getInstance(navMenu);
      if (collapse) {
        collapse.hide();
      }
    });
  });

  // ============================================================
  // 7. BACK TO TOP BUTTON
  // ============================================================
  const backToTop = document.getElementById("backToTop");
  window.addEventListener(
    "scroll",
    function () {
      if (window.scrollY > 300) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    },
    { passive: true }
  );

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ============================================================
  // 8. TYPING ANIMATION
  // ============================================================
  const phrases = [
    "Fullstack Developer",
    "React & Node.js Specialist",
    "AI App Builder",
    "UI/UX Enthusiast",
    "Problem Solver",
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedElement = document.getElementById("typed-text");

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      // Typing
      typedElement.textContent = currentPhrase.slice(0, ++charIndex);
      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
    } else {
      // Deleting
      typedElement.textContent = currentPhrase.slice(0, --charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    const delay = isDeleting ? 50 : 95;
    setTimeout(typeEffect, delay);
  }

  typeEffect();

  // ============================================================
  // 9. FADE-IN ON SCROLL
  // ============================================================
  const fadeElements = document.querySelectorAll(".fade-in");
  const fadeObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12 }
  );

  fadeElements.forEach(function (el) {
    fadeObserver.observe(el);
  });

  // ============================================================
  // 10. SKILL BARS ANIMATION
  // ============================================================
  const skillObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const width = entry.target.dataset.width;
          entry.target.style.width = width + "%";
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll(".skill-fill").forEach(function (el) {
    skillObserver.observe(el);
  });

  // ============================================================
  // 11. STAT COUNTERS ANIMATION
  // ============================================================
  function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentValue = Math.floor(progress * target);
      element.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  const counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".stat-number[data-count]").forEach(function (el) {
    counterObserver.observe(el);
  });

  // ============================================================
  // 12. TOAST NOTIFICATION
  // ============================================================
  function showToast(message, isError = false) {
    const toast = document.getElementById("toastMsg");
    toast.textContent = message;
    toast.classList.toggle("error", isError);
    toast.classList.add("show");

    setTimeout(function () {
      toast.classList.remove("show");
    }, 3500);
  }

  // ============================================================
  // 13. CONTACT FORM
  // ============================================================
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("cname").value.trim();
    const email = document.getElementById("cemail").value.trim();
    const message = document.getElementById("cmsg").value.trim();

    // Validation
    if (!name) {
      showToast("Please enter your name.", true);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast("Please enter a valid email address.", true);
      return;
    }

    if (!message) {
      showToast("Please write a message.", true);
      return;
    }

    // Simulate sending
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm"></span> Sending...';

    // Simulate API call
    setTimeout(function () {
      showToast("Message sent successfully! I will reply soon.");
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML =
        '<i class="fa-solid fa-paper-plane"></i> Send Message';
    }, 1500);
  });

  // ============================================================
  // 14. SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        event.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ============================================================
  // 15. KEYBOARD SHORTCUT: ESCAPE TO CLOSE CV MODAL
  // ============================================================
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeCvModal();
    }
  });
}); // End DOMContentLoaded

// ============================================================
// 16. CV DROPDOWN FUNCTIONS (Global)
// ============================================================
function toggleCvDropdown() {
  const dropdown = document.getElementById("cvDropdown");
  dropdown.classList.toggle("open");

  // Close dropdown when clicking outside
  document.addEventListener("click", function closeDropdown(event) {
    if (!event.target.closest(".cv-btn-group")) {
      dropdown.classList.remove("open");
      document.removeEventListener("click", closeDropdown);
    }
  });
}

// ============================================================
// 17. CV MODAL FUNCTIONS (Global)
// ============================================================
function openCvModal() {
  // Close dropdown first
  document.getElementById("cvDropdown").classList.remove("open");

  const modal = document.getElementById("cvModal");
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
  modal.scrollTop = 0;
}

function closeCvModal() {
  const modal = document.getElementById("cvModal");
  modal.classList.remove("open");
  document.body.style.overflow = "";
}
