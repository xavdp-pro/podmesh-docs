import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  ArrowDownCircle,
  CheckCircle2,
  Download,
  Filter,
  Pause,
  Play,
  Radio,
  RefreshCw,
  Search,
  Shield,
  Terminal,
  Trash2,
  Zap,
} from 'lucide-react'

export default function LiveEventFeed({ events, isConnected, onClear }) {
  const [filterCategory, setFilterCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isPaused, setIsPaused] = useState(false)
  const logContainerRef = useRef(null)

  // Auto-scroll to bottom on new event if not paused
  useEffect(() => {
    if (!isPaused && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [events, isPaused])

  const filteredEvents = events.filter((ev) => {
    if (filterCategory !== 'all' && ev.category !== filterCategory) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return (
        ev.message.toLowerCase().includes(q) ||
        ev.category.toLowerCase().includes(q) ||
        (ev.source && ev.source.toLowerCase().includes(q))
      )
    }
    return true
  })

  function handleExportLogs() {
    const blob = new Blob([JSON.stringify(events, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `podmesh-cockpit-events-${new Date().toISOString()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col rounded-2xl border border-line bg-surface p-5 shadow-sm lg:p-6">
      {/* Header with Title and Connection Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Terminal size={18} />
            </div>
            <h2 className="text-lg font-black tracking-tight text-fg">
              Flux d'Événements Temps Réel (SSE)
            </h2>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                isConnected
                  ? 'border border-accent/30 bg-accent/10 text-accent'
                  : 'border border-warm/30 bg-warm/10 text-warm'
              }`}
            >
              <span className="relative flex h-2 w-2">
                {isConnected && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                )}
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${
                    isConnected ? 'bg-accent' : 'bg-warm'
                  }`}
                ></span>
              </span>
              {isConnected ? 'SSE Connecté (Zero Reload)' : 'Reconnexion SSE...'}
            </span>
          </div>
          <p className="mt-1 text-xs text-fg-muted">
            Diffusion continue des battements de cœur, débits WireGuard, arbitrage Quorum et télémétrie de téléportation.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className={`inline-flex items-center gap-1 rounded-lg border border-line px-2.5 py-1 text-xs font-semibold transition-colors ${
              isPaused
                ? 'border-warm bg-warm/10 text-warm'
                : 'bg-surface-2 text-fg-muted hover:text-fg'
            }`}
          >
            {isPaused ? <Play size={13} /> : <Pause size={13} />}
            <span>{isPaused ? 'Reprendre' : 'Pause'}</span>
          </button>

          <button
            type="button"
            onClick={handleExportLogs}
            className="inline-flex items-center gap-1 rounded-lg border border-line bg-surface-2 px-2.5 py-1 text-xs font-semibold text-fg-muted hover:text-fg"
            title="Exporter le journal en JSON"
          >
            <Download size={13} />
            <span className="hidden sm:inline">Exporter</span>
          </button>

          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1 rounded-lg border border-line bg-surface-2 px-2.5 py-1 text-xs font-semibold text-fg-muted hover:text-danger hover:border-danger/30"
            title="Effacer le journal local"
          >
            <Trash2 size={13} />
            <span className="hidden sm:inline">Effacer</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[200px] flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher dans le flux..."
            className="w-full rounded-xl border border-line bg-canvas py-1 pl-9 pr-3 text-xs text-fg placeholder-fg-muted focus:border-accent focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {[
            { id: 'all', label: 'Tous' },
            { id: 'teleport', label: 'Téléportation' },
            { id: 'wireguard', label: 'WireGuard' },
            { id: 'quorum', label: 'Quorum' },
            { id: 'heartbeat', label: 'Heartbeat' },
            { id: 'pmbs', label: 'PMBS / Stockage' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilterCategory(cat.id)}
              className={`rounded-lg px-2.5 py-1 transition-colors ${
                filterCategory === cat.id
                  ? 'bg-accent text-accent-fg font-bold'
                  : 'bg-surface-2 text-fg-muted hover:text-fg'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Output Area */}
      <div
        ref={logContainerRef}
        className="mt-4 max-h-[380px] min-h-[260px] overflow-y-auto rounded-xl border border-line bg-[#0c1512] p-3 font-mono text-[11px] leading-relaxed text-[#eef4ef] shadow-inner"
      >
        {filteredEvents.length === 0 ? (
          <div className="flex h-40 items-center justify-center text-xs text-[#82948a]">
            En attente d'événements du flux...
          </div>
        ) : (
          <div className="space-y-1.5">
            {filteredEvents.map((ev, index) => {
              const timeStr = ev.timestamp
                ? new Date(ev.timestamp).toLocaleTimeString('fr-FR', {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    fractionalSecondDigits: 3,
                  })
                : '00:00:00.000'

              let badgeColor = 'bg-[#142a1e] text-[#1fa968] border-[#1fa968]/30'
              if (ev.category === 'teleport') {
                badgeColor = 'bg-[#2b1d15] text-[#e08b60] border-[#e08b60]/40'
              } else if (ev.category === 'wireguard') {
                badgeColor = 'bg-[#102a35] text-[#4fc7d8] border-[#4fc7d8]/30'
              } else if (ev.category === 'quorum') {
                badgeColor = 'bg-[#261d36] text-[#c084fc] border-[#c084fc]/30'
              } else if (ev.category === 'error') {
                badgeColor = 'bg-[#3b1a1f] text-[#f87171] border-[#f87171]/40'
              }

              return (
                <div
                  key={ev.id || index}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 hover:bg-white/5 p-1 rounded transition-colors"
                >
                  <span className="shrink-0 text-[#82948a] font-light">[{timeStr}]</span>

                  <span
                    className={`inline-block shrink-0 rounded border px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider ${badgeColor}`}
                  >
                    {ev.category}
                  </span>

                  {ev.source && (
                    <span className="shrink-0 text-[#b3c4b9] font-semibold text-[10px]">
                      @{ev.source}
                    </span>
                  )}

                  <span className="flex-1 text-[#eef4ef] break-words">{ev.message}</span>

                  {ev.metrics && (
                    <span className="shrink-0 text-[10px] text-[#4fc7d8]">
                      {typeof ev.metrics === 'object'
                        ? JSON.stringify(ev.metrics).replace(/["{}]/g, ' ')
                        : ev.metrics}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div className="mt-3 flex items-center justify-between text-[11px] text-fg-muted font-mono">
        <span>Événements affichés : {filteredEvents.length} / {events.length}</span>
        <span>Latence d'ingestion SSE : &lt; 2 ms</span>
      </div>
    </div>
  )
}
