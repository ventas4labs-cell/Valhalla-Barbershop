---
name: Valhalla Barbershop
description: One white neon light source in total dark — a barbershop lit like its own night sign.
colors:
  ground: "#08090a"
  ground-lift: "#0d0e10"
  panel: "#121317"
  panel-raised: "#17191d"
  neon: "#eaf4ff"
  halo: "rgb(142, 206, 255)"
  ink: "#f3f5f8"
  ink-2: "#bcc2ca"
  ink-3: "#8d939c"
  hairline: "rgba(255,255,255,.09)"
  hairline-2: "rgba(255,255,255,.16)"
  hairline-3: "rgba(255,255,255,.28)"
typography:
  display:
    fontFamily: "Big Shoulders Display, Arial Narrow, Helvetica, sans-serif"
    fontSize: "clamp(3.1rem, 11.6vw, 8.6rem)"
    fontWeight: 800
    lineHeight: 0.82
    letterSpacing: "-0.028em"
  headline:
    fontFamily: "Big Shoulders Display, Arial Narrow, Helvetica, sans-serif"
    fontSize: "clamp(1.95rem, 5.2vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Big Shoulders Display, Arial Narrow, Helvetica, sans-serif"
    fontSize: "clamp(1.35rem, 3.2vw, 2.15rem)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(0.98rem, 0.28vw + 0.92rem, 1.06rem)"
    fontWeight: 400
    lineHeight: 1.68
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.13em"
rounded:
  none: "0px"
spacing:
  gutter: "clamp(20px, 5vw, 64px)"
  section: "clamp(76px, 9.5vw, 148px)"
  tile-gap: "8px"
  tile-gap-wide: "12px"
  container: "1280px"
components:
  button-neon:
    backgroundColor: "{colors.neon}"
    textColor: "{colors.ground}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "14px 26px"
  button-neon-hover:
    backgroundColor: "#ffffff"
    textColor: "{colors.ground}"
  button-neon-lg:
    backgroundColor: "{colors.neon}"
    textColor: "{colors.ground}"
    padding: "17px 34px"
  button-ghost:
    backgroundColor: "rgba(255,255,255,.03)"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "14px 26px"
  button-ghost-hover:
    backgroundColor: "rgba(255,255,255,.06)"
    textColor: "{colors.neon}"
  channel-primary:
    backgroundColor: "{colors.neon}"
    textColor: "{colors.ground}"
    rounded: "{rounded.none}"
    padding: "clamp(30px,3.4vw,40px) clamp(26px,3vw,34px)"
  channel-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "24px 6px"
  service-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "clamp(18px,2.6vw,26px) 0"
  service-row-hover:
    backgroundColor: "rgba(255,255,255,.035)"
    textColor: "{colors.neon}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    padding: "6px 0"
  nav-link-hover:
    textColor: "{colors.ink}"
---

# Design System: Valhalla Barbershop

## Overview

**Creative North Star: "The Night Sign"**

The page is a shop photographed after closing, lit by the one thing still switched on. Everything begins from a single premise: there is exactly one light source, it is a cold white neon sign, and every other surface in the composition is either graphite it has not reached or a hairline it just barely catches. That is not a mood applied on top of a layout — it is the physics the layout obeys. Light spills, blooms onto the band directly beneath the hero, ignites once on load, and thereafter hums like a real tube. Nothing else in the system is allowed to glow.

Density is generous and vertical. Sections are tall (76–148px of breathing room top and bottom), content is left-aligned and ranged against a 1280px container, and the type does the shouting so the decoration does not have to. Big Shoulders Display is set uppercase and tight — condensed, structural, closer to painted signage than to a fashion serif. Archivo carries every sentence a person actually has to read, at a comfortable 1.68 line-height, and never tries to be expressive.

The world refuses the barbershop template on record: no warm gold accent, no rounded photo cards, no crossed-razors badge, no sepia. It also refuses roundness entirely. Every panel, button, and thumbnail is chamfered — a corner cut on a 45° bevel like the ground edge of a blade — and that chamfer, not a radius, is the form signature. Photography is monochrome as a material fact, not as a filter.

**Key Characteristics:**
- One light source: cold neon white (`#eaf4ff`) with a blue-white halo (`rgb(142,206,255)`). Nothing else emits.
- Zero border-radius anywhere; corners are chamfered instead.
- Four graphite planes from `#08090a` to `#17191d`, separated by hairlines, never by shadows.
- Condensed uppercase display against a plain workhorse text face.
- All photography monochrome, graded in the file, never in CSS.
- Mobile is the design; the desktop grid is the expansion of it.

## Colors

A four-step graphite ladder under one cold white light, with three ink weights and three hairline weights — and no second hue anywhere on the page.

### Primary
- **Neon White** (`#eaf4ff`): the only emitting colour in the system, and the entire accent budget. It appears as the wordmark face, the primary button fill, the WhatsApp channel field, the hero's tube rule, the animated section rules, the 5–6px status dots, the active language token, and the small set of link underlines. Never used as a body-text colour, never as a large field except on the two primary actions.
- **Cold Halo** (`rgb(142,206,255)`): never a fill — only the light *around* the light. Every glow, spill, drop-shadow and bloom in the system is built from this value at low alpha. It is stored as bare RGB channels precisely so it can only be consumed inside an `rgba()` glow.

### Neutral
- **Ground** (`#08090a`): the page. Also the text colour that sits on neon fills.
- **Ground Lift** (`#0d0e10`): the ticker band and the craft column — one step up from the page, used to separate a full-bleed strip without a border.
- **Panel** (`#121317`): the booking section and card bodies; the plane that reads as "a surface set into the wall".
- **Panel Raised** (`#17191d`): the secondary channel fields, the highest plane in the system.
- **Ink** (`#f3f5f8`): headings, prices, answers — anything the visitor came to read.
- **Ink 2** (`#bcc2ca`): leads, nav links at rest, supporting sentences.
- **Ink 3** (`#8d939c`): metadata, durations, captions, closed-day hours, footer fine print. The floor of legibility, never used for a whole paragraph the visitor must read.
- **Hairline / Hairline 2 / Hairline 3** (`rgba(255,255,255,.09 / .16 / .28)`): dividers, control borders, and button strokes respectively. Weight, not colour, encodes importance.

### Named Rules
**The One Light Rule.** There is a single emitting colour in this system and it is neon white. If a new element needs to feel important, it earns ink weight, a hairline, or a plane change — not a second glow. Two glowing things on one screen destroys the premise; count them before shipping.

**The Halo-Never-Fills Rule.** `--halo` may only ever appear inside a glow — `box-shadow`, `text-shadow`, `drop-shadow`, or a radial spill. The moment it becomes a background or a text colour, the page has a blue accent instead of a white light.

**The Monochrome Source Rule.** Photography ships pre-graded to monochrome in the image file (`format=gray` plus a lifted-black curve, documented in README). CSS adds **no** base filter to photography. A grayscale/brightness filter in the stylesheet double-darkens an already-graded asset; hover states may add contrast/brightness, never a base grade.

## Typography

**Display Font:** Big Shoulders Display (with Arial Narrow, Helvetica fallback)
**Body Font:** Archivo (with system-ui fallback)

**Character:** A condensed American signage face against a plain grotesque. Big Shoulders is set at weight 700–800, uppercase, with negative tracking and sub-1.0 line-height so headings compress into solid blocks of light; Archivo does nothing interesting on purpose, so that everything expressive on the page is either the display face or the neon.

### Hierarchy
- **Display** (800, `clamp(3.1rem, 11.6vw, 8.6rem)`, 0.82 line-height, -0.028em): the wordmark only. One instance per page, in the hero, as a lit sign face.
- **Headline** (800, `clamp(1.95rem, 5.2vw, 3.5rem)`, 0.94, -0.015em): section titles and the booking headline. Always paired with the animated hairline rule that runs out from it.
- **Title** (700, `clamp(1.35rem, 3.2vw, 2.15rem)`, 0.94): service names, prices, channel names, fact terms. Prices are set in the display face at title scale — the number is a headline, not a caption.
- **Body** (400, `clamp(0.98rem, 0.28vw + 0.92rem, 1.06rem)`, 1.68): every sentence. Measure is capped explicitly per context — 34ch for the hero lead, 30ch for the craft lead, 52–58ch for descriptions and notes.
- **Label** (600, 0.78rem, 0.13em tracking, uppercase): nav links, button text, durations, section notes, footer column heads, status line. Tracking widens as size drops (0.11em → 0.16em) so small uppercase stays readable outdoors.

### Named Rules
**The Uppercase-Display Rule.** Big Shoulders is only ever set uppercase. Mixed-case condensed reads as a compressed accident; the face is here because it behaves like painted signage.

**The Tabular-Number Rule.** Any column of numbers a visitor compares — the hours table, footer hours — uses `font-variant-numeric: tabular-nums`. Prices in the service menu are display-face and set as headlines, so they are exempt.

**The Sub-Line Rule.** The one line beneath the wordmark ("Barbershop", 0.52em tracking) belongs to the wordmark lockup and sits *below* it. Nothing on this site sets a small label above a heading.

## Layout

A single 1280px-max container (`--max`) with a fluid gutter (`--pad`, 20px → 64px) governs every section; only the work grid and full-bleed photography escape it. Vertical rhythm is one token: `--sec` (76px → 148px) as section padding-block, with heading blocks separated from their content by 34–56px.

The system is mobile-first and expands at three breakpoints. **560px** turns the booking channels and testimonials into two columns. **900px** is the real desktop switch: the inline nav replaces the burger, the service row grows a 112px thumbnail column, the work grid becomes three columns, the craft section splits into a photo/text pair divided by a vertical hairline, and the visit block becomes an asymmetric `1fr 1.15fr` info/map pair. **1200px** only deepens the hero.

Two narrow-width rules push the other direction rather than merely stacking: below **700px** the service row drops its third column and gives the price its own line beneath a hairline, and below **600px** the hero's two actions become a 1fr 1fr grid of equal full-width targets instead of two buttons crowding the viewport edge.

The work grid is deliberately uneven at desktop: every second tile of three is pushed down 44px and pulled back with a negative bottom margin, so the grid never resolves into a flat stock-photo block.

### Named Rules
**The Clip-Not-Hidden Rule.** `overflow-x` on `html` and `body` is `clip`, never `hidden`. `hidden` promotes the root to a scroll container and silently breaks `position: sticky` on the nav. Any future overflow containment at root level uses `clip`.

**The Transform-Only Motion Rule.** Layout responses to hover — the service row opening outward, the arrow advancing, the tile scaling — are done with `transform`, never by animating padding, width, or margin. Nothing reflows on hover.

## Elevation & Depth

There is no shadow vocabulary in the conventional sense. Depth is built from three things in order: **tonal planes** (`#08090a` → `#0d0e10` → `#121317` → `#17191d`), **hairlines** (one-pixel white at 9%, 16%, or 28%), and **light** (the neon glow, which is the only thing resembling a shadow in the stylesheet). Cards do not float; they are set into the wall.

The only true drop shadows are contact shadows under the two neon-filled surfaces, and they always ship paired with a halo glow — the dark half grounds the object, the light half is the light it emits.

### Shadow Vocabulary
- **Glow Small** (`0 0 1px rgba(255,255,255,.95), 0 0 6px rgba(142,206,255,.60), 0 0 18px rgba(142,206,255,.32)`): everything small and lit — dots, active language token, hovered service name, hovered link text, section-rule tips.
- **Glow Medium** (`0 0 1px #fff, 0 0 5px rgba(255,255,255,.85), 0 0 14px rgba(142,206,255,.65), 0 0 34px rgba(142,206,255,.38), 0 0 78px rgba(142,206,255,.20)`): the wordmark only. A five-stop falloff so the sign reads as a lit face with real atmosphere, not an outline.
- **Neon Contact** (`0 6px 26px -10px rgba(142,206,255,.85), 0 0 22px -6px rgba(142,206,255,.5)`): the neon button and the primary channel field — lifted and emitting at once.
- **Panel Lift** (`0 14px 34px -20px rgba(0,0,0,.9), 0 0 26px -12px rgba(142,206,255,.5)`): the secondary channel field on hover, the only place a dark shadow appears on a graphite plane.
- **Inset Frame** (`inset 0 0 0 1px rgba(255,255,255,.09)` → `inset 0 0 0 1px rgba(142,206,255,.55), inset 0 0 34px -8px rgba(142,206,255,.35)`): work tiles. The frame lights from within on hover rather than the tile lifting.

### Named Rules
**The Set-In Rule.** Surfaces are set into the page, not lifted off it. Reach for a plane change or a hairline before reaching for a shadow; a dark shadow is only permitted where an element is already emitting.

**The Spill Rule.** A light source must illuminate something other than itself. The hero sign throws a `mix-blend-mode: screen` radial spill onto the photograph behind it, and the tube rule at the hero's bottom edge blooms 72px down onto the ticker band beneath. Any future light element in this system spills onto its neighbour.

## Shapes

**Radius is zero. Everywhere. Without exception.** The form language is the *chamfer*: a 45° corner cut applied via `clip-path` to the top-left and bottom-right corners only, so every panel reads as a blade bevel with a consistent diagonal direction. The cut depth is a per-element variable (`--cut`) scaled to the element: 9px on a 78px service thumbnail, 12px on a button, 14px on a testimonial and the shared `.cutbox` utility, 16px on the wide craft photo, 18px on a channel field.

Everything else is drawn with 1px hairlines. Controls (language switch, burger, social links, map frame) are bare bordered rectangles at hairline-2 weight. Dividers between list rows, facts, and footer bands are hairline weight. The facts list builds its rules out of a 1px background grid showing through gaps rather than out of borders.

Icons are authored inline SVG at a consistent 1.6px stroke, square-cut, 17–42px depending on role. Small square markers (5–6px, neon, glow-small) stand in for bullets throughout — never a glyph, never a disc.

### Named Rules
**The Zero-Radius Rule.** No `border-radius` value other than `0` may enter this system. Softness is not available; if a corner needs relief, it gets a chamfer.

**The Two-Corner Chamfer Rule.** The bevel always cuts top-left and bottom-right, never all four. A four-corner chamfer reads as an octagon; two corners read as a cut edge, and consistent direction is what makes it a system instead of an effect.

## Components

### Buttons
- **Shape:** Chamfered rectangle, 12px cut, zero radius.
- **Primary (neon):** Neon-white fill on ground-dark text, 14px/26px padding at default and 17px/34px at `--lg`, uppercase label at 0.14em tracking, carrying the Neon Contact shadow pair.
- **Ghost:** 3% white wash inside a hairline-3 stroke, ink text.
- **Hover:** Neon goes to pure white with a deeper contact shadow and a 1px lift; ghost swaps its border and text to neon and takes on Glow Small. Both settle back on `:active`. Transitions run 0.28–0.3s on the house easing `cubic-bezier(.16,.84,.32,1)`.
- **Focus:** A 2px neon outline at 3px offset — global, applied to every focusable element via `:focus-visible`.

### Service Row (signature component)
The service menu is a hairline-divided list, not a card grid: thumbnail (78px mobile → 112px desktop, 9px chamfer) / name + description / duration + price. On desktop hover the row opens *outward* — media and body translate +16px, the price block translates -16px, a 3.5% wash bleeds 24px past the container edge, the thumbnail scales 1.09, and the name and price both light up neon. Hover behaviour is gated behind `(hover:hover) and (min-width:900px)` so touch devices never receive a stuck state. A masked, dimmed copy of the hovered service's photo washes into the list background behind it at 30% opacity.

### Channel Fields (signature component)
The booking section refuses three identical icon+heading+text cards. The primary channel (WhatsApp) is a full-width neon *field* — an 18px-chamfered slab of neon white with dark ink, a 42px icon, and an arrow that advances 7px on hover. The other two channels are not cards at all: they drop the background, border, chamfer, and shadow, and become text-led rows separated by a hairline-2 top rule that lights to halo on hover. Hierarchy is expressed by removing chrome from the alternatives, not by ranking three of the same object.

### Cards / Containers
- **Corner Style:** 14px chamfer (top-left / bottom-right).
- **Background:** Panel (`#121317`) on the ground-lift band.
- **Border:** 1px hairline. **Shadow:** none at rest — see The Set-In Rule.
- **Internal Padding:** 26px block, 24px inline.

### Navigation
Sticky, fully transparent at the top of the page, and on any scroll past 12px it fades in an 86%-opaque ground background with a 14px blur/1.2 saturate backdrop and a hairline bottom border over 0.35s. Links are 0.78rem uppercase labels at 0.13em tracking in ink-2; hover raises them to ink and wipes a glowing 1px neon underline in from the left. The mark is a drawn neon "V" chevron plus the wordmark in the display face. Below 900px the links collapse into a burger whose two bars cross into an X, opening a full-width blurred sheet where links are set at 1.9rem display-face uppercase on hairline dividers, with the booking link in neon.

### Language Switch
A hairline-2 bordered pill of two 0.68rem tokens separated by a 1px rule. The active locale is neon with Glow Small; the inactive is ink-3. State is carried by `aria-pressed` as well as colour, so the glow is never the sole signal.

### Hours Table
Borderless table on hairline row rules; day names left in ink-3, times right in ink with tabular numerals, closed days dropped to ink-3. Paired with a live open/closed line whose dot is inert ink-3 when closed and neon-with-a-slow-pulse when open — the accompanying text always states the status in words.

### Named Rules
**The State-Is-Never-Only-Light Rule.** Neon may reinforce a state but never carry it alone. Open/closed, active locale, and current nav item each carry a text or ARIA signal alongside the glow. This is an accessibility invariant, not a preference.

## Do's and Don'ts

### Do:
- **Do** keep exactly one emitting colour on screen. Neon white (`#eaf4ff`) plus its halo; nothing else glows.
- **Do** chamfer every panel at 45° on the top-left and bottom-right corners, sized to the element (9px thumbnails, 12px buttons, 14px cards, 18px fields).
- **Do** grade photography to monochrome in the image file and let CSS add nothing at rest.
- **Do** build depth from planes and hairlines first — `#08090a` / `#0d0e10` / `#121317` / `#17191d` separated by 1px white at 9–28%.
- **Do** make every light source spill onto what is behind or beneath it.
- **Do** use `overflow-x: clip` at root, never `hidden`.
- **Do** design the narrow view as its own composition — reflow the service price onto its own line, give the hero two equal full-width actions — rather than letting the desktop layout compress.
- **Do** gate hover choreography behind `(hover:hover)` and honour `prefers-reduced-motion` by killing the ignite, hum, pulse, ticker, and reveal.

### Don't:
- **Don't** introduce a `border-radius`. Not on an avatar, not on a badge, not on a form field.
- **Don't** add a second accent hue — no gold, no red, no warm tone anywhere in the palette.
- **Don't** apply `grayscale()` or `brightness()` as a base filter on photography; the file is already graded and CSS would double-darken it.
- **Don't** use `--halo` as a fill, a text colour, or a border colour. It exists only inside glows.
- **Don't** animate padding, width, or margin on hover — use `transform` so nothing reflows.
- **Don't** rank parallel actions as three identical icon+heading+text cards; promote one to a field and strip the others to text rows.
- **Don't** let neon be the only carrier of a state, and don't drop body text below ink-3 (`#8d939c`) on the graphite planes.
- **Don't** set Big Shoulders in mixed case, and don't place a small uppercase label above a heading.
