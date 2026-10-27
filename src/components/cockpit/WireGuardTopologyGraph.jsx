import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  CheckCircle2,
  Cpu,
  HardDrive,
  Lock,
  Network,
  RefreshCw,
  Server,
  Shield,
  Zap,
  Radio,
  ArrowRightLeft,
  Info,
} from 'lucide-react'

export default function WireGuardTopologyGraph({
  labs,
  links,
  spaces,
  selectedLabId,
  onSelectLab,
  onOpenTeleport,
}) {
  const [selectedLink, setSelectedLink] = useState(null)
  const [animating, setAnimating] = useState(true)
  const [meshPingActive, setMeshPingActive] = useState(false)

  // Node positions on the 800x520 SVG canvas
  const NODE_COORDS = {
    'lab-1-foundry': { x: 180, y: 130 },
    'lab-2-med-pmox': { x: 620, y: 130 },
    'lab-3-gbs-p4': { x: 620, y: 400 },
    'lab-4-arbiter': { x: 180, y: 400 },
  }

  const GUICHET_COORD = { x: 400, y: 265 }

  function handleTriggerPing() {
    setMeshPingActive(true)
    setTimeout(() => setMeshPingActive(false), 2400)
  }

  const activeLab = labs.find((l) => l.id === selectedLabId) || labs[0]

  return (
    <div className="flex flex-col rounded-2xl border border-line bg-surface p-5 shadow-sm lg:p-6">
      {/* Header with Title and Quick Stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Network size={18} />
            </div>
            <h2 className="text-lg font-black tracking-tight text-fg">
              Maillage WireGuard Interactif (4 Labos)
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
              </span>
              Mesh 100% Chiffré ChaCha20-Poly1305
            </span>
          </div>
          <p className="mt-1 text-xs text-fg-muted">
            Topologie pair-à-pair sans SPOF · Handshake permanent &lt; 5s · Arbitrage Quorum 3/4 Anti Split-Brain
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleTriggerPing}
            className={`inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-xs font-semibold text-fg transition-all hover:border-accent hover:text-accent ${
              meshPingActive ? 'border-accent bg-accent/10 text-accent ring-2 ring-accent/30' : ''
            }`}
          >
            <Radio size={14} className={meshPingActive ? 'animate-pulse text-accent' : ''} />
            {meshPingActive ? 'Sondage Mesh RTT...' : 'Vérifier RTT Mesh'}
          </button>
        </div>
      </div>

      {/* Main Content: Interactive SVG + Detail Drawer */}
      <div className="mt-5 grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* SVG Canvas Area */}
        <div className="relative flex min-h-[460px] items-center justify-center overflow-hidden rounded-xl border border-line bg-canvas/70 p-2 xl:col-span-8">
          <svg
            viewBox="0 0 800 530"
            className="h-full w-full select-none"
            style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.05))' }}
          >
            <defs>
              <linearGradient id="wireguardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f6b46" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#0f7c8c" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#b4562c" stopOpacity="0.8" />
              </linearGradient>

              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Grid Pattern */}
            <g opacity="0.12" stroke="currentColor">
              {Array.from({ length: 9 }).map((_, i) => (
                <line key={`grid-h-${i}`} x1="40" y1={50 + i * 50} x2="760" y2={50 + i * 50} strokeDasharray="3 6" />
              ))}
              {Array.from({ length: 15 }).map((_, i) => (
                <line key={`grid-v-${i}`} x1={50 + i * 50} y1="40" x2={50 + i * 50} y2={490} strokeDasharray="3 6" />
              ))}
            </g>

            {/* Guichet Souverain central links to each Lab */}
            {labs.map((lab) => {
              const c = NODE_COORDS[lab.id]
              if (!c) return null
              return (
                <line
                  key={`guichet-link-${lab.id}`}
                  x1={GUICHET_COORD.x}
                  y1={GUICHET_COORD.y}
                  x2={c.x}
                  y2={c.y}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  opacity="0.25"
                />
              )
            })}

            {/* WireGuard Peer-to-Peer Links between Labs */}
            {links.map((link) => {
              const c1 = NODE_COORDS[link.from]
              const c2 = NODE_COORDS[link.to]
              if (!c1 || !c2) return null
              const isSelected = selectedLink?.id === link.id
              const midX = (c1.x + c2.x) / 2
              const midY = (c1.y + c2.y) / 2

              return (
                <g
                  key={link.id}
                  className="cursor-pointer transition-opacity"
                  onClick={() => setSelectedLink(isSelected ? null : link)}
                >
                  {/* Outer transparent hit area */}
                  <line
                    x1={c1.x}
                    y1={c1.y}
                    x2={c2.x}
                    y2={c2.y}
                    stroke="transparent"
                    strokeWidth="20"
                  />

                  {/* Base WireGuard Link line */}
                  <line
                    x1={c1.x}
                    y1={c1.y}
                    x2={c2.x}
                    y2={c2.y}
                    stroke={isSelected ? '#0f7c8c' : '#0f6b46'}
                    strokeWidth={isSelected ? '3.5' : '2'}
                    strokeOpacity={isSelected ? '1' : '0.65'}
                    filter={isSelected ? 'url(#glow)' : undefined}
                  />

                  {/* Animated data particle packets along the tunnel */}
                  {animating && (
                    <circle r={isSelected ? '4.5' : '3'} fill={isSelected ? '#4fc7d8' : '#1fa968'}>
                      <animateMotion
                        path={`M ${c1.x} ${c1.y} L ${c2.x} ${c2.y}`}
                        dur={`${2.2 + link.latencyMs * 1.5}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}

                  {/* Return packet in reverse direction */}
                  {animating && (
                    <circle r={isSelected ? '4' : '2.5'} fill="#b4562c">
                      <animateMotion
                        path={`M ${c2.x} ${c2.y} L ${c1.x} ${c1.y}`}
                        dur={`${2.5 + link.latencyMs * 1.8}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}

                  {/* Latency badge at midpoint */}
                  <g transform={`translate(${midX}, ${midY})`}>
                    <rect
                      x="-34"
                      y="-12"
                      width="68"
                      height="24"
                      rx="12"
                      fill="var(--color-surface, #fffdfa)"
                      stroke={isSelected ? '#0f7c8c' : 'var(--color-line, #e3dacb)'}
                      strokeWidth={isSelected ? '2' : '1'}
                      className="shadow-sm"
                    />
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      className="fill-current font-mono text-[11px] font-bold"
                      fill="var(--color-fg, #10231b)"
                    >
                      {link.latencyMs} ms
                    </text>
                  </g>
                </g>
              )
            })}

            {/* Central Guichet / Ingress Gateway */}
            <g transform={`translate(${GUICHET_COORD.x}, ${GUICHET_COORD.y})`}>
              <circle
                r="36"
                fill="var(--color-surface, #fffdfa)"
                stroke="#0f7c8c"
                strokeWidth="2.5"
                filter="url(#glow)"
              />
              <circle r="30" fill="#0f7c8c" fillOpacity="0.1" />
              <text
                x="0"
                y="-4"
                textAnchor="middle"
                className="fill-current text-xs font-black tracking-tight"
                fill="#0f7c8c"
              >
                GUICHET
              </text>
              <text
                x="0"
                y="11"
                textAnchor="middle"
                className="fill-current font-mono text-[10px] font-bold"
                fill="var(--color-fg-muted, #4a5a51)"
              >
                Ingress L4-L7
              </text>
            </g>

            {/* The 4 Lab Nodes */}
            {labs.map((lab) => {
              const c = NODE_COORDS[lab.id]
              if (!c) return null
              const isSelected = selectedLabId === lab.id
              const residentCount = lab.residentSpaces?.length || 0

              return (
                <g
                  key={lab.id}
                  transform={`translate(${c.x}, ${c.y})`}
                  className="cursor-pointer transition-transform duration-200"
                  onClick={() => onSelectLab(lab.id)}
                >
                  {/* Pulsing ring if selected or pinged */}
                  {(isSelected || meshPingActive) && (
                    <circle
                      r="58"
                      fill="none"
                      stroke={lab.color || '#0f6b46'}
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      className="animate-spin"
                      style={{ animationDuration: '8s' }}
                    />
                  )}

                  {/* Main Node Circle */}
                  <circle
                    r="48"
                    fill="var(--color-surface, #fffdfa)"
                    stroke={isSelected ? lab.color : 'var(--color-line, #e3dacb)'}
                    strokeWidth={isSelected ? '3.5' : '2'}
                    className="transition-all hover:stroke-accent"
                    filter="url(#glow)"
                  />

                  {/* Inner fill */}
                  <circle
                    r="42"
                    fill={lab.color || '#0f6b46'}
                    fillOpacity={isSelected ? '0.2' : '0.08'}
                  />

                  {/* Status Indicator Dot */}
                  <circle cx="28" cy="-28" r="7" fill="#1fa968" stroke="#fff" strokeWidth="2" />

                  {/* Lab Label */}
                  <text
                    x="0"
                    y="-10"
                    textAnchor="middle"
                    className="fill-current text-xs font-black"
                    fill="var(--color-fg, #10231b)"
                  >
                    {lab.id === 'lab-1-foundry' && 'LAB 1'}
                    {lab.id === 'lab-2-med-pmox' && 'LAB 2'}
                    {lab.id === 'lab-3-gbs-p4' && 'LAB 3'}
                    {lab.id === 'lab-4-arbiter' && 'LAB 4'}
                  </text>

                  {/* Lab Subtitle */}
                  <text
                    x="0"
                    y="7"
                    textAnchor="middle"
                    className="fill-current text-[11px] font-bold"
                    fill={lab.color || 'var(--color-fg-muted, #4a5a51)'}
                  >
                    {lab.host.split(' ')[0]}
                  </text>

                  {/* WireGuard IP */}
                  <text
                    x="0"
                    y="24"
                    textAnchor="middle"
                    className="fill-current font-mono text-[10px] font-semibold"
                    fill="var(--color-fg-muted, #4a5a51)"
                  >
                    {lab.wgIp}
                  </text>

                  {/* Resident spaces badge */}
                  {residentCount > 0 && (
                    <g transform="translate(0, 58)">
                      <rect
                        x="-45"
                        y="-10"
                        width="90"
                        height="20"
                        rx="10"
                        fill="var(--color-surface-2, #f2ece2)"
                        stroke="var(--color-line, #e3dacb)"
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        className="fill-current text-[10px] font-bold"
                        fill="var(--color-fg, #10231b)"
                      >
                        {residentCount} Espace{residentCount > 1 ? 's' : ''} actif{residentCount > 1 ? 's' : ''}
                      </text>
                    </g>
                  )}

                  {lab.id === 'lab-4-arbiter' && (
                    <g transform="translate(0, 58)">
                      <rect
                        x="-45"
                        y="-10"
                        width="90"
                        height="20"
                        rx="10"
                        fill="#8b5cf6"
                        fillOpacity="0.15"
                        stroke="#8b5cf6"
                        strokeWidth="1"
                      />
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        className="fill-current text-[10px] font-bold"
                        fill="#8b5cf6"
                      >
                        Quorum 3/4
                      </text>
                    </g>
                  )}
                </g>
              )
            })}
          </svg>

          {/* Quick interactive hint */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md border border-line bg-surface/90 px-2.5 py-1 text-[11px] text-fg-muted backdrop-blur-sm">
            <Info size={13} className="text-accent" />
            <span>Cliquez sur un Lab pour inspecter ses conteneurs ou sur une liaison pour voir le flux.</span>
          </div>
        </div>

        {/* Detail Panel: Selected Lab or Selected Link */}
        <div className="flex flex-col rounded-xl border border-line bg-surface-2/60 p-4 xl:col-span-4">
          {selectedLink ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-signal">
                  Liaison WireGuard Peer-to-Peer
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedLink(null)}
                  className="text-xs font-semibold text-fg-muted hover:text-fg"
                >
                  Fermer
                </button>
              </div>

              <div>
                <h3 className="text-base font-black text-fg">
                  {labs.find((l) => l.id === selectedLink.from)?.host} ⇄ {labs.find((l) => l.id === selectedLink.to)?.host}
                </h3>
                <p className="mt-1 text-xs text-fg-muted">
                  Tunnel chiffré permanent direct sans proxy intermédiaire
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg border border-line bg-surface p-2.5">
                  <span className="text-[11px] text-fg-muted">Latence RTT</span>
                  <p className="text-base font-black text-accent">{selectedLink.latencyMs} ms</p>
                </div>
                <div className="rounded-lg border border-line bg-surface p-2.5">
                  <span className="text-[11px] text-fg-muted">Dernier Handshake</span>
                  <p className="text-base font-black text-fg">Il y a {selectedLink.lastHandshakeSeconds}s</p>
                </div>
                <div className="rounded-lg border border-line bg-surface p-2.5">
                  <span className="text-[11px] text-fg-muted">Débit TX</span>
                  <p className="text-sm font-bold text-signal">{selectedLink.txSpeedMb} Mb/s</p>
                </div>
                <div className="rounded-lg border border-line bg-surface p-2.5">
                  <span className="text-[11px] text-fg-muted">Débit RX</span>
                  <p className="text-sm font-bold text-warm">{selectedLink.rxSpeedMb} Mb/s</p>
                </div>
              </div>

              <div className="rounded-lg border border-line bg-surface p-3 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-fg-muted">Chiffrement</span>
                  <span className="font-mono font-bold text-fg">{selectedLink.cipher}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-fg-muted">Perte de paquets</span>
                  <span className="font-bold text-accent">{selectedLink.packetLoss}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-fg-muted">État MTU</span>
                  <span className="font-mono text-fg">1420 octets (Clamp MSS)</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <Server size={16} className="text-accent" />
                  <span className="text-xs font-bold uppercase tracking-wider text-fg-muted">
                    Fiche Nœud Laboratoire
                  </span>
                </div>
                <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-bold text-accent">
                  {activeLab.status}
                </span>
              </div>

              <div>
                <h3 className="text-base font-black text-fg">{activeLab.label}</h3>
                <p className="mt-0.5 text-xs text-fg-muted">{activeLab.role}</p>
              </div>

              {/* Specs & Hardware */}
              <div className="space-y-2 rounded-lg border border-line bg-surface p-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-fg-muted">
                    <Cpu size={13} /> Processeur
                  </span>
                  <span className="font-semibold text-fg">{activeLab.specs.cpu}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-fg-muted">
                    <Zap size={13} /> Mémoire Vive
                  </span>
                  <span className="font-semibold text-fg">{activeLab.specs.ram}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-fg-muted">
                    <HardDrive size={13} /> Stockage Local
                  </span>
                  <span className="font-semibold text-fg">{activeLab.specs.storage}</span>
                </div>
              </div>

              {/* Dynamic Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg border border-line bg-surface p-2.5">
                  <div className="flex justify-between text-[11px] text-fg-muted">
                    <span>Charge CPU</span>
                    <span className="font-bold">{activeLab.metrics.cpuUsage}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full rounded-full bg-surface-2 overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-500"
                      style={{ width: `${activeLab.metrics.cpuUsage}%` }}
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-line bg-surface p-2.5">
                  <div className="flex justify-between text-[11px] text-fg-muted">
                    <span>RAM Utilisée</span>
                    <span className="font-bold">{activeLab.metrics.ramUsage}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full rounded-full bg-surface-2 overflow-hidden">
                    <div
                      className="h-full bg-signal rounded-full transition-all duration-500"
                      style={{ width: `${activeLab.metrics.ramUsage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* WireGuard info */}
              <div className="rounded-lg border border-line bg-surface p-3 text-xs space-y-1.5 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-fg-muted">IP WireGuard:</span>
                  <span className="font-bold text-fg">{activeLab.wgIp}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-fg-muted">IP Réseau Local:</span>
                  <span className="text-fg">{activeLab.ip}</span>
                </div>
                <div className="truncate text-[10px] text-fg-muted">
                  {activeLab.publicKey}
                </div>
              </div>

              {/* Resident Spaces in this Lab */}
              <div>
                <h4 className="mb-2 text-xs font-bold text-fg flex items-center justify-between">
                  <span>Espaces résidents ({activeLab.residentSpaces?.length || 0})</span>
                  {activeLab.residentSpaces?.length > 0 && (
                    <button
                      type="button"
                      onClick={() => onOpenTeleport && onOpenTeleport(activeLab.residentSpaces[0])}
                      className="text-[11px] font-bold text-accent hover:underline flex items-center gap-1"
                    >
                      <ArrowRightLeft size={12} /> Téléporter
                    </button>
                  )}
                </h4>

                {activeLab.residentSpaces?.length > 0 ? (
                  <div className="space-y-1.5">
                    {activeLab.residentSpaces.map((spaceId) => {
                      const sp = spaces.find((s) => s.id === spaceId)
                      return (
                        <div
                          key={spaceId}
                          className="flex items-center justify-between rounded-lg border border-line bg-surface px-3 py-2 text-xs"
                        >
                          <div className="min-w-0">
                            <p className="font-bold text-fg truncate">{sp?.label || spaceId}</p>
                            <p className="text-[10px] text-fg-muted truncate">{sp?.category}</p>
                          </div>
                          <span className="shrink-0 rounded bg-accent/10 px-1.5 py-0.5 text-[10px] font-bold text-accent">
                            PURRING
                          </span>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="rounded-lg border border-dashed border-line p-3 text-center text-xs text-fg-muted">
                    {activeLab.id === 'lab-4-arbiter'
                      ? 'Nœud Quorum & STONITH Dédié (Aucun espace applicatif pour pure impartialité)'
                      : 'Aucun espace résident actuellement.'}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
