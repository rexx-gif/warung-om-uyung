// â”€â”€ LOADING SCREEN â”€â”€
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

document.addEventListener('contextmenu',function(e){
  e.preventDefault();
})

document.addEventListener('keydown', function(e) {
    // Mencegah Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
    }
    // Mencegah Ctrl+Shift+I atau F12 (Inspect Element)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73 || e.keyCode === 123) {
        e.preventDefault();
    }
});

// Fallback: hide jika terlalu lama
setTimeout(hideLoadingScreen, 2000);

// â”€â”€ CURSOR â”€â”€
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

// â”€â”€ SCROLL PROGRESS BAR â”€â”€
const scrollProgress = document.getElementById('scrollProgress');

// â”€â”€ NAVBAR SCROLL â”€â”€
const navbar = document.getElementById('navbar');
const btt = document.getElementById('btt');

// Throttled scroll handler for performance
let ticking = false;
let lastScrollY = 0;

function onScroll() {
  lastScrollY = window.scrollY;
  if (!ticking) {
    requestAnimationFrame(() => {
      // Navbar
      if (navbar) navbar.classList.toggle('scrolled', lastScrollY > 60);
      // Back to top
      if (btt) btt.classList.toggle('show', lastScrollY > 400);
      // Scroll progress bar
      if (scrollProgress) {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docH > 0 ? (lastScrollY / docH) * 100 : 0;
        scrollProgress.style.width = pct + '%';
      }
      // Parallax effect
      updateParallax();
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener('scroll', onScroll, { passive: true });

// â”€â”€ PARALLAX EFFECT â”€â”€
function updateParallax() {
  const parallaxEls = document.querySelectorAll('.parallax-slow');
  parallaxEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      const speed = 0.08;
      const yPos = (rect.top - window.innerHeight / 2) * speed;
      el.style.transform = `translateY(${yPos}px)`;
    }
  });
}

// â”€â”€ HERO IMAGE SCALE â”€â”€
const heroImg = document.getElementById('heroImg');
if (heroImg) {
  const onLoad = () => heroImg.classList.add('loaded');
  if (heroImg.complete) onLoad(); else heroImg.addEventListener('load', onLoad);
}

// â”€â”€ DARK/LIGHT THEME TOGGLE â”€â”€
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

// â”€â”€ HAMBURGER MENU â”€â”€
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

// â”€â”€ MENU FILTER â”€â”€
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

// â”€â”€ SCROLL REVEAL â€” Enhanced with multiple animation types â”€â”€
const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate, .stagger-children, .galeri-grid, .menu-grid, .vibes-features, .about-stats';
const allRevealEls = document.querySelectorAll(revealSelectors);

if (allRevealEls.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Small delay for stagger effect when multiple elements appear
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  allRevealEls.forEach(el => revealObserver.observe(el));
}

// â”€â”€ TIMELINE ITEMS SCROLL ANIMATION â”€â”€
const timelineItems = document.querySelectorAll('.timeline-item');
if (timelineItems.length) {
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        timelineObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  timelineItems.forEach(item => timelineObserver.observe(item));
}

// â”€â”€ GALLERY LAZY LOADING WITH BLUR-UP â”€â”€
const galleryImages = document.querySelectorAll('.galeri-img[loading="lazy"]');
if (galleryImages.length) {
  galleryImages.forEach(img => {
    // Add placeholder blur while loading
    img.style.filter = 'grayscale(30%) contrast(1.05) blur(8px)';
    img.style.transition = 'filter 0.6s ease';

    const revealImage = () => {
      img.style.filter = 'grayscale(30%) contrast(1.05)';
    };

    if (img.complete) {
      revealImage();
    } else {
      img.addEventListener('load', revealImage);
    }
  });
}

// â”€â”€ SMOOTH SCROLL â”€â”€
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});