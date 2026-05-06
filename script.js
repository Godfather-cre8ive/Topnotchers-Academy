'use strict';

// ============================================================
// CAROUSEL ENGINE
// ============================================================
class CarouselEngine {
  constructor(outerId) {
    this.outer = document.getElementById(outerId);
    if (!this.outer) return;

    this.belt    = this.outer.querySelector('.carousel-belt');
    this.win     = this.outer.querySelector('.carousel-window');
    this.prevBtn = this.outer.querySelector('.c-prev');
    this.nextBtn = this.outer.querySelector('.c-next');
    this.dotsBox = document.getElementById('cdr-' + outerId);

    this.items   = Array.from(this.belt.children);
    this.count   = this.items.length;
    this.current = 0;
    this.timer   = null;
    this.paused  = false;
    this.touchX  = 0;

    this._build();
    this._bind();
    this._auto();
    this._pauseOnHover();
  }

  _isMobile() { return window.innerWidth <= 768; }

  _gap() { return parseInt(getComputedStyle(this.belt).gap) || 28; }

  _itemW() {
    if (!this.items[0]) return 0;
    return this.items[0].offsetWidth + this._gap();
  }

  _visible() {
    if (!this.win || !this.items[0]) return 1;
    const w  = this.win.offsetWidth;
    const iw = this.items[0].offsetWidth;
    return Math.max(1, Math.floor((w + this._gap()) / (iw + this._gap())));
  }

  _maxIdx() { return Math.max(0, this.count - this._visible()); }

  go(idx) {
    // On mobile: use native scroll, not JS transform
    if (this._isMobile()) {
      this.current = Math.max(0, Math.min(idx, this._maxIdx()));
      const itemW = this._itemW();
      if (this.win) {
        this.win.scrollTo({ left: this.current * itemW, behavior: 'smooth' });
      }
      this._updateDots();
      return;
    }
    if (this.count <= this._visible()) {
      this.current = 0;
      this.belt.style.transform = 'translateX(0)';
      this._updateDots();
      return;
    }
    this.current = Math.max(0, Math.min(idx, this._maxIdx()));
    this.belt.style.transform = 'translateX(-' + (this.current * this._itemW()) + 'px)';
    this._updateDots();
  }

  next() { this.go(this.current >= this._maxIdx() ? 0 : this.current + 1); }
  prev() { this.go(this.current <= 0 ? this._maxIdx() : this.current - 1); }

  _buildDots() {
    if (!this.dotsBox) return;
    this.dotsBox.innerHTML = '';
    for (let i = 0; i <= this._maxIdx(); i++) {
      const d = document.createElement('button');
      d.className = 'cdot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Slide ' + (i + 1));
      const idx = i;
      d.addEventListener('click', () => { this.go(idx); this._resetAuto(); });
      this.dotsBox.appendChild(d);
    }
  }

  _updateDots() {
    if (!this.dotsBox) return;
    this.dotsBox.querySelectorAll('.cdot').forEach((d, i) => {
      d.classList.toggle('active', i === this.current);
    });
  }

  _bind() {
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => { this.prev(); this._resetAuto(); });
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => { this.next(); this._resetAuto(); });

    this.outer.setAttribute('tabindex', '0');
    this.outer.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  { this.prev(); this._resetAuto(); }
      if (e.key === 'ArrowRight') { this.next(); this._resetAuto(); }
    });

    // Touch swipe (desktop fallback; mobile uses native scroll)
    this.belt.addEventListener('touchstart', (e) => {
      this.touchX = e.touches[0].clientX;
    }, { passive: true });

    this.belt.addEventListener('touchend', (e) => {
      if (this._isMobile()) return; // native scroll handles it on mobile
      const diff = this.touchX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        diff > 0 ? this.next() : this.prev();
        this._resetAuto();
      }
    }, { passive: true });

    // On mobile: sync dots with native scroll position
    if (this.win) {
      this.win.addEventListener('scroll', () => {
        if (!this._isMobile()) return;
        const itemW = this._itemW();
        if (!itemW) return;
        const idx = Math.round(this.win.scrollLeft / itemW);
        if (idx !== this.current) {
          this.current = Math.max(0, Math.min(idx, this._maxIdx()));
          this._updateDots();
        }
      }, { passive: true });
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this._buildDots();
        this.go(0);
        // On mobile reset native scroll too
        if (this._isMobile() && this.win) this.win.scrollLeft = 0;
      }, 200);
    });
  }

  _auto(delay) {
    delay = delay || 4800;
    clearInterval(this.timer);
    this.timer = setInterval(() => { if (!this.paused) this.next(); }, delay);
  }

  _resetAuto() { this._auto(); }

  _pauseOnHover() {
    this.outer.addEventListener('mouseenter', () => { this.paused = true; });
    this.outer.addEventListener('mouseleave', () => { this.paused = false; });
  }

  _build() { this._buildDots(); this.go(0); }
}

// ============================================================
// INIT CAROUSELS
// ============================================================
var CAROUSEL_IDS = ['co-why','co-prog','co-gal','co-test','co-ach','co-vals','co-fac','co-mgmt'];
var carousels = {};

function initCarousels(ids) {
  ids.forEach(function(id) {
    if (document.getElementById(id) && !carousels[id]) {
      carousels[id] = new CarouselEngine(id);
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initCarousels(CAROUSEL_IDS);
  setupReveal();
  setupCounters();
  setupAchBars();
});

// ============================================================
// NAVBAR
// ============================================================
var header   = document.getElementById('siteHeader');
var burger   = document.getElementById('burger');
var navMenu  = document.getElementById('navMenu');
var backdrop = document.getElementById('navBackdrop');

window.addEventListener('scroll', function() {
  if (header) header.classList.toggle('scrolled', window.scrollY > 72);
  updateActiveNav();
}, { passive: true });

function updateActiveNav() {
  var active = '';
  document.querySelectorAll('section[id]').forEach(function(sec) {
    if (window.scrollY >= sec.offsetTop - 130) active = sec.getAttribute('id');
  });
  document.querySelectorAll('.nav-item').forEach(function(link) {
    link.classList.toggle('active', link.getAttribute('href') === '#' + active);
  });
}

function toggleMenu() {
  var open = navMenu.classList.toggle('open');
  burger.classList.toggle('open', open);
  backdrop.classList.toggle('show', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

function closeMenu() {
  if (navMenu)  navMenu.classList.remove('open');
  if (burger)   burger.classList.remove('open');
  if (backdrop) backdrop.classList.remove('show');
  document.body.style.overflow = '';
}

// ============================================================
// PAGE PANELS
// ============================================================
function openPage(id) {
  var panel = document.getElementById(id);
  if (!panel) return;

  document.querySelectorAll('.page-panel.active').forEach(function(p) {
    if (p.id !== id) p.classList.remove('active');
  });

  panel.classList.add('active');
  document.body.style.overflow = 'hidden';
  panel.scrollTop = 0;

  // Lazy-init carousels inside this panel
  setTimeout(function() {
    panel.querySelectorAll('.carousel-outer').forEach(function(c) {
      if (c.id && !carousels[c.id]) {
        carousels[c.id] = new CarouselEngine(c.id);
      }
    });
  }, 400);
}

function closePage(id) {
  var panel = document.getElementById(id);
  if (!panel) return;
  panel.classList.remove('active');
  var anyOpen = document.querySelectorAll('.page-panel.active').length > 0;
  if (!anyOpen) document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.page-panel.active').forEach(function(p) {
      p.classList.remove('active');
    });
    document.body.style.overflow = '';
  }
});

// ============================================================
// COUNTER ANIMATION
// ============================================================
function setupCounters() {
  var heroStats = document.querySelector('.hero-stats');
  if (!heroStats) return;

  var ran = false;
  var obs = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting && !ran) {
      ran = true;
      document.querySelectorAll('.hs-num').forEach(function(el) {
        var target = parseInt(el.dataset.count) || 0;
        var suffix = el.dataset.suffix || '';
        var cur = 0;
        var steps = 80;
        var inc = target / steps;
        var t = setInterval(function() {
          cur = Math.min(cur + inc, target);
          el.textContent = Math.floor(cur) + suffix;
          if (cur >= target) { el.textContent = target + suffix; clearInterval(t); }
        }, 22);
      });
    }
  }, { threshold: 0.4 });
  obs.observe(heroStats);
}

// ============================================================
// SCROLL REVEAL
// ============================================================
function setupReveal() {
  var sel = [
    '.why-card','.prog-card','.tcard','.ach-card','.gal-card',
    '.sec-head','.about-grid','.cta-content','.step','.lcard',
    '.val-card','.fac-card','.about-copy','.about-visual',
    '.mv-dark','.mv-gold'
  ];

  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -30px 0px' });

  sel.forEach(function(s) {
    document.querySelectorAll(s).forEach(function(el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = ((i % 4) * 0.07) + 's';
      obs.observe(el);
    });
  });
}

// ============================================================
// ACHIEVEMENT BARS
// ============================================================
function setupAchBars() {
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.ach-bar').forEach(function(bar) {
          var w = bar.style.width;
          bar.style.width = '0';
          setTimeout(function() { bar.style.width = w; }, 150);
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.ach-card').forEach(function(c) { obs.observe(c); });
}

// ============================================================
// HERO PARALLAX
// ============================================================
var heroLeft = document.querySelector('.hero-left');
window.addEventListener('scroll', function() {
  if (!heroLeft) return;
  var y = window.scrollY;
  if (y < window.innerHeight) {
    heroLeft.style.transform = 'translateY(' + (y * 0.15) + 'px)';
    heroLeft.style.opacity = String(1 - (y / window.innerHeight) * 0.45);
  }
}, { passive: true });

// ============================================================
// SMOOTH ANCHOR SCROLL
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = link.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 76, behavior: 'smooth' });
        closeMenu();
      }
    });
  });
});

// ============================================================
// FORM SUBMIT
// ============================================================
function submitForm(e) {
  e.preventDefault();
  var toast = document.getElementById('toast');
  if (!toast) return;
  toast.classList.add('show');
  setTimeout(function() { toast.classList.remove('show'); }, 5500);
  e.target.reset();
}

// ============================================================
// MOBILE STICKY BAR
// ============================================================
var stickyMobile = document.querySelector('.sticky-mobile');
window.addEventListener('scroll', function() {
  if (!stickyMobile) return;
  stickyMobile.style.display = window.scrollY > 280 ? 'block' : 'none';
}, { passive: true });

// ============================================================
// DEV LOG
// ============================================================
console.log(
  '%c Topnotchers International Academy %c v2.0 — Premium ',
  'background:#C41230;color:#F5C518;font-weight:bold;padding:6px 14px;font-size:13px',
  'background:#111;color:rgba(255,255,255,0.5);padding:6px 14px;font-size:12px'
);
