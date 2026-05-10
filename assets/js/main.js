/* Arisa in WonderDolls — main interactions */
(function () {
  'use strict';

  // Year
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Mobile menu
  var menu = document.querySelector('.mobile-menu');
  var openBtn = document.querySelector('[data-menu-open]');
  var closeBtn = document.querySelector('[data-menu-close]');
  function openMenu() { if (menu) { menu.classList.add('open'); menu.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; } }
  function closeMenu() { if (menu) { menu.classList.remove('open'); menu.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; } }
  if (openBtn) openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (menu) {
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  }

  // Reveal on scroll
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }) : null;

  if (io) {
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // Toast (used by cart and forms)
  var toastEl;
  function showToast(message) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = message;
    requestAnimationFrame(function () { toastEl.classList.add('show'); });
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  }
  window.addEventListener('arisa:toast', function (e) { showToast(e.detail || ''); });

  // Thumbnails (PDP)
  var thumbs = document.querySelectorAll('.thumbs .imgph');
  if (thumbs.length) {
    thumbs.forEach(function (t) {
      t.addEventListener('click', function () {
        thumbs.forEach(function (x) { x.classList.remove('active'); });
        t.classList.add('active');
      });
    });
  }

  // Chips (shop filters — visual only)
  document.querySelectorAll('.chips').forEach(function (group) {
    group.querySelectorAll('.chip').forEach(function (c) {
      c.addEventListener('click', function () {
        group.querySelectorAll('.chip').forEach(function (x) { x.classList.remove('active'); });
        c.classList.add('active');
      });
    });
  });

  // Esc closes drawers/menus
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
      var drawer = document.querySelector('.cart-drawer.open');
      var overlay = document.querySelector('.cart-overlay.open');
      if (drawer) drawer.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
})();
