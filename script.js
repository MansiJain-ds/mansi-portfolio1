// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');
const revealElements = document.querySelectorAll('.reveal');
const cursorGlow = document.querySelector('.cursor-glow');
const heroBg = document.querySelector('.hero-bg');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navItems.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== SECTION REVEAL ANIMATION =====
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el) => sectionObserver.observe(el));

// ===== ACTIVE NAV LINK HIGHLIGHT =====
const updateActiveLink = () => {
  let current = 'home';

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 160 && rect.bottom >= 160) {
      current = section.id;
    }
  });

  navItems.forEach((link) => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${current}`
    );
  });
};

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

// ===== CURSOR GLOW EFFECT =====
window.addEventListener('pointermove', (event) => {
  if (!cursorGlow) return;

  cursorGlow.style.left = event.clientX + 'px';
  cursorGlow.style.top = event.clientY + 'px';
});

// ===== HERO PARALLAX EFFECT =====
window.addEventListener(
  'scroll',
  () => {
    if (!heroBg) return;
    const offset = window.scrollY * 0.08;
    heroBg.style.transform = `translateY(${offset}px)`;
  },
  { passive: true }
);
