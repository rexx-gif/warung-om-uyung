// ── LOADING SCREEN ──
function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
    loadingScreen.classList.add('hidden');
  }
}

// Hide loading screen dengan multiple triggers untuk memastikan
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(hideLoadingScreen, 2000);
});

window.addEventListener('load', () => {
  setTimeout(hideLoadingScreen, 2000);
});

// Fallback: hide jika terlalu lama
setTimeout(hideLoadingScreen, 2000);

// ── CURSOR ──
const cursor = document.getElementById('cursor');
const cursorFollow = document.getElementById('cursorFollow');
let mx = 0, my = 0, fx = 0, fy = 0;

if (cursor && cursorFollow) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = (mx - 6) + 'px';
    cursor.style.top  = (my - 6) + 'px';
  });
  (function animateCursor() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    cursorFollow.style.left = (fx - 18) + 'px';
    cursorFollow.style.top  = (fy - 18) + 'px';
    requestAnimationFrame(animateCursor);
  })();
  document.querySelectorAll('a, button, .menu-card, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(2.5)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
  });
}

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
const btt = document.getElementById('btt');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
  if (btt) btt.classList.toggle('show', window.scrollY > 400);
});

// ── HERO IMAGE SCALE ──
const heroImg = document.getElementById('heroImg');
if (heroImg) {
  const onLoad = () => heroImg.classList.add('loaded');
  if (heroImg.complete) onLoad(); else heroImg.addEventListener('load', onLoad);
}

// ── DARK/LIGHT THEME TOGGLE ──
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  // Default: dark (usually handled by attribute in HTML, but ensuring here)
  if (!html.getAttribute('data-theme')) {
    html.setAttribute('data-theme', 'dark');
  }
  themeToggle.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  });
}

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// ── MENU FILTER ──
const filterBtns = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');
if (filterBtns.length && menuCards.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      menuCards.forEach(card => {
        const show = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('hidden', !show);
        if (show) {
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = 'fadeUp 0.4s ease forwards';
        }
      });
    });
  });
}

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => revealObserver.observe(el));
}

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
