---
agent-notes: { ctx: "performance budget for Cheral web application", deps: [AGENTS.md, docs/adrs/0003-cheral-web-architecture-and-design-system.md], state: active, last: "archie@2026-07-26" }
---

# Performance Budget — Cheral Traveling Historical Trust

**Lead:** Archie (Architecture Lead)
**Last Updated:** 2026-07-26

## Target Metrics

| Metric | Target | Warning Threshold | Blocking Threshold |
|--------|--------|-------------------|--------------------|
| **First Contentful Paint (FCP)** | < 1.0s | 1.5s | > 2.0s |
| **Largest Contentful Paint (LCP)** | < 1.8s | 2.2s | > 2.5s |
| **Cumulative Layout Shift (CLS)** | < 0.05 | 0.08 | > 0.10 |
| **Total Blocking Time (TBT)** | < 100ms | 150ms | > 200ms |
| **JavaScript Bundle Size (Gzip)** | < 40 KB | 60 KB | > 80 KB |
| **CSS Bundle Size (Gzip)** | < 25 KB | 35 KB | > 50 KB |

## Image Optimization Guidelines
- Maximum initial hero image payload: < 150 KB.
- Thumbnail card images: < 50 KB each.
- All non-hero imagery set to `loading="lazy"`.
