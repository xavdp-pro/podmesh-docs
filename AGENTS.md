# Agents — Working Rules for `podmesh-docs`

Every agent (Antigravity, Claude Code, Codex, Cursor) contributing to `podmesh-docs` follows this repository split and public hygiene contract. Dialogue with the operator is French; everything committed into the repository is English (`en-US`) alongside the localized i18n dictionaries (`fr`, `en`, `es`).

## Repository Split

| Where | Visibility | What Belongs There | What Never Goes There |
| :--- | :--- | :--- | :--- |
| **`xavdp-pro/podmesh-docs`** (this repository) | **Public** | Public documentation portal (`TechnicalShowcasePage` at `/`), 2D/3D Fractal Cathedral didactic simulator (`FractalsPage` at `/cathedrale`), architectural SVG diagrams, `INTENT.md`, `LAW.md`, `LINEAGE.md`, `README.md`, `DEDICATION.md`, `LICENSE`. | Live operator administration routes (`CockpitPage` as root), private WAN IPs, credentials, or internal lab campaign notes. |
| **`xavdp-pro/podmesh-docs-lab`** | **Private** | Didactic showcase alignment records, public sanitization checks, and deployment verification logs for `podmesh.xavdp.pro`. | Secrets or raw private keys. |
| **`xavdp-pro/podmesh-cockpit`** | **Private** | Restricted operator control tower (`CockpitPage` at `/`). | Public unauthenticated endpoints. |

## Core Agent Rules

1. **Default Route Invariant**: In `src/App.jsx`, `/` must always render `TechnicalShowcasePage` and `/cathedrale` must render `FractalsPage` in read-only didactic mode.
2. **Public Sanitization**: Verify that no private infrastructure addresses or credentials ever enter `src/` or markdown files.
3. **Explicit Simulation Honesty**: Preserve clear simulation badges on all interactive sandbox controls in accordance with SHAPER Rule 38 / 0G.
