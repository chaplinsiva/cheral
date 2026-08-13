---
agent-notes: { ctx: "test strategy for Cheral web application", deps: [AGENTS.md, docs/adrs/0003-cheral-web-architecture-and-design-system.md], state: canonical, last: "tara@2026-07-26" }
---

# Test Strategy — Cheral Traveling Historical Trust

**Lead:** Tara (Test & Quality Lead)
**Last Updated:** 2026-07-26

## Overview
This document outlines the testing strategy for the Cheral web application to ensure visual compliance, cross-browser responsiveness, language toggle correctness, and interactive component reliability.

## Testing Layers

### 1. Unit & Component Logic Tests (Vitest)
- Test historical destination search & category filtering utility functions.
- Test language switching state management (English <-> Tamil).
- Test trust verification data calculation and badge formatting.

### 2. Visual & Design Token Audits
- Verify CSS custom properties match exact design specs (`#F7F3EF` background, `#222222` headlines, `#F68B5F` Coral CTAs).
- Audit image asset rendering and logo aspect ratios.

### 3. End-to-End & DOM Integration Tests
- User flow: Search destination -> Filter by historical era -> View trust verification card -> Click CTA button.
- Mobile viewport navigation toggle test.
