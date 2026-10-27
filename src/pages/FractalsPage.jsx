import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  ArrowRightLeft,
  Boxes,
  CheckCircle2,
  Cpu,
  Database,
  ExternalLink,
  Eye,
  HardDrive,
  Layers,
  Network,
  RefreshCw,
  Server,
  Shield,
  Sliders,
  Sparkles,
  Zap,
} from 'lucide-react'

import Fractal3DCanvas from '../components/fractal/Fractal3DCanvas'
import Fractal2DCanvas from '../components/fractal/Fractal2DCanvas'
import FractalInspectorPanel from '../components/fractal/FractalInspectorPanel'
import TeleportModal from '../components/cockpit/TeleportModal'
import { INITIAL_FRACTAL_ROOT } from '../data/fractalUniverseData'
import { INITIAL_LABS, INITIAL_SPACES } from '../data/cockpitData'

export default function FractalsPage() {
  const [fractalData, setFractalData] = useState(INITIAL_FRACTAL_ROOT)
  const [viewDimension, setViewDimension] = useState('3d') // '3d' ou '2d'
  const [selectedNode, setSelectedNode] = useState({
    id: 'space-boutique-fleuriste',
    name: 'Espace Boutique Fleuriste de la Paix',
    type: 'space',
    data: INITIAL_FRACTAL_ROOT.governors[0].saasGovernors[0].activeSpacesList[0],
  })

  const [teleportModalOpen, setTeleportModalOpen] = useState(false)
  const [teleportSpaceId, setTeleportSpaceId] = useState(null)
  const [livePulse, setLivePulse] = useState(0)

  // Simulation de pulsation de métriques temps réel toutes les 3 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setLivePulse((p) => p + 1)
      setFractalData((prev) => {
        const rootGov = prev.governors[0]
        const saasGovs = rootGov.saasGovernors.map((sg) => ({
          ...sg,
          activeSpacesList: sg.activeSpacesList.map((sp) => {
            const deltaCpu = (Math.random() - 0.5) * 1.8
            const deltaRam = Math.round((Math.random() - 0.5) * 8)
            const newCpu = Math.max(1, Math.min(99, parseFloat((sp.metrics.cpuUsage + deltaCpu).toFixed(1))))
            const newRam = Math.max(100, Math.min(sp.metrics.ramQuotaMb, sp.metrics.ramUsageMb + deltaRam))
            return {
              ...sp,
              metrics: {
                ...sp.metrics,
                cpuUsage: newCpu,
                ramUsageMb: newRam,
                iops: Math.round(sp.metrics.iops + (Math.random() - 0.5) * 20),
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

  // Mettre à jour l'inspecteur si le nœud sélectionné est modifié dans l'arbre
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

  const handleSelectNode = (node) => {
    setSelectedNode(node)
  }

  return (
    <div className="min-h-screen bg-canvas text-fg">
      {/* HEADER SOUVERAIN */}
      <header className="border-b border-line bg-surface/80 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              to="/cockpit"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-white shadow-md shadow-accent/20"
            >
              <Layers size={22} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black tracking-tight text-fg">
                  Arbre Fractal Souverain (2D / 3D)
                </h1>
                <span className="rounded-full bg-accent/10 border border-accent/30 px-2.5 py-0.5 text-xs font-bold text-accent">
                  Indépendant des Nœuds Physiques
                </span>
              </div>
              <p className="text-xs text-fg-muted hidden sm:block">
                Cathédrale de Gouvernance : Racine ➔ Gouverneur ➔ Makers ➔ SaaS Clusters ➔ 1000+ Espaces Clients ➔ Cellules Souches
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* SWITCH 2D / 3D */}
            <div className="flex items-center rounded-xl border border-line bg-surface-2 p-1 text-xs font-bold shadow-xs">
              <button
                type="button"
                onClick={() => setViewDimension('3d')}
                className={`rounded-lg px-3 py-1.5 transition-all flex items-center gap-1.5 ${
                  viewDimension === '3d'
                    ? 'bg-accent text-white shadow-xs'
                    : 'text-fg-muted hover:text-fg'
                }`}
              >
                <Sparkles size={13} />
                <span>Vue 3D Sphère</span>
              </button>
              <button
                type="button"
                onClick={() => setViewDimension('2d')}
                className={`rounded-lg px-3 py-1.5 transition-all flex items-center gap-1.5 ${
                  viewDimension === '2d'
                    ? 'bg-accent text-white shadow-xs'
                    : 'text-fg-muted hover:text-fg'
                }`}
              >
                <Layers size={13} />
                <span>Vue 2D Dépliée</span>
              </button>
            </div>

            <Link
              to="/cockpit"
              className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-surface-2 px-3 py-2 text-xs font-bold text-fg-muted hover:text-fg hover:border-accent transition-colors"
            >
              <span>Cockpit Proxmox</span>
            </Link>
          </div>
        </div>
      </header>

      {/* CONTENU PRINCIPAL */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 space-y-6">
        {/* BANDEAU DES INDICATEURS CLÉS DU CLUSTER FRACTAL */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-2xl border border-line bg-surface p-4 shadow-xs">
            <span className="text-[11px] uppercase font-bold text-fg-muted flex items-center justify-between">
              <span>Espaces Hébergés</span>
              <Boxes size={14} className="text-accent" />
            </span>
            <p className="mt-1 text-xl font-black font-mono text-fg">{fractalData.totalSpacesCount}+</p>
            <p className="text-[10px] text-fg-muted mt-0.5">Scalabilité jusqu'à 1000+ espaces sans frottement</p>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-4 shadow-xs">
            <span className="text-[11px] uppercase font-bold text-fg-muted flex items-center justify-between">
              <span>Quorum & Consensus</span>
              <Shield size={14} className="text-emerald-400" />
            </span>
            <p className="mt-1 text-xl font-black font-mono text-emerald-400">3/4 Raft</p>
            <p className="text-[10px] text-fg-muted mt-0.5">STONITH Armé, zéro split-brain garanti</p>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-4 shadow-xs">
            <span className="text-[11px] uppercase font-bold text-fg-muted flex items-center justify-between">
              <span>Intégrité MeshFS CAS</span>
              <HardDrive size={14} className="text-signal" />
            </span>
            <p className="mt-1 text-xl font-black font-mono text-signal">100% Bit-à-Bit</p>
            <p className="text-[10px] text-fg-muted mt-0.5">FastCDC 4Mo dédupliqué & vérifié SHA-256</p>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-4 shadow-xs">
            <span className="text-[11px] uppercase font-bold text-fg-muted flex items-center justify-between">
              <span>SLA Téléportation</span>
              <Zap size={14} className="text-amber-400" />
            </span>
            <p className="mt-1 text-xl font-black font-mono text-amber-400">&lt; 1.6 s</p>
            <p className="text-[10px] text-fg-muted mt-0.5">Direct RAM-to-RAM ZSTD Pipeline</p>
          </div>
        </div>

        {/* SECTION SPLIT-VIEW : VISUALISATION 2D/3D À GAUCHE + INSPECTEUR TEMPS RÉEL À DROITE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ZONE VISUELLE (8 COLONNES) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            {viewDimension === '3d' ? (
              <Fractal3DCanvas
                data={fractalData}
                selectedId={selectedNode?.id}
                onSelectNode={handleSelectNode}
              />
            ) : (
              <Fractal2DCanvas
                data={fractalData}
                selectedId={selectedNode?.id}
                onSelectNode={handleSelectNode}
                onOpenActionModal={handleOpenTeleport}
              />
            )}
          </div>

          {/* ZONE INSPECTEUR & PILOTAGE DES QUOTAS (4 COLONNES) */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-20">
            <FractalInspectorPanel
              selectedNode={selectedNode}
              onOpenTeleport={handleOpenTeleport}
            />
          </div>
        </div>
      </main>

      {/* MODAL DE TÉLÉPORTATION 1-CLIC */}
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
