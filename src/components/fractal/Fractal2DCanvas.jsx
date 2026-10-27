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
  Sliders,
  CheckCircle2,
} from 'lucide-react'

export default function Fractal2DCanvas({
  data,
  selectedId,
  onSelectNode,
  onOpenActionModal,
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLevel, setFilterLevel] = useState('all') // all, governors, makers, saas, spaces, cells
  const [collapsedNodes, setCollapsedNodes] = useState({})

  const toggleCollapse = (id) => {
    setCollapsedNodes((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const root = data
  const rootGov = root.governors?.[0]

  return (
    <div className="flex flex-col gap-6">
      {/* 2D Fractal Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-3 shadow-xs">
        <div className="relative min-w-[260px] flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un espace (ex: Fleuriste, Vox Clinic, CRM-Rep, MariaDB)..."
            className="w-full rounded-xl border border-line bg-canvas py-2 pl-9 pr-3 text-xs text-fg placeholder-fg-muted focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-fg-muted font-medium mr-1">Filtrer strate :</span>
          {[
            { id: 'all', label: 'Tout l’Arbre' },
            { id: 'governors', label: 'Gouverneurs' },
            { id: 'makers', label: 'Makers (Pull)' },
            { id: 'saas', label: 'SaaS Clusters' },
            { id: 'spaces', label: 'Espaces Clients' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterLevel(tab.id)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                filterLevel === tab.id
                  ? 'bg-accent text-white shadow-xs'
                  : 'bg-surface-2 text-fg-muted hover:text-fg'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2D FRACTAL VISUAL TREE STRUCTURE */}
      <div className="space-y-6">
        {/* ÉTAGE 0 : RACINE SOUVERAINE */}
        <div className="rounded-2xl border-2 border-indigo-500/40 bg-gradient-to-r from-indigo-950/20 via-surface to-surface p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                <Shield size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-fg">{root.name}</h3>
                  <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold text-indigo-400 border border-indigo-500/20">
                    {root.kind}
                  </span>
                </div>
                <p className="text-xs text-fg-muted mt-0.5">
                  Quorum Consensus: <b className="text-emerald-400">{root.activeReplicationQuorum}</b> · Intégrité Stockage: <b className="text-accent">{root.meshfsIntegrity}</b>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-fg-muted">Capacité Totale</span>
                <p className="text-xs font-mono font-bold text-fg">{root.totalSpacesCount}+ Espaces Actifs</p>
              </div>
              <button
                type="button"
                onClick={() => onSelectNode && onSelectNode({ id: root.id, name: root.name, type: 'root', data: root })}
                className="rounded-lg border border-line bg-surface px-3 py-1.5 text-xs font-bold text-fg-muted hover:text-accent hover:border-accent"
              >
                Inspecter Racine
              </button>
            </div>
          </div>

          {/* ÉTAGE 1 : GOUVERNEUR RACINE & MASTER LEDGER */}
          {rootGov && (
            <div className="mt-5 space-y-5">
              <div
                onClick={() => onSelectNode && onSelectNode({ id: rootGov.id, name: rootGov.name, type: 'governor', data: rootGov })}
                className={`cursor-pointer rounded-xl border p-4 transition-all ${
                  selectedId === rootGov.id
                    ? 'border-blue-500 bg-blue-500/10 shadow-md ring-2 ring-blue-500/30'
                    : 'border-blue-500/30 bg-blue-950/10 hover:border-blue-500/60'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 font-bold text-xs">
                      G1
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-fg">{rootGov.name}</h4>
                      <p className="text-[11px] text-fg-muted font-mono">{rootGov.ledger}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-fg-muted">CPU: <b className="text-fg">{rootGov.metrics.cpuUsage}%</b></span>
                    <span className="text-fg-muted">RAM: <b className="text-fg">{rootGov.metrics.ramUsageMb} Mo</b></span>
                    <span className="rounded bg-emerald-500/10 px-2 py-0.5 font-bold text-emerald-400">
                      {rootGov.status}
                    </span>
                  </div>
                </div>

                {/* MAKERS AU SERVICE DU GOUVERNEUR (Pull Workers) */}
                {(filterLevel === 'all' || filterLevel === 'makers') && (
                  <div className="mt-4 pt-3 border-t border-blue-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                        <Zap size={13} /> Makers au service du Gouverneur ({rootGov.makers?.length})
                      </span>
                      <span className="text-[10px] text-fg-muted font-mono">Cycle Pull continu sans écoute TCP</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                      {rootGov.makers.map((maker) => (
                        <div
                          key={maker.id}
                          onClick={(e) => {
                            e.stopPropagation()
                            onSelectNode && onSelectNode({ id: maker.id, name: maker.name, type: 'maker', data: maker })
                          }}
                          className={`rounded-lg border p-2.5 text-xs transition-all ${
                            selectedId === maker.id
                              ? 'border-amber-500 bg-amber-500/10 shadow-xs'
                              : 'border-line bg-surface hover:border-amber-500/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-fg truncate">{maker.name.split('(')[0]}</span>
                            <span className="text-[10px] font-mono text-amber-400">{maker.status}</span>
                          </div>
                          <p className="text-[10px] text-fg-muted mt-1 truncate">{maker.role}</p>
                          <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-fg-muted border-t border-line/60 pt-1">
                            <span>Cycle: {maker.lastCycle}</span>
                            <span>{maker.dispatchedTasks} tâches</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ÉTAGE 2 : GOUVERNEURS SAAS CLUSTERS (Boutiques, Telecom, CRM-Rep...) */}
              {(filterLevel === 'all' || filterLevel === 'saas' || filterLevel === 'spaces') && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                      <Layers size={14} /> Gouverneurs SaaS Métiers ({rootGov.saasGovernors?.length})
                    </h4>
                    <span className="text-[11px] text-fg-muted">
                      1 Gouverneur SaaS pilote N Espaces Clients indépendamment des nœuds physiques
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    {rootGov.saasGovernors.map((sg) => {
                      const isCollapsed = collapsedNodes[sg.id]
                      const isSelected = selectedId === sg.id

                      return (
                        <div
                          key={sg.id}
                          className={`rounded-2xl border transition-all ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-950/10 shadow-lg ring-2 ring-emerald-500/20'
                              : 'border-emerald-500/30 bg-surface'
                          }`}
                        >
                          {/* SaaS Governor Header */}
                          <div
                            onClick={() => onSelectNode && onSelectNode({ id: sg.id, name: sg.name, type: 'saas_governor', data: sg })}
                            className="cursor-pointer flex flex-wrap items-center justify-between gap-3 p-4 border-b border-line bg-surface-2/40 rounded-t-2xl"
                          >
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleCollapse(sg.id)
                                }}
                                className="text-fg-muted hover:text-fg"
                              >
                                {isCollapsed ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
                              </button>
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                                <Boxes size={16} />
                              </div>
                              <div>
                                <h5 className="font-bold text-fg text-sm">{sg.name}</h5>
                                <p className="text-[11px] text-fg-muted">
                                  {sg.category} · <b className="text-emerald-400">{sg.managedSpacesCount} Espaces Gérés</b>
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                                {sg.status}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onOpenActionModal && onOpenActionModal('quota', sg)
                                }}
                                className="rounded-lg border border-line bg-surface px-2.5 py-1 text-xs font-semibold text-fg-muted hover:border-accent hover:text-fg flex items-center gap-1.5"
                              >
                                <Sliders size={13} /> Quotas
                              </button>
                            </div>
                          </div>

                          {/* ÉTAGE 3 : ESPACES CLIENTS DÉPLOYÉS */}
                          {!isCollapsed && (
                            <div className="p-4 space-y-4">
                              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                {sg.activeSpacesList.map((space) => {
                                  const isSpaceSelected = selectedId === space.id
                                  return (
                                    <div
                                      key={space.id}
                                      onClick={() => onSelectNode && onSelectNode({ id: space.id, name: space.name, type: 'space', data: space })}
                                      className={`cursor-pointer rounded-xl border p-4 transition-all ${
                                        isSpaceSelected
                                          ? 'border-pink-500 bg-pink-950/10 shadow-md ring-2 ring-pink-500/30'
                                          : 'border-line bg-surface-2/30 hover:border-pink-500/50'
                                      }`}
                                    >
                                      {/* Space Top info */}
                                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-2.5">
                                        <div>
                                          <div className="flex items-center gap-2">
                                            <h6 className="font-bold text-fg text-xs">{space.name}</h6>
                                            <span className="rounded bg-pink-500/10 px-1.5 py-0.2 text-[10px] font-bold text-pink-400">
                                              {space.category}
                                            </span>
                                          </div>
                                          <p className="text-[11px] text-fg-muted font-medium mt-0.5">
                                            Client : <b className="text-fg">{space.clientName}</b>
                                          </p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                          <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 font-mono">
                                            {space.replicationStatus} ({space.replicationNodes?.length}x)
                                          </span>
                                        </div>
                                      </div>

                                      {/* Space Live Metrics Bar */}
                                      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                                        <div className="rounded-lg bg-surface p-2 border border-line">
                                          <span className="text-[10px] text-fg-muted block">CPU</span>
                                          <span className="font-mono font-bold text-fg">{space.metrics.cpuUsage}%</span>
                                        </div>
                                        <div className="rounded-lg bg-surface p-2 border border-line">
                                          <span className="text-[10px] text-fg-muted block">RAM</span>
                                          <span className="font-mono font-bold text-fg">{space.metrics.ramUsageMb} / {space.metrics.ramQuotaMb} Mo</span>
                                        </div>
                                        <div className="rounded-lg bg-surface p-2 border border-line">
                                          <span className="text-[10px] text-fg-muted block">Stockage CAS</span>
                                          <span className="font-mono font-bold text-fg">{(space.metrics.diskUsageMb / 1024).toFixed(1)} / {(space.metrics.diskQuotaMb / 1024).toFixed(0)} Go</span>
                                        </div>
                                      </div>

                                      {/* ÉTAGE 4 : CELLULES SOUCHES DE L'ESPACE (Stem Cells) */}
                                      <div className="mt-3 pt-2.5 border-t border-line space-y-1.5">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-fg-muted flex items-center justify-between">
                                          <span>Cellules Applicatives ({space.cells?.length})</span>
                                          <span className="font-mono text-accent">SLA Téléport: {space.slaTeleport}</span>
                                        </span>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                          {space.cells.map((cell) => (
                                            <div
                                              key={cell.id}
                                              onClick={(e) => {
                                                e.stopPropagation()
                                                onSelectNode && onSelectNode({ id: cell.id, name: cell.name, type: 'cell', data: cell })
                                              }}
                                              className={`flex items-center justify-between rounded-lg border p-2 text-xs transition-all ${
                                                selectedId === cell.id
                                                  ? 'border-cyan-400 bg-cyan-950/20'
                                                  : 'border-line/70 bg-surface hover:border-accent'
                                              }`}
                                            >
                                              <div className="min-w-0 pr-1">
                                                <p className="font-bold text-fg text-[11px] truncate">{cell.name}</p>
                                                <p className="text-[9px] text-fg-muted truncate">
                                                  {cell.role} {cell.socket ? `(${cell.socket.split('/').pop()})` : ''}
                                                </p>
                                              </div>
                                              <span className="shrink-0 font-mono text-[10px] font-bold text-accent">
                                                {cell.ramMb}M
                                              </span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>

                                      {/* Space Quick Actions */}
                                      <div className="mt-3 flex items-center justify-between pt-2 border-t border-line text-[11px]">
                                        <span className="text-fg-muted font-mono text-[10px]">
                                          Backup : {space.lastBackup}
                                        </span>
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            onOpenActionModal && onOpenActionModal('teleport', space)
                                          }}
                                          className="text-accent hover:underline font-bold flex items-center gap-1"
                                        >
                                          <ArrowRightLeft size={12} /> Téléporter (1,6 s)
                                        </button>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
