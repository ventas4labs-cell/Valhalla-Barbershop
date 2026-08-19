/* ═══════════════════════════════════════════════════════════════════════
   VALHALLA BARBERSHOP — BEHAVIOUR
   Progressive enhancement: the page is complete and bookable without JS.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ───────────────────────────────────────────────────────────────────
     OPENING HOURS — single source of truth.
     0 = Sunday … 6 = Saturday. null = closed.
     The table in index.html is the no-JS fallback; keep it in step.
     ─────────────────────────────────────────────────────────────────── */
  var HOURS = [null, null, ['10:00','20:00'], ['10:00','20:00'],
               ['10:00','20:00'], ['10:00','20:00'], ['09:00','18:00']];

  var LANG_KEY = 'valhalla.lang';
  var lang = SHOP.defaultLang;

  /* ══ LINKS ═══════════════════════════════════════════════════════════ */
  function waHref() {
    return 'https://wa.me/' + SHOP.whatsapp +
           '?text=' + encodeURIComponent(SHOP.whatsappMsg[lang] || SHOP.whatsappMsg.es);
  }

  function wireLinks() {
    $$('#waLink, #waLink2').forEach(function (a) {
      a.href = waHref(); a.target = '_blank'; a.rel = 'noopener';
    });
    $$('#telLink, #telLink2').forEach(function (a) { a.href = 'tel:' + SHOP.phoneDial; });
    $$('#telText, #telLink2').forEach(function (n) {
      if (n.id === 'telLink2') n.textContent = SHOP.phone; else n.textContent = SHOP.phone;
    });
    $$('#addrText, #addrText2, #addrText3').forEach(function (n) { n.textContent = SHOP.address; });

    var maps = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(SHOP.mapQuery);
    $$('#mapLink, #mapLink2').forEach(function (a) { a.href = maps; });

    /* Online agenda — never a dead end: falls back to WhatsApp until a URL exists. */
    var bl = $('#bookLink');
    if (bl) {
      if (SHOP.bookingUrl) { bl.href = SHOP.bookingUrl; }
      else { bl.href = waHref(); bl.removeAttribute('target'); }
    }

    /* Social — hide what has no link rather than shipping a dead icon. */
    [['#igLink', SHOP.instagram], ['#fbLink', SHOP.facebook]].forEach(function (p) {
      var el = $(p[0]); if (!el) return;
      if (p[1]) el.href = p[1]; else el.remove();
    });

    /* Map: only load the frame once, lazily, and never before it is near view. */
    var frame = $('#mapFrame');
    if (frame && !frame.dataset.loaded) {
      var src = 'https://www.google.com/maps?q=' + encodeURIComponent(SHOP.mapQuery) + '&output=embed';
      var load = function () { frame.src = src; frame.dataset.loaded = '1'; };
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (es) {
          es.forEach(function (e) { if (e.isIntersecting) { load(); io.disconnect(); } });
        }, { rootMargin: '400px' });
        io.observe(frame);
      } else { load(); }
    }

    /* Google Calendar embed, when configured. */
    var mount = $('#schedule-mount');
    if (mount && SHOP.calendarEmbed) {
      var f = document.createElement('iframe');
      f.src = SHOP.calendarEmbed;
      f.style.cssText = 'width:100%;height:520px;border:0';
      f.loading = 'lazy';
      f.title = lang === 'en' ? 'Appointment scheduling' : 'Agenda de citas';
      mount.textContent = '';
      mount.appendChild(f);
      mount.hidden = false;
    }
  }

  /* ══ DEMO MODE ═══════════════════════════════════════════════════════ */
  function applyDemo() {
    var strip = $('#demo');
    if (SHOP.DEMO_MODE) { if (strip) strip.hidden = false; }
    else {
      if (strip) strip.remove();
      $$('.say__tag, .sec__note.is-warn, .foot__cred').forEach(function (n) { n.remove(); });
      var wn = $('#trabajo .sec__note'); if (wn) wn.remove();
    }
  }

  /* ══ LANGUAGE ════════════════════════════════════════════════════════ */
  var META = {
    es: { title: 'Valhalla Barbershop — Corte, barba y afeitado clásico',
          desc:  'Valhalla Barbershop. Corte, barba y afeitado clásico con navaja. Reservá por WhatsApp, teléfono o agenda en línea.' },
    en: { title: 'Valhalla Barbershop — Cuts, beards and classic shaves',
          desc:  'Valhalla Barbershop. Cuts, beards and classic straight-razor shaves. Book by WhatsApp, phone or online agenda.' }
  };

  function setLang(next, persist) {
    if (!I18N[next]) return;
    lang = next;
    var dict = I18N[next];

    $$('[data-i18n]').forEach(function (el) {
      var v = dict[el.getAttribute('data-i18n')];
      if (v != null) el.textContent = v;
    });
    $$('[data-i18n-aria]').forEach(function (el) {
      var v = dict[el.getAttribute('data-i18n-aria')];
      if (v != null) el.setAttribute('aria-label', v);
    });

    document.documentElement.lang = next;
    document.documentElement.setAttribute('data-lang', next);
    document.title = META[next].title;
    var md = $('meta[name="description"]'); if (md) md.content = META[next].desc;

    $$('[data-setlang]').forEach(function (b) {
      var on = b.getAttribute('data-setlang') === next;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    wireLinks();
    renderHours();
    if (persist) { try { localStorage.setItem(LANG_KEY, next); } catch (e) {} }
  }

  /* ══ HOURS + LIVE OPEN/CLOSED ════════════════════════════════════════ */
  var DAY_KEYS = ['d.sun','d.mon','d.tue','d.wed','d.thu','d.fri','d.sat'];

  function renderHours() {
    var dict = I18N[lang];
    var tb = $('.hours tbody');
    if (tb) {
      var order = [1,2,3,4,5,6,0];   // Monday-first, as read
      tb.innerHTML = order.map(function (d) {
        var h = HOURS[d];
        var name = dict[DAY_KEYS[d]];
        return h
          ? '<tr><th scope="row">' + name + '</th><td>' + h[0] + ' – ' + h[1] + '</td></tr>'
          : '<tr><th scope="row">' + name + '</th><td class="off">' + dict['d.closed'] + '</td></tr>';
      }).join('');
    }
    renderStatus();
  }

  function toMin(s) { var p = s.split(':'); return (+p[0]) * 60 + (+p[1]); }

  function renderStatus() {
    var el = $('#heroNow'); if (!el) return;
    var label = $('#heroNow [data-i18n], #heroNow span:last-child');
    if (!label) return;

    var now  = new Date();
    var mins = now.getHours() * 60 + now.getMinutes();
    var todayH = HOURS[now.getDay()];
    var open = !!todayH && mins >= toMin(todayH[0]) && mins < toMin(todayH[1]);

    var txt;
    if (open) {
      txt = (lang === 'en' ? 'Open now · until ' : 'Abierto ahora · hasta ') + todayH[1];
    } else {
      /* Next opening within the coming week. */
      var next = null;
      for (var i = 0; i < 8; i++) {
        var d = (now.getDay() + i) % 7, h = HOURS[d];
        if (!h) continue;
        if (i === 0 && mins < toMin(h[0])) { next = { d: d, h: h, today: true }; break; }
        if (i > 0) { next = { d: d, h: h, today: false, tomorrow: i === 1 }; break; }
      }
      if (!next) { txt = lang === 'en' ? 'Closed' : 'Cerrado'; }
      else if (next.today) {
        txt = (lang === 'en' ? 'Closed · opens today ' : 'Cerrado · abre hoy ') + next.h[0];
      } else {
        var dayName = I18N[lang][DAY_KEYS[next.d]];
        var lead = next.tomorrow
          ? (lang === 'en' ? 'Closed · opens tomorrow ' : 'Cerrado · abre mañana ')
          : (lang === 'en' ? 'Closed · opens ' : 'Cerrado · abre ') + dayName + ' ';
        txt = lead + next.h[0];
      }
    }
    label.textContent = txt;
    label.removeAttribute('data-i18n');   // now owned by this function, not the dictionary
    el.classList.toggle('is-open', open);
  }

  /* ══ NAV ═════════════════════════════════════════════════════════════ */
  function nav() {
    var bar = $('#nav'), burger = $('#burger'), menu = $('#menu');

    var onScroll = function () { bar.classList.toggle('is-stuck', scrollY > 12); };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();

    if (burger && menu) {
      var close = function () { burger.setAttribute('aria-expanded', 'false'); menu.hidden = true; };
      burger.addEventListener('click', function () {
        var open = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', open ? 'false' : 'true');
        menu.hidden = open;
      });
      $$('a', menu).forEach(function (a) { a.addEventListener('click', close); });
      addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
      matchMedia('(min-width:900px)').addEventListener('change', close);
    }
  }

  /* ══ TICKER — duplicate the row so the loop is seamless ══════════════ */
  function ticker() {
    var row = $('#ticker'); if (!row || reduced) return;
    row.innerHTML += row.innerHTML;
  }

  /* ══ REVEAL + HEADING RULES ══════════════════════════════════════════ */
  function reveal() {
    var marks = $$('.h2').slice(0, 1);
    /* Deliberately narrow: content that arrives in a set (rows, tiles, quotes)
       rises. Prose and standalone figures are visible from the start — one
       authored moment, not an entrance on every block. */
    $$('.row, .tile, .say').forEach(function (n) { n.setAttribute('data-rise', ''); });
    var targets = $$('[data-rise]').concat(marks);

    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach(function (n) { n.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var sibs = e.target.parentElement ? $$('[data-rise]', e.target.parentElement) : [];
        var i = Math.max(0, sibs.indexOf(e.target));
        e.target.style.transitionDelay = Math.min(i, 5) * 70 + 'ms';
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(function (n) { io.observe(n); });
  }

  /* ══ SERVICE ROW → HERO-STYLE PHOTO WASH (desktop pointer only) ══════ */
  function wash() {
    var box = $('#wash'), list = $('#menuList');
    if (!box || !list) return;
    if (!matchMedia('(hover:hover) and (min-width:900px)').matches) return;

    $$('.row', list).forEach(function (row) {
      var src = row.getAttribute('data-img'); if (!src) return;
      row.addEventListener('mouseenter', function () {
        box.style.backgroundImage = 'url("' + src + '")';
        box.classList.add('is-on');
      });
      row.addEventListener('mouseleave', function () { box.classList.remove('is-on'); });
    });
  }

  /* ══ BOOT ════════════════════════════════════════════════════════════ */
  var saved = null;
  try { saved = localStorage.getItem(LANG_KEY); } catch (e) {}
  if (!saved) {
    var nl = (navigator.language || '').slice(0, 2).toLowerCase();
    saved = nl === 'en' ? 'en' : SHOP.defaultLang;
  }

  applyDemo();
  setLang(saved, false);

  $$('[data-setlang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-setlang'), true); });
  });

  nav(); ticker(); reveal(); wash();

  var yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

  /* Keep the live status honest on a page left open. */
  setInterval(renderStatus, 60000);
  addEventListener('pageshow', renderStatus);
})();
