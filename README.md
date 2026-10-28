# PodMesh Documentation & Interactive 2D/3D Fractal Cathedral Showcase (`podmesh-docs` v2.4.0)

**Official Public Documentation Portal & Didactic Simulator (`https://podmesh.xavdp.pro`)**

`podmesh-docs` is the public documentation and interactive architectural showcase for **PodMesh** (the sovereign distributed container, Btrfs `@spaces`, and MeshFS orchestration engine). Transitioning from the experimental v2.3.0 demonstrator, **v2.4.0** showcases the universal multi-platform architecture (Proxmox VE + TrueNAS + Synology + Windows + Podman), FastCDC / BLAKE3 atomic chunk ingestion, and WireGuard Dual-Hub resilience without SPOF.

---

## Highlights

1. **Technical Architecture Showcase (`/` — `TechnicalShowcasePage`)**:
   - Comprehensive visual and technical documentation of the PodMesh architecture: OpenRaft 3/4 consensus, Btrfs `@spaces` subvolume isolation, ZSTD 1-click space teleportation (< 1.60 s), MeshFS Content-Addressable Storage (FastCDC 4 MiB chunks), and PMBS Merkle-tree backups.
   - Interactive SVG architecture diagrams and Human–AI Tandem operational contracts aligned with **SHAPER OS v1.15** and **SHAPER Three Layers**.

2. **Interactive 2D/3D Fractal Cathedral Didactic Simulator (`/cathedrale` — `FractalsPage`)**:
   - **3D Spherical Orbital Engine (60 FPS)**: Explore 1,000+ simulated client spaces orbiting domain SaaS clusters with real-time energy beams linking the Master Ledger to autonomous Pull Makers.
   - **Unfolded 2D Hierarchy**: Inspect every fractal stratum from **Stage 0** (Sovereign Root & OpenRaft Quorum) and **Stage 1** (Master Governor & Private Unix Socket Ledger) through **Stage 1.5** (Makers), **Stage 2** (SaaS Governors), **Stage 3** (Client Spaces), and **Stage 4** (Application Stem Cells: Web, API, Private MariaDB UDS, MeshFS CAS).
   - **Didactic Resource & Chaos Sandbox**: Test dynamic cgroups v2 quota sliders, Raft replication policies ($1\times$, $2\times$, $3\times$), and Dual-Hub WireGuard anti-SPOF failover (Fiber + Starlink LEO satellite switchover in 780 ms) in a 100% safe, read-only browser sandbox.

3. **SLA & Qualification Evidence (`/validation` — `ValidationPage`)**:
   - Clear presentation of the PodMesh Ladder of Truth, certification gates, and operational boundaries.

---

## Quick Start

### Prerequisites
- **Node.js**: `>= 22.0.0`

### Run Locally

```bash
# Install dependencies
npm install

# Start Vite development server with hot reload
npm run dev:vite

# Build static production bundle into dist/
npm run build

# Serve production build
npm start
```

---

## Governance & Companion Repositories

- **[xavdp-pro/podmesh](https://github.com/xavdp-pro/podmesh)** — The core Rust bare-metal daemon and CLI (`podmesh-daemon`).
- **[INTENT.md](INTENT.md)** — Purpose and public sandbox separation rationale.
- **[LAW.md](LAW.md)** — Read-only sandbox, RFC 5737 hygiene, and Rule 38/0G simulation honesty invariants.
- **[LINEAGE.md](LINEAGE.md)** — Evolution and v2.3.0 SHAPER PHOENIX separation record.
- **[AGENTS.md](AGENTS.md)** — Collaboration rules for AI agents.
- **[DEDICATION.md](DEDICATION.md)** — Dedication by Xavier de Poorter.
- **[LICENSE](LICENSE)** — Apache License 2.0.
