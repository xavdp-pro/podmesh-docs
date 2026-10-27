import React, { useState } from 'react'
import {
  Server,
  HardDrive,
  Cpu,
  Activity,
  Boxes,
  Play,
  RotateCw,
  Folder,
  Layers,
  ChevronRight,
  ChevronDown,
  ArrowRightLeft,
  Terminal,
  Shield,
  Clock,
  Radio,
  Zap,
  CheckCircle2,
  AlertCircle,
  FileText,
  Network,
  Database,
  ExternalLink,
} from 'lucide-react'

// Base de connaissances complète de l'arbre Proxmox VE PodMesh
const ITEMS_REGISTRY = {
  datacenter: {
    id: 'datacenter',
    name: 'Datacenter (Alliance Shaper OS)',
    type: 'datacenter',
    status: 'ONLINE',
    subTitle: 'Cluster Fédéré Souverain · Quorum 3/4 STONITH · Réplication Merkle MeshFS',
    specs: '2 Hôtes physiques · 5 Nœuds KVM/LXC · 3 Espaces fractals actifs',
    metrics: {
      cpu: '24.2 %',
      cpuBar: 24,
      ram: '38.4 Go / 75.0 Go',
      ramBar: 51,
      disk: '184 Go / 1.0 To NVMe',
      diskBar: 18,
      lease: 'Quorum 3/4 Valide (0 Split-Brain)',
    },
    services: [
      { name: 'Guichet Souverain SaaS', type: 'API Gouverneur Raft', status: 'RUNNING', port: 'Unix Socket + 7443', logs: 'Cycle 340 · 0 err' },
      { name: 'Arbiter Fencing STONITH', type: 'CT 9404 Daemon', status: 'RUNNING', port: '10.10.10.204:5000', logs: 'Heartbeat 1000ms OK' },
      { name: 'MeshFS Distributed CAS', type: 'Daemon Rust Tokio', status: 'RUNNING', port: '10.10.10.156:7443', logs: '35 736 blocs · 449ms max' },
      { name: 'Pont WireGuard Inter-Cluster', type: 'ChaCha20-Poly1305', status: 'ACTIVE', port: '10.54.45.0/24', logs: 'RTT 17.68 ms (WAN)' },
    ],
    logs: [
      '[QUORUM] OpenRaft consensus verified across 3 voter nodes (Node 9200, 9201, 9100).',
      '[STONITH] Fence controller armed. Epoch 4 monotonic lease granted to Primary Node.',
      '[MESHFS] CAS storage synchronized across med-pmox and gbs-p4. Merkle root: 8f9b...a12c.',
      '[WIREGUARD] Handshake completed with med-pmox (198.51.100.10:51820). RTT: 17.68 ms.',
      '[TELEMETRY] All 4 Labs PURRING. Zero bit-rot, 0 byte POSIX metadata drift.',
    ],
    meshfs: {
      chunks: '35 736 blocs',
      dedupRatio: '4.2x',
      merkleRoot: 'sha256:8f9b01c43d7890a2be45ff890123cb45e67890abcdef',
      posixIntegrity: '100% Bit-for-Bit exact',
      retention: 'Consolidée (30j journal + 365j archive)',
    },
    wireguard: {
      endpoint: '198.51.100.10:51820 ➔ 10.10.10.42:51820',
      rtt: '17.68 ms',
      txRx: '484.8 Mb/s (RAM-to-RAM direct)',
      cipher: 'ChaCha20-Poly1305 (GEM-001 Zéro port public)',
    },
  },

  'gbs-p4': {
    id: 'gbs-p4',
    name: 'gbs-p4 (Local Lab 3 & 4)',
    type: 'host',
    status: 'ONLINE',
    subTitle: 'Hyperviseur Physique Principal · Noyau Linux 6.8 Proxmox VE 8.2',
    specs: '20 vCPUs (Intel Xeon) · 43 Go RAM · NVMe 1 To · LAN 10.10.10.42 / 10.87.78.50',
    metrics: {
      cpu: '18.4 %',
      cpuBar: 18,
      ram: '19.2 Go / 43.0 Go',
      ramBar: 44,
      disk: '92 Go / 500 Go NVMe',
      diskBar: 18,
      lease: 'Hôte Local Maître (Lab 3 & 4)',
    },
    services: [
      { name: 'VM 9200 (Node A)', type: 'KVM Debian 13', status: 'RUNNING', port: '10.10.10.200', logs: 'Atelier Actif (Espace Dupont)' },
      { name: 'VM 9201 (Node B)', type: 'KVM Debian 13', status: 'RUNNING', port: '10.10.10.201', logs: 'Atelier Standby (Boutique)' },
      { name: 'VM 9202 (Node C)', type: 'KVM Debian 13', status: 'STANDBY', port: '10.10.10.202', logs: 'Réserve Join/Drain Validée' },
      { name: 'CT 9404 (Arbiter)', type: 'LXC Debian 12', status: 'RUNNING', port: '10.10.10.204', logs: 'Single-Writer Lease Keeper' },
    ],
    logs: [
      '[KVM] QEMU instances 9200, 9201, 9202 active. vCPU pinning 1:1 nominal.',
      '[BTRFS] Subvolume /var/lib/shaper/spaces healthy. Transparent compression zstd-1 enabled.',
      '[WIREGUARD] Interface wg-xt sending 1000 pkt/s to med-pmox. Loss rate: 0.00%.',
      '[HELM] Local supervisor reporting PURRING to Cockpit. IOPS: 4320.',
    ],
    meshfs: {
      chunks: '18 410 blocs',
      dedupRatio: '3.9x',
      merkleRoot: 'sha256:7a4c90d81234ef...local',
      posixIntegrity: '100% Conforme',
      retention: 'Cache local NVMe 120 Go',
    },
    wireguard: {
      endpoint: '10.10.10.42 (Local) ➔ 10.54.45.1 (med-pmox)',
      rtt: '17.68 ms',
      txRx: '484.8 Mb/s',
      cipher: 'ChaCha20-Poly1305',
    },
  },

  'med-pmox': {
    id: 'med-pmox',
    name: 'med-pmox (OVH Roubaix Lab 2)',
    type: 'host',
    status: 'ONLINE',
    subTitle: 'Hyperviseur Distant Cloud Souverain · Pôle de Réplication & Stockage CAS',
    specs: '16 vCPUs (AMD EPYC) · 32 Go RAM · Stockage CAS 2 To · IP 198.51.100.10',
    metrics: {
      cpu: '12.1 %',
      cpuBar: 12,
      ram: '14.8 Go / 32.0 Go',
      ramBar: 46,
      disk: '240 Go / 2.0 To SAS/NVMe',
      diskBar: 12,
      lease: 'Hôte Distant Réplique (Lab 2)',
    },
    services: [
      { name: 'VM 9100 (Node A CAS)', type: 'KVM Debian 13', status: 'RUNNING', port: '10.10.10.156', logs: 'CAS Master · MariaDB 39 tables' },
      { name: 'VM 9101 (Node B CAS)', type: 'KVM Debian 13', status: 'RUNNING', port: '10.10.10.157', logs: 'Miroir Synchrone Merkle' },
      { name: 'VM 9102 (Node C CAS)', type: 'KVM Debian 13', status: 'STANDBY', port: '10.10.10.158', logs: 'Nœud Témoin Quorum' },
    ],
    logs: [
      '[CAS-ENGINE] MeshFS daemon listening on 10.10.10.156:7443. Ingestion p99: 402 ms.',
      '[MARIADB] Ledger transactional state intact. 39 tables verified without corruption.',
      '[REPLICATION] Bit-exact sync received from Lab 3 via RAM-to-RAM zstd pipeline.',
      '[SECURITY] Rule GEM-001 strictly enforced: zero open WAN listening ports.',
    ],
    meshfs: {
      chunks: '35 736 blocs',
      dedupRatio: '4.2x',
      merkleRoot: 'sha256:8f9b01c43d7890a2be45ff890123cb45e67890abcdef',
      posixIntegrity: '100% Bit-exact (Zéro dérive)',
      retention: 'Stockage Froid & Chaud Intégré',
    },
    wireguard: {
      endpoint: '198.51.100.10 (Roubaix) ➔ 10.54.45.2 (gbs-p4)',
      rtt: '17.68 ms',
      txRx: '484.8 Mb/s WAN',
      cipher: 'ChaCha20-Poly1305',
    },
  },

  'vm-9200': {
    id: 'vm-9200',
    name: 'VM 9200 (Node A - Atelier Actif)',
    type: 'node',
    status: 'RUNNING',
    subTitle: 'Atelier de Fabrication Fractal (Maker) · Exécuteur PULL Autonome',
    specs: '4 vCPUs · 8 Go RAM · Btrfs /var/lib/shaper/spaces · IP 10.10.10.200',
    metrics: {
      cpu: '2.4 %',
      cpuBar: 12,
      ram: '1.2 Go / 8.0 Go',
      ramBar: 15,
      disk: '12.4 Go / 50 Go Btrfs',
      diskBar: 24,
      lease: 'Epoch 4 (Bail Actif - Single Writer)',
    },
    services: [
      { name: 'Espace 101 (espace-dupont)', type: 'Espace Fractal Complet', status: 'RUNNING', port: 'Socket Interne', logs: 'Voix + CRM + Helm' },
      { name: 'PodMesh Maker Daemon', type: 'Loop PULL Autonome', status: 'RUNNING', port: 'IPC /run/shaper', logs: 'Cycle 142 · 0 incident' },
      { name: 'Podman Runtime Rootless', type: 'Conteneurs OCI', status: 'RUNNING', port: 'Cgroups v2', logs: '3 conteneurs actifs' },
    ],
    logs: [
      '[MAKER] PULL query to Guichet: order for espace-dupont executed in 11.75 s.',
      '[PODMAN] Container univ-wmanager-reference-ctr-voice running under PID 14209.',
      '[PODMAN] Container univ-wmanager-reference-ctr-crm running under PID 14220.',
      '[BTRFS] Snapshot snap-dupont-20261024-2200 created in 42 ms.',
      '[HELM] Healthcheck OK: Voice SIP 142 calls, CRM 39 tables online.',
    ],
    meshfs: {
      chunks: '4 820 blocs',
      dedupRatio: '3.6x',
      merkleRoot: 'sha256:dupont-node9200-hash',
      posixIntegrity: '100% Conforme',
      retention: 'Snapshots Btrfs horaires',
    },
    wireguard: {
      endpoint: '10.10.10.200 (LAN privé gbs-p4)',
      rtt: '0.12 ms (LAN)',
      txRx: 'Local vSwitch bridge',
      cipher: 'Encapsulé dans pont wg-xt',
    },
  },

  'vm-9201': {
    id: 'vm-9201',
    name: 'VM 9201 (Node B - Atelier Standby)',
    type: 'node',
    status: 'RUNNING',
    subTitle: 'Atelier de Bascule Immédiate · Prêt pour Réception de Téléportation',
    specs: '4 vCPUs · 8 Go RAM · Btrfs /var/lib/shaper/spaces · IP 10.10.10.201',
    metrics: {
      cpu: '1.1 %',
      cpuBar: 6,
      ram: '840 Mo / 8.0 Go',
      ramBar: 10,
      disk: '8.2 Go / 50 Go Btrfs',
      diskBar: 16,
      lease: 'Epoch 4 (Bail Veille - Standby Récepteur)',
    },
    services: [
      { name: 'Espace 102 (espace-boutique)', type: 'Espace Fractal Caisse', status: 'RUNNING', port: 'Socket Interne', logs: 'POS + Helm' },
      { name: 'PodMesh Maker Daemon', type: 'Loop PULL Autonome', status: 'RUNNING', port: 'IPC /run/shaper', logs: 'Cycle 142 · 0 incident' },
      { name: 'Socat Zstd Receiver', type: 'Stream RAM-to-RAM', status: 'READY', port: 'Port interne temporaire', logs: 'Prêt pour 1.6 s cutover' },
    ],
    logs: [
      '[MAKER] Standby loop active. Polling Guichet at 2500ms intervals.',
      '[STATE] Btrfs subvolume pre-seeded with baseline layers (zstd-1).',
      '[HELM] espace-boutique nominal. Caisse enregistreuse active.',
      '[FAILOVER] Ready to acquire Single-Writer Lease in < 500 ms upon signal.',
    ],
    meshfs: {
      chunks: '2 140 blocs',
      dedupRatio: '3.4x',
      merkleRoot: 'sha256:boutique-node9201-hash',
      posixIntegrity: '100% Conforme',
      retention: 'Snapshots Btrfs',
    },
    wireguard: {
      endpoint: '10.10.10.201 (LAN privé gbs-p4)',
      rtt: '0.14 ms (LAN)',
      txRx: 'Local vSwitch bridge',
      cipher: 'Encapsulé dans pont wg-xt',
    },
  },

  'vm-9202': {
    id: 'vm-9202',
    name: 'VM 9202 (Node C - Réserve Join/Drain)',
    type: 'node',
    status: 'READY',
    subTitle: 'Nœud d\'Expansion Dynamique · Intégration / Évacuation à Chaud en 2,5 s',
    specs: '4 vCPUs · 8 Go RAM · NVMe Dédié · IP 10.10.10.202 / 10.10.10.154',
    metrics: {
      cpu: '0.4 %',
      cpuBar: 3,
      ram: '512 Mo / 8.0 Go',
      ramBar: 6,
      disk: '3.1 Go / 50 Go',
      diskBar: 6,
      lease: 'Standby Réserve (Quorum Dynamique)',
    },
    services: [
      { name: 'PodMesh Agent Daemon', type: 'Hot Membership Hook', status: 'READY', port: 'IPC', logs: 'Qualifié Join: 2.5s, Drain: 7.2s' },
      { name: 'MeshFS Learner Sync', type: 'Raft Learner Service', status: 'READY', port: '10.10.10.202:7443', logs: 'Canary 8MB Bit-exact' },
    ],
    logs: [
      '[MEMBERSHIP] Cluster join benchmark: 2,504 ms (Hot addition, 0 daemon restart).',
      '[DRAIN] Cluster drain benchmark: 7,292 ms (Evacuation propre vers 9200/9201).',
      '[QUORUM] Quorum transition from 2 to 3 voters and back to 2 voters verified.',
      '[STATUS] Idle reserve. Ready to receive production workloads on demand.',
    ],
    meshfs: {
      chunks: 'Canary test 8 Mo',
      dedupRatio: '1.0x',
      merkleRoot: 'sha256:canary-join-drain-verified',
      posixIntegrity: '100% Conforme',
      retention: 'Évacué lors du drain',
    },
    wireguard: {
      endpoint: '10.10.10.202 (LAN privé gbs-p4)',
      rtt: '0.12 ms',
      txRx: 'Standby',
      cipher: 'ChaCha20-Poly1305',
    },
  },

  'vm-9100': {
    id: 'vm-9100',
    name: 'VM 9100 (Node A Roubaix - CAS Master)',
    type: 'node',
    status: 'RUNNING',
    subTitle: 'Moteur de Déduplication & Persistance MeshFS · Ledger MariaDB',
    specs: '4 vCPUs · 8 Go RAM · NVMe 100 Go · IP 10.10.10.156',
    metrics: {
      cpu: '3.2 %',
      cpuBar: 16,
      ram: '1.8 Go / 8.0 Go',
      ramBar: 22,
      disk: '25.1 Go / 100 Go CAS',
      diskBar: 25,
      lease: 'CAS Master Lease (Epoch 4)',
    },
    services: [
      { name: 'MeshFS CAS Storage Daemon', type: 'Tokio Rust Engine', status: 'RUNNING', port: '7443', logs: 'p99: 402ms (< SLA 3s)' },
      { name: 'MariaDB Transaction Ledger', type: 'Base Souveraine 39 Tables', status: 'RUNNING', port: 'Unix Socket Uniquement', logs: 'Zéro port TCP ouvert' },
    ],
    logs: [
      '[CAS] Storage pool active: 25.1 GB total, 16.7 GB available.',
      '[METRICS] Ingestion benchmark: 35,736 CAS blocks verified without corruption.',
      '[SQL] Transaction integrity verified under Rule 38: 0 rollback, 0 lock leak.',
    ],
    meshfs: {
      chunks: '35 736 blocs',
      dedupRatio: '4.2x',
      merkleRoot: 'sha256:8f9b01c43d7890a2be45ff890123cb45e67890abcdef',
      posixIntegrity: '100% Bit-exact (Zéro dérive)',
      retention: 'Pool de Production',
    },
    wireguard: {
      endpoint: '10.10.10.156 (LAN Roubaix) ➔ 10.54.45.1',
      rtt: '17.68 ms vers gbs-p4',
      txRx: '484.8 Mb/s WAN',
      cipher: 'ChaCha20-Poly1305',
    },
  },

  'vm-9101': {
    id: 'vm-9101',
    name: 'VM 9101 (Node B Roubaix - Réplique)',
    type: 'node',
    status: 'RUNNING',
    subTitle: 'Miroir CAS Synchrone · Haute Disponibilité Stockage Distant',
    specs: '4 vCPUs · 8 Go RAM · NVMe 100 Go · IP 10.10.10.157',
    metrics: {
      cpu: '1.4 %',
      cpuBar: 8,
      ram: '1.1 Go / 8.0 Go',
      ramBar: 14,
      disk: '25.1 Go / 100 Go CAS',
      diskBar: 25,
      lease: 'CAS Replica Standby',
    },
    services: [
      { name: 'MeshFS Replica Daemon', type: 'Tokio Rust Mirror', status: 'RUNNING', port: '7443', logs: 'Sync synchrone' },
    ],
    logs: [
      '[MIRROR] Synced with Master 9100. Delta lag: 0 blocks.',
      '[HASH] Merkle tree verification bit-exact with 9100.',
    ],
    meshfs: {
      chunks: '35 736 blocs',
      dedupRatio: '4.2x',
      merkleRoot: 'sha256:8f9b01c43d7890a2be45ff890123cb45e67890abcdef',
      posixIntegrity: '100% Bit-exact',
      retention: 'Miroir direct',
    },
    wireguard: {
      endpoint: '10.10.10.157 (LAN Roubaix)',
      rtt: '0.11 ms vers 9100',
      txRx: 'LAN interne',
      cipher: 'ChaCha20-Poly1305',
    },
  },

  'space-dupont': {
    id: 'space-dupont',
    name: '101 (espace-dupont)',
    type: 'space',
    status: 'RUNNING',
    subTitle: 'Espace Métier Complet · Voix Asterisk SIP + CRM Dolibarr + Vigile Maestro',
    specs: 'Juridiction étanche : /var/lib/shaper/spaces/espace-dupont sur VM 9200',
    metrics: {
      cpu: '1.8 %',
      cpuBar: 18,
      ram: '242 Mo / 1024 Mo',
      ramBar: 24,
      disk: '4.2 Go / 16 Go Btrfs',
      diskBar: 26,
      lease: 'Epoch 2 (Vérifié Arbiter CT 9404)',
    },
    services: [
      { name: 'Service Téléphonie Voix', type: 'Asterisk SIP Trunk', status: 'RUNNING', port: 'SIP 5060/UDP', logs: '142 appels actifs simultanés' },
      { name: 'Service Facturation / CRM', type: 'Dolibarr + MariaDB', status: 'RUNNING', port: 'Unix Socket /run/shaper/crm.sock', logs: '39 tables synchronisées' },
      { name: 'Service Helm (Vigile Espace)', type: 'Cadencé par Maestro', status: 'RUNNING', port: 'IPC Local', logs: 'Cycle 142 · 0 incident' },
    ],
    logs: [
      '[SIP] 142 audio streams routed through RTP engine. Jitter: 0.8 ms, Loss: 0.00%.',
      '[CRM] MariaDB transaction commit: invoice #2026-8941 processed in 4.2 ms.',
      '[HELM] All 3 containers alive. IPC socket /run/shaper/crm.sock responsive.',
      '[STATE] Btrfs subvolume snapshot ready for instant teleportation to med-pmox.',
    ],
    meshfs: {
      chunks: '1 240 blocs CAS',
      dedupRatio: '3.8x',
      merkleRoot: 'sha256:dupont-merkle-live-v2',
      posixIntegrity: '100% Bit-exact (Permissions & UIDs préservés)',
      retention: 'Sauvegardé quotidiennement via PMBS',
    },
    wireguard: {
      endpoint: 'Hébergé sur VM 9200 (Local Lab 3 gbs-p4)',
      rtt: '17.68 ms vers cible Roubaix (med-pmox)',
      txRx: 'Prêt pour migration RAM-to-RAM en 1,60 s',
      cipher: 'ChaCha20-Poly1305',
    },
  },

  'space-boutique': {
    id: 'space-boutique',
    name: '102 (espace-boutique-marseille)',
    type: 'space',
    status: 'RUNNING',
    subTitle: 'Espace Métier Caisse · Terminal Point de Vente (POS) + Vigile Maestro',
    specs: 'Juridiction étanche : /var/lib/shaper/spaces/espace-boutique-marseille sur VM 9201',
    metrics: {
      cpu: '0.9 %',
      cpuBar: 9,
      ram: '168 Mo / 1024 Mo',
      ramBar: 16,
      disk: '2.1 Go / 16 Go Btrfs',
      diskBar: 13,
      lease: 'Epoch 2 (Vérifié Arbiter CT 9404)',
    },
    services: [
      { name: 'Service Caisse Enregistreuse', type: 'POS Point of Sale', status: 'RUNNING', port: 'Unix Socket Local', logs: '18 tickets encaissés / min' },
      { name: 'Service Helm (Vigile Espace)', type: 'Cadencé par Maestro', status: 'RUNNING', port: 'IPC Local', logs: 'Cycle 142 · 0 incident' },
    ],
    logs: [
      '[POS] Receipt printer queue cleared. Ticket #4028 printed.',
      '[HELM] Heartbeat sent to VM 9201 Maker loop. Status: NOMINAL.',
    ],
    meshfs: {
      chunks: '640 blocs CAS',
      dedupRatio: '3.2x',
      merkleRoot: 'sha256:boutique-merkle-live',
      posixIntegrity: '100% Bit-exact',
      retention: 'Sauvegarde PMBS active',
    },
    wireguard: {
      endpoint: 'Hébergé sur VM 9201 (Local Lab 3 gbs-p4)',
      rtt: '17.68 ms vers Roubaix',
      txRx: 'Nominal',
      cipher: 'ChaCha20-Poly1305',
    },
  },

  'space-cas-store': {
    id: 'space-cas-store',
    name: '201 (espace-stockage-cas)',
    type: 'space',
    status: 'RUNNING',
    subTitle: 'Espace Stockage Distant · Moteur CAS MeshFS + Grand Livre MariaDB',
    specs: 'Juridiction étanche : /var/lib/meshfs/cas sur VM 9100 (OVH Roubaix)',
    metrics: {
      cpu: '3.2 %',
      cpuBar: 32,
      ram: '512 Mo / 2048 Mo',
      ramBar: 25,
      disk: '18.3 Go / 100 Go CAS',
      diskBar: 18,
      lease: 'Epoch 4 (Maître CAS)',
    },
    services: [
      { name: 'MeshFS CAS Storage Node', type: 'Engine Rust Tokio', status: 'RUNNING', port: '7443', logs: '35 736 blocs indexés' },
      { name: 'Grand Livre MariaDB', type: 'Base Distribuée 39 tables', status: 'RUNNING', port: 'Unix Socket', logs: 'Zero socket leak' },
    ],
    logs: [
      '[CAS] Block verification: 35,736 chunks validated bit-for-bit.',
      '[LEDGER] MariaDB audit check: zero corrupt pages detected.',
    ],
    meshfs: {
      chunks: '35 736 blocs',
      dedupRatio: '4.2x',
      merkleRoot: 'sha256:8f9b01c43d7890a2be45ff890123cb45e67890abcdef',
      posixIntegrity: '100% Conforme',
      retention: 'Stockage Fédéré',
    },
    wireguard: {
      endpoint: 'VM 9100 (med-pmox Roubaix)',
      rtt: '17.68 ms vers gbs-p4',
      txRx: '484.8 Mb/s',
      cipher: 'ChaCha20-Poly1305',
    },
  },
}

export default function ClassicProxmoxView({ onOpenTeleport }) {
  const [selectedItemId, setSelectedItemId] = useState('space-dupont')
  const [activeTab, setActiveTab] = useState('summary') // 'summary', 'services', 'console', 'meshfs', 'wireguard'
  const [expandedNodes, setExpandedNodes] = useState({
    datacenter: true,
    'gbs-p4': true,
    'vm-9200': true,
    'vm-9201': true,
    'med-pmox': true,
    'vm-9100': true,
  })

  const toggleExpand = (id) => {
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const currentItem = ITEMS_REGISTRY[selectedItemId] || ITEMS_REGISTRY['space-dupont']

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-xl overflow-hidden shadow-2xl flex flex-col my-6 font-sans">
      {/* 1. Header classique Proxmox VE */}
      <div className="bg-slate-800/90 border-b border-slate-700 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow">
            P
          </div>
          <div>
            <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span>PodMesh Virtual Environment</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                v1.15.0-canon
              </span>
            </div>
            <div className="text-xs text-slate-400">
              Console d'Exploitation Souveraine · Style Proxmox VE Classique
            </div>
          </div>
        </div>

        {/* Boutons d'actions rapides Proxmox */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => onOpenTeleport && onOpenTeleport(selectedItemId.startsWith('space') ? selectedItemId : 'space-dupont')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded text-xs font-semibold shadow transition cursor-pointer"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Téléporter Espace (1,6 s)</span>
          </button>
          <div className="h-5 w-px bg-slate-700" />
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono bg-slate-950/60 px-2.5 py-1 rounded border border-slate-800">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>WG: 17.68 ms (WAN)</span>
          </div>
        </div>
      </div>

      {/* 2. Corps divisé en 2 : Arborescence à gauche + Panneau central à droite */}
      <div className="grid grid-cols-12 min-h-[580px]">
        {/* SIDEBAR GAUCHE : ARBRE TRADITIONNEL PROXMOX */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3 bg-slate-950/90 border-r border-slate-800 p-3 select-none overflow-y-auto">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1 flex items-center justify-between">
            <span>Arborescence Cluster</span>
            <span className="text-emerald-400 font-mono">4/4 OK</span>
          </div>

          <div className="space-y-1 text-xs">
            {/* RACINE : DATACENTER */}
            <div
              onClick={() => setSelectedItemId('datacenter')}
              className={`flex items-center gap-1.5 px-2 py-1.5 rounded cursor-pointer transition ${
                selectedItemId === 'datacenter'
                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleExpand('datacenter')
                }}
                className="text-slate-400 hover:text-white p-0.5"
              >
                {expandedNodes.datacenter ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
              </button>
              <Server className="w-3.5 h-3.5 text-amber-400" />
              <span className="truncate font-semibold">Datacenter (Alliance Shaper)</span>
            </div>

            {expandedNodes.datacenter && (
              <div className="pl-3 space-y-1">
                {/* HÔTE 1 : gbs-p4 */}
                <div
                  onClick={() => setSelectedItemId('gbs-p4')}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer transition ${
                    selectedItemId === 'gbs-p4'
                      ? 'bg-blue-500/20 text-blue-300 font-bold border border-blue-500/40'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleExpand('gbs-p4')
                    }}
                    className="text-slate-400 hover:text-white p-0.5"
                  >
                    {expandedNodes['gbs-p4'] ? (
                      <ChevronDown className="w-3 h-3" />
                    ) : (
                      <ChevronRight className="w-3 h-3" />
                    )}
                  </button>
                  <HardDrive className="w-3 h-3 text-sky-400" />
                  <span className="truncate">gbs-p4 (Local)</span>
                  <span className="text-[10px] text-emerald-400 ml-auto font-mono">●</span>
                </div>

                {expandedNodes['gbs-p4'] && (
                  <div className="pl-4 space-y-1">
                    {/* VM 9200 */}
                    <div
                      onClick={() => setSelectedItemId('vm-9200')}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer transition ${
                        selectedItemId === 'vm-9200'
                          ? 'bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/40'
                          : 'text-slate-400 hover:bg-slate-800/60'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleExpand('vm-9200')
                        }}
                        className="text-slate-500 hover:text-white p-0.5"
                      >
                        {expandedNodes['vm-9200'] ? (
                          <ChevronDown className="w-2.5 h-2.5" />
                        ) : (
                          <ChevronRight className="w-2.5 h-2.5" />
                        )}
                      </button>
                      <Boxes className="w-3 h-3 text-purple-400" />
                      <span className="truncate">VM 9200 (Node A)</span>
                    </div>

                    {expandedNodes['vm-9200'] && (
                      <div
                        onClick={() => setSelectedItemId('space-dupont')}
                        className={`ml-5 flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer transition ${
                          selectedItemId === 'space-dupont'
                            ? 'bg-emerald-500/25 text-emerald-300 font-bold border border-emerald-500/40'
                            : 'text-slate-300 hover:bg-slate-800/60'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <Layers className="w-3 h-3 text-emerald-400" />
                        <span className="truncate">101 (espace-dupont)</span>
                      </div>
                    )}

                    {/* VM 9201 */}
                    <div
                      onClick={() => setSelectedItemId('vm-9201')}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer transition ${
                        selectedItemId === 'vm-9201'
                          ? 'bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/40'
                          : 'text-slate-400 hover:bg-slate-800/60'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleExpand('vm-9201')
                        }}
                        className="text-slate-500 hover:text-white p-0.5"
                      >
                        {expandedNodes['vm-9201'] ? (
                          <ChevronDown className="w-2.5 h-2.5" />
                        ) : (
                          <ChevronRight className="w-2.5 h-2.5" />
                        )}
                      </button>
                      <Boxes className="w-3 h-3 text-purple-400" />
                      <span className="truncate">VM 9201 (Node B)</span>
                    </div>

                    {expandedNodes['vm-9201'] && (
                      <div
                        onClick={() => setSelectedItemId('space-boutique')}
                        className={`ml-5 flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer transition ${
                          selectedItemId === 'space-boutique'
                            ? 'bg-emerald-500/25 text-emerald-300 font-bold border border-emerald-500/40'
                            : 'text-slate-300 hover:bg-slate-800/60'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <Layers className="w-3 h-3 text-emerald-400" />
                        <span className="truncate">102 (espace-boutique)</span>
                      </div>
                    )}

                    {/* VM 9202 */}
                    <div
                      onClick={() => setSelectedItemId('vm-9202')}
                      className={`ml-3.5 flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer transition ${
                        selectedItemId === 'vm-9202'
                          ? 'bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/40'
                          : 'text-slate-400 hover:bg-slate-800/60'
                      }`}
                    >
                      <Boxes className="w-3 h-3 text-purple-400" />
                      <span className="truncate">VM 9202 (Node C Réserve)</span>
                    </div>
                  </div>
                )}

                {/* HÔTE 2 : med-pmox */}
                <div
                  onClick={() => setSelectedItemId('med-pmox')}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer transition ${
                    selectedItemId === 'med-pmox'
                      ? 'bg-blue-500/20 text-blue-300 font-bold border border-blue-500/40'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleExpand('med-pmox')
                    }}
                    className="text-slate-400 hover:text-white p-0.5"
                  >
                    {expandedNodes['med-pmox'] ? (
                      <ChevronDown className="w-3 h-3" />
                    ) : (
                      <ChevronRight className="w-3 h-3" />
                    )}
                  </button>
                  <HardDrive className="w-3 h-3 text-sky-400" />
                  <span className="truncate">med-pmox (Roubaix)</span>
                  <span className="text-[10px] text-emerald-400 ml-auto font-mono">●</span>
                </div>

                {expandedNodes['med-pmox'] && (
                  <div className="pl-4 space-y-1">
                    {/* VM 9100 */}
                    <div
                      onClick={() => setSelectedItemId('vm-9100')}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer transition ${
                        selectedItemId === 'vm-9100'
                          ? 'bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/40'
                          : 'text-slate-400 hover:bg-slate-800/60'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleExpand('vm-9100')
                        }}
                        className="text-slate-500 hover:text-white p-0.5"
                      >
                        {expandedNodes['vm-9100'] ? (
                          <ChevronDown className="w-2.5 h-2.5" />
                        ) : (
                          <ChevronRight className="w-2.5 h-2.5" />
                        )}
                      </button>
                      <Boxes className="w-3 h-3 text-purple-400" />
                      <span className="truncate">VM 9100 (CAS Master)</span>
                    </div>

                    {expandedNodes['vm-9100'] && (
                      <div
                        onClick={() => setSelectedItemId('space-cas-store')}
                        className={`ml-5 flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer transition ${
                          selectedItemId === 'space-cas-store'
                            ? 'bg-emerald-500/25 text-emerald-300 font-bold border border-emerald-500/40'
                            : 'text-slate-300 hover:bg-slate-800/60'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <Layers className="w-3 h-3 text-emerald-400" />
                        <span className="truncate">201 (espace-cas)</span>
                      </div>
                    )}

                    {/* VM 9101 */}
                    <div
                      onClick={() => setSelectedItemId('vm-9101')}
                      className={`ml-3.5 flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer transition ${
                        selectedItemId === 'vm-9101'
                          ? 'bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/40'
                          : 'text-slate-400 hover:bg-slate-800/60'
                      }`}
                    >
                      <Boxes className="w-3 h-3 text-purple-400" />
                      <span className="truncate">VM 9101 (CAS Replica)</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* PANNEAU CENTRAL : ONGLETS ET VUES DÉTAILLÉES */}
        <div className="col-span-12 md:col-span-8 lg:col-span-9 bg-slate-900 flex flex-col">
          {/* BARRE D'ONGLETS PROXMOX */}
          <div className="bg-slate-800/50 border-b border-slate-700/80 px-4 flex space-x-1 overflow-x-auto text-xs font-medium">
            {[
              { id: 'summary', label: 'Résumé (Summary)' },
              { id: 'services', label: 'Services & Composants' },
              { id: 'console', label: 'Console Logs (Helm)' },
              { id: 'meshfs', label: 'Stockage MeshFS CAS' },
              { id: 'wireguard', label: 'Réseau WireGuard' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 border-b-2 transition cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-amber-400 text-amber-300 bg-slate-800/80 font-bold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* CONTENU RÉACTIF DE L'ONGLET SÉLECTIONNÉ */}
          <div className="p-5 flex-1 overflow-y-auto space-y-5">
            {/* EN-TÊTE DYNAMIQUE DE L'ÉLÉMENT SÉLECTIONNÉ */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/70 p-4 rounded-xl border border-slate-800 shadow-md">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    {currentItem.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    ● {currentItem.status}
                  </span>
                </div>
                <div className="text-xs text-slate-300 mt-1 font-sans">
                  {currentItem.subTitle}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                  {currentItem.specs}
                </div>
              </div>

              {/* Actions contextuelles */}
              <div className="flex items-center gap-2">
                {selectedItemId.startsWith('space') && (
                  <button
                    type="button"
                    onClick={() => onOpenTeleport && onOpenTeleport(selectedItemId)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow transition cursor-pointer"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                    <span>Téléporter vers med-pmox (1,6 s)</span>
                  </button>
                )}
                {selectedItemId === 'vm-9202' && (
                  <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs font-mono border border-indigo-500/30">
                    Prêt pour injection à chaud (2.5s)
                  </span>
                )}
              </div>
            </div>

            {/* VUE 1 : RÉSUMÉ (SUMMARY) */}
            {activeTab === 'summary' && (
              <div className="space-y-5">
                {/* 4 Jauges Proxmox VE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-3 min-w-0">
                    <div className="text-xs text-slate-400 flex items-center justify-between">
                      <span>Utilisation CPU</span>
                      <Cpu className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div className="text-base font-bold text-slate-100 mt-1 truncate">
                      {currentItem.metrics.cpu}
                    </div>
                    <div className="w-full bg-slate-700/50 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-emerald-400 h-full rounded-full transition-all"
                        style={{ width: `${currentItem.metrics.cpuBar}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-3 min-w-0">
                    <div className="text-xs text-slate-400 flex items-center justify-between">
                      <span>Mémoire RAM</span>
                      <Activity className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                    <div className="text-base font-bold text-slate-100 mt-1 truncate" title={currentItem.metrics.ram}>
                      {currentItem.metrics.ram}
                    </div>
                    <div className="w-full bg-slate-700/50 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-sky-400 h-full rounded-full transition-all"
                        style={{ width: `${currentItem.metrics.ramBar}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-3 min-w-0">
                    <div className="text-xs text-slate-400 flex items-center justify-between">
                      <span>Stockage Dédié</span>
                      <HardDrive className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <div className="text-base font-bold text-slate-100 mt-1 truncate" title={currentItem.metrics.disk}>
                      {currentItem.metrics.disk}
                    </div>
                    <div className="w-full bg-slate-700/50 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-purple-400 h-full rounded-full transition-all"
                        style={{ width: `${currentItem.metrics.diskBar}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-slate-800/60 border border-slate-700/60 rounded-lg p-3 min-w-0">
                    <div className="text-xs text-slate-400 flex items-center justify-between">
                      <span>Bail & Quorum</span>
                      <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="text-sm font-bold text-emerald-300 mt-1 truncate">
                      {currentItem.metrics.lease}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-2 font-mono truncate">
                      Protection Split-Brain Active
                    </div>
                  </div>
                </div>

                {/* Tableau synthétique des composants */}
                <div className="bg-slate-950/40 border border-slate-800 rounded-lg p-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    <span>Éléments Actifs Associés</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="pb-2 font-medium">Composant / Service</th>
                          <th className="pb-2 font-medium">Type</th>
                          <th className="pb-2 font-medium">Statut</th>
                          <th className="pb-2 font-medium">Point d'Accès / Port</th>
                          <th className="pb-2 font-medium">Dernier Événement</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                        {currentItem.services.map((srv, idx) => (
                          <tr key={idx}>
                            <td className="py-2.5 font-sans font-medium text-slate-100 flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-400" />
                              {srv.name}
                            </td>
                            <td className="py-2.5 text-slate-400 font-sans">{srv.type}</td>
                            <td className="py-2.5 text-emerald-400 font-bold">{srv.status}</td>
                            <td className="py-2.5 text-slate-400">{srv.port}</td>
                            <td className="py-2.5 text-amber-300">{srv.logs}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* VUE 2 : SERVICES & COMPOSANTS */}
            {activeTab === 'services' && (
              <div className="space-y-4">
                <div className="bg-slate-950/40 border border-slate-800 rounded-lg p-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
                    <Boxes className="w-4 h-4 text-purple-400" />
                    <span>Détail des Services et Conteneurs supervisés</span>
                  </div>
                  <div className="space-y-3">
                    {currentItem.services.map((srv, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 flex flex-wrap items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                            <Zap className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-100 text-xs">{srv.name}</div>
                            <div className="text-[11px] text-slate-400">{srv.type} · {srv.port}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                            {srv.status}
                          </span>
                          <span className="text-amber-300 font-mono text-[11px]">{srv.logs}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* VUE 3 : CONSOLE LOGS (HELM) */}
            {activeTab === 'console' && (
              <div className="space-y-3">
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3 text-slate-400">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-amber-400" />
                      <span>Console Logs Directe · {currentItem.id}</span>
                    </div>
                    <span className="text-[10px] text-emerald-400">● FLUX TEMPS RÉEL ACTIF</span>
                  </div>
                  <div className="space-y-1.5 text-slate-300 max-h-80 overflow-y-auto">
                    {currentItem.logs.map((log, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-slate-500 select-none">{new Date().toLocaleTimeString()}</span>
                        <span className={log.includes('ERR') ? 'text-red-400' : log.includes('WARN') ? 'text-amber-300' : 'text-slate-200'}>
                          {log}
                        </span>
                      </div>
                    ))}
                    <div className="text-slate-500 pt-2 animate-pulse">_ Curseur en attente du prochain événement...</div>
                  </div>
                </div>
              </div>
            )}

            {/* VUE 4 : STOCKAGE MESHFS CAS */}
            {activeTab === 'meshfs' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-4 space-y-2">
                    <div className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                      <Database className="w-4 h-4 text-purple-400" />
                      <span>Métriques Content Addressable Storage (CAS)</span>
                    </div>
                    <div className="text-xs space-y-1.5 text-slate-400 pt-2 font-mono">
                      <div className="flex justify-between">
                        <span>Blocs CAS indexés :</span>
                        <span className="font-bold text-slate-100">{currentItem.meshfs.chunks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Facteur de déduplication :</span>
                        <span className="font-bold text-emerald-400">{currentItem.meshfs.dedupRatio}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Intégrité POSIX :</span>
                        <span className="font-bold text-emerald-400">{currentItem.meshfs.posixIntegrity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Politique de rétention :</span>
                        <span className="font-bold text-slate-200">{currentItem.meshfs.retention}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-4 space-y-2">
                    <div className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-400" />
                      <span>Empreinte Cryptographique Merkle</span>
                    </div>
                    <div className="text-xs space-y-2 text-slate-400 pt-2">
                      <div className="text-[11px] font-mono break-all bg-slate-900 p-2.5 rounded border border-slate-800 text-amber-300">
                        {currentItem.meshfs.merkleRoot}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Vérification cryptographique bit-à-bit conforme à la Règle 38 : zéro corruption, zéro lock fantôme.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VUE 5 : RÉSEAU WIREGUARD */}
            {activeTab === 'wireguard' && (
              <div className="space-y-4">
                <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-4 space-y-3">
                  <div className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                    <Network className="w-4 h-4 text-sky-400" />
                    <span>Liaison Chiffrée WireGuard GEM-001</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 font-mono text-xs">
                    <div className="bg-slate-900 p-3 rounded border border-slate-800">
                      <div className="text-slate-400 text-[11px]">Canal de transit :</div>
                      <div className="font-bold text-slate-200 mt-1">{currentItem.wireguard.endpoint}</div>
                    </div>
                    <div className="bg-slate-900 p-3 rounded border border-slate-800">
                      <div className="text-slate-400 text-[11px]">Latence RTT mesurée :</div>
                      <div className="font-bold text-emerald-400 mt-1">{currentItem.wireguard.rtt}</div>
                    </div>
                    <div className="bg-slate-900 p-3 rounded border border-slate-800">
                      <div className="text-slate-400 text-[11px]">Débit transit :</div>
                      <div className="font-bold text-sky-400 mt-1">{currentItem.wireguard.txRx}</div>
                    </div>
                    <div className="bg-slate-900 p-3 rounded border border-slate-800">
                      <div className="text-slate-400 text-[11px]">Chiffrement & Sécurité :</div>
                      <div className="font-bold text-purple-300 mt-1 truncate">{currentItem.wireguard.cipher}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* NOTE PÉDAGOGIQUE BAS DE PAGE */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-3 text-xs text-slate-300 flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-100">Architecture Proxmox VE vs PodMesh :</span>{' '}
                Sous Proxmox standard, déplacer une machine nécessite de recopier 30 Go de disque lourd (5 à 15 min d'interruption).{' '}
                Sous <span className="font-semibold text-emerald-400">PodMesh</span>, la migration d'Espace s'effectue en{' '}
                <span className="font-bold text-amber-300">1,60 seconde</span> chrono via Merkle DAG et streaming RAM-to-RAM sans perte de transaction MariaDB.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
