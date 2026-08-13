---
agent-notes: { ctx: "architecture phase tracking for Cheral", deps: [docs/tracking/2026-07-26-cheral-discovery.md, docs/adrs/0003-cheral-web-architecture-and-design-system.md], state: active, last: "archie@2026-07-26" }
---

# Architecture: Cheral — Traveling Historical Trust

**Date:** 2026-07-26
**Lead:** Archie
**Status:** Complete
**Prior Phase:** [2026-07-26-cheral-discovery.md](file:///d:/Cheral/CheralSite/docs/tracking/2026-07-26-cheral-discovery.md)

## Key Decisions
- Adopted Vite + HTML5 + Modular Vanilla CSS / JavaScript setup for fast bundling, low latency, and zero framework bloat.
- Enforced Warm Travel CSS tokens on `:root` (`#F7F3EF` Warm Off-White background, `#FFFFFF` cards, `#222222` Charcoal headlines, `#F68B5F` Coral Orange accent).
- Integrated dual English (`logos/Cheral eng logo copy.png`) and Tamil (`logos/Final Cheral logo transparent.png`) header logos with language switching.
- Established Threat Model (`docs/security/threat-model.md`) and Performance Budget (`docs/performance-budget.md`).
- Completed mandatory Wei debate (`docs/tracking/2026-07-26-cheral-debate.md`) for ADR-0003.

## Artifacts Produced
- `docs/adrs/0003-cheral-web-architecture-and-design-system.md`
- `docs/tracking/2026-07-26-cheral-debate.md`
- `docs/security/threat-model.md`
- `docs/performance-budget.md`
- `docs/tracking/2026-07-26-cheral-architecture.md`

## Open Questions
- None. Architectural gate cleared.

## Next Phase
- Phase 4: Acceptance Criteria & Phase 5: Implementation Plan (`docs/plans/2026-07-26-cheral-mvp-plan.md`, `docs/test-strategy.md`, `docs/tech-debt.md`).
