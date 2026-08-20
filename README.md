# Valhalla Barbershop — sitio web

Sitio estático de una sola página, bilingüe (español / inglés), sin build ni dependencias.
Se abre con doble clic en `index.html` y se publica en cualquier hosting.

> **Este es un sitio de demostración.** Fotos, precios, horarios, dirección, teléfono y
> opiniones son de ejemplo. La lista completa de lo que hay que reemplazar está más abajo.

---

## Cómo verlo

Abrí `index.html` en el navegador. Para que el mapa y el cambio de idioma funcionen igual
que en producción, servilo por HTTP:

```bash
python3 -m http.server 4321
```

Luego entrá a `http://localhost:4321`.

---

## Qué editar (y dónde)

Casi todo se cambia en **un solo archivo**: [`assets/js/content.js`](assets/js/content.js).

| Qué querés cambiar | Dónde |
|---|---|
| Teléfono, WhatsApp, dirección, redes | `SHOP` en `assets/js/content.js` |
| Barberos, sus fotos y sus agendas | `SHOP.barbers` |
| Textos en español e inglés | `I18N.es` / `I18N.en` en el mismo archivo |
| Horario de atención | `HOURS` al inicio de `assets/js/site.js` |
| Servicios, precios y duraciones | `index.html`, sección `<section id="servicios">` |
| Fotos | carpeta `assets/img/` |
| Colores, tipografías, espaciado | `assets/css/site.css` (bloque `:root` al inicio) |

### Quitar el aviso de demostración

En `assets/js/content.js` poné:

```js
DEMO_MODE: false,
```

Eso elimina la franja superior de "sitio de demostración", las etiquetas *Ejemplo* de las
opiniones y las notas de "fotos de ejemplo". **Hacelo solo cuando todo lo de la lista de
abajo esté reemplazado por información real.**

---

## ⚠ Lista de reemplazo antes de publicar

Nada de esto es información real del local. Todo fue inventado como marcador de posición.

**Barberos** — `SHOP.barbers` en `assets/js/content.js`
- [ ] Nombre real de los barberos 2 y 3 — hoy salen como "Barbero 2" y "Barbero 3"
- [ ] `calLink` de los barberos 2 y 3 — hoy vacío; su botón manda a WhatsApp
- [ ] Foto de los tres — hoy se muestra un monograma con la inicial
- [ ] `role` de cada uno (especialidad, una línea) — hoy vacío, se oculta

**Contacto** — `assets/js/content.js`
- [ ] `phone` y `phoneDial` — hoy `+506 0000-0000` ← **lo único de contacto que falta**
- [ ] `whatsapp` — hoy `50600000000`
- [ ] `instagram` y `facebook` — hoy vacíos (los íconos se ocultan solos hasta que se llenen)

**Ya son reales, no tocar salvo que cambien**
- ✅ Dirección: San José, El Carmen, 10111 · Código Plus `WW99+4V`
- ✅ Horario: Lunes a Sábado, 11:00–20:00. Domingo cerrado
- ✅ Agenda: `cal.com/gabriel-marcelo-hidalgo-castro-ov3cuj/30min`, con el
      calendario incrustado en la sección de reservas

**Servicios y precios** — `index.html`
- [ ] Los cuatro servicios, sus descripciones, duraciones y precios (₡8.000 / ₡12.000 /
      ₡9.000 / ₡6.000). La moneda también: si no se cobra en colones, cambiá el `<em class="cur">₡</em>`
- [ ] Confirmar que las tres promesas de la sección "El oficio" son ciertas
      (cita o walk-in, herramienta limpia, corrección gratis dentro de 7 días).
      **Si alguna no se cumple, borrala** — es una promesa al cliente, no relleno

**Horario** — ya es real, pero vive en dos lugares
- `HOURS` en `assets/js/site.js` manda: controla la tabla y el "Abierto ahora"
- La tabla en `index.html` es el respaldo para navegadores sin JavaScript.
  **Si cambiás uno, cambiá el otro**

**Opiniones** — `index.html`, sección `id="opiniones"`
- [ ] Las tres reseñas son **texto inventado** y están marcadas como *Ejemplo*.
      Reemplazalas por reseñas reales de Google o borrá la sección entera.
      No publiques las de ejemplo sin la etiqueta

**Fotos** — `assets/img/`
- [ ] `hero.jpg`, `craft.jpg`, `tools.jpg` son **fotos reales que vos aportaste**
- [ ] Todo lo demás (`w1`–`w6`, `svc-*`, `chair.jpg`) es stock de Unsplash.
      Créditos en [`assets/img/CREDITS.md`](assets/img/CREDITS.md)
- [ ] Reemplazá las de la galería y los servicios por trabajo real del local

**Marca**
- [ ] No hay logo. El nombre está dibujado como letrero de neón con tipografía
      (`.sign` en el CSS) y el ícono es una "V" en SVG dentro de `index.html`.
      Cuando exista el logo real, reemplazá esos dos y el favicon del `<head>`

---

## Fotografía

Todas las imágenes vienen **ya reveladas a blanco y negro** en el archivo, no con filtros
CSS. Eso es intencional: el sitio es monocromo para que el neón blanco sea el único color,
y revelar en el archivo evita que las fotos se oscurezcan dos veces.

Cuando agregues fotos nuevas, pasalas por el mismo revelado para que no desentonen:

```bash
ffmpeg -i original.jpg -vf "format=gray,curves=all='0/0.015 0.20/0.17 0.50/0.49 0.80/0.74 1/0.90',eq=contrast=1.10" -q:v 5 assets/img/nueva.jpg
```

Los originales a color quedaron en `_source-photos/`.

---

## Los barberos y sus agendas

Las tres sillas trabajan al mismo tiempo, así que cada barbero tiene su propia
agenda de Cal.com. El visitante elige barbero y el calendario de abajo se recarga
con el de esa persona.

Todo sale de **una sola lista**, `SHOP.barbers` en
[`assets/js/content.js`](assets/js/content.js):

```js
{
  id:      'barbero-2',                  // identificador interno, sin espacios
  name:    'Nombre Apellido',            // como lo conocen los clientes
  role:    { es: 'Degradados', en: 'Fades' },   // una línea corta, o '' para ocultarla
  photo:   'team-nombre.jpg',            // archivo en assets/img/, o '' para el monograma
  calLink: 'usuario/30min'               // lo que va después de cal.com/
}
```

**Cuando te lleguen los links**, pegá cada uno en su `calLink` y listo: aparece el
selector con los tres, y la agenda cambia sola al tocar cada uno.

Detalles que ya están resueltos y no hay que programar:

- **Un barbero sin `calLink`** igual sale en la página, marcado como *Agenda
  pendiente*, y su botón manda a WhatsApp en vez de a un callejón sin salida.
  Por eso el sitio se puede publicar antes de tener los tres links.
- **Un barbero sin `photo`** muestra un monograma con su inicial, en neón. Es a
  propósito: es más honesto que poner una foto de banco de imágenes haciéndola
  pasar por alguien que trabaja acá. Apenas tengás las fotos reales, poné el
  nombre del archivo y el monograma desaparece.
- **Podés agregar o quitar barberos** sumando o borrando elementos de la lista.
  Con un solo barbero el selector se oculta solo.

**Google Calendar:** cada barbero lo conecta una sola vez en su cuenta de Cal.com,
en *Settings* → *Calendars*. Cal.com sincroniza en ambos sentidos, así que los
horarios que muestra el sitio ya respetan lo que cada uno tenga en su calendario.

**Dos cosas por revisar en Cal.com, no en el sitio:**

1. **El evento de Marcelo dura 30 minutos, pero la carta tiene cuatro servicios de
   45, 70, 40 y 30 min.** Quien reserve "Corte + Barba" está apartando 30 minutos
   para un servicio de 70. Conviene que cada barbero cree un tipo de evento por
   servicio, o que ajusten la duración a mano.
2. **La agenda se muestra en español aunque el sitio esté en inglés.** Cal.com usa
   el idioma de la cuenta e ignora el del sitio. Se cambia en Cal.com →
   *Settings* → *General* → *Language*.

## Publicar

Es un sitio estático: cualquier hosting sirve.

```bash
npx vercel --prod
```

También funciona con GitHub Pages, Netlify, o subiendo la carpeta por FTP.

---

## Estructura

```
index.html              todo el marcado
assets/css/site.css     el sistema visual completo
assets/js/content.js    ← configuración y textos (lo que se edita a diario)
assets/js/site.js       comportamiento: idioma, horario, menú, reveals
assets/img/             fotos (ya en blanco y negro)
_source-photos/         originales a color, sin procesar
PRODUCT.md              qué es este producto y qué no se puede inventar
DESIGN.md               el sistema visual, documentado
```

## Notas técnicas

- Sin build, sin dependencias, sin framework. Dos archivos JS planos.
- La página funciona **sin JavaScript**: se puede leer y reservar igual
  (los links de WhatsApp y teléfono se arman en JS, pero el contenido y la tabla de
  horario están en el HTML).
- Tipografías: Big Shoulders Display y Archivo, vía Google Fonts.
- Respeta `prefers-reduced-motion`.
- Contraste verificado contra WCAG AA: el par más bajo del sitio es 6.0:1.
