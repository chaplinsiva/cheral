<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- For a human-readable overview, see README.md and docs/template-guide.md -->
# AGENTS.md — Project Instructions for Antigravity

## Project Overview

**Project Name:** Cheral Trust
**Description:** CHERAL (Centre for Heritage and Ecological Research through Arts and Literature) - Non-profit organization site celebrating natural ecosystem conservation, biodiversity research, historical heritage, and cultural trust with modern editorial elegance.
**Tech Stack:** Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript + React 19
**Design Tokens:** 
- Primary Burgundy: `#4A0E17`, `#2D0A0E`
- Secondary Accent: `#a62a14`
- Warm Off-White: `#F7F3EF`
- Pure White: `#FFFFFF`
- Sand Beige: `#E8D9CC`
- Charcoal: `#222222`
**Logo Assets:** 
- Favicon: `logos/Final Cheral logo copy.png`
- Tamil Logo: `logos/Final Cheral logo transparent.png`
- English Logo: `logos/Cheral eng logo copy.png`
**Content Source:** `content/Cheral (1).pdf` (Official brochure)
- Extracted Images: `public/images/pdf/`
- 4 Core Initiatives: Public Awareness, Student Education Programs, Nature & Heritage Walks, Native Tree Plantation
- 10 Core Values: Integrity, Ecological Justice, Sustainability, Historical Consciousness, Community Participation, Climate Responsibility, Scientific Excellence, Inclusiveness, Collaboration, Democratic Citizenship
- Bank & Contact Credentials: South Indian Bank | A/C: `0625073000000866` | IFSC: `SIBL0000625` | UPI: `cheraltrust@sib` | Madurai, TN (`95976 71962`, `cheraltrust@gmail.com`)

**Codebase map:** `docs/code-map.md` — read this first to understand the package structure, public APIs, and data flow.

> **Note:** Do NOT include unprovided mock data or fake tour packages. All site content must strictly reflect authentic Cheral Trust brochure initiatives and values.

## First-Run Detection

**Check this first.** If the Project Name above is still `[Your Project Name]` or `README-template.md` exists in the repo root, this project hasn't been initialized yet. In that case:

- **Skip the Session Entry Protocol** and all process rules below — they don't apply to an empty project.
- Tell the user: "This project hasn't been initialized yet. Would you like to run `/quickstart` (5 min, gets you coding fast) or `/kickoff` (30-60 min, full discovery with architecture and board setup)?"
- Once they choose, run the command. The process rules activate after initialization.

If the project IS initialized (has a real name, `README-template.md` is gone), proceed normally with the rules below.

## Agent-Notes Protocol (MANDATORY)

Every non-excluded file must have agent-notes metadata. See `docs/methodology/agent-notes.md` for spec.

1. Every new file gets agent-notes (excluded: pure JSON, lock files, binaries).
2. Every edit updates `last` to `<agent>@<date>`.
3. `ctx` under 10 words, `deps` = direct deps only, `state` must be accurate.

## Tracking

<!-- tracking-adapter: github-projects -->
<!-- project-number: 2 -->
<!-- project-owner: chaplinsiva -->
<!-- project-node-id: PVT_kwHOChu3w84Bee64 -->
<!-- status-field-id: PVTSSF_lAHOChu3w84Bee64zhY4xuA -->
<!-- option-backlog: f2169d5e -->
<!-- option-ready: 050fce9f -->
<!-- option-in-progress: a7a7ee8b -->
<!-- option-in-review: dcfd3b72 -->
<!-- option-done: b2899922 -->

**Adapter docs:** `docs/integrations/README.md`
**Status flow:** Backlog → Ready → In Progress → In Review → Done

Board commands, pre-flight checks, and setup instructions are in the active adapter file. Grace manages board status. Pat manages priorities.

## Process & Guidelines

> **Note:** Detailed rules for team methodology, critical agent workflows, development workflows, session management, and the documentation index have been modularized into `.agents/rules/` (`team-process.md`, `development-workflow.md`, `session-management.md`) and the `docs/` folder. They will be loaded automatically when you perform related tasks.
