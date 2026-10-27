import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ArrowRightLeft,
  Boxes,
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
  Save,
  Server,
  Shield,
  ShieldCheck,
  Sliders,
  Sparkles,
  Zap,
} from 'lucide-react'

import Fractal3DCanvas from '../fractal/Fractal3DCanvas'
import Fractal2DCanvas from '../fractal/Fractal2DCanvas'
import FractalInspectorPanel from '../fractal/FractalInspectorPanel'
import InterconnectedClustersView from '../vpn/InterconnectedClustersView'
import TeleportModal from '../cockpit/TeleportModal'
import { INITIAL_FRACTAL_ROOT } from '../../data/fractalUniverseData'
import { INITIAL_LABS, INITIAL_SPACES } from '../../data/cockpitData'

export default function InteractiveCathedralShowcase() {
  const [fractalData, setFractalData] = useState(INITIAL_FRACTAL_ROOT)
  const [activeSubTab, setActiveSubTab] = useState('3d') // '3d', '2d', 'multicluster-vpn'
  const [selectedNode, setSelectedNode] = useState({
    id: 'space-boutique-fleuriste',
    name: 'Espace Boutique Fleuriste de la Paix',
    type: 'space',
    data: INITIAL_FRACTAL_ROOT.governors[0].saasGovernors[0].activeSpacesList[0],
  })

  // Mode Source : Simulation Démo interactive vs Vérité Réelle du Fer (Labos connectés)
  const [dataSourceMode, setDataSourceMode] = useState('simulation') // 'simulation' ou 'live_hardware'
  const [teleportModalOpen, setTeleportModalOpen] = useState(false)
  const [teleportSpaceId, setTeleportSpaceId] = useState(null)
  const [livePulse, setLivePulse] = useState(0)

  // Pulsation de télémétrie vivante toutes les 3 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setLivePulse((p) => p + 1)
      setFractalData((prev) => {
        const rootGov = prev.governors[0]
        const saasGovs = rootGov.saasGovernors.map((sg) => ({
          ...sg,
          activeSpacesList: sg.activeSpacesList.map((sp) => {
            const deltaCpu = (Math.random() - 0.5) * 1.6
            const deltaRam = Math.round((Math.random() - 0.5) * 6)
            const newCpu = Math.max(1, Math.min(99, parseFloat((sp.metrics.cpuUsage + deltaCpu).toFixed(1))))
            const newRam = Math.max(120, Math.min(sp.metrics.ramQuotaMb, sp.metrics.ramUsageMb + deltaRam))
            return {
              ...sp,
              metrics: {
                ...sp.metrics,
                cpuUsage: newCpu,
                ramUsageMb: newRam,
                iops: Math.round(sp.metrics.iops + (Math.random() - 0.5) * 15),
              },
            }
          }),
        }))
        return {
          ...prev,
          governors: [{ ...rootGov, saasGovernors: saasGovs }],
        }
      })
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  // Synchronisation de l'inspecteur
  useEffect(() => {
    if (selectedNode?.type === 'space') {
      const allSpaces = fractalData.governors[0].saasGovernors.flatMap((sg) => sg.activeSpacesList)
      const current = allSpaces.find((s) => s.id === selectedNode.id)
      if (current) {
        setSelectedNode((prev) => ({ ...prev, data: current }))
      }
    }
  }, [livePulse, fractalData])

  const handleOpenTeleport = (spaceId) => {
    setTeleportSpaceId(spaceId)
    setTeleportModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Grand Hero Box */}
      <div className="rounded-3xl border border-line bg-surface/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold text-accent shadow-xs">
                <Sparkles size={14} />
                <span>Architecture de Gouvernance Pure (SHAPER OS v1.15)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
                <ShieldCheck size={14} />
                <span>100% Souverain · Sans Hyperviseur Propriétaire</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-fg">
              Cathédrale Fractale & Interconnexion Multi-Clusters
            </h2>
            <p className="text-xs sm:text-sm text-fg-muted max-w-3xl leading-relaxed">
              S'affranchit de la vision matérielle restrictive des hyperviseurs. La <strong>Racine</strong> tient le Master Ledger sur socket Unix privé, pilote les <strong>Makers</strong> (Pull Loops), qui régulent les <strong>SaaS Clusters</strong> (Boutiques, Téléphonie Vox Clinic, CRM-Rep) abritant chacun jusqu'à <strong>1000+ Espaces Clients étanches</strong>.
            </p>
          </div>

          {/* Mode Switcher : Démo interactive type jeu vidéo */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center rounded-2xl border border-amber-500/30 bg-amber-500/10 p-1 text-xs font-bold shadow-xs">
              <span className="rounded-xl px-3 py-1.5 flex items-center gap-1.5 bg-amber-500 text-slate-950 font-black">
                <Radio size={13} />
                <span>DÉMONSTRATEUR DIDACTIQUE (MODE JEU VIDÉO)</span>
              </span>
            </div>

            <span className="text-[10px] font-mono text-fg-muted flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Simulation visuelle sans action directe sur le fer · Zéro impact réel</span>
            </span>
          </div>
        </div>

        {/* 4 Indicateurs Macro */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-2xl border border-line bg-surface-2/40 p-4">
            <span className="text-[10px] uppercase font-bold text-fg-muted flex items-center justify-between">
              <span>Capacité Constellation</span>
              <Boxes size={14} className="text-accent" />
            </span>
            <p className="mt-1 text-xl font-black font-mono text-fg">{fractalData.totalSpacesCount}+</p>
            <p className="text-[10px] text-fg-muted mt-0.5">Espaces clients isolés sans overhead</p>
          </div>

          <div className="rounded-2xl border border-line bg-surface-2/40 p-4">
            <span className="text-[10px] uppercase font-bold text-fg-muted flex items-center justify-between">
              <span>Réseau Anti-SPOF</span>
              <Network size={14} className="text-emerald-400" />
            </span>
            <p className="mt-1 text-xl font-black font-mono text-emerald-400">Double Hub WG</p>
            <p className="text-[10px] text-fg-muted mt-0.5">Fibre + Starlink (Failover &lt; 800ms)</p>
          </div>

          <div className="rounded-2xl border border-line bg-surface-2/40 p-4">
            <span className="text-[10px] uppercase font-bold text-fg-muted flex items-center justify-between">
              <span>Stockage MeshFS CAS</span>
              <HardDrive size={14} className="text-signal" />
            </span>
            <p className="mt-1 text-xl font-black font-mono text-signal">FastCDC 4Mo</p>
            <p className="text-[10px] text-fg-muted mt-0.5">68,4% Déduplication · Bit-à-Bit</p>
          </div>

          <div className="rounded-2xl border border-line bg-surface-2/40 p-4">
            <span className="text-[10px] uppercase font-bold text-fg-muted flex items-center justify-between">
              <span>Bascule d'Espace SLA</span>
              <Zap size={14} className="text-amber-400" />
            </span>
            <p className="mt-1 text-xl font-black font-mono text-amber-400">&lt; 1,6 s</p>
            <p className="text-[10px] text-fg-muted mt-0.5">Direct RAM-to-RAM ZSTD Stream</p>
          </div>
        </div>

        {/* Navigation Toolbar (3D Sphère, 2D Arbre, Multi-Clusters WireGuard Anti-SPOF) */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface-2/60 p-2 shadow-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: '3d', label: 'Cathédrale 3D Sphère', icon: Sparkles },
              { id: '2d', label: 'Arbre Déplié 2D & Makers', icon: Layers },
              { id: 'multicluster-vpn', label: 'Interconnexion Multi-Clusters (Anti-SPOF)', icon: ShieldCheck },
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeSubTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-accent text-white shadow-xs'
                      : 'text-fg-muted hover:bg-surface hover:text-fg'
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-2 pr-2">
            <Link
              to="/fractale"
              className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
            >
              <span>Plein Écran Dédié</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* MAIN VISUALIZATION CONTAINER */}
        {activeSubTab === '3d' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 xl:col-span-8">
              <Fractal3DCanvas
                data={fractalData}
                selectedId={selectedNode?.id}
                onSelectNode={setSelectedNode}
              />
            </div>
            <div className="lg:col-span-5 xl:col-span-4 sticky top-20">
              <FractalInspectorPanel
                selectedNode={selectedNode}
                onOpenTeleport={handleOpenTeleport}
              />
            </div>
          </div>
        )}

        {activeSubTab === '2d' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 xl:col-span-8">
              <Fractal2DCanvas
                data={fractalData}
                selectedId={selectedNode?.id}
                onSelectNode={setSelectedNode}
                onOpenActionModal={handleOpenTeleport}
              />
            </div>
            <div className="lg:col-span-5 xl:col-span-4 sticky top-20">
              <FractalInspectorPanel
                selectedNode={selectedNode}
                onOpenTeleport={handleOpenTeleport}
              />
            </div>
          </div>
        )}

        {activeSubTab === 'multicluster-vpn' && (
          <div className="pt-2">
            <InterconnectedClustersView />
          </div>
        )}
      </div>

      {/* 1-Click Teleport Modal */}
      <TeleportModal
        isOpen={teleportModalOpen}
        onClose={() => setTeleportModalOpen(false)}
        spaces={INITIAL_SPACES}
        labs={INITIAL_LABS}
        initialSpaceId={teleportSpaceId}
        onExecuteTeleport={() => setTeleportModalOpen(false)}
      />
    </div>
  )
}
