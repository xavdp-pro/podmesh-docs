import React, { useState, useEffect, useRef, useId } from 'react'
import { createPortal } from 'react-dom'
import {
  HardDrive,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Terminal,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  Server,
  Boxes,
  Heart,
  ChevronRight,
  Info,
  Download,
  Lock,
  RefreshCw,
  Archive,
  Database,
  ArrowRight,
} from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'
import LanguageSwitcher from '../components/LanguageSwitcher'
import ThemeToggle from '../components/ui/ThemeToggle'
import { pmbsGlossary, pmbsContent } from '../data/pmbsPageContent'

function placePanel(box) {
  const width = Math.min(290, window.innerWidth - 24)
  const gap = 10
  const estimate = 160
  const centerX = box.left + box.width / 2

  let left = centerX - width / 2
  left = Math.max(12, Math.min(left, window.innerWidth - width - 12))

  const arrowLeft = Math.max(18, Math.min(width - 18, centerX - left))
  const spaceAbove = box.top
  const spaceBelow = window.innerHeight - box.bottom
  const below = spaceAbove < estimate + 28 && spaceBelow > spaceAbove

  if (below) {
    return {
      top: box.bottom + gap,
      bottom: 'auto',
      left,
      width,
      arrowLeft,
      placement: 'bottom',
    }
  }

  return {
    top: 'auto',
    bottom: window.innerHeight - box.top + gap,
    left,
    width,
    arrowLeft,
    placement: 'top',
  }
}

function ClarifiedTerm({ termKey, children, glossary, enabled }) {
  const item = glossary[termKey]
  const [open, setOpen] = useState(false)
  const [place, setPlace] = useState(null)
  const triggerRef = useRef(null)
  const panelRef = useRef(null)
  const closeTimer = useRef(0)
  const lastPointer = useRef('mouse')
  const id = useId()

  const close = () => {
    window.clearTimeout(closeTimer.current)
    setOpen(false)
  }

  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpen(false), 220)
  }

  const cancelClose = () => window.clearTimeout(closeTimer.current)

  const reveal = () => {
    if (!enabled) return
    cancelClose()
    const box = triggerRef.current?.getBoundingClientRect()
    if (!box) return
    setPlace(placePanel(box))
    setOpen(true)
  }

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') close()
    }
    const onPointerDown = (event) => {
      const t = event.target
      if (triggerRef.current?.contains(t) || panelRef.current?.contains(t)) return
      close()
    }
    const onScroll = () => close()
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('scroll', onScroll, { passive: true, capture: true })
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('scroll', onScroll, { capture: true })
    }
  }, [open])

  if (!item) return <>{children}</>

  const rememberPointer = (event) => {
    lastPointer.current = event.pointerType || 'mouse'
  }

  const onTap = (event) => {
    if (!enabled) return
    event.preventDefault()
    event.stopPropagation()
    if (lastPointer.current === 'mouse') return
    if (open) close()
    else reveal()
  }

  return (
    <span className="relative inline">
      <span
        ref={triggerRef}
        role="button"
        tabIndex={0}
        data-open={open ? 'true' : undefined}
        onPointerDown={rememberPointer}
        onClick={onTap}
        onKeyDown={(event) => {
          if (event.key !== 'Enter' && event.key !== ' ') return
          event.preventDefault()
          if (open) close()
          else reveal()
        }}
        onMouseEnter={reveal}
        onMouseLeave={scheduleClose}
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        className={enabled ? 'site-glossary-term' : 'font-semibold'}
      >
        {children}
      </span>

      {open && place && typeof document !== 'undefined'
        ? createPortal(
            <div
              ref={panelRef}
              id={id}
              role="tooltip"
              data-placement={place.placement}
              onClick={(event) => event.stopPropagation()}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              style={{
                top: place.top,
                bottom: place.bottom,
                left: place.left,
                width: place.width,
                '--glossary-arrow-left': `${place.arrowLeft}px`,
              }}
              className="site-glossary-panel"
            >
              <p className="site-glossary-panel__label">{item.term}</p>
              <p className="site-glossary-panel__sub">{item.short}</p>
              <p className="site-glossary-panel__body">{item.desc}</p>
            </div>,
            document.body
          )
        : null}
    </span>
  )
}

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group rounded-xl bg-stone-900 border border-stone-800 p-4 font-mono text-xs text-stone-200 overflow-x-auto shadow-inner">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-1.5 rounded-md bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition opacity-80 group-hover:opacity-100"
        title="Copier le code"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
      <pre className="pr-8">{code}</pre>
    </div>
  )
}

export default function PmbsShowcasePage() {
  const { lang } = useI18n()
  const content = pmbsContent[lang] || pmbsContent.fr
  const glossary = pmbsGlossary[lang] || pmbsGlossary.fr

  const [activeAudience, setActiveAudience] = useState('human') // 'human' | 'geek' | 'agent'
  const [glossaryEnabled, setGlossaryEnabled] = useState(true)

  return (
    <div className="min-h-screen bg-[#faf7f2] dark:bg-[#0c1512] text-stone-800 dark:text-stone-100 font-sans transition-colors duration-200 selection:bg-emerald-500/30">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#faf7f2]/90 dark:bg-[#0c1512]/90 border-b border-[#e3dacb] dark:border-stone-800 px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              <Archive className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-stone-900 dark:text-white tracking-tight">pmbs</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold">
                  v2.3.0
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 hidden sm:block">
                PodMesh Backup Server · Pure Rust Sovereign Datastore
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-stone-600 dark:text-stone-300">
            <a href="#concepts" className="hover:text-emerald-600 transition">Concepts</a>
            <a href="#comparison" className="hover:text-emerald-600 transition">Comparatif</a>
            <a href="#benchmarks" className="hover:text-emerald-600 transition">Benchmarks</a>
            <a href="#cli" className="hover:text-emerald-600 transition">Guide CLI</a>
            <a href="#proxmox" className="hover:text-emerald-600 transition">Proxmox VE</a>
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href="https://github.com/xavdp-pro/podmesh-pmbs"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 transition"
              title="Code source GitHub"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative overflow-hidden px-4 sm:px-8 pt-12 pb-16 border-b border-[#e3dacb] dark:border-stone-800">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/10 text-emerald-800 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest">
            {content.hero.kicker}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-[1.15]">
            {content.hero.title}
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
            {content.hero.subtitle}
          </p>

          {/* Shaper OS Golden Quote */}
          <div className="my-8 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#121c17] border border-[#e3dacb] dark:border-stone-800 shadow-sm max-w-3xl mx-auto relative group">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2 flex items-center justify-center gap-1.5">
              <Zap className="w-4 h-4" />
              <span>{content.hero.goldenAuthor}</span>
            </div>
            <blockquote className="text-xl sm:text-2xl font-serif italic text-stone-800 dark:text-stone-100 leading-snug">
              {content.hero.goldenQuote}
            </blockquote>
          </div>

          {/* Action Buttons & Verified Badge */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#cli"
              className="px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span>{content.hero.btnQuickstart}</span>
              <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="https://meshfs.xavdp.pro"
              className="px-6 py-3 rounded-full bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-900 font-semibold text-sm transition-all shadow-sm flex items-center gap-2"
            >
              <HardDrive className="w-4 h-4" />
              <span>{content.hero.btnMeshFsBridge}</span>
            </a>
          </div>

          <div className="pt-4 text-xs font-mono text-emerald-800 dark:text-emerald-400 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{content.hero.badgeStatus}</span>
          </div>
        </div>
      </section>

      {/* Global Audience Switcher (Human / Geek / AI Agent) */}
      <section className="sticky top-[61px] z-30 bg-[#faf7f2]/95 dark:bg-[#0c1512]/95 backdrop-blur border-b border-[#e3dacb] dark:border-stone-800 px-4 py-3">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Niveau de lecture :</span>
          </div>

          <div className="inline-flex rounded-full bg-stone-200/80 dark:bg-stone-800/80 p-1 border border-stone-300/50 dark:border-stone-700/50 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveAudience('human')}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeAudience === 'human'
                  ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {content.audienceToggle.human}
            </button>
            <button
              type="button"
              onClick={() => setActiveAudience('geek')}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeAudience === 'geek'
                  ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {content.audienceToggle.geek}
            </button>
            <button
              type="button"
              onClick={() => setActiveAudience('agent')}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeAudience === 'agent'
                  ? 'bg-white dark:bg-stone-900 text-purple-600 dark:text-purple-400 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {content.audienceToggle.agent}
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-16 space-y-24">
        {/* Core Concepts */}
        <section id="concepts" className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
              {content.concepts.title}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              {content.concepts.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.concepts.cards.map((card) => (
              <div
                key={card.id}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#121c17] border border-[#e3dacb] dark:border-stone-800 shadow-sm space-y-4 hover:border-emerald-500/50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                    {card.id === 'cas-dedup' && <Layers className="w-5 h-5" />}
                    {card.id === 'zero-transit' && <Zap className="w-5 h-5" />}
                    {card.id === 'merkle-seal' && <ShieldCheck className="w-5 h-5" />}
                    {card.id === 'sovereign-footprint' && <Cpu className="w-5 h-5" />}
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                    {card.title}
                  </h3>
                </div>

                <div className="text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  {activeAudience === 'human' && <p>{card.human}</p>}
                  {activeAudience === 'geek' && (
                    <div className="space-y-2 font-mono text-xs text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-900/60 p-3 rounded-lg border border-stone-200 dark:border-stone-800">
                      <p>{card.geek}</p>
                    </div>
                  )}
                  {activeAudience === 'agent' && (
                    <div className="space-y-2 font-mono text-xs text-purple-800 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                      <div className="flex items-center gap-1 font-bold text-[10px] tracking-widest uppercase text-purple-600 dark:text-purple-400">
                        <Terminal className="w-3 h-3" />
                        <span>Machine Contract (AI Invariant)</span>
                      </div>
                      <p>{card.agent}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Matrix */}
        <section id="comparison" className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
              {content.comparison.title}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              {content.comparison.subtitle}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#e3dacb] dark:border-stone-800 shadow-sm bg-white dark:bg-[#121c17]">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-stone-100/80 dark:bg-stone-900/80 border-b border-[#e3dacb] dark:border-stone-800 font-bold text-stone-900 dark:text-white">
                  {content.comparison.headers.map((h, i) => (
                    <th key={i} className={`p-3.5 sm:p-4 ${i === 1 ? 'text-emerald-700 dark:text-emerald-400 font-extrabold bg-emerald-50/50 dark:bg-emerald-950/20' : ''}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e3dacb] dark:divide-stone-800">
                {content.comparison.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-stone-50/50 dark:hover:bg-stone-900/40 transition">
                    <td className="p-3.5 sm:p-4 font-semibold text-stone-900 dark:text-stone-100">{row[0]}</td>
                    <td className="p-3.5 sm:p-4 font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50/30 dark:bg-emerald-950/10">
                      {row[1]}
                    </td>
                    <td className="p-3.5 sm:p-4 text-stone-600 dark:text-stone-400">{row[2]}</td>
                    <td className="p-3.5 sm:p-4 text-stone-600 dark:text-stone-400">{row[3]}</td>
                    <td className="p-3.5 sm:p-4 text-stone-600 dark:text-stone-400">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Benchmarks Section */}
        <section id="benchmarks" className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
              {content.benchmarks.title}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              {content.benchmarks.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {content.benchmarks.stats.map((stat, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white dark:bg-[#121c17] border border-[#e3dacb] dark:border-stone-800 shadow-sm text-center space-y-2"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                  {stat.label}
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CLI Reference */}
        <section id="cli" className="space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
              {content.cliReference.title}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              {content.cliReference.subtitle}
            </p>
          </div>

          <div className="space-y-6">
            {content.cliReference.commands.map((cmd, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-[#121c17] border border-[#e3dacb] dark:border-stone-800 shadow-sm space-y-3"
              >
                <h3 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-center font-mono">
                    {i + 1}
                  </span>
                  <span>{cmd.title}</span>
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400">{cmd.desc}</p>
                <CodeBlock code={cmd.code} />
              </div>
            ))}
          </div>
        </section>

        {/* Proxmox VE Integration */}
        <section id="proxmox" className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-emerald-900/10 via-transparent to-stone-900/5 dark:from-emerald-950/40 dark:to-transparent border border-emerald-500/30 space-y-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/20 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Server className="w-3.5 h-3.5" />
              <span>Intégration Proxmox VE Native</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
              Connecté au Cluster Proxmox VE & Stockage MeshFS
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Dans notre qualification réelle sur le cluster à 2 nœuds (<code className="font-mono text-xs bg-stone-200 dark:bg-stone-800 px-1 py-0.5 rounded">pve-cluster-a</code> et <code className="font-mono text-xs bg-stone-200 dark:bg-stone-800 px-1 py-0.5 rounded">pve-cluster-b</code>), PMBS a opéré directement sur le point de montage partagé <code className="font-mono text-xs bg-stone-200 dark:bg-stone-800 px-1 py-0.5 rounded">/mnt/pve/shared-meshfs</code> :
            </p>
            <ul className="space-y-2 text-xs text-stone-700 dark:text-stone-300 font-mono">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Sauvegarde des disques bruts VM 100 et Rootfs CT 200 Alpine en 61 ms.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Restauration avec contrôle staging à 304,7 Mo/s et intégrité SHA-256 à 100%.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Survie aux pannes brutales et reprise HA coordonnée avec Proxmox HA Manager.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Dedication & Footer */}
        <footer className="pt-8 border-t border-[#e3dacb] dark:border-stone-800 text-center space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-stone-500 dark:text-stone-400">
            <a href="https://podmesh.xavdp.pro" className="hover:text-emerald-600 transition">PodMesh Core</a>
            <span>•</span>
            <a href="https://meshfs.xavdp.pro" className="hover:text-emerald-600 transition">MeshFS Storage</a>
            <span>•</span>
            <a href="https://pmbs.xavdp.pro" className="text-emerald-700 dark:text-emerald-400 font-bold">PMBS Backup</a>
            <span>•</span>
            <a href="https://github.com/xavdp-pro/podmesh-pmbs" className="hover:text-emerald-600 transition">GitHub</a>
          </div>
          <p className="text-xs text-stone-400 dark:text-stone-500 font-serif italic">
            Conçu et qualifié sur le fer par Xavier de Poorter & l'Alliance Shaper OS · Apache-2.0
          </p>
        </footer>
      </main>
    </div>
  )
}
