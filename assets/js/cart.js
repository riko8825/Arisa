/* Arisa in WonderDolls — basket */
(function () {
  'use strict';

  var STORAGE_KEY = 'arisa_cart_v1';
  var state = load();

  var drawer = document.querySelector('[data-cart-drawer]');
  var overlay = document.querySelector('[data-cart-overlay]');
  var body = document.querySelector('[data-cart-body]');
  var totalEl = document.querySelector('[data-cart-total]');
  var countEls = document.querySelectorAll('[data-cart-count]');

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }
  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function formatPrice(n) {
    return '฿ ' + (n || 0).toLocaleString('en-US');
  }

  function render() {
    if (body) {
      body.innerHTML = '';
      state.forEach(function (item, idx) {
        var row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML =
          '<div class="thumb ' + (item.tone || '') + '"></div>' +
          '<div class="info">' +
            '<span class="name">' + escapeHtml(item.name) + '</span>' +
            '<span class="sub">' + escapeHtml(item.subtitle || '') + '</span>' +
            '<span class="price">' + formatPrice(item.price) + '</span>' +
          '</div>' +
          '<button class="remove" data-remove="' + idx + '">Remove</button>';
        body.appendChild(row);
      });
      body.querySelectorAll('[data-remove]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var i = parseInt(btn.getAttribute('data-remove'), 10);
          state.splice(i, 1);
          save();
          render();
        });
      });
    }
    var total = state.reduce(function (s, it) { return s + (it.price || 0); }, 0);
    if (totalEl) totalEl.textContent = formatPrice(total);
    countEls.forEach(function (c) {
      c.textContent = state.length;
      c.style.display = state.length > 0 ? '' : 'none';
    });
  }

  function openCart() {
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }

  // Bind triggers
  document.querySelectorAll('[data-open-cart]').forEach(function (b) { b.addEventListener('click', openCart); });
  document.querySelectorAll('[data-close-cart]').forEach(function (b) { b.addEventListener('click', closeCart); });

  // Add-to-cart buttons
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-add-to-cart]');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    var raw = btn.getAttribute('data-product');
    if (!raw) return;
    try {
      var product = JSON.parse(raw);
      state.push(product);
      save();
      render();
      openCart();
      window.dispatchEvent(new CustomEvent('arisa:toast', { detail: product.name + ' was added to your basket.' }));
    } catch (err) { /* silent */ }
  });

  // Public API
  window.ArisaCart = {
    add: function (product) { state.push(product); save(); render(); openCart(); },
    open: openCart,
    close: closeCart,
    items: function () { return state.slice(); }
  };

  render();
})();
