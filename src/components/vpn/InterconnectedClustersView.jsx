import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  AlertTriangle,
  ArrowRightLeft,
  CheckCircle2,
  Cpu,
  Database,
  ExternalLink,
  Flame,
  Globe,
  HardDrive,
  Layers,
  Lock,
  Network,
  Radio,
  RefreshCw,
  Server,
  Shield,
  ShieldCheck,
  Signal,
  Sparkles,
  Zap,
} from 'lucide-react'

import { MULTI_CLUSTER_INFRA } from '../../data/multiClusterVpnData'

export default function InterconnectedClustersView() {
  const [infra, setInfra] = useState(MULTI_CLUSTER_INFRA)
  const [selectedClusterId, setSelectedClusterId] = useState('cluster-alpha')
  const [activeTunnelId, setActiveTunnelId] = useState('tunnel-alpha-beta-p')
  const [simulatingFailover, setSimulatingFailover] = useState(false)
  const [primaryFailing, setPrimaryFailing] = useState(false)

  // Simulation of packet pulses along the redundant tunnels
  const [pulse, setPulse] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setPulse((p) => p + 1)
    }, 1800)
    return () => clearInterval(timer)
  }, [])

  const selectedCluster = infra.clusters.find((c) => c.id === selectedClusterId) || infra.clusters[0]
  const selectedTunnel = infra.redundantVpnTunnels.find((t) => t.id === activeTunnelId) || infra.redundantVpnTunnels[0]

  // Chaos Test : Cut Primary Fibre link to demonstrate Anti-SPOF Instant Failover (< 800ms)
  const handleTriggerChaosFailover = () => {
    setSimulatingFailover(true)
    setPrimaryFailing(true)

    // Instantly switch primary link to DOWN and secondary to ACTIVE_CARRIER
    setTimeout(() => {
      setInfra((prev) => ({
        ...prev,
        redundantVpnTunnels: prev.redundantVpnTunnels.map((tun) => {
          if (tun.id === 'tunnel-alpha-beta-p') {
            return { ...tun, status: 'FIBRE_CUT_DOWN', packetLoss: 100.0 }
          }
          if (tun.id === 'tunnel-alpha-beta-s') {
            return { ...tun, status: 'ACTIVE_HOT_FAILOVER', spofProtection: 'FAILOVER ENGAGÉ : Trafic basculé sur Starlink en 780ms' }
          }
          return tun
        }),
      }))
      setSimulatingFailover(false)
    }, 780)
  }

  // Restore links to nominal nominal
  const handleRestoreLinks = () => {
    setPrimaryFailing(false)
    setInfra(MULTI_CLUSTER_INFRA)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner Anti-SPOF Architecture Overview */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Network size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-fg">
                  Interconnexion Multi-Clusters & Double Hub WireGuard (Anti-SPOF)
                </h3>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                  Zéro Point Unique de Rupture
                </span>
                <span className="rounded-full bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 text-[10px] font-black text-amber-300">
                  SIMULATION DIDACTIQUE
                </span>
              </div>
              <p className="text-xs text-fg-muted mt-0.5">
                Deux tunnels WireGuard parallèles (Fibre + Starlink / Backup) avec Policy Routing fwmark étanche · Simulation didactique de failover.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!primaryFailing ? (
            <button
              type="button"
              onClick={handleTriggerChaosFailover}
              disabled={simulatingFailover}
              className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3.5 py-2 text-xs font-bold text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
            >
              <AlertTriangle size={14} className={simulatingFailover ? 'animate-spin' : ''} />
              <span>{simulatingFailover ? 'Bascule en cours...' : 'Simuler Coupure Fibre (Test Anti-SPOF)'}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRestoreLinks}
              className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-2 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all cursor-pointer"
            >
              <CheckCircle2 size={14} />
              <span>Rétablir Liaisons Nominales</span>
            </button>
          )}
        </div>
      </div>

      {/* SVG Inter-Cluster Network Map with Dual Redundant Tunnels */}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-slate-950 p-4 shadow-xl select-none">
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold">Topologie Physique & VPN Maillé</span>
          <span className="text-[10px] text-slate-400 font-mono">({infra.clusters.length} Clusters · {infra.redundantVpnTunnels.length} Tunnels)</span>
        </div>

        <svg viewBox="0 0 920 480" className="w-full h-[480px]">
          <defs>
            <linearGradient id="primaryTunnelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>

            <linearGradient id="secondaryTunnelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>

            <filter id="glow-vpn" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Grid */}
          <g stroke="rgba(255,255,255,0.04)" strokeWidth="1">
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`gh-${i}`} x1="40" y1={40 + i * 45} x2="880" y2={40 + i * 45} strokeDasharray="3 5" />
            ))}
            {Array.from({ length: 18 }).map((_, i) => (
              <line key={`gv-${i}`} x1={40 + i * 50} y1="40" x2={40 + i * 50} y2={450} strokeDasharray="3 5" />
            ))}
          </g>

          {/* DUAL REDUNDANT TUNNELS (Lines between clusters) */}
          {/* Cluster Alpha (180, 240) <--> Cluster Beta (500, 130) */}
          {/* 1. Primary Tunnel Alpha-Beta */}
          <path
            d="M 230 220 Q 340 130 450 145"
            fill="none"
            stroke={primaryFailing ? '#ef4444' : '#10b981'}
            strokeWidth={primaryFailing ? '2' : '3.5'}
            strokeDasharray={primaryFailing ? '6 6' : 'none'}
            className="cursor-pointer transition-all hover:stroke-accent"
            onClick={() => setActiveTunnelId('tunnel-alpha-beta-p')}
          />
          {!primaryFailing && (
            <circle cx="340" cy="165" r="4" fill="#ffffff" filter="url(#glow-vpn)">
              <animate attributeName="cx" values="230;450;230" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="cy" values="220;145;220" dur="2.4s" repeatCount="indefinite" />
            </circle>
          )}

          {/* 2. Secondary Tunnel Alpha-Beta (Starlink/LTE) */}
          <path
            d="M 230 250 Q 340 220 450 165"
            fill="none"
            stroke={primaryFailing ? '#10b981' : '#f59e0b'}
            strokeWidth={primaryFailing ? '4' : '2.5'}
            strokeDasharray="4 4"
            className="cursor-pointer transition-all hover:stroke-accent"
            onClick={() => setActiveTunnelId('tunnel-alpha-beta-s')}
          />
          {primaryFailing && (
            <circle cx="340" cy="220" r="5" fill="#f59e0b" filter="url(#glow-vpn)">
              <animate attributeName="cx" values="230;450;230" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="cy" values="250;165;250" dur="1.8s" repeatCount="indefinite" />
            </circle>
          )}

          {/* Cluster Beta (500, 130) <--> Cluster Gamma (740, 310) */}
          <path
            d="M 550 150 Q 640 180 690 280"
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            className="cursor-pointer transition-all hover:stroke-accent"
            onClick={() => setActiveTunnelId('tunnel-beta-gamma-p')}
          />
          <circle cx="620" cy="200" r="4" fill="#ffffff" filter="url(#glow-vpn)">
            <animate attributeName="cx" values="550;690;550" dur="2.8s" repeatCount="indefinite" />
            <animate attributeName="cy" values="150;280;150" dur="2.8s" repeatCount="indefinite" />
          </circle>

          {/* Cross Fallback: Cluster Alpha (230, 260) <--> Cluster Gamma (690, 330) */}
          <path
            d="M 230 260 Q 460 380 690 330"
            fill="none"
            stroke="#ec4899"
            strokeWidth="2.5"
            strokeDasharray="5 5"
            className="cursor-pointer transition-all hover:stroke-accent"
            onClick={() => setActiveTunnelId('tunnel-alpha-gamma-s')}
          />

          {/* CLUSTER ALPHA NODE (Roubaix) */}
          <g
            transform="translate(140, 170)"
            className="cursor-pointer"
            onClick={() => setSelectedClusterId('cluster-alpha')}
          >
            <rect
              width="150"
              height="140"
              rx="16"
              fill={selectedClusterId === 'cluster-alpha' ? '#1e1b4b' : '#0f172a'}
              stroke={selectedClusterId === 'cluster-alpha' ? '#6366f1' : '#334155'}
              strokeWidth={selectedClusterId === 'cluster-alpha' ? '2.5' : '1.5'}
            />
            <rect x="15" y="15" width="28" height="28" rx="8" fill="#4338ca" />
            <text x="29" y="34" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">α</text>
            <text x="52" y="28" fill="#f8fafc" fontSize="13" fontWeight="bold">Cluster Alpha</text>
            <text x="52" y="42" fill="#94a3b8" fontSize="10">Roubaix OVH DC</text>

            <line x1="15" y1="58" x2="135" y2="58" stroke="#334155" strokeWidth="1" />
            <text x="15" y="75" fill="#38bdf8" fontSize="10" fontFamily="monospace">wg-primary :51820</text>
            <text x="15" y="92" fill="#fbbf24" fontSize="10" fontFamily="monospace">wg-secondary :51821</text>
            <text x="15" y="112" fill="#4ade80" fontSize="10" fontWeight="bold">Raft Master (3 Nœuds)</text>
            <text x="15" y="126" fill="#94a3b8" fontSize="9">RTT: 17.6 ms · Loss: 0%</text>
          </g>

          {/* CLUSTER BETA NODE (Lyon / Beynost) */}
          <g
            transform="translate(460, 70)"
            className="cursor-pointer"
            onClick={() => setSelectedClusterId('cluster-beta')}
          >
            <rect
              width="150"
              height="140"
              rx="16"
              fill={selectedClusterId === 'cluster-beta' ? '#064e3b' : '#0f172a'}
              stroke={selectedClusterId === 'cluster-beta' ? '#10b981' : '#334155'}
              strokeWidth={selectedClusterId === 'cluster-beta' ? '2.5' : '1.5'}
            />
            <rect x="15" y="15" width="28" height="28" rx="8" fill="#047857" />
            <text x="29" y="34" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">β</text>
            <text x="52" y="28" fill="#f8fafc" fontSize="13" fontWeight="bold">Cluster Beta</text>
            <text x="52" y="42" fill="#94a3b8" fontSize="10">Site Beynost (Fibre+Starlink)</text>

            <line x1="15" y1="58" x2="135" y2="58" stroke="#334155" strokeWidth="1" />
            <text x="15" y="75" fill="#38bdf8" fontSize="10" fontFamily="monospace">wg-primary (OELIS)</text>
            <text x="15" y="92" fill="#fbbf24" fontSize="10" fontFamily="monospace">wg-secondary (Starlink)</text>
            <text x="15" y="112" fill="#4ade80" fontSize="10" fontWeight="bold">Standby Mirror (2 Nœuds)</text>
            <text x="15" y="126" fill="#94a3b8" fontSize="9">Dual WAN Failover Actif</text>
          </g>

          {/* CLUSTER GAMMA NODE (Edge DR) */}
          <g
            transform="translate(680, 230)"
            className="cursor-pointer"
            onClick={() => setSelectedClusterId('cluster-gamma')}
          >
            <rect
              width="150"
              height="130"
              rx="16"
              fill={selectedClusterId === 'cluster-gamma' ? '#831843' : '#0f172a'}
              stroke={selectedClusterId === 'cluster-gamma' ? '#ec4899' : '#334155'}
              strokeWidth={selectedClusterId === 'cluster-gamma' ? '2.5' : '1.5'}
            />
            <rect x="15" y="15" width="28" height="28" rx="8" fill="#be185d" />
            <text x="29" y="34" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">γ</text>
            <text x="52" y="28" fill="#f8fafc" fontSize="13" fontWeight="bold">Cluster Gamma</text>
            <text x="52" y="42" fill="#94a3b8" fontSize="10">Edge DR / Kiosk</text>

            <line x1="15" y1="58" x2="135" y2="58" stroke="#334155" strokeWidth="1" />
            <text x="15" y="75" fill="#38bdf8" fontSize="10" fontFamily="monospace">wg-primary :51820</text>
            <text x="15" y="92" fill="#ec4899" fontSize="10" fontFamily="monospace">wg-secondary :51821</text>
            <text x="15" y="112" fill="#4ade80" fontSize="10" fontWeight="bold">Stockage Froid Merkle</text>
          </g>

          {/* Anti-SPOF Legend badge inside SVG */}
          <g transform="translate(40, 420)">
            <rect width="440" height="40" rx="10" fill="#0f172a" stroke="#334155" />
            <circle cx="20" cy="20" r="5" fill="#10b981" />
            <text x="32" y="24" fill="#cbd5e1" fontSize="11">Liaison Primaire (Fibre)</text>
            <circle cx="170" cy="20" r="5" fill="#f59e0b" />
            <text x="182" y="24" fill="#cbd5e1" fontSize="11">Secours (Starlink / LTE)</text>
            <circle cx="330" cy="20" r="5" fill="#ec4899" />
            <text x="342" y="24" fill="#cbd5e1" fontSize="11">Croisement BGP Direct</text>
          </g>
        </svg>
      </div>

      {/* Detail Grid: Inspected Cluster on Left + Selected Tunnel Anti-SPOF Policy on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cluster Inspector */}
        <div className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Server size={18} className="text-accent" />
                <h4 className="font-bold text-fg text-sm">{selectedCluster.name}</h4>
              </div>
              <p className="text-xs text-fg-muted mt-0.5">{selectedCluster.role}</p>
            </div>
            <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-400 font-mono">
              {selectedCluster.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-line bg-surface-2/40 p-3">
              <span className="text-[10px] text-fg-muted font-bold uppercase">Endpoint Primaire</span>
              <p className="mt-1 font-mono font-bold text-fg text-[11px]">{selectedCluster.primaryEndpoint}</p>
            </div>
            <div className="rounded-xl border border-line bg-surface-2/40 p-3">
              <span className="text-[10px] text-fg-muted font-bold uppercase">Endpoint Secours</span>
              <p className="mt-1 font-mono font-bold text-amber-400 text-[11px]">{selectedCluster.secondaryEndpoint}</p>
            </div>
          </div>

          {/* Dual Interfaces on this Cluster */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold text-fg uppercase tracking-wider text-fg-muted">
              Interfaces Réseau WireGuard ({selectedCluster.interfaces.length})
            </h5>
            <div className="space-y-2">
              {selectedCluster.interfaces.map((iface) => (
                <div
                  key={iface.name}
                  className="flex items-center justify-between rounded-xl border border-line bg-surface p-3 text-xs font-mono"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded bg-surface-2 text-accent font-bold text-[10px]">
                      WG
                    </span>
                    <div>
                      <span className="font-bold text-fg">{iface.name}</span>
                      <span className="text-fg-muted text-[11px] ml-2">({iface.ip})</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-fg-muted text-[11px]">{iface.trafficMb} Mo transférés</span>
                    <span className={`rounded px-1.5 py-0.2 text-[10px] font-bold ${
                      iface.status === 'ACTIVE'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {iface.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Redundant Tunnel & Anti-SPOF Rules */}
        <div className="rounded-2xl border border-line bg-surface p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Lock size={18} className="text-signal" />
                <h4 className="font-bold text-fg text-sm">{selectedTunnel.channel}</h4>
              </div>
              <p className="text-xs text-fg-muted mt-0.5 font-mono">
                {selectedTunnel.from} ➔ {selectedTunnel.to} (Port {selectedTunnel.port})
              </p>
            </div>
            <span className={`rounded px-2 py-0.5 text-xs font-bold font-mono ${
              selectedTunnel.status.includes('ACTIVE')
                ? 'bg-emerald-500/10 text-emerald-400'
                : selectedTunnel.status.includes('DOWN')
                ? 'bg-rose-500/10 text-rose-400'
                : 'bg-amber-500/10 text-amber-400'
            }`}>
              {selectedTunnel.status}
            </span>
          </div>

          <div className="rounded-xl border border-line bg-surface-2/40 p-3.5 space-y-2 text-xs">
            <h5 className="font-bold text-fg flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400" /> Règle Canonique Anti-SPOF GBSINFO
            </h5>
            <p className="text-xs text-fg-muted leading-relaxed">
              {selectedTunnel.spofProtection}
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] font-mono pt-2 border-t border-line">
              <div>
                <span className="text-fg-muted">Chiffrement :</span>
                <span className="text-fg font-bold block">{selectedTunnel.cipher}</span>
              </div>
              <div>
                <span className="text-fg-muted">Latence RTT :</span>
                <span className="text-accent font-bold block">{selectedTunnel.rttMs} ms (P99 &lt; 20ms)</span>
              </div>
            </div>
          </div>

          {/* Multi-Hub Failover Protocol Highlights */}
          <div className="rounded-xl border border-line bg-surface p-3.5 space-y-2 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-fg-muted">
              Mécanisme de Failover Invariant
            </span>
            <ul className="space-y-1.5 text-[11px] text-fg-muted list-disc pl-4">
              <li>
                <strong className="text-fg">Policy Routing fwmark :</strong> Chaque interface WireGuard possède sa propre table de routage (`rt_tables 200` et `201`), empêchant tout écrasement de passerelle par défaut.
              </li>
              <li>
                <strong className="text-fg">Bascule sans interruption SIP :</strong> Le tunnel secondaire pré-établi absorbe immédiatement les flux RTP/VoIP dès détection d'un packet loss &gt; 5% sur 3 handshakes.
              </li>
              <li>
                <strong className="text-fg">Pas de port public non maîtrisé :</strong> Seul le port UDP négocié répond. Tout scan extérieur hors whitelist est ignoré silencieusement (Règle GEM-001).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
