/* Shaghayegh Mastalipour Portfolio — Zero-Dependency Interactions */
(function () {
  'use strict';

  var STORAGE_KEY = 'sm_portfolio_theme';
  var root = document.documentElement;
  var mql = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function resolveTheme(mode) {
    if (mode === 'light' || mode === 'dark') return mode;
    return mql && mql.matches ? 'dark' : 'light';
  }

  function applyTheme(mode, persist) {
    var safeMode = (mode === 'light' || mode === 'dark' || mode === 'system') ? mode : 'system';
    root.setAttribute('data-theme', resolveTheme(safeMode));
    root.setAttribute('data-theme-mode', safeMode);
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, safeMode); } catch (e) {}
    }
    var buttons = document.querySelectorAll('[data-set-theme]');
    buttons.forEach(function (btn) {
      var active = btn.getAttribute('data-set-theme') === safeMode;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  var saved = 'light';
  try {
    saved = localStorage.getItem(STORAGE_KEY) || 'light';
  } catch (e) {}
  applyTheme(saved, false);

  document.querySelectorAll('[data-set-theme]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyTheme(btn.getAttribute('data-set-theme'), true);
    });
  });

  if (mql) {
    var onSchemeChange = function () {
      var current = root.getAttribute('data-theme-mode') || 'light';
      if (current === 'system') applyTheme('system', false);
    };
    if (mql.addEventListener) mql.addEventListener('change', onSchemeChange);
  }

  /* Mobile navigation */
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Category filter on Case Studies */
  var filterBtns = document.querySelectorAll('[data-filter]');
  var caseCards = document.querySelectorAll('[data-categories]');
  var countEl = document.getElementById('filter-count');

  if (filterBtns.length && caseCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-filter');
        filterBtns.forEach(function (b) {
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        var visible = 0;
        caseCards.forEach(function (card) {
          var cats = (card.getAttribute('data-categories') || '').split(/\s+/);
          var match = target === 'all' || cats.indexOf(target) !== -1;
          card.hidden = !match;
          if (match) visible += 1;
        });
        if (countEl) {
          countEl.textContent = 'Showing ' + visible + ' of ' + caseCards.length + ' dossiers';
        }
      });
    });
  }

  /* Copy email button + toast */
  var toast = document.getElementById('toast');
  var toastTimer = null;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.hidden = true;
    }, 2400);
  }

  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var val = btn.getAttribute('data-copy');
      if (!val) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(val).then(function () {
          showToast('Email copied: ' + val);
        }).catch(function () {
          showToast(val);
        });
      } else {
        showToast(val);
      }
    });
  });

  /* Print CV button */
  document.querySelectorAll('[data-print]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      window.print();
    });
  });

  /* Lightbox for archival proof plates */
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightbox-img');
  var lbCaption = document.getElementById('lightbox-caption');
  var lbClose = document.getElementById('lightbox-close');
  var lastTrigger = null;

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = '';
    if (lastTrigger) lastTrigger.focus();
  }

  if (lightbox && lbImg) {
    document.querySelectorAll('.plate-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var img = btn.querySelector('img');
        if (!img) return;
        lastTrigger = btn;
        lbImg.src = img.getAttribute('src');
        lbImg.alt = img.getAttribute('alt') || '';
        if (lbCaption) {
          lbCaption.textContent = btn.getAttribute('data-caption') || img.getAttribute('alt') || '';
        }
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
        if (lbClose) lbClose.focus();
      });
    });

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (lightbox && !lightbox.hidden) closeLightbox();
      if (nav && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });
})();
