/* Filbo – פילבו מחסני היבואן | אלמנטים דינמיים */
(function () {
  'use strict';

  // ---- תפריט מובייל ----
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
    });
  }

  // ---- הצללה לכותרת בגלילה ----
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 12);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- חשיפה הדרגתית בגלילה ----
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var delay = parseInt(el.dataset.delay || '0', 10);
        setTimeout(function () { el.classList.add('in'); }, delay);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // ---- ספירת מספרים עולה ----
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseFloat(el.dataset.count);
        var prefix = el.dataset.prefix || '';
        var suffix = el.dataset.suffix || '';
        var start = performance.now();
        var dur = 1400;
        (function tick(now) {
          var p = Math.min((now - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = prefix + Math.round(target * eased).toLocaleString('he-IL') + suffix;
          if (p < 1) requestAnimationFrame(tick);
        })(start);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  // ---- סינון קטגוריות מוצרים ----
  var chips = document.querySelectorAll('[data-filter]');
  if (chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var val = chip.dataset.filter;
        chips.forEach(function (c) { c.classList.toggle('btn--primary', c === chip); c.classList.toggle('btn--outline', c !== chip); });
        document.querySelectorAll('[data-cat]').forEach(function (item) {
          var show = val === 'all' || item.dataset.cat === val;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  // ---- טופס פנייה (הדגמה בצד לקוח) ----
  var form = document.getElementById('lead-form');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var ok = document.getElementById('form-ok');
      if (ok) ok.classList.add('show');
      form.reset();
    });
  }

  // ---- סימון הקישור הפעיל בתפריט ----
  var page = location.pathname.split('/').pop() || 'index.html';
  Array.prototype.forEach.call(document.querySelectorAll('.nav a[href]'), function (a) {
    if (a.getAttribute('href') === page) a.classList.add('is-active');
  });

  // ---- שנה נוכחית בפוטר ----
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
