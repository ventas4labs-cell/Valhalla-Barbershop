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
| Link de agenda en línea (Booksy / Fresha / Calendly) | `SHOP.bookingUrl` |
| Embed de Google Calendar | `SHOP.calendarEmbed` |
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

**Contacto y ubicación** — `assets/js/content.js`
- [ ] `phone` y `phoneDial` — hoy `+506 0000-0000`
- [ ] `whatsapp` — hoy `50600000000`
- [ ] `address` y `mapQuery` — hoy `Av. Central 123, San José, Costa Rica`
- [ ] `instagram` y `facebook` — hoy vacíos (los íconos se ocultan solos hasta que se llenen)
- [ ] `bookingUrl` — hoy vacío; mientras esté vacío, la tarjeta "Agenda en línea" manda a
      WhatsApp para que nunca sea un callejón sin salida

**Servicios y precios** — `index.html`
- [ ] Los cuatro servicios, sus descripciones, duraciones y precios (₡8.000 / ₡12.000 /
      ₡9.000 / ₡6.000). La moneda también: si no se cobra en colones, cambiá el `<em class="cur">₡</em>`
- [ ] Confirmar que las tres promesas de la sección "El oficio" son ciertas
      (cita o walk-in, herramienta limpia, corrección gratis dentro de 7 días).
      **Si alguna no se cumple, borrala** — es una promesa al cliente, no relleno

**Horario** — `assets/js/site.js`
- [ ] `HOURS` (arriba del archivo) controla la tabla y el indicador "Abierto ahora"
- [ ] La tabla dentro de `index.html` es el respaldo para navegadores sin JavaScript:
      **si cambiás uno, cambiá el otro**

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

## Google Calendar (pendiente)

La sección de reservas ya tiene el espacio reservado. Cuando tengás el embed:

1. Google Calendar → *Programaciones de citas* → *Compartir* → *Insertar*
2. Copiá el `src` del `<iframe>` a `SHOP.calendarEmbed` en `assets/js/content.js`

Aparece automáticamente debajo de las tres tarjetas de reserva. No hay que tocar el diseño.

---

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
