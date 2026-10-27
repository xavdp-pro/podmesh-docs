import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Boxes,
  ChevronDown,
  ChevronRight,
  Cpu,
  Database,
  ExternalLink,
  Flame,
  Globe,
  HardDrive,
  Layers,
  Network,
  Radio,
  RefreshCw,
  Server,
  Shield,
  Zap,
  ArrowRightLeft,
  Search,
  Filter,
} from 'lucide-react'

export default function FractalTree({
  labs,
  spaces,
  guichet,
  selectedLabId,
  onSelectLab,
  onOpenTeleport,
}) {
  const [expandedNodes, setExpandedNodes] = useState({
    guichet: true,
    'lab-1-foundry': true,
    'lab-2-med-pmox': true,
    'lab-3-gbs-p4': true,
    'lab-4-arbiter': false,
    'espace-vox-clinic': true,
    'espace-saas-boutiques': true,
    'espace-ged-hds': false,
    'espace-meshfs-ledger': false,
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStratum, setFilterStratum] = useState('all')

  function toggleNode(nodeId) {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }))
  }

  function expandAll() {
    const all = { guichet: true }
    labs.forEach((l) => (all[l.id] = true))
    spaces.forEach((s) => (all[s.id] = true))
    setExpandedNodes(all)
  }

  function collapseAll() {
    setExpandedNodes({})
  }

  return (
    <div className="flex flex-col rounded-2xl border border-line bg-surface p-5 shadow-sm lg:p-6">
      {/* Header with Title and Quick Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Layers size={18} />
            </div>
            <h2 className="text-lg font-black tracking-tight text-fg">
              Arbre Fractal Vivant
            </h2>
            <span className="rounded-full border border-line bg-surface-2 px-2.5 py-0.5 text-xs font-bold text-fg-muted">
              Guichet ➔ Ateliers ➔ Espaces ➔ Services
            </span>
          </div>
          <p className="mt-1 text-xs text-fg-muted">
            Hiérarchie souveraine SHAPER OS v1.15 : isolation étanche des juridictions, de la Strate 0 (Hôte) aux Briques Strate 3.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="rounded-lg border border-line bg-surface px-2.5 py-1 text-xs font-semibold text-fg-muted hover:border-accent hover:text-fg"
          >
            Déplier Tout
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="rounded-lg border border-line bg-surface px-2.5 py-1 text-xs font-semibold text-fg-muted hover:border-accent hover:text-fg"
          >
            Replier Tout
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filtrer un atelier, espace ou service..."
            className="w-full rounded-xl border border-line bg-canvas py-1.5 pl-9 pr-3 text-xs text-fg placeholder-fg-muted focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-fg-muted font-medium">Niveau :</span>
          {['all', 'guichet', 'ateliers', 'espaces', 'services'].map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilterStratum(key)}
              className={`rounded-lg px-2.5 py-1 capitalize transition-colors ${
                filterStratum === key
                  ? 'bg-accent text-accent-fg font-bold'
                  : 'bg-surface-2 text-fg-muted hover:text-fg'
              }`}
            >
              {key === 'all' ? 'Tous' : key}
            </button>
          ))}
        </div>
      </div>

      {/* Fractal Tree Hierarchy Container */}
      <div className="mt-5 space-y-4">
        {/* LEVEL 0 : GUICHET SOUVERAIN (Edge Ingress) */}
        {(filterStratum === 'all' || filterStratum === 'guichet') && (
          <div className="overflow-hidden rounded-xl border border-line bg-surface-2/40">
            <div
              onClick={() => toggleNode('guichet')}
              className="flex cursor-pointer items-center justify-between p-3.5 transition-colors hover:bg-surface-2/80"
            >
              <div className="flex items-center gap-3">
                <button type="button" className="text-fg-muted hover:text-fg">
                  {expandedNodes.guichet ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal/15 text-signal">
                  <Globe size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-signal/15 px-1.5 py-0.5 text-[10px] font-black uppercase text-signal">
                      STRATE 0
                    </span>
                    <h3 className="text-sm font-black text-fg">{guichet.label}</h3>
                  </div>
                  <p className="text-xs text-fg-muted">{guichet.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="hidden sm:block text-right">
                  <span className="text-fg-muted text-[11px]">Débit Global</span>
                  <p className="font-bold text-signal">
                    ▼ {guichet.inboundBandwidthMbps} Mb/s · ▲ {guichet.outboundBandwidthMbps} Mb/s
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-bold text-accent">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  {guichet.ingressStatus}
                </span>
              </div>
            </div>

            {/* Level 0 Details */}
            <AnimatePresence>
              {expandedNodes.guichet && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-line bg-surface p-3.5 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="rounded-lg border border-line bg-surface-2/50 p-2.5">
                      <span className="text-[11px] text-fg-muted">Protocoles Ouverts</span>
                      <p className="mt-1 font-mono font-semibold text-fg">
                        {guichet.protocols.join(' · ')}
                      </p>
                    </div>
                    <div className="rounded-lg border border-line bg-surface-2/50 p-2.5">
                      <span className="text-[11px] text-fg-muted">Sécurité & Certificats</span>
                      <p className="mt-1 font-semibold text-fg">{guichet.certificates}</p>
                    </div>
                    <div className="rounded-lg border border-line bg-surface-2/50 p-2.5">
                      <span className="text-[11px] text-fg-muted">Connexions Actives</span>
                      <p className="mt-1 text-sm font-black text-accent">
                        {guichet.activeConnections.toLocaleString()} sessions TLS
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* LEVEL 1 : ATELIERS (Workers / 4 Labs) */}
        {(filterStratum === 'all' || filterStratum === 'ateliers' || filterStratum === 'espaces' || filterStratum === 'services') && (
          <div className="space-y-3 pl-3 sm:pl-6 border-l-2 border-line">
            {labs.map((lab) => {
              const isSelected = selectedLabId === lab.id
              const isExpanded = expandedNodes[lab.id]
              const residentSpacesList = spaces.filter((s) => s.currentLab === lab.id)

              return (
                <div
                  key={lab.id}
                  className={`overflow-hidden rounded-xl border transition-all ${
                    isSelected
                      ? 'border-accent bg-accent/5 ring-1 ring-accent/30'
                      : 'border-line bg-surface'
                  }`}
                >
                  {/* Atelier Header Bar */}
                  <div
                    onClick={() => toggleNode(lab.id)}
                    className="flex cursor-pointer items-center justify-between p-3.5 hover:bg-surface-2/60"
                  >
                    <div className="flex items-center gap-3">
                      <button type="button" className="text-fg-muted hover:text-fg">
                        {isExpanded ? <ChevronDown size={17} /> : <ChevronRight size={17} />}
                      </button>
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg font-bold text-white shadow-sm"
                        style={{ backgroundColor: lab.color || '#0f6b46' }}
                      >
                        <Server size={17} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] font-bold text-fg-muted">
                            ATELIER
                          </span>
                          <h4 className="text-sm font-black text-fg">{lab.label}</h4>
                        </div>
                        <p className="text-xs text-fg-muted">{lab.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <div className="hidden md:flex items-center gap-3 font-mono text-[11px] text-fg-muted">
                        <span>CPU: <b>{lab.metrics.cpuUsage}%</b></span>
                        <span>RAM: <b>{lab.metrics.ramUsage}%</b></span>
                        <span>IOPS: <b>{lab.metrics.iops}</b></span>
                      </div>
                      <span className="rounded bg-accent/10 px-2 py-0.5 text-[11px] font-bold text-accent">
                        {lab.status}
                      </span>
                    </div>
                  </div>

                  {/* Atelier Body (Nested Espaces & Details) */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-line bg-canvas/40 p-3 sm:p-4"
                      >
                        {/* Hardware summary bar */}
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-fg">Hôte :</span>
                            <span className="font-mono text-fg-muted">{lab.host}</span>
                            <span className="text-line">|</span>
                            <span className="font-mono text-fg-muted">WG: {lab.wgIp}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-fg-muted">{lab.specs.cpu} · {lab.specs.ram}</span>
                          </div>
                        </div>

                        {/* LEVEL 2 : ESPACES RESIDENTS DANS CET ATELIER */}
                        <div className="space-y-2.5 pl-3 sm:pl-5 border-l-2 border-line">
                          {residentSpacesList.length > 0 ? (
                            residentSpacesList.map((space) => {
                              const isSpaceExpanded = expandedNodes[space.id]

                              return (
                                <div
                                  key={space.id}
                                  className="overflow-hidden rounded-xl border border-line bg-surface shadow-xs"
                                >
                                  {/* Space Header */}
                                  <div
                                    onClick={() => toggleNode(space.id)}
                                    className="flex cursor-pointer items-center justify-between p-3 hover:bg-surface-2/50"
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <button type="button" className="text-fg-muted hover:text-fg">
                                        {isSpaceExpanded ? (
                                          <ChevronDown size={15} />
                                        ) : (
                                          <ChevronRight size={15} />
                                        )}
                                      </button>
                                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-warm/15 text-warm">
                                        <Boxes size={15} />
                                      </div>
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <span className="rounded bg-warm/15 px-1 py-0.2 text-[9px] font-black uppercase text-warm">
                                            ESPACE
                                          </span>
                                          <h5 className="text-xs font-black text-fg">{space.label}</h5>
                                        </div>
                                        <p className="text-[11px] text-fg-muted truncate">{space.category}</p>
                                      </div>
                                    </div>

                                    {/* Action Teleport Button right in the tree */}
                                    <div className="flex items-center gap-2">
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          onOpenTeleport(space.id)
                                        }}
                                        className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-2.5 py-1 text-xs font-bold text-accent transition-all hover:bg-accent hover:text-white shadow-xs"
                                        title="Déplacement à chaud sous SLA 1,6 s"
                                      >
                                        <ArrowRightLeft size={13} />
                                        <span>Téléporter 1-Clic</span>
                                      </button>
                                      <span className="rounded bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
                                        PURRING
                                      </span>
                                    </div>
                                  </div>

                                  {/* Space Details & LEVEL 3 : SERVICES (Bricks) */}
                                  <AnimatePresence>
                                    {isSpaceExpanded && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="border-t border-line bg-surface-2/40 p-3 text-xs"
                                      >
                                        <p className="text-[11px] text-fg-muted mb-2.5">
                                          {space.description}
                                        </p>

                                        {/* Teleport SLA & Metrics */}
                                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line bg-surface p-2 text-[11px]">
                                          <span className="text-fg-muted font-medium">
                                            SLA Déplacement : <b className="text-accent">{space.teleportDowntimeSla}</b>
                                          </span>
                                          <span className="text-fg-muted font-mono">
                                            RAM: {space.memUsageMb} Mo · CPU: {space.cpuUsage}% · Stockage: {space.storageMb} Mo
                                          </span>
                                        </div>

                                        {/* LEVEL 3 : SERVICES (Briques Internes Strate 3) */}
                                        <div className="space-y-1.5">
                                          <span className="text-[10px] font-bold uppercase tracking-wider text-fg-muted">
                                            Services & Briques Strate 3 ({space.services.length})
                                          </span>
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {space.services.map((svc) => (
                                              <div
                                                key={svc.id}
                                                className="flex items-center justify-between rounded-lg border border-line bg-surface p-2 text-xs"
                                              >
                                                <div className="min-w-0 flex items-center gap-2">
                                                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-surface-2 text-accent">
                                                    {svc.kind.includes('Database') ? (
                                                      <Database size={13} />
                                                    ) : svc.kind.includes('Storage') ? (
                                                      <HardDrive size={13} />
                                                    ) : (
                                                      <Zap size={13} />
                                                    )}
                                                  </div>
                                                  <div className="min-w-0">
                                                    <p className="font-bold text-fg truncate text-[11px]">
                                                      {svc.name}
                                                    </p>
                                                    <p className="text-[10px] text-fg-muted truncate">
                                                      {svc.kind} {svc.port ? `:${svc.port}` : ''}
                                                    </p>
                                                  </div>
                                                </div>
                                                <span className="shrink-0 font-mono text-[10px] font-semibold text-accent">
                                                  {svc.status} ({svc.ramMb}M)
                                                </span>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              )
                            })
                          ) : (
                            <div className="rounded-lg border border-dashed border-line bg-surface p-3 text-center text-xs text-fg-muted">
                              {lab.id === 'lab-4-arbiter'
                                ? 'Atelier Témoin Quorum & Fencing STONITH dédié (zéro espace applicatif pour pureté d\'arbitrage).'
                                : 'Aucun espace résident dans cet atelier.'}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
