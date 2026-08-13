---
agent-notes: { ctx: "ADR for Cheral Web Architecture and Warm Travel Design System", deps: [AGENTS.md, docs/product-context.md], state: canonical, last: "archie@2026-07-26" }
---

# ADR-0003: Cheral Web Architecture and Warm Travel Design System

## Status

Accepted

## Context

Cheral is a Traveling Historical Trust web platform requiring an elegant, warm minimalist design aesthetic with fast page loads, bilingual branding (English and Tamil), interactive historical travel exploration, and heritage trust verification features. The site needs a maintainable tech stack, strict design system tokens, and responsive layout primitives.

## Decision

1. **Tech Stack & Tooling**: Use Next.js (App Router) with React 19, TypeScript, and Tailwind CSS for server-rendered page performance, SEO optimization, interactive React component isolation, and fast development experience.
2. **Design Tokens**: Implement custom color tokens in Tailwind configuration (`src/app/globals.css` and CSS theme variables) using the warm travel palette:
   - `--bg-primary: #F7F3EF` (Warm Off-White)
   - `--bg-card: #FFFFFF` (Pure White)
   - `--text-headline: #222222` (Charcoal Black)
   - `--text-body: #6F6F6F` (Medium Gray)
   - `--border-color: #D9D9D9` (Light Gray)
   - `--shape-peach: #F8D7C6` (Warm Peach)
   - `--accent-coral: #F68B5F` (Coral Orange CTA)
   - `--hover-terracotta: #E26E4D` (Soft Terracotta)
   - `--bg-beige: #E8D9CC` (Sand Beige)
3. **Typography & Layout**: Standardize on Google Fonts (`Outfit` for headings, `Inter` for body) with soft line-heights and 70% neutral / 20% high-res photography / 10% coral accent layout rules.
4. **Branding Assets**: Support bilingual header switching between Tamil logo (`logos/Final Cheral logo transparent.png`) and English logo (`logos/Cheral eng logo copy.png`), with `logos/Final Cheral logo copy.png` as favicon.

## Consequences

### Positive
- Lightning-fast load times and high visual performance.
- Clear separation of concerns with CSS design tokens ensuring consistent warm travel aesthetic.
- Native bilingual logo support.

### Negative
- Custom CSS requires disciplined token usage rather than off-the-shelf utility frameworks.

### Neutral
- High reliance on photography for primary visual color accents.
