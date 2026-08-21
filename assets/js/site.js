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
  var HOURS = [null,               // Sunday — closed
               ['11:00','20:00'],  // Monday
               ['11:00','20:00'],  // Tuesday
               ['11:00','20:00'],  // Wednesday
               ['11:00','20:00'],  // Thursday
               ['11:00','20:00'],  // Friday
               ['11:00','20:00']]; // Saturday

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
    var pc = $('#plusText');
    if (pc) { if (SHOP.plusCode) { pc.textContent = SHOP.plusCode; } else { pc.parentElement.remove(); } }

    var maps = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(SHOP.mapQuery);
    $$('#mapLink, #mapLink2').forEach(function (a) { a.href = maps; });

    /* The agenda card scrolls to the picker on this page rather than
       sending the visitor to one barber's Cal.com page. */
    var pw = $('#pendingWa');
    if (pw) { pw.href = waHref(); pw.target = '_blank'; pw.rel = 'noopener'; }

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

    /* Live agenda. Cal.com wins when any barber has a link; a raw iframe
       is the fallback for a plain Google Calendar appointment schedule. */
    var mount = $('#schedule-mount');
    if (!mount) return;
    if (barbersWithAgenda().length) { armAgenda(); }
    else if (SHOP.calendarEmbed) {
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

  /* ══ THE BARBERS ═════════════════════════════════════════════════════
     Three chairs run at once, so each barber owns a Cal.com calendar and
     the agenda re-mounts when the visitor picks one.
     ═════════════════════════════════════════════════════════════════════ */
  var roster   = (SHOP.barbers || []).slice(0, 12);
  var picked   = null;   // id of the selected barber
  var calBooted = false;

  function barbersWithAgenda() {
    return roster.filter(function (b) { return !!b.calLink; });
  }

  /* A barber with no name yet still gets a stable label, so a half-filled
     roster reads as "pending" rather than broken. */
  function barberName(b, i) {
    return b.name || (I18N[lang]['team.tbd'] + ' ' + (i + 1));
  }
  /* Two characters, not one: "Marcelo" and "Mariano" both start with M, and
     a chooser whose three tiles read M / J / M identifies nobody. First +
     last initial where there is a surname, otherwise the first two letters. */
  function barberInitial(b, i) {
    if (!b.name) return String(i + 1);
    var parts = b.name.trim().split(/\s+/);
    var mark = parts.length > 1
      ? parts[0][0] + parts[parts.length - 1][0]
      : parts[0].slice(0, 2);
    mark = mark.toUpperCase();

    /* Still ambiguous (two Jose Ramirez)? Fall back to a numbered mark. */
    var clash = roster.some(function (o, k) {
      if (k >= i || !o.name) return false;
      var p = o.name.trim().split(/\s+/);
      var m = (p.length > 1 ? p[0][0] + p[p.length - 1][0] : p[0].slice(0, 2)).toUpperCase();
      return m === mark;
    });
    return clash ? mark[0] + (i + 1) : mark;
  }
  /* "Reservar con Marcelo" reads right; "Reservar con Barbero" does not,
     so a placeholder keeps its number. */
  function barberShort(b, i) {
    return b.name ? b.name.trim().split(/\s+/)[0] : barberName(b, i);
  }

  function renderTeam() {
    var list = $('#team');
    if (!list) return;
    var dict = I18N[lang];

    list.innerHTML = roster.map(function (b, i) {
      var name    = barberName(b, i);
      var role    = (b.role && (b.role[lang] || b.role.es)) || '';
      var pending = !b.calLink;
      var media   = b.photo
        ? '<img src="assets/img/' + b.photo + '" alt="' + name + '" loading="lazy">'
        : '<span class="barber__mono" aria-hidden="true">' + barberInitial(b, i) + '</span>' +
          (SHOP.DEMO_MODE ? '<span class="barber__ph-tag">' + dict['team.photo'] + '</span>' : '');

      return '<li class="barber' + (pending ? ' is-pending' : '') + '" data-barber="' + b.id + '">' +
               '<div class="barber__ph">' + media + '</div>' +
               '<div class="barber__body">' +
                 '<h3 class="barber__n">' + name + '</h3>' +
                 (role ? '<p class="barber__r">' + role + '</p>' : '') +
                 (pending ? '<p class="barber__tag">' + dict['team.pending'] + '</p>' : '') +
                 '<button type="button" class="btn ' + (pending ? 'btn--ghost' : 'btn--neon') +
                   ' barber__cta" data-book="' + b.id + '">' +
                   dict['team.book'] + ' ' + barberShort(b, i) +
                 '</button>' +
               '</div>' +
             '</li>';
    }).join('');

    $$('[data-book]', list).forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectBarber(btn.getAttribute('data-book'), true);
      });
    });
  }

  function renderPicker() {
    var box = $('#picker'), row = $('#pickerRow');
    if (!box || !row) return;
    if (roster.length < 2) { box.hidden = true; return; }
    box.hidden = false;

    row.innerHTML = roster.map(function (b, i) {
      return '<button type="button" class="picker__b" data-pick="' + b.id + '" aria-pressed="false">' +
               '<span class="picker__i" aria-hidden="true">' + barberInitial(b, i) + '</span>' +
               barberShort(b, i) +
             '</button>';
    }).join('');

    $$('[data-pick]', row).forEach(function (btn) {
      btn.addEventListener('click', function () {
        selectBarber(btn.getAttribute('data-pick'), false);
      });
    });
  }

  /* Selection is painted immediately so the picker is never in a null
     state; the ~90KB Cal script is what waits for the section to approach. */
  function selectBarber(id, scroll) {
    var b = roster.filter(function (x) { return x.id === id; })[0];
    if (!b) return;
    picked = id;

    $$('[data-pick]').forEach(function (btn) {
      var on = btn.getAttribute('data-pick') === id;
      btn.classList.toggle('is-on', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    var mount = $('#schedule-mount'), pend = $('#schedPending');
    if (b.calLink) {
      if (pend) pend.hidden = true;
      if (calBooted) { mountCal(b); }
      else if (mount) { mount.hidden = false; mount.innerHTML = ''; }
    } else {
      if (mount) { mount.hidden = true; mount.innerHTML = ''; }
      if (pend)  pend.hidden = false;
    }

    if (scroll) {
      calBooted = true;                       /* an explicit tap wants it now */
      if (b.calLink) mountCal(b);
      var t = $('#agenda');
      if (t) t.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    }
  }

  /* ══ CAL.COM INLINE AGENDA ═══════════════════════════════════════════
     Loaded lazily — the script is ~90KB and most visitors book by tapping
     WhatsApp, so it must not sit in the critical path. It boots only when
     the booking section is near the viewport.
     ═════════════════════════════════════════════════════════════════════ */
  function bootCalScript() {
    if (window.Cal) return;
    /* Official Cal.com embed loader (queues calls until embed.js lands). */
    (function (C, A, L) {
      var p = function (a, ar) { a.q.push(ar); };
      var d = C.document;
      C.Cal = C.Cal || function () {
        var cal = C.Cal, ar = arguments;
        if (!cal.loaded) {
          cal.ns = {}; cal.q = cal.q || [];
          d.head.appendChild(d.createElement('script')).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          var api = function () { p(api, arguments); };
          var namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === 'string') {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar); p(cal, ['initNamespace', namespace]);
          } else { p(cal, ar); }
          return;
        }
        p(cal, ar);
      };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');
  }

  function mountCal(b) {
    var mount = $('#schedule-mount');
    if (!mount) return;
    bootCalScript();

    /* Each barber gets its own namespace and a fresh element: re-running
       an inline embed over a used node leaves the old calendar behind. */
    var ns   = 'valhalla-' + b.id;
    var slot = 'cal-slot-' + b.id;
    mount.innerHTML = '<div id="' + slot + '"></div>';
    mount.hidden = false;

    try {
      window.Cal('init', ns, { origin: 'https://app.cal.com' });
      window.Cal.ns[ns]('inline', {
        elementOrSelector: '#' + slot,
        calLink: b.calLink,
        /* We ask Cal for the page's language, but it overrides this from
           the Cal.com account setting — the agenda currently renders in
           Spanish in both locales. Change it in
           Cal.com → Settings → General → Language. */
        config: { layout: 'month_view', theme: 'dark', locale: lang }
      });
      window.Cal.ns[ns]('ui', {
        theme: 'dark',
        layout: 'month_view',
        hideEventTypeDetails: false,
        cssVarsPerTheme: { dark: { 'cal-brand': '#eaf4ff' } }
      });
    } catch (e) {
      /* Never strand the visitor in an empty box: the three channel
         cards above still work, so just drop the embed. */
      mount.hidden = true;
    }
  }

  /* Paint the default selection now; load Cal when the visitor nears it. */
  var agendaArmed = false;

  function armAgenda() {
    var target = $('#agenda');
    if (!target) return;

    if (!picked) {
      var first = barbersWithAgenda()[0] || roster[0];
      if (first) selectBarber(first.id, false);
    }
    if (agendaArmed) return;
    agendaArmed = true;

    var start = function () {
      if (calBooted) return;
      calBooted = true;
      var b = roster.filter(function (x) { return x.id === picked; })[0];
      if (b && b.calLink) mountCal(b);
    };

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { start(); io.disconnect(); } });
      }, { rootMargin: '600px' });
      io.observe(target);
    } else { start(); }
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

    renderTeam();
    renderPicker();
    wireLinks();
    renderHours();
    if (calBooted && picked) { selectBarber(picked, false); }
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

    /* Failsafe: an entrance is a nicety, readable content is not. If the
       observer has not reached something within 2.5s — a very tall viewport,
       a print or capture context, a stalled callback — show it anyway. */
    setTimeout(function () {
      targets.forEach(function (n) {
        if (!n.classList.contains('is-in')) { n.style.transitionDelay = '0ms'; n.classList.add('is-in'); }
      });
    }, 2500);
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
