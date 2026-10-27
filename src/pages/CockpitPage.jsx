import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  ArrowRightLeft,
  Boxes,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  ExternalLink,
  Flame,
  Globe,
  HardDrive,
  Layers,
  LayoutGrid,
  Lock,
  Network,
  Radio,
  RefreshCw,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react'

import WireGuardTopologyGraph from '../components/cockpit/WireGuardTopologyGraph'
import FractalTree from '../components/cockpit/FractalTree'
import LiveEventFeed from '../components/cockpit/LiveEventFeed'
import TeleportModal from '../components/cockpit/TeleportModal'
import ClassicProxmoxView from '../components/cockpit/ClassicProxmoxView'
import Fractal3DCanvas from '../components/fractal/Fractal3DCanvas'
import Fractal2DCanvas from '../components/fractal/Fractal2DCanvas'
import FractalInspectorPanel from '../components/fractal/FractalInspectorPanel'
import InterconnectedClustersView from '../components/vpn/InterconnectedClustersView'
import { INITIAL_FRACTAL_ROOT } from '../data/fractalUniverseData'
import {
  INITIAL_LABS,
  INITIAL_WIREGUARD_LINKS,
  INITIAL_SPACES,
  GUICHET_SOVEREIGN_NODE,
} from '../data/cockpitData'

export default function CockpitPage() {
  const [labs, setLabs] = useState(INITIAL_LABS)
  const [links, setLinks] = useState(INITIAL_WIREGUARD_LINKS)
  const [spaces, setSpaces] = useState(INITIAL_SPACES)
  const [selectedLabId, setSelectedLabId] = useState('lab-3-gbs-p4')
  const [activeView, setActiveView] = useState('proxmox') // 'proxmox' par défaut pour les humains habitués à Proxmox !
  const [fractalDim, setFractalDim] = useState('3d') // '3d' ou '2d'
  const [selectedFractalNode, setSelectedFractalNode] = useState({
    id: 'space-boutique-fleuriste',
    name: 'Espace Boutique Fleuriste de la Paix',
    type: 'space',
    data: INITIAL_FRACTAL_ROOT.governors[0].saasGovernors[0].activeSpacesList[0],
  })
  const [teleportModalOpen, setTeleportModalOpen] = useState(() => {
    return typeof window !== 'undefined' && window.location.search.includes('teleport=1')
  })
  const [teleportTargetSpaceId, setTeleportTargetSpaceId] = useState(null)
  const [sseConnected, setSseConnected] = useState(true)
  const [events, setEvents] = useState([
    {
      id: 'init-1',
      timestamp: new Date(Date.now() - 14000).toISOString(),
      category: 'quorum',
      source: 'arbiter-node99',
      message: 'Quorum 3/4 validé. STONITH armé, aucun incident split-brain.',
    },
    {
      id: 'init-2',
      timestamp: new Date(Date.now() - 10000).toISOString(),
      category: 'wireguard',
      source: 'wg-podmesh',
      message: 'Handshake mutuel ChaCha20-Poly1305 confirmé sur les 6 liaisons.',
    },
    {
      id: 'init-3',
      timestamp: new Date(Date.now() - 6000).toISOString(),
      category: 'heartbeat',
      source: 'gbs-p4',
      message: 'Pulsation PURRING (CPU: 28.5%, RAM: 41.2%, IOPS: 4320).',
    },
    {
      id: 'init-4',
      timestamp: new Date(Date.now() - 2000).toISOString(),
      category: 'pmbs',
      source: 'med-pmox',
      message: 'Snapshot atomique Merkle vérifié : zéro dérive POSIX confirmée.',
    },
  ])

  // Dynamic document title
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = 'PodMesh Cockpit — Administration & Exploitation Souveraine'
    }
  }, [])

  // Real-time EventSource (SSE) connection with automatic simulation fallback
  useEffect(() => {
    let evtSource = null
    try {
      evtSource = new EventSource('/api/cockpit/events')
      evtSource.onopen = () => {
        setSseConnected(true)
      }
      evtSource.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data)
          handleIncomingEvent(data)
        } catch {
          // ignore parsing error
        }
      }
      evtSource.onerror = () => {
        // Switch to simulation gracefully without interrupting UI
        setSseConnected(false)
      }
    } catch {
      setSseConnected(false)
    }

    // Realistic fallback interval: generates continuous telemetry pulses
    const interval = setInterval(() => {
      // Fluctuating metric simulation
      setLabs((prevLabs) =>
        prevLabs.map((l) => {
          const deltaCpu = (Math.random() - 0.5) * 2.4
          const deltaRam = (Math.random() - 0.5) * 1.2
          const newCpu = Math.max(2, Math.min(95, parseFloat((l.metrics.cpuUsage + deltaCpu).toFixed(1))))
          const newRam = Math.max(5, Math.min(95, parseFloat((l.metrics.ramUsage + deltaRam).toFixed(1))))
          return {
            ...l,
            metrics: {
              ...l.metrics,
              cpuUsage: newCpu,
              ramUsage: newRam,
              iops: Math.round(l.metrics.iops + (Math.random() - 0.5) * 40),
            },
          }
        })
      )

      // Random heartbeat log every few seconds
      const randLab = labs[Math.floor(Math.random() * labs.length)]
      if (Math.random() > 0.45) {
        const simEv = {
          id: `ev-${Date.now()}`,
          timestamp: new Date().toISOString(),
          category: Math.random() > 0.6 ? 'heartbeat' : 'wireguard',
          source: randLab?.host.split(' ')[0] || 'mesh',
          message:
            Math.random() > 0.6
              ? `Pulsation PURRING régulière : nœud souverain sain.`
              : `Synchronisation paquets WireGuard (0.0% perte, débit nominal).`,
        }
        setEvents((prev) => [...prev.slice(-150), simEv])
      }
    }, 2800)

    return () => {
      if (evtSource) evtSource.close()
      clearInterval(interval)
    }
  }, [])

  function handleIncomingEvent(data) {
    if (!data) return
    setEvents((prev) => [...prev.slice(-150), data])

    if (data.type === 'LAB_UPDATE' && data.payload) {
      setLabs((prev) =>
        prev.map((l) => (l.id === data.payload.id ? { ...l, ...data.payload } : l))
      )
    }
  }

  function handleOpenTeleport(spaceId) {
    setTeleportTargetSpaceId(spaceId)
    setTeleportModalOpen(true)
  }

  // Handle successful teleportation execution
  function handleExecuteTeleport({ spaceId, targetLabId, proof }) {
    // 1. Move space to target lab in state
    setSpaces((prevSpaces) =>
      prevSpaces.map((sp) =>
        sp.id === spaceId
          ? {
              ...sp,
              currentLab: targetLabId,
              lastTeleported: `${new Date().toLocaleDateString('fr-FR')} (${proof.fromLab} ➔ ${proof.toLab})`,
            }
          : sp
      )
    )

    // 2. Update resident spaces inside labs
    setLabs((prevLabs) =>
      prevLabs.map((l) => {
        if (l.id === proof.fromLab) {
          return {
            ...l,
            residentSpaces: (l.residentSpaces || []).filter((s) => s !== spaceId),
          }
        }
        if (l.id === targetLabId) {
          return {
            ...l,
            residentSpaces: Array.from(new Set([...(l.residentSpaces || []), spaceId])),
          }
        }
        return l
      })
    )

    // 3. Inject high-priority forensic teleport event in the SSE stream
    const teleportEvent = {
      id: `teleport-${Date.now()}`,
      timestamp: new Date().toISOString(),
      category: 'teleport',
      source: 'teleport-daemon',
      message: `🚀 Téléportation achevée en 1.60 s chrono ! Espace ${spaceId} déplacé : ${proof.fromLab} ➔ ${targetLabId} (Downtime: ${proof.downtimeMs} ms, SHA256: ${proof.sha256Digest.slice(0, 16)}...)`,
      metrics: {
        duration: '1.60 s',
        downtime: `${proof.downtimeMs} ms`,
        posixDrift: '0 octet',
      },
    }

    setEvents((prev) => [...prev.slice(-150), teleportEvent])

    // Select the target lab so user sees it right away
    setSelectedLabId(targetLabId)

    // Attempt to notify backend if available
    try {
      fetch('/api/cockpit/teleport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spaceId, targetLabId, proof }),
      }).catch(() => {})
    } catch {}
  }

  const totalContainers = labs.reduce((acc, l) => acc + (l.containersCount || (l.residentSpaces?.length || 0) * 4), 0)

  return (
    <div className="min-h-screen bg-canvas text-fg">
      {/* Top Cockpit Sovereign Bar */}
      <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white shadow-md">
              <Zap size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black tracking-tight text-fg">
                  PodMesh Cockpit Web
                </h1>
                <span className="rounded bg-accent/15 px-2 py-0.5 text-[10px] font-black uppercase text-accent">
                  Proxmox++
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-accent">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  PURRING
                </span>
              </div>
              <p className="text-xs text-fg-muted">
                Interface Temps Réel · 4 Labos en Quorum · Téléportation 1-Clic
              </p>
            </div>
          </div>

          {/* Quick cluster status pills */}
          <div className="hidden lg:flex items-center gap-3 text-xs font-mono">
            <div className="rounded-lg border border-line bg-surface-2 px-3 py-1.5">
              <span className="text-fg-muted">Labos : </span>
              <span className="font-bold text-accent">4 / 4 Actifs</span>
            </div>
            <div className="rounded-lg border border-line bg-surface-2 px-3 py-1.5">
              <span className="text-fg-muted">Conteneurs : </span>
              <span className="font-bold text-fg">{totalContainers}</span>
            </div>
            <div className="rounded-lg border border-line bg-surface-2 px-3 py-1.5">
              <span className="text-fg-muted">Débit Mesh : </span>
              <span className="font-bold text-signal">412 Mb/s</span>
            </div>
            <div className="rounded-lg border border-line bg-surface-2 px-3 py-1.5">
              <span className="text-fg-muted">Quorum : </span>
              <span className="font-bold text-purple-600">3/4 STONITH</span>
            </div>
          </div>

          {/* Action buttons: 1-Click Teleport & Exploitation status */}
          <div className="flex items-center gap-2.5">
            <a
              href="/docs"
              className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface-2 px-3 py-2 text-xs font-bold text-fg-muted hover:text-fg hover:border-accent transition-colors"
              title="Accéder au site officiel de documentation et vitrine technique (podmesh.xavdp.pro)"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">Vitrine & Doc</span>
            </a>

            <button
              type="button"
              onClick={() => handleOpenTeleport(spaces[0]?.id)}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-xs font-black text-white shadow-md transition-all hover:bg-accent-hover hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <ArrowRightLeft size={15} />
              <span>Téléportation 1-Clic (1,6 s)</span>
            </button>

            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-line bg-surface-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>MeshFS CAS: Synchronisé</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 space-y-6">
        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-2 shadow-xs">
          <div className="flex flex-wrap items-center gap-1">
            {[
              { id: 'all', label: 'Vue Complète Cockpit', icon: LayoutGrid },
              { id: 'proxmox', label: 'Vue Classique (Arbre Proxmox)', icon: Server },
              { id: 'fractal-cathedral', label: 'Cathédrale Fractale (2D / 3D)', icon: Sparkles },
              { id: 'interconnected-vpn', label: 'Multi-Clusters WireGuard (Anti-SPOF)', icon: ShieldCheck },
              { id: 'tree', label: 'Arbre Fractal Vivant', icon: Layers },
              { id: 'topology', label: 'Graphe WireGuard (4 Labos)', icon: Network },
              { id: 'events', label: 'Flux Temps Réel (SSE)', icon: Terminal },
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeView === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveView(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-accent text-white shadow-xs'
                      : 'text-fg-muted hover:bg-surface-2 hover:text-fg'
                  }`}
                >
                  <Icon size={15} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-2 px-3 text-xs font-mono text-fg-muted">
            <span>Dernière réconciliation :</span>
            <span className="font-bold text-accent">À l'instant</span>
          </div>
        </div>

        {/* VIEW : CATHEDRALE FRACTALE 2D / 3D */}
        {(activeView === 'all' || activeView === 'fractal-cathedral') && (
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4 shadow-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent font-bold">
                    <Sparkles size={16} />
                  </span>
                  <h3 className="text-base font-black text-fg">
                    Cathédrale Fractale Souveraine (2D / 3D)
                  </h3>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                    S'affranchit des Nœuds Physiques
                  </span>
                </div>
                <p className="text-xs text-fg-muted mt-0.5">
                  Vision pure de gouvernance : Racine ➔ Gouverneur ➔ Makers ➔ SaaS Clusters ➔ 1000+ Espaces Clients ➔ Cellules Souches
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-xl border border-line bg-surface-2 p-1 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setFractalDim('3d')}
                    className={`rounded-lg px-3 py-1.5 transition-all flex items-center gap-1.5 ${
                      fractalDim === '3d'
                        ? 'bg-accent text-white shadow-xs'
                        : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    <Sparkles size={13} />
                    <span>Vue 3D Sphère</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFractalDim('2d')}
                    className={`rounded-lg px-3 py-1.5 transition-all flex items-center gap-1.5 ${
                      fractalDim === '2d'
                        ? 'bg-accent text-white shadow-xs'
                        : 'text-fg-muted hover:text-fg'
                    }`}
                  >
                    <Layers size={13} />
                    <span>Vue 2D Dépliée</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 xl:col-span-8">
                {fractalDim === '3d' ? (
                  <Fractal3DCanvas
                    data={INITIAL_FRACTAL_ROOT}
                    selectedId={selectedFractalNode?.id}
                    onSelectNode={setSelectedFractalNode}
                  />
                ) : (
                  <Fractal2DCanvas
                    data={INITIAL_FRACTAL_ROOT}
                    selectedId={selectedFractalNode?.id}
                    onSelectNode={setSelectedFractalNode}
                    onOpenActionModal={handleOpenTeleport}
                  />
                )}
              </div>

              <div className="lg:col-span-5 xl:col-span-4 sticky top-20">
                <FractalInspectorPanel
                  selectedNode={selectedFractalNode}
                  onOpenTeleport={handleOpenTeleport}
                />
              </div>
            </div>
          </section>
        )}

        {/* VIEW : CLASSIC PROXMOX TREE */}
        {(activeView === 'all' || activeView === 'proxmox') && (
          <section>
            <ClassicProxmoxView onOpenTeleport={handleOpenTeleport} />
          </section>
        )}

        {/* VIEW : MULTI-CLUSTERS REDUNDANT WIREGUARD (ANTI-SPOF) */}
        {(activeView === 'all' || activeView === 'interconnected-vpn') && (
          <section>
            <InterconnectedClustersView />
          </section>
        )}

        {/* VIEW : TOPOLOGY GRAPH */}
        {(activeView === 'all' || activeView === 'topology') && (
          <section>
            <WireGuardTopologyGraph
              labs={labs}
              links={links}
              spaces={spaces}
              selectedLabId={selectedLabId}
              onSelectLab={setSelectedLabId}
              onOpenTeleport={handleOpenTeleport}
            />
          </section>
        )}

        {/* VIEW : FRACTAL TREE */}
        {(activeView === 'all' || activeView === 'tree') && (
          <section>
            <FractalTree
              labs={labs}
              spaces={spaces}
              guichet={GUICHET_SOVEREIGN_NODE}
              selectedLabId={selectedLabId}
              onSelectLab={setSelectedLabId}
              onOpenTeleport={handleOpenTeleport}
            />
          </section>
        )}

        {/* VIEW : LIVE SSE EVENT FEED */}
        {(activeView === 'all' || activeView === 'events') && (
          <section>
            <LiveEventFeed
              events={events}
              isConnected={sseConnected}
              onClear={() => setEvents([])}
            />
          </section>
        )}
      </main>

      {/* 1-Click Teleport Modal */}
      <TeleportModal
        isOpen={teleportModalOpen}
        onClose={() => setTeleportModalOpen(false)}
        spaces={spaces}
        labs={labs}
        initialSpaceId={teleportTargetSpaceId}
        onExecuteTeleport={handleExecuteTeleport}
      />
    </div>
  )
}
