import React, { useState } from 'react'
import {
  Activity,
  ArrowRightLeft,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  HardDrive,
  Layers,
  Network,
  Plus,
  RefreshCw,
  Save,
  Server,
  Shield,
  Sliders,
  Trash2,
  Zap,
} from 'lucide-react'

export default function FractalInspectorPanel({
  selectedNode,
  onUpdateMetrics,
  onOpenTeleport,
}) {
  const [activeTab, setActiveTab] = useState('live') // 'live', 'scaling', 'replication', 'backups', 'meshfs'

  // Editable scaling states
  const [allocatedCpu, setAllocatedCpu] = useState(4)
  const [allocatedRamMb, setAllocatedRamMb] = useState(2048)
  const [allocatedDiskGb, setAllocatedDiskGb] = useState(20)
  const [replicationFactor, setReplicationFactor] = useState(3)
  const [savingChanges, setSavingChanges] = useState(false)
  const [successToast, setSuccessToast] = useState(false)

  if (!selectedNode) {
    return (
      <div className="flex h-full min-h-[480px] flex-col items-center justify-center rounded-2xl border border-line bg-surface p-6 text-center shadow-xs">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-2 text-fg-muted mb-3">
          <Layers size={28} />
        </div>
        <h3 className="text-base font-bold text-fg">Inspecteur d'Arbre Fractal</h3>
        <p className="mt-1 text-xs text-fg-muted max-w-sm">
          Sélectionnez n'importe quel élément dans la vue 2D ou 3D (Gouverneur, Maker, Espace Client ou Cellule Souche) pour afficher sa télémétrie en temps réel et piloter ses quotas.
        </p>
      </div>
    )
  }

  const { id, name, type, data } = selectedNode
  const metrics = data?.metrics || {
    cpuUsage: 12.5,
    ramUsageMb: 512,
    ramQuotaMb: 1024,
    diskUsageMb: 2400,
    diskQuotaMb: 10240,
    iops: 340,
    readKb: 420,
    writeKb: 890,
  }

  const handleApplyChanges = () => {
    setSavingChanges(true)
    setTimeout(() => {
      setSavingChanges(false)
      setSuccessToast(true)
      setTimeout(() => setSuccessToast(false), 3000)
    }, 600)
  }

  return (
    <div className="flex flex-col rounded-2xl border border-line bg-surface p-5 shadow-xs">
      {/* Banner Sandbox Pédagogique */}
      <div className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5 text-xs text-amber-300 flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-bold">
          🎮 <span>Mode Jeu Vidéo / Sandbox Didactique</span>
        </span>
        <span className="text-[10px] font-mono text-amber-400/80">Simulateur visuel interactif sans impact sur le fer</span>
      </div>

      {/* Header with Title and Type Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-bold text-accent uppercase">
              {type.replace('_', ' ')}
            </span>
            <span className="text-xs font-mono text-fg-muted">ID: {id}</span>
          </div>
          <h3 className="mt-1 text-base font-black text-fg">{name}</h3>
          {data?.clientName && (
            <p className="text-xs text-fg-muted">
              Client Souverain : <b className="text-fg">{data.clientName}</b>
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {type === 'space' && (
            <button
              type="button"
              onClick={() => onOpenTeleport && onOpenTeleport(id)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-3 py-1.5 text-xs font-black text-white hover:bg-accent-hover transition-all"
            >
              <ArrowRightLeft size={13} />
              <span>Téléporter (1.6s)</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5 border-b border-line pb-3 text-xs">
        {[
          { id: 'live', label: 'Télémétrie Live (5s)', icon: Activity },
          { id: 'scaling', label: 'Quotas & Ressources', icon: Sliders },
          { id: 'replication', label: 'Réplication Raft', icon: Network },
          { id: 'backups', label: 'Sauvegardes PMBS', icon: Shield },
          { id: 'meshfs', label: 'Stockage MeshFS', icon: HardDrive },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-bold transition-all ${
                isActive
                  ? 'bg-surface-2 text-accent border border-accent/30'
                  : 'text-fg-muted hover:text-fg'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* SUCCESS BANNER */}
      {successToast && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400">
          <CheckCircle2 size={16} />
          <span>Modifications des ressources propagées en &lt; 200ms dans le Master Ledger !</span>
        </div>
      )}

      {/* TAB 1: LIVE METRICS (Télémétrie temps réel 5s) */}
      {activeTab === 'live' && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="rounded-xl border border-line bg-surface-2/40 p-3">
              <span className="text-[10px] uppercase font-bold text-fg-muted flex items-center justify-between">
                <span>Charge CPU</span>
                <Cpu size={12} className="text-accent" />
              </span>
              <p className="mt-1 text-base font-black font-mono text-fg">{metrics.cpuUsage}%</p>
              <div className="mt-2 h-1.5 w-full rounded-full bg-surface overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: `${metrics.cpuUsage}%` }} />
              </div>
            </div>

            <div className="rounded-xl border border-line bg-surface-2/40 p-3">
              <span className="text-[10px] uppercase font-bold text-fg-muted flex items-center justify-between">
                <span>RAM Active</span>
                <Activity size={12} className="text-signal" />
              </span>
              <p className="mt-1 text-base font-black font-mono text-fg">{metrics.ramUsageMb} Mo</p>
              <span className="text-[10px] text-fg-muted font-mono">Quota: {metrics.ramQuotaMb || 2048} Mo</span>
            </div>

            <div className="rounded-xl border border-line bg-surface-2/40 p-3">
              <span className="text-[10px] uppercase font-bold text-fg-muted flex items-center justify-between">
                <span>Stockage CAS</span>
                <HardDrive size={12} className="text-emerald-400" />
              </span>
              <p className="mt-1 text-base font-black font-mono text-fg">{(metrics.diskUsageMb / 1024).toFixed(1)} Go</p>
              <span className="text-[10px] text-fg-muted font-mono">Quota: {(metrics.diskQuotaMb / 1024).toFixed(0)} Go</span>
            </div>

            <div className="rounded-xl border border-line bg-surface-2/40 p-3">
              <span className="text-[10px] uppercase font-bold text-fg-muted flex items-center justify-between">
                <span>I/O Débit</span>
                <Zap size={12} className="text-amber-400" />
              </span>
              <p className="mt-1 text-base font-black font-mono text-fg">{metrics.iops || 420} IOPS</p>
              <span className="text-[10px] text-fg-muted font-mono">R: {metrics.readKb || 210}k · W: {metrics.writeKb || 640}k</span>
            </div>
          </div>

          {/* Details & Sockets info */}
          <div className="rounded-xl border border-line bg-surface-2/30 p-3.5 space-y-2 text-xs">
            <h4 className="font-bold text-fg flex items-center gap-1.5">
              <Shield size={14} className="text-emerald-400" /> Invariants & Juridiction
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="flex justify-between border-b border-line pb-1">
                <span className="text-fg-muted">Statut Global :</span>
                <span className="font-bold text-emerald-400">PURRING (Opérationnel)</span>
              </div>
              <div className="flex justify-between border-b border-line pb-1">
                <span className="text-fg-muted">Type d'Isolation :</span>
                <span className="font-bold text-fg">Rootless Podman + UDS Socket</span>
              </div>
              <div className="flex justify-between border-b border-line pb-1">
                <span className="text-fg-muted">Socket MariaDB :</span>
                <span className="font-bold text-accent truncate">/var/run/shaper/mariadb.sock</span>
              </div>
              <div className="flex justify-between border-b border-line pb-1">
                <span className="text-fg-muted">SLA Bascule CRIU :</span>
                <span className="font-bold text-fg">&lt; 1.6 seconde</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SCALING & QUOTAS (Ajout dynamique Coeurs, RAM, Disque) */}
      {activeTab === 'scaling' && (
        <div className="mt-4 space-y-4">
          <p className="text-xs text-fg-muted">
            Ajustez à chaud les limites d'allocation de l'Espace. Ces quotas sont appliqués instantanément via les cgroups v2 sans redémarrage de la machine hôte.
          </p>

          <div className="space-y-3">
            {/* CPU Slider */}
            <div className="rounded-xl border border-line bg-surface-2/30 p-3 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-fg flex items-center gap-1.5">
                  <Cpu size={14} className="text-accent" /> Limite vCPU Coeurs
                </span>
                <span className="font-mono font-bold text-accent">{allocatedCpu} Coeurs</span>
              </div>
              <input
                type="range"
                min="1"
                max="32"
                value={allocatedCpu}
                onChange={(e) => setAllocatedCpu(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer"
              />
            </div>

            {/* RAM Slider */}
            <div className="rounded-xl border border-line bg-surface-2/30 p-3 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-fg flex items-center gap-1.5">
                  <Activity size={14} className="text-signal" /> Limite Mémoire RAM
                </span>
                <span className="font-mono font-bold text-signal">{allocatedRamMb} Mo ({allocatedRamMb / 1024} Go)</span>
              </div>
              <input
                type="range"
                min="512"
                max="16384"
                step="512"
                value={allocatedRamMb}
                onChange={(e) => setAllocatedRamMb(Number(e.target.value))}
                className="w-full accent-signal cursor-pointer"
              />
            </div>

            {/* Disk Slider */}
            <div className="rounded-xl border border-line bg-surface-2/30 p-3 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-fg flex items-center gap-1.5">
                  <HardDrive size={14} className="text-emerald-400" /> Quota Stockage MeshFS CAS
                </span>
                <span className="font-mono font-bold text-emerald-400">{allocatedDiskGb} Go</span>
              </div>
              <input
                type="range"
                min="5"
                max="500"
                step="5"
                value={allocatedDiskGb}
                onChange={(e) => setAllocatedDiskGb(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleApplyChanges}
              disabled={savingChanges}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-xs font-black text-white hover:bg-accent-hover transition-all cursor-pointer shadow-md"
            >
              <Save size={14} />
              <span>{savingChanges ? 'Application en cours...' : 'Appliquer les Quotas en Direct'}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: REPLICATION (Gérer au niveau Espace ou Global) */}
      {activeTab === 'replication' && (
        <div className="mt-4 space-y-4 text-xs">
          <p className="text-fg-muted">
            Politique de réplication active de l'Espace à travers le quorum OpenRaft et le maillage WireGuard chiffré.
          </p>

          <div className="rounded-xl border border-line bg-surface-2/30 p-3 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-fg">Facteur de Réplication Actuel :</span>
              <span className="font-mono font-bold text-accent">{replicationFactor} Nœuds Redondants</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((factor) => (
                <button
                  key={factor}
                  type="button"
                  onClick={() => setReplicationFactor(factor)}
                  className={`rounded-lg p-2 text-center border font-bold transition-all ${
                    replicationFactor === factor
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-line bg-surface text-fg-muted hover:text-fg'
                  }`}
                >
                  {factor === 1 ? '1x Solo' : factor === 2 ? '2x Miroir' : '3x Quorum Raft'}
                </button>
              ))}
            </div>

            <div className="rounded-lg bg-surface p-2.5 border border-line space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between">
                <span className="text-fg-muted">Nœud Maître Actuel :</span>
                <span className="text-fg font-bold">node-p4-3100 (gbs-p4)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-fg-muted">Nœuds Suiveurs Raft :</span>
                <span className="text-fg">node-med-9201, node-dr-9400</span>
              </div>
              <div className="flex justify-between">
                <span className="text-fg-muted">Délai Sync Journal WAL :</span>
                <span className="text-emerald-400 font-bold">&lt; 12 ms</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BACKUPS PMBS */}
      {activeTab === 'backups' && (
        <div className="mt-4 space-y-3 text-xs">
          <div className="flex justify-between items-center">
            <span className="font-bold text-fg">Historique des Sauvegardes Atomiques (PMBS)</span>
            <button
              type="button"
              className="rounded-lg border border-line bg-surface px-2.5 py-1 font-bold text-accent hover:border-accent"
            >
              Créer Snapshot Immédiat
            </button>
          </div>

          <div className="space-y-2">
            {[
              { id: 'snap-1', date: 'Aujourd’hui 10:15', size: '142 Mo', hash: 'e8a4...3b21', status: 'VALIDÉ' },
              { id: 'snap-2', date: 'Aujourd’hui 09:15', size: '138 Mo', hash: 'c9f1...84a2', status: 'VALIDÉ' },
              { id: 'snap-3', date: 'Aujourd’hui 08:15', size: '139 Mo', hash: '12d7...e5a1', status: 'VALIDÉ' },
            ].map((snap) => (
              <div key={snap.id} className="flex items-center justify-between rounded-lg border border-line bg-surface p-2.5 text-[11px] font-mono">
                <div>
                  <span className="font-bold text-fg">{snap.date}</span>
                  <span className="text-fg-muted ml-2">Taille: {snap.size}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-fg-muted truncate max-w-[80px]">{snap.hash}</span>
                  <span className="rounded bg-emerald-500/10 px-1.5 py-0.2 font-bold text-emerald-400">{snap.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: MESHFS CAS HEALTH */}
      {activeTab === 'meshfs' && (
        <div className="mt-4 space-y-3 text-xs">
          <p className="text-fg-muted">
            État du système de fichiers distribué dédupliqué MeshFS (blocs de 4 Mo découpés par FastCDC et scellés SHA-256).
          </p>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="rounded-lg border border-line bg-surface p-2.5">
              <span className="text-[10px] text-fg-muted block">Taux de Déduplication</span>
              <span className="text-base font-bold text-accent font-mono">68.4%</span>
            </div>
            <div className="rounded-lg border border-line bg-surface p-2.5">
              <span className="text-[10px] text-fg-muted block">Blocs CAS Sains</span>
              <span className="text-base font-bold text-emerald-400 font-mono">35 736 / 35 736</span>
            </div>
          </div>

          <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-[11px] text-emerald-400 flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>Zéro corruption détectée. Rétention conforme à l'invariant bit-for-bit.</span>
          </div>
        </div>
      )}
    </div>
  )
}
