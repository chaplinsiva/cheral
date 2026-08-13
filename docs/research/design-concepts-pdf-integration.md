---
agent-notes: { ctx: "sacrificial design concept exploration for Cheral PDF content integration", deps: [docs/methodology/personas.md, content/Cheral (1).pdf], state: active, last: "dani@2026-08-13" }
---

# Design Exploration: Integrating Cheral PDF Brochure Content into Site

> **Sacrificial Concepts Warning:** The concepts below are intentionally distinct to provoke feedback and explore trade-offs. They are designed to be evaluated, combined, or torn apart.

---

## Design Question
How do we best translate the rich 9-page official PDF brochure ("Centre for Heritage and Ecological Research through Arts and Literature") into an engaging, high-trust Next.js web experience?

---

## Concept A: "Editorial Trust & Heritage Journal" (Classic Editorial)

### Visual & Structural Layout
- **Hero:** Full-width deep burgundy header with Cheral Tamil logo glyph, tagline *"Nurturing a generation with ecological and historical consciousness"*, and prominent **Donate / Support** button.
- **Section 1: About & Mission/Vision Split:** Large quote typography featuring the exact text from Pages 1 & 2 of PDF, paired with hero photography.
- **Section 2: 4 Core Initiatives Showcase:** Clean 2x2 grid displaying the 4 programs:
  1. *Public Awareness*
  2. *Student Education Programs*
  3. *Nature & Heritage Walks*
  4. *Native Tree Plantation*
- **Section 3: 10 Core Values Matrix:** Interactive card grid highlighting Integrity, Ecological Justice, Sustainability, Historical Consciousness, Community Participation, Climate Responsibility, Scientific Excellence, Inclusiveness, Collaboration, and Democratic Citizenship.
- **Section 4: Direct Trust & Donation Banner:** Prominent South Indian Bank account details, IFSC code (`SIBL0000625`), UPI ID (`cheraltrust@sib`), and QR code modal.

### Trade-offs
- **Gains:** Dignified editorial authority, high credibility, easy to read, faithful to brochure layout.
- **Gives Up:** Less gamified interaction, focuses on text/content clarity over complex animations.

---

## Concept B: "Interactive Heritage & Eco-Walk Hub" (Action-Oriented Portal)

### Visual & Structural Layout
- **Hero:** Dynamic dual-tab switcher: **"Our Mission"** vs **"Join a Heritage Walk"**.
- **Section 1: Interactive Initiative Explorer:** Filterable list where users can click between the 4 Initiatives to see real photos, upcoming field walk dates, and volunteer sign-up forms.
- **Section 2: Interactive Values Carousel:** Horizontal sliding gallery with photo backgrounds showcasing each of the 10 Core Values with expanded commentary.
- **Section 3: Impact & Donation Calculator:** Interactive donation slider showing how contributions support student workshops or native sapling planting, linking to South Indian Bank & UPI details.

### Trade-offs
- **Gains:** Highly engaging, interactive, appeals to younger volunteers and students.
- **Gives Up:** Higher UI complexity, requires managing more interactive state.

---

## Preferred Converged Direction

Synthesize the editorial elegance of **Concept A** with the interactive modal experience of **Concept B**:
1. **Hero & Mission**: High-impact editorial hero with exact PDF copy, bilingual switch (`EN` / `TA`), and dual CTAs: **"Explore Our Initiatives"** & **"Support Cheral Trust"**.
2. **Core Initiatives**: Card grid featuring all 4 initiatives with photos, descriptions, and "Learn More / Join Walk" interactive modal trigger.
3. **10 Core Values**: Filterable/expandable grid presenting Cheral's 10 pillars with detailed descriptions from Pages 7–8.
4. **Authentic Trust Footer & Modal**: Verified South Indian Bank details (A/C: `0625073000000866`, IFSC: `SIBL0000625`, UPI: `cheraltrust@sib`), Madurai address, and QR Code display.
