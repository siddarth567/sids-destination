// ============================================
// SID'S DESTINATION — JAVASCRIPT
// ============================================

// ----- Navbar scroll effect -----
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Highlight active nav link
  const sections = ['home', 'about', 'videos', 'destinations', 'contact'];
  let current = 'home';

  sections.forEach(id => {
    const section = document.getElementById(id);
    if (section && window.scrollY >= section.offsetTop - 100) {
      current = id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ----- Hamburger menu -----
const hamburger = document.getElementById('hamburger');
const mobileNavLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = mobileNavLinks.style.display === 'flex';
  mobileNavLinks.style.display = isOpen ? 'none' : 'flex';
  mobileNavLinks.style.flexDirection = 'column';
  mobileNavLinks.style.position = 'absolute';
  mobileNavLinks.style.top = '68px';
  mobileNavLinks.style.left = '0';
  mobileNavLinks.style.right = '0';
  mobileNavLinks.style.background = 'rgba(13,17,23,0.98)';
  mobileNavLinks.style.padding = '16px';
  mobileNavLinks.style.gap = '4px';
  mobileNavLinks.style.zIndex = '999';
  mobileNavLinks.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
  mobileNavLinks.style.backdropFilter = 'blur(20px)';
});

// ----- Scroll Reveal -----
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => observer.observe(el));

// ----- Add reveal classes dynamically -----
function addRevealToElements() {
  const sections = [
    { selector: '.about-visual', delay: 0 },
    { selector: '.about-text', delay: 1 },
    { selector: '.video-card', delay: 'auto' },
    { selector: '.dest-card', delay: 'auto' },
    { selector: '.contact-card', delay: 'auto' },
    { selector: '.section-header', delay: 0 },
  ];

  sections.forEach(({ selector, delay }) => {
    const els = document.querySelectorAll(selector);
    els.forEach((el, i) => {
      el.classList.add('reveal');
      if (delay === 'auto') {
        const d = Math.min(i, 4);
        if (d > 0) el.classList.add(`reveal-delay-${d}`);
      } else if (delay > 0) {
        el.classList.add(`reveal-delay-${delay}`);
      }
    });
  });

  // Re-observe
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

addRevealToElements();

// ----- Smooth scroll for anchor links -----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu if open
      if (window.innerWidth <= 900) {
        mobileNavLinks.style.display = 'none';
      }
    }
  });
});

// ----- Animated counter for hero stats -----
function animateCounter(el, target, suffix = '', duration = 1500) {
  const start = performance.now();
  const isDecimal = target % 1 !== 0;

  const update = (time) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = isDecimal
      ? (eased * target).toFixed(2)
      : Math.round(eased * target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
}

// Trigger counters when hero stats are in view
const statsEl = document.getElementById('hero-stats');
if (statsEl) {
  const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      const nums = statsEl.querySelectorAll('.stat-num');
      const targets = [2.12, 74, 461];
      const suffixes = ['K', '', 'K+'];

      nums.forEach((el, i) => {
        animateCounter(el, targets[i], suffixes[i], 1800);
      });

      statsObserver.disconnect();
    }
  }, { threshold: 0.5 });

  statsObserver.observe(statsEl);
}

// ----- Parallax on hero -----
window.addEventListener('scroll', () => {
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    const scrolled = window.scrollY;
    heroImg.style.transform = `scale(1.05) translateY(${scrolled * 0.15}px)`;
  }
});

console.log('🌍 Sid\'s Destination — Website Loaded!');
