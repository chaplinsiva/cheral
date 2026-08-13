---
agent-notes: { ctx: "sprint implementation plan for Cheral MVP", deps: [AGENTS.md, docs/adrs/0003-cheral-web-architecture-and-design-system.md], state: active, last: "grace@2026-07-26" }
---

# Cheral MVP Implementation Plan

## Goal
Build and deliver the complete, high-impact Cheral Traveling Historical Trust web application with warm travel design tokens, bilingual branding (English and Tamil), interactive historical destination discovery, heritage trust verification cards, and curated travel guide itineraries.

## Sprint 1 Work Items

### 1. Foundation & Design System (`#F7F3EF` Warm Off-White UI)
- Set up Vite application with HTML5, CSS design tokens, and modular ES JavaScript.
- Define CSS custom properties: Warm Off-White (`#F7F3EF`), Pure White (`#FFFFFF`), Charcoal Black (`#222222`), Medium Gray (`#6F6F6F`), Light Gray (`#D9D9D9`), Warm Peach (`#F8D7C6`), Coral Orange (`#F68B5F`), Soft Terracotta (`#E26E4D`), Sand Beige (`#E8D9CC`).
- Configure Google Fonts (`Outfit` for headlines, `Inter` for body text).

### 2. Header & Bilingual Branding Navigation
- Build dynamic header supporting English (`logos/Cheral eng logo copy.png`) and Tamil (`logos/Final Cheral logo transparent.png`) logos.
- Implement language switcher (English / Tamil) and responsive navigation drawer for mobile viewports.
- Set `logos/Final Cheral logo copy.png` as high-resolution favicon and site icon.

### 3. Hero Showcase & Editorial Storytelling
- Create a magazine-style hero section with background soft peach shapes (`#F8D7C6`), bold charcoal typography, warm coral CTA ("Explore Historical Trust"), and hero photography.
- Highlight key brand promise: "Traveling Historical Trust — Verified Heritage & Ancient Journeys".

### 4. Interactive Destination & Heritage Trust Explorer
- Build filterable destination cards (Filter by Historical Era: Chera Kingdom, Chola Heritage, Coastal Temples, Hill Forts).
- Add Heritage Trust Score Badges on each card with verification credentials.
- Implement interactive search bar to search historical locations by keyword.

### 5. Detailed Heritage Itinerary & Guide Modal
- Build interactive modal view for exploring a curated historical itinerary (day-by-day guides, trust verification notes, local heritage guide contacts).

### 6. Interactive Trust Verification & Community Reviews
- Build Trust Metrics section showing verified historical sites, community trust ratings, and preservation support status.
- Add footer with copyright, language selector, and quick links.

## Personas Involved
- **Cam**: Product vision alignment
- **Tara**: Test suite and visual validation
- **Sato**: Core implementation
- **Dani**: Design system & aesthetic review
- **Pierrot**: XSS sanitization and security audit
- **Grace**: Board tracking & sprint execution
