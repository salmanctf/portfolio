document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  // --- Theme Toggle Functionality ---
  const themeToggle = document.getElementById("theme-toggle");
  const mobileThemeToggle = document.getElementById("mobile-theme-toggle");
  const html = document.documentElement;

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }

  function toggleTheme() {
    html.classList.toggle("dark");
    if (html.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }

  themeToggle.addEventListener("click", toggleTheme);
  mobileThemeToggle.addEventListener("click", toggleTheme);

  // --- Mobile Menu Functionality ---
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  function toggleMobileMenu() {
    mobileMenu.classList.toggle("hidden");
  }

  mobileMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMobileMenu();
  });

  // Close mobile menu on link click
  mobileNavLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });

  // Close mobile menu on outside click or Escape key
  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      mobileMenu.classList.add("hidden");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
    }
  });

  // --- Active Navigation Tracking ---
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px", // Triggers when section is comfortably in view
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.remove("active-nav");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active-nav");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // --- Project Category Filtering ---
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Update active button classes
      filterBtns.forEach(b => {
        b.classList.remove("bg-gray-900", "text-white", "dark:bg-white", "dark:text-gray-900");
        b.classList.add("bg-gray-100", "text-gray-600", "dark:bg-gray-800", "dark:text-gray-300");
      });
      
      btn.classList.add("bg-gray-900", "text-white", "dark:bg-white", "dark:text-gray-900");
      btn.classList.remove("bg-gray-100", "text-gray-600", "dark:bg-gray-800", "dark:text-gray-300");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
          card.style.display = "block";
          // Small timeout to allow display:block to apply before animating opacity
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300); // Matches transition duration
        }
      });
    });
  });

  // --- Footer Current Year ---
  document.getElementById("year").textContent = new Date().getFullYear();

  // --- Back to Top Button ---
  const backToTopBtn = document.getElementById("back-to-top");
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});