/* ═══════════════════════════════════════════════════════════════════════
   VALHALLA BARBERSHOP — CONTENT & CONFIG
   This is the only file you need to edit for day-to-day changes.
   Everything marked  ⚠ REPLACE  is placeholder data.
   ═══════════════════════════════════════════════════════════════════════ */

const SHOP = {

  /* ── Set to false once every ⚠ REPLACE below is real. It hides the
        "demo site" strip and the "Ejemplo" chips on the reviews. ───────── */
  DEMO_MODE: true,

  /* ── CONTACT ⚠ REPLACE ──────────────────────────────────────────────── */
  phone:       '+506 0000-0000',   // shown to visitors
  phoneDial:   '+50600000000',     // tel: link — digits and leading + only
  whatsapp:    '50600000000',      // wa.me number — country code, no + or spaces

  /* Message pre-filled when someone taps WhatsApp */
  whatsappMsg: {
    es: '¡Hola Valhalla! Quiero reservar una cita.',
    en: 'Hi Valhalla! I would like to book an appointment.'
  },

  /* ── ONLINE BOOKING ⚠ REPLACE ───────────────────────────────────────────
     Paste the public booking link (Booksy, Fresha, Calendly, or a Google
     Calendar appointment-schedule link). Until it is set, the "Agenda en
     línea" card falls back to WhatsApp so it is never a dead end.       */
  bookingUrl: '',

  /* ── GOOGLE CALENDAR (planned) ──────────────────────────────────────────
     Paste the <iframe> src from Google Calendar →
     Appointment schedules → Share → Embed. Leave empty until then; the
     booking section renders correctly without it.                       */
  calendarEmbed: '',

  /* ── LOCATION ⚠ REPLACE ─────────────────────────────────────────────── */
  address:   'Av. Central 123, San José, Costa Rica',
  mapQuery:  'Av. Central 123, San José, Costa Rica',  // used for the map + directions

  /* ── SOCIAL ⚠ REPLACE (leave empty to hide the icon) ────────────────── */
  instagram: '',
  facebook:  '',

  /* ── LANGUAGE ───────────────────────────────────────────────────────── */
  defaultLang: 'es'
};

/* ═══════════════════════════════════════════════════════════════════════
   TRANSLATIONS
   Spanish is what ships in index.html. This table supplies both locales,
   so edit BOTH when you change a line of copy.
   ═══════════════════════════════════════════════════════════════════════ */

const I18N = {
  es: {
    'skip': 'Saltar al contenido',
    'demo': 'Sitio de demostración — fotos, precios, horarios y opiniones son de ejemplo.',

    'nav.services': 'Servicios',
    'nav.work':     'Trabajo',
    'nav.craft':    'El oficio',
    'nav.visit':    'Visitanos',
    'nav.book':     'Reservar',

    'hero.lead':  'Corte, barba y afeitado clásico con navaja. Sin prisa, sin improvisar.',
    'hero.cta1':  'Reservar cita',
    'hero.cta2':  'Ver precios',
    'hero.hours': 'Mar–Vie 10:00–20:00 · Sáb 09:00–18:00',

    'svc.h':    'La carta',
    'svc.note': 'Precios por servicio. Sin recargos escondidos.',
    'svc.1.n': 'Corte',              'svc.1.t': '45 min',
    'svc.1.d': 'Lavado, corte a tijera y máquina, peinado y acabado con navaja en el contorno.',
    'svc.2.n': 'Corte + Barba',      'svc.2.t': '70 min',
    'svc.2.d': 'El servicio completo: corte, perfilado de barba, toalla caliente y aceite.',
    'svc.3.n': 'Afeitado clásico',   'svc.3.t': '40 min',
    'svc.3.d': 'Navaja, toalla caliente, pre-afeitado y bálsamo. El ritual completo, a pulso.',
    'svc.4.n': 'Perfilado de barba', 'svc.4.t': '30 min',
    'svc.4.d': 'Definición de líneas a navaja, recorte a tijera y acondicionado.',

    'work.h':    'El trabajo',
    'work.note': 'Fotos de ejemplo. Se reemplazan por trabajo real del local.',

    'craft.h':    'El oficio',
    'craft.lead': 'Cada corte empieza con dos minutos de conversación. Lo que sale de esta silla tiene que aguantar cuatro semanas, no una foto.',
    'craft.f1t': 'Cita o walk-in',
    'craft.f1d': 'Reservá y entrás a la hora. Si caés sin cita, te decimos la espera real antes de que te sentés.',
    'craft.f2t': 'Herramienta limpia',
    'craft.f2d': 'Navaja de hoja desechable y máquina desinfectada entre cliente y cliente. Sin excepciones.',
    'craft.f3t': 'Si no queda, se arregla',
    'craft.f3d': 'Volvé dentro de los 7 días y lo corregimos sin cobrar.',

    'book.h':       'Reservá en 30 segundos',
    'book.lead':    'Elegí el canal que te sirva. Contestamos en horario de local.',
    'book.wa.k':    'WhatsApp',
    'book.wa.v':    'Mensaje directo con el servicio ya escrito',
    'book.wa.aria': 'Reservar por WhatsApp',
    'book.tel.k':   'Llamar',
    'book.ag.k':    'Agenda en línea',
    'book.ag.v':    'Elegí día y hora vos mismo',
    'book.fine':    'Cancelaciones con 2 horas de anticipación, por el mismo canal.',

    'visit.h':     'Visitanos',
    'visit.addr':  'Dirección',
    'visit.dir':   'Cómo llegar',
    'visit.hours': 'Horario',
    'd.mon': 'Lunes',   'd.tue': 'Martes', 'd.wed': 'Miércoles', 'd.thu': 'Jueves',
    'd.fri': 'Viernes', 'd.sat': 'Sábado', 'd.sun': 'Domingo',   'd.closed': 'Cerrado',

    'says.h':    'Lo que dicen',
    'says.note': 'Texto de ejemplo. Reemplazar por reseñas reales de Google antes de publicar.',
    'says.tag':  'Ejemplo',
    'says.1':  '«Pedí que me lo dejaran para aguantar el mes y así salió. A las cuatro semanas todavía tenía forma.»',
    'says.2':  '«Llegué sin cita, me dijeron cuarenta minutos y fueron cuarenta minutos. Eso ya es raro.»',
    'says.3':  '«El afeitado con navaja y toalla caliente vale cada colón. Salí durmiendo de pie.»',
    'says.1c': 'Reseña de ejemplo', 'says.2c': 'Reseña de ejemplo', 'says.3c': 'Reseña de ejemplo',

    'foot.blurb':   'Corte, barba y afeitado clásico con navaja.',
    'foot.links':   'Navegación',
    'foot.contact': 'Contacto',
    'foot.h1':      'Mar – Vie',
    'foot.h2':      'Dom y Lun',
    'foot.cred':    'Fotografía de ejemplo vía Unsplash — ver assets/img/CREDITS.md'
  },

  en: {
    'skip': 'Skip to content',
    'demo': 'Demo site — photos, prices, hours and reviews are placeholders.',

    'nav.services': 'Services',
    'nav.work':     'Work',
    'nav.craft':    'The craft',
    'nav.visit':    'Visit us',
    'nav.book':     'Book',

    'hero.lead':  'Cuts, beards and classic straight-razor shaves. No rush, nothing improvised.',
    'hero.cta1':  'Book a chair',
    'hero.cta2':  'See prices',
    'hero.hours': 'Tue–Fri 10:00–20:00 · Sat 09:00–18:00',

    'svc.h':    'The menu',
    'svc.note': 'Priced per service. No hidden add-ons.',
    'svc.1.n': 'Haircut',       'svc.1.t': '45 min',
    'svc.1.d': 'Wash, scissor and clipper cut, styling, and a razor finish on the outline.',
    'svc.2.n': 'Cut + Beard',   'svc.2.t': '70 min',
    'svc.2.d': 'The full service: haircut, beard shape-up, hot towel and oil.',
    'svc.3.n': 'Classic shave', 'svc.3.t': '40 min',
    'svc.3.d': 'Straight razor, hot towel, pre-shave and balm. The whole ritual, by hand.',
    'svc.4.n': 'Beard shape-up','svc.4.t': '30 min',
    'svc.4.d': 'Razor-defined lines, scissor trim and conditioning.',

    'work.h':    'The work',
    'work.note': 'Sample photos. To be replaced with real work from the shop.',

    'craft.h':    'The craft',
    'craft.lead': 'Every cut starts with a two-minute conversation. What leaves this chair has to hold up for four weeks, not for one photo.',
    'craft.f1t': 'Booked or walk-in',
    'craft.f1d': 'Book and you sit on time. Walk in and we tell you the real wait before you take a seat.',
    'craft.f2t': 'Clean tools',
    'craft.f2d': 'Single-use razor blades and clippers disinfected between clients. No exceptions.',
    'craft.f3t': "If it's not right, we fix it",
    'craft.f3d': 'Come back within 7 days and we correct it at no charge.',

    'book.h':       'Book in 30 seconds',
    'book.lead':    'Pick whichever channel suits you. We answer during shop hours.',
    'book.wa.k':    'WhatsApp',
    'book.wa.v':    'Direct message with the service already filled in',
    'book.wa.aria': 'Book via WhatsApp',
    'book.tel.k':   'Call',
    'book.ag.k':    'Online agenda',
    'book.ag.v':    'Pick your own day and time',
    'book.fine':    'Cancellations at least 2 hours ahead, through the same channel.',

    'visit.h':     'Visit us',
    'visit.addr':  'Address',
    'visit.dir':   'Get directions',
    'visit.hours': 'Hours',
    'd.mon': 'Monday',  'd.tue': 'Tuesday',  'd.wed': 'Wednesday', 'd.thu': 'Thursday',
    'd.fri': 'Friday',  'd.sat': 'Saturday', 'd.sun': 'Sunday',    'd.closed': 'Closed',

    'says.h':    'What people say',
    'says.note': 'Sample text. Replace with real Google reviews before launch.',
    'says.tag':  'Sample',
    'says.1':  '"I asked for something that would last the month and that is what I got. Four weeks later it still had shape."',
    'says.2':  '"Walked in with no appointment, they said forty minutes and it was forty minutes. That alone is rare."',
    'says.3':  '"The straight-razor shave with the hot towel is worth every colón. I nearly fell asleep standing up."',
    'says.1c': 'Sample review', 'says.2c': 'Sample review', 'says.3c': 'Sample review',

    'foot.blurb':   'Cuts, beards and classic straight-razor shaves.',
    'foot.links':   'Navigation',
    'foot.contact': 'Contact',
    'foot.h1':      'Tue – Fri',
    'foot.h2':      'Sun & Mon',
    'foot.cred':    'Sample photography via Unsplash — see assets/img/CREDITS.md'
  }
};
