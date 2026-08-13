---
agent-notes: { ctx: "initial threat model for Cheral web application", deps: [AGENTS.md, docs/adrs/0003-cheral-web-architecture-and-design-system.md], state: active, last: "pierrot@2026-07-26" }
---

# Threat Model — Cheral Traveling Historical Trust

**Lead:** Pierrot (Security Lead)
**Last Updated:** 2026-07-26

## System Overview & Trust Boundaries
Cheral serves public historical travel itineraries, heritage guides, and trust verification badges.
- **Trust Boundary 1**: User Browser vs Static Asset Server / CDN.
- **Trust Boundary 2**: Client-side interactive forms (Search/Filter/Contact) vs DOM context.

## Threat Analysis (STRIDE)

| Threat Category | Risk | Mitigation |
|-----------------|------|------------|
| **Spoofing** | Fake heritage trust badges or spoofed historical verification | Embed SVG signatures/verifiable trust data attributes; enforce HTTPS-only asset delivery. |
| **Tampering** | XSS injection in user search or dynamic card filters | Strict DOM sanitization for dynamic inputs; avoid `innerHTML` with user inputs; use textContent/DOM nodes. |
| **Repudiation** | Unverified itinerary modifications | Maintain immutable static data source for historical facts and verified trust records. |
| **Information Disclosure** | Exposure of private travel guide credentials | Public site serves only public heritage travel records; zero sensitive user tokens stored in local state. |
| **Denial of Service** | Image asset overload on mobile networks | Use WebP/optimized image formats with lazy loading and responsive `srcset`. |
| **Elevation of Privilege** | Client script injection | Enforce strict Content Security Policy (CSP) headers. |

## Action Items
1. Sanitize all user search queries before rendering in DOM.
2. Optimize all destination photography assets to modern WebP/JPEG formats with responsive lazy-loading.
