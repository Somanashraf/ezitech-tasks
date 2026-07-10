/* =========================================
   TRAVEL AGENCY - MAIN JAVASCRIPT
   ========================================= */

'use strict';

// =========================================
// NAVBAR SCROLL EFFECT
// =========================================
const navbar = document.querySelector('.navbar-custom');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// =========================================
// BACK TO TOP BUTTON
// =========================================
const backToTopBtn = document.querySelector('.back-to-top');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// =========================================
// SCROLL REVEAL ANIMATION
// =========================================
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  // First make all visible (no hidden elements on page load)
  reveals.forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });

  // Then add nice entrance animation when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  
  reveals.forEach(el => observer.observe(el));
}

// =========================================
// COUNTER ANIMATION
// =========================================
function animateCounter(el, target, duration = 2000, suffix = '') {
  const start = 0;
  const startTime = performance.now();
  const isDecimal = target % 1 !== 0;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + (target - start) * eased;
    el.textContent = isDecimal
      ? current.toFixed(1) + suffix
      : Math.floor(current).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, 2200, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
}

// =========================================
// GALLERY FILTER
// =========================================
function initGalleryFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const items = document.querySelectorAll('.gallery-item[data-category]');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// =========================================
// LIGHTBOX
// =========================================
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!galleryItems.length) return;

  // Create lightbox overlay
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.innerHTML = `
    <div class="lb-overlay"></div>
    <div class="lb-container">
      <button class="lb-close" aria-label="Close">&times;</button>
      <button class="lb-prev" aria-label="Previous">&#8592;</button>
      <button class="lb-next" aria-label="Next">&#8594;</button>
      <div class="lb-img-wrap">
        <img src="" alt="" class="lb-img">
      </div>
      <div class="lb-caption">
        <h5 class="lb-title"></h5>
        <span class="lb-sub"></span>
      </div>
    </div>
  `;
  document.body.appendChild(lightbox);

  const style = document.createElement('style');
  style.textContent = `
    #lightbox { position:fixed; inset:0; z-index:99999; display:none; align-items:center; justify-content:center; }
    #lightbox.open { display:flex; }
    #lightbox .lb-overlay { position:absolute; inset:0; background:rgba(15,23,42,0.96); cursor:pointer; }
    #lightbox .lb-container { position:relative; z-index:1; max-width:90vw; max-height:90vh; text-align:center; }
    #lightbox .lb-img-wrap { border-radius:12px; overflow:hidden; box-shadow:0 25px 50px rgba(0,0,0,0.5); }
    #lightbox .lb-img { max-width:85vw; max-height:75vh; object-fit:contain; display:block; }
    #lightbox .lb-caption { margin-top:16px; }
    #lightbox .lb-title { color:#fff; font-size:1.1rem; margin:0 0 4px; font-family:'Playfair Display',serif; }
    #lightbox .lb-sub { color:rgba(255,255,255,0.6); font-size:0.85rem; }
    #lightbox .lb-close { position:fixed; top:24px; right:32px; background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.3); color:#fff; font-size:1.5rem; border-radius:50%; width:44px; height:44px; cursor:pointer; z-index:2; transition:all 0.2s; line-height:1; }
    #lightbox .lb-close:hover { background:rgba(255,255,255,0.3); transform:scale(1.1); }
    #lightbox .lb-prev, #lightbox .lb-next { position:fixed; top:50%; transform:translateY(-50%); background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.2); color:#fff; font-size:1.3rem; border-radius:50%; width:50px; height:50px; cursor:pointer; z-index:2; transition:all 0.2s; }
    #lightbox .lb-prev:hover, #lightbox .lb-next:hover { background:rgba(14,165,233,0.5); }
    #lightbox .lb-prev { left:24px; }
    #lightbox .lb-next { right:24px; }
  `;
  document.head.appendChild(style);

  let currentIndex = 0;
  const imgList = Array.from(galleryItems).map(item => ({
    src: item.querySelector('img')?.src,
    title: item.querySelector('.gallery-overlay h5')?.textContent || '',
    sub: item.querySelector('.gallery-overlay span')?.textContent || ''
  }));

  function openLightbox(index) {
    currentIndex = index;
    const { src, title, sub } = imgList[index];
    lightbox.querySelector('.lb-img').src = src;
    lightbox.querySelector('.lb-title').textContent = title;
    lightbox.querySelector('.lb-sub').textContent = sub;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  function prev() { currentIndex = (currentIndex - 1 + imgList.length) % imgList.length; openLightbox(currentIndex); }
  function next() { currentIndex = (currentIndex + 1) % imgList.length; openLightbox(currentIndex); }

  galleryItems.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
  lightbox.querySelector('.lb-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lb-overlay').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lb-prev').addEventListener('click', (e) => { e.stopPropagation(); prev(); });
  lightbox.querySelector('.lb-next').addEventListener('click', (e) => { e.stopPropagation(); next(); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
}

// =========================================
// HERO BG PARALLAX
// =========================================
function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.25}px)`;
  }, { passive: true });
}

// =========================================
// SMOOTH ACTIVE LINK
// =========================================
function setActiveNav() {
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || href.endsWith(currentPage))) {
      link.classList.add('active');
    }
  });
}

// =========================================
// FORM SUBMISSION (Demo)
// =========================================
function initForms() {
  document.querySelectorAll('form[data-demo]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type=submit]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check me-2"></i>Sent Successfully!';
        btn.style.background = 'linear-gradient(135deg,#10B981,#059669)';
        form.reset();
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.disabled = false;
        }, 3500);
      }, 1800);
    });
  });
}

// =========================================
// TESTIMONIAL CAROUSEL (simple auto-scroll)
// =========================================
function initTestimonialCarousel() {
  const track = document.querySelector('.testimonial-track');
  if (!track) return;
  let offset = 0;
  let isPaused = false;
  const cards = track.querySelectorAll('.testimonial-card-wrap');
  if (cards.length < 2) return;
  track.addEventListener('mouseenter', () => isPaused = true);
  track.addEventListener('mouseleave', () => isPaused = false);
}

// =========================================
// INIT ALL
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCounters();
  initGalleryFilter();
  initLightbox();
  initParallax();
  setActiveNav();
  initForms();
  initTestimonialCarousel();

  // Tooltip init (Bootstrap)
  const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltips.forEach(el => new bootstrap.Tooltip(el));

  // Hero bg loader transition
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    heroBg.style.transition = 'transform 8s ease, opacity 0.5s ease';
  }
});
