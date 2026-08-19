# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS — no build step, no framework, no dependencies. User's explicit choice, chosen so the site deploys to any host (Vercel, GitHub Pages, shared hosting) and stays editable by non-developers. Content is centralized in a single data file so copy, prices, and hours can be changed without touching layout code.

## Users

Primary: local walk-in and repeat clients of a single-location barbershop, mostly on a phone, deciding within a minute or two whether this is the shop they want and how to get an appointment. They arrive from Instagram, Google Maps, or word of mouth. Secondary: a first-time visitor comparing two or three shops in the same neighbourhood, who needs price, location, hours, and proof of cut quality fast.

## Product Purpose

Convert an interested visitor into a booked appointment. Success is measured in booking actions started (WhatsApp thread opened, call placed, booking link followed), not in time on page. The site is the shop's front door for people who have not walked past it yet.

## Positioning

Undecided as a differentiated claim. The name "Valhalla" and its Norse register is the only positioning fact confirmed so far. Any claim about the shop's technique, heritage, or clientele must come from the owner — it must not be invented.

## Operating Context

- Visitors are overwhelmingly on mobile, often on cellular data, frequently outdoors in daylight.
- Booking happens through three parallel channels, all of which must be visible and reachable: WhatsApp (prefilled message), phone call, and a third-party booking platform link.
- **Planned, not yet built:** Google Calendar integration for availability/scheduling. The booking section must be structured so a calendar-backed scheduling surface can be dropped in later without redesigning the page.

## Capabilities and Constraints

- Bilingual: Spanish and English with a visitor-facing language toggle. Both locales are first-class; neither is a translation afterthought.
- Static site — no server, no database, no form backend. Any "form" must resolve to one of the three booking channels.
- No logo exists yet. The identity must work as type and mark drawn in-page, and must survive a real logo being dropped in later.
- All third-party booking URLs, phone numbers, and WhatsApp numbers are placeholders until the owner supplies real ones.

## Brand Commitments

- Name: **Valhalla Barbershop**.
- Palette constraint set by the owner: black and grey, with white neon as the accent detail. This is binding.
- Norse / Valhalla register is implied by the name and is treated as available material, not as a mandate for horned-helmet cliché.

## Evidence on Hand

None. There are no photos of the shop, no team photos, no real service menu, no prices, no address, no hours, no reviews, and no logo. Every one of these ships as a clearly marked placeholder with a replacement checklist. Stock photography stands in for shop and cut imagery and is labelled as such. **No testimonial, review, rating, award, years-in-business, or client-count claim may be fabricated.**

## Product Principles

1. **The booking action is never more than one screen away.** Every section ends within reach of a way to book.
2. **Placeholders announce themselves.** Invented content is visually and structurally marked so nothing false ships by accident.
3. **Both languages are the same product.** Layout, hierarchy, and tone hold in Spanish and English; no locale gets a degraded version.
4. **Mobile is the design, desktop is the expansion.** The phone view is where the decision actually happens.
5. **The shop is proven by its work, not by adjectives.** Show cuts, space, and craft; do not assert reputation the owner has not earned on record.

## Accessibility & Inclusion

Daylight mobile use makes contrast non-negotiable: body text and interactive labels must clear WCAG AA against the dark ground. Neon accents may never be the sole carrier of meaning or state. Tap targets sized for one-handed outdoor use. Motion respects `prefers-reduced-motion`.
