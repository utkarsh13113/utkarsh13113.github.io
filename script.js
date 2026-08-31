/* =========================================================
   UTKARSH BHARDWAJ — PORTFOLIO SCRIPTS
   Organized into small, focused functions. Each feature is
   initialized independently from initSite() at the bottom.
   ========================================================= */

/* ---------- Mobile navigation ---------- */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the mobile menu after a nav link is tapped
  menu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Active nav link on scroll ---------- */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-nav]');
  if (!sections.length || !navLinks.length) return;

  const linkFor = (id) => document.querySelector(`.nav-link[href="#${id}"]`);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('active'));
          const activeLink = linkFor(entry.target.id);
          if (activeLink) activeLink.classList.add('active');
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- Scroll reveal for elements with .reveal ---------- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ---------- Expandable "What I explored" / curiosity details ---------- */
function initExpandables() {
  const buttons = document.querySelectorAll('[data-expand]');
  buttons.forEach((btn) => {
    const panelId = btn.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    if (!panel) return;

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      panel.hidden = isOpen;
    });
  });
}

/* ---------- Resume download placeholder ---------- */
function initResumeDownload() {
  const link = document.getElementById('resumeDownload');
  if (!link || !link.hasAttribute('data-no-resume')) return;

  link.addEventListener('click', (e) => {
    e.preventDefault();
    // Once a real PDF is added (see comment near this button in index.html),
    // remove data-no-resume and point href at the PDF file — this handler
    // will then be skipped entirely.
    alert('Resume PDF is not connected yet. Add the file and update the link in index.html.');
  });
}

/* ---------- Smooth-scroll for in-page anchor links (fallback for older browsers) ---------- */
function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });
}

/* ---------- Init ---------- */
function initSite() {
  initMobileNav();
  initActiveNavHighlight();
  initScrollReveal();
  initExpandables();
  initResumeDownload();
  initSmoothAnchors();
}

document.addEventListener('DOMContentLoaded', initSite);