/* ================================
   FRANCOIS DIGITAL — script.js simplifié
   Menu mobile + animations + retour haut
   Aucun formulaire, aucun service externe
   ================================ */

document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".site-nav a");
  const backToTopButton = document.querySelector(".back-to-top");
  const revealElements = document.querySelectorAll(".reveal");

  /* --------------------------------
     Menu mobile
  -------------------------------- */

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      const isOpen = siteNav.classList.toggle("is-open");

      navToggle.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute(
        "aria-label",
        isOpen ? "Fermer le menu" : "Ouvrir le menu"
      );
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        closeMobileMenu();
      });
    });

    document.addEventListener("click", function (event) {
      const clickInsideNav = siteNav.contains(event.target);
      const clickOnToggle = navToggle.contains(event.target);

      if (!clickInsideNav && !clickOnToggle) {
        closeMobileMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    });
  }

  function closeMobileMenu() {
    if (!siteNav || !navToggle) return;

    siteNav.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Ouvrir le menu");
  }

  /* --------------------------------
     Bouton retour en haut
  -------------------------------- */

  if (backToTopButton) {
    window.addEventListener(
      "scroll",
      throttle(function () {
        if (window.scrollY > 500) {
          backToTopButton.classList.add("is-visible");
        } else {
          backToTopButton.classList.remove("is-visible");
        }
      }, 120)
    );

    backToTopButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* --------------------------------
     Animations légères au scroll
  -------------------------------- */

  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("is-visible");
    });
  }

  /* --------------------------------
     Année automatique optionnelle
     Si tu ajoutes un élément avec data-year
  -------------------------------- */

  const yearElements = document.querySelectorAll("[data-year]");
  const currentYear = new Date().getFullYear();

  yearElements.forEach(function (element) {
    element.textContent = currentYear;
  });
});

/* --------------------------------
   Fonction utilitaire : throttle
   Évite d'exécuter trop souvent une action au scroll
-------------------------------- */

function throttle(callback, delay) {
  let lastCall = 0;

  return function () {
    const now = Date.now();

    if (now - lastCall >= delay) {
      lastCall = now;
      callback.apply(this, arguments);
    }
  };
}
