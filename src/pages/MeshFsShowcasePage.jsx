import React, { useState, useEffect, useRef, useId } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HardDrive,
  Cpu,
  Layers,
  Network,
  ShieldCheck,
  Zap,
  Sparkles,
  Terminal,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  HelpCircle,
  Server,
  Boxes,
  Heart,
  ChevronRight,
  Info,
  Download,
  Code2,
  Scale,
} from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'
import LanguageSwitcher from '../components/LanguageSwitcher'
import ThemeToggle from '../components/ui/ThemeToggle'
import { clarificationGlossary, meshfsContent } from '../data/meshfsPageContent'

// Place panel calculation exactly as on xavdp.pro
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
      placement: 'below',
    }
  }

  return {
    top: 'auto',
    bottom: window.innerHeight - box.top + gap,
    left,
    width,
    arrowLeft,
    placement: 'above',
  }
}

// Term component strictly matching xavdp.pro (hover on desktop with grace timer, tap on mobile, portal)
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

export default function MeshFsShowcasePage() {
  const { locale } = useI18n()
  const content = meshfsContent[locale] || meshfsContent.fr
  const glossary = clarificationGlossary[locale] || clarificationGlossary.fr

  const [clarificationMode, setClarificationMode] = useState(true)
  const [activeAudience, setActiveAudience] = useState('human') // 'human' | 'geek' | 'agent'
  const [copiedIndex, setCopiedIndex] = useState(null)

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const Term = ({ k, children }) => (
    <ClarifiedTerm termKey={k} glossary={glossary} enabled={clarificationMode}>
      {children}
    </ClarifiedTerm>
  )

  return (
    <div className="min-h-screen bg-[#faf7f2] dark:bg-[#0c1512] text-[#10231b] dark:text-[#eef4ef] font-sans antialiased transition-colors duration-200 selection:bg-emerald-500/20 selection:text-emerald-700 dark:selection:text-emerald-300">
      {/* Top Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#faf7f2]/90 dark:bg-[#0c1512]/90 border-b border-[#e3dacb] dark:border-stone-800 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a href="https://xavdp.pro" className="flex items-center gap-2 group">
              <span className="w-8 h-8 rounded-lg bg-emerald-700 dark:bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
                M
              </span>
              <span className="font-bold text-lg tracking-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                MeshFS<span className="text-emerald-600 dark:text-emerald-400 text-xs ml-1 font-mono">v2.3</span>
              </span>
            </a>
            <span className="hidden sm:inline-block text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-medium">
              Sovereign P2P CAS
            </span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Link to 28 Features Page */}
            <Link
              to="/fonctionnalites"
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-700/15 text-emerald-800 dark:text-emerald-300 border border-emerald-600/30 hover:bg-emerald-700 hover:text-white transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {locale === 'en' ? '28 Features' : locale === 'es' ? '28 Funcionalidades' : '28 Fonctionnalités'}
              </span>
              <span className="sm:hidden">28</span>
            </Link>

            {/* Link to Universal Comparison Page */}
            <Link
              to="/comparatif"
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-[#b4562c]/15 text-[#b4562c] dark:text-amber-300 border border-[#b4562c]/30 hover:bg-[#b4562c] hover:text-white transition-all"
            >
              <Scale className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {locale === 'en' ? 'Comparison (12 vs MeshFS)' : locale === 'es' ? 'Comparativa (12 vs MeshFS)' : 'Comparatif (12 vs MeshFS)'}
              </span>
              <span className="sm:hidden">VS</span>
            </Link>

            {/* Clarification Mode Toggle */}
            <button
              type="button"
              onClick={() => setClarificationMode(!clarificationMode)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all border ${
                clarificationMode
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-emerald-500'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Mode Clarification</span>
              <span className="md:hidden">Aide</span>
            </button>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* GitHub Link */}
            <a
              href="https://github.com/xavdp-pro/podmesh-meshfs"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 transition-opacity"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section with Golden Law Quote */}
      <section className="relative overflow-hidden px-4 sm:px-8 pt-12 pb-16 border-b border-[#e3dacb] dark:border-stone-800">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b4562c]/10 text-[#b4562c] text-xs font-bold uppercase tracking-widest">
            {content.hero.kicker}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-[1.15]">
            {content.hero.title}
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
            {content.hero.subtitle}
          </p>

          {/* Golden Shaper OS Law Quote */}
          <div className="my-8 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#121c17] border border-[#e3dacb] dark:border-stone-800 shadow-sm max-w-3xl mx-auto relative group">
            <div className="text-xs font-bold uppercase tracking-wider text-[#b4562c] mb-2 flex items-center justify-center gap-1.5">
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
              href="#usecases"
              className="px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <span>{content.hero.btnUseCases}</span>
              <ChevronRight className="w-4 h-4" />
            </a>
            <Link
              to="/comparatif"
              className="px-6 py-3 rounded-full bg-[#b4562c] hover:bg-[#9a4621] text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Scale className="w-4 h-4" />
              <span>
                {locale === 'en'
                  ? 'Universal Comparison (vs Ceph, Cubbit, MinIO, PBS...)'
                  : locale === 'es'
                    ? 'Comparativa Universal (vs Ceph, Cubbit, MinIO, PBS...)'
                    : 'Comparatif Universel (vs Ceph, Cubbit, MinIO, PBS...)'}
              </span>
            </Link>
            <a
              href="#install"
              className="px-6 py-3 rounded-full bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-900 font-semibold text-sm transition-all shadow-sm flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{content.hero.btnDebRepo}</span>
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

      {/* Main Content Sections */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-12 space-y-16">
        {/* Section 1: Concepts & Foundations */}
        <section id="concepts" className="space-y-6">
          <div className="border-b border-[#e3dacb] dark:border-stone-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b4562c]">
              {content.sections.concepts.kicker}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
              {content.sections.concepts.title}
            </h2>
          </div>

          {/* Human View */}
          {activeAudience === 'human' && (
            <div className="space-y-6 animate-fadeIn">
              <p className="text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                {content.sections.concepts.human.lead}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.sections.concepts.human.points.map((pt, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-white dark:bg-[#121c17] border border-[#e3dacb] dark:border-stone-800 space-y-2 hover:border-emerald-500/50 transition-colors shadow-sm"
                  >
                    <h3 className="font-bold text-stone-900 dark:text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      {pt.title.includes('SPOF') ? (
                        <span>
                          Zéro Serveur Central (<Term k="spof">SPOF</Term>)
                        </span>
                      ) : pt.title.includes('Déduplication') ? (
                        <span>
                          <Term k="cas">Déduplication</Term> Instantanée
                        </span>
                      ) : pt.title.includes('Clé USB') ? (
                        <span>
                          Montable via <Term k="fuse">FUSE</Term>
                        </span>
                      ) : (
                        <span>
                          <Term k="selfhealing">Auto-guérison</Term> Silencieuse
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                      {pt.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Geek View */}
          {activeAudience === 'geek' && (
            <div className="space-y-6 animate-fadeIn">
              <p className="text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                {content.sections.concepts.geek.lead}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {content.sections.concepts.geek.specs.map((sp, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white dark:bg-[#121c17] border border-[#e3dacb] dark:border-stone-800"
                  >
                    <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">{sp.label}</div>
                    <div className="text-sm sm:text-base font-bold text-stone-900 dark:text-white font-mono mt-0.5">
                      {sp.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 text-stone-100 font-mono text-xs overflow-x-auto shadow-inner">
                <div className="text-stone-400 text-xs mb-2 font-sans font-semibold">
                  {content.sections.concepts.geek.codeTitle}
                </div>
                <pre>{content.sections.concepts.geek.code}</pre>
              </div>
            </div>
          )}

          {/* AI Agent View */}
          {activeAudience === 'agent' && (
            <div className="space-y-6 animate-fadeIn p-6 rounded-2xl bg-purple-950/10 border border-purple-500/20 text-stone-800 dark:text-stone-200">
              <div className="flex items-center gap-2 font-bold text-purple-700 dark:text-purple-400 text-sm">
                <Code2 className="w-4 h-4" />
                <span>{content.sections.concepts.agent.lead}</span>
              </div>

              <ul className="space-y-2 text-xs font-mono">
                {content.sections.concepts.agent.invariants.map((inv, i) => (
                  <li key={i} className="p-2.5 rounded-lg bg-white/60 dark:bg-stone-900/60 border border-purple-500/20">
                    {inv}
                  </li>
                ))}
              </ul>

              <div className="p-4 rounded-xl bg-stone-900 text-stone-100 font-mono text-xs overflow-x-auto">
                <pre>{content.sections.concepts.agent.cliContract}</pre>
              </div>
            </div>
          )}
        </section>

        {/* Section 2: The Genesis Story (PMBS -> MeshFS) */}
        <section id="genesis" className="space-y-6">
          <div className="border-b border-[#e3dacb] dark:border-stone-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b4562c]">
              {content.sections.genesis.kicker}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
              {content.sections.genesis.title}
            </h2>
          </div>

          {activeAudience === 'human' && (
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#121c17] border border-[#e3dacb] dark:border-stone-800 space-y-4 shadow-sm animate-fadeIn">
              <p className="text-base font-semibold text-stone-800 dark:text-stone-200">
                {content.sections.genesis.human.lead}
              </p>
              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed">
                {content.sections.genesis.human.story}
              </p>
            </div>
          )}

          {activeAudience === 'geek' && (
            <div className="space-y-4 animate-fadeIn">
              <p className="text-base text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                {content.sections.genesis.geek.lead}
              </p>
              <div className="grid grid-cols-1 gap-3">
                {content.sections.genesis.geek.points.map((pt, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white dark:bg-[#121c17] border border-[#e3dacb] dark:border-stone-800 flex items-start gap-3"
                  >
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeAudience === 'agent' && (
            <div className="p-6 rounded-2xl bg-stone-900 text-stone-100 font-mono text-xs animate-fadeIn shadow-inner">
              <div className="text-stone-400 text-xs mb-2 font-sans font-semibold">
                Contrat d'invariance PMBS / MeshFS JSON-Merkle-v2
              </div>
              <pre>{content.sections.genesis.agent.contract}</pre>
            </div>
          )}
        </section>

        {/* Section 3: Concrete Use Cases */}
        <section id="usecases" className="space-y-6">
          <div className="border-b border-[#e3dacb] dark:border-stone-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b4562c]">
              {content.sections.usecases.kicker}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
              {content.sections.usecases.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {content.sections.usecases.items.map((uc) => (
              <div
                key={uc.id}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#121c17] border border-[#e3dacb] dark:border-stone-800 shadow-sm space-y-3"
              >
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">
                  {uc.title}
                </h3>

                {activeAudience === 'human' && (
                  <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
                    {uc.human}
                  </p>
                )}

                {activeAudience === 'geek' && (
                  <p className="text-sm text-stone-700 dark:text-stone-300 font-mono leading-relaxed bg-stone-50 dark:bg-stone-900/50 p-3 rounded-xl border border-stone-200 dark:border-stone-800">
                    {uc.geek}
                  </p>
                )}

                {activeAudience === 'agent' && (
                  <div className="p-3 rounded-xl bg-purple-950/20 text-purple-700 dark:text-purple-300 font-mono text-xs border border-purple-500/20">
                    {uc.agent}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Installation & APT Repository */}
        <section id="install" className="space-y-6">
          <div className="border-b border-[#e3dacb] dark:border-stone-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b4562c]">
              {content.sections.install.kicker}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
              {content.sections.install.title}
            </h2>
          </div>

          <p className="text-base text-stone-700 dark:text-stone-300">
            {content.sections.install.human}
          </p>

          {/* APT Command Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-stone-900 text-stone-100 space-y-4 shadow-xl">
            <div className="flex items-center justify-between text-xs text-stone-400 pb-3 border-b border-stone-800">
              <span className="font-mono">Debian 13 (Trixie) & Proxmox VE 8/9</span>
              <button
                type="button"
                onClick={() => copyToClipboard(content.sections.install.commands.join('\n'), 'all-apt')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-white font-sans text-xs transition-colors"
              >
                {copiedIndex === 'all-apt' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === 'all-apt' ? 'Copié !' : 'Copier tout'}</span>
              </button>
            </div>

            <pre className="text-xs sm:text-sm font-mono overflow-x-auto text-emerald-400 leading-relaxed">
              {content.sections.install.commands.join('\n')}
            </pre>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://deb.xavdp.pro"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm"
            >
              <span>Accéder au Dépôt APT (deb.xavdp.pro)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/xavdp-pro/podmesh-meshfs"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-300 dark:hover:bg-stone-700 text-xs font-bold transition-all"
            >
              <span>Code Source & Guides (GitHub)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* Section 5: The Complete Dedication */}
        {content.sections.dedication && (
          <section id="dedication" className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#121c17] border border-[#e3dacb] dark:border-stone-800 space-y-10 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#b4562c]">
              <Heart className="w-4 h-4 fill-[#b4562c]" />
              <span>{content.sections.dedication.kicker}</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-white font-serif">
                {content.sections.dedication.title}
              </h2>
              <p className="text-base sm:text-lg italic text-stone-700 dark:text-stone-300 font-serif leading-relaxed">
                {content.sections.dedication.intro}
              </p>
            </div>

            {/* Pioneers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {content.sections.dedication.pioneers.map((p, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#faf7f2]/60 dark:bg-stone-900/40 border border-[#e3dacb]/80 dark:border-stone-800/80 space-y-2"
                >
                  <h3 className="font-bold text-stone-900 dark:text-white text-sm sm:text-base">
                    {p.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Thoughts for Artificial Intelligences */}
            <div className="pt-6 border-t border-[#e3dacb] dark:border-stone-800 space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white font-serif">
                {content.sections.dedication.aiThoughtsTitle}
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed font-serif">
                {content.sections.dedication.aiThoughts.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Golden Ratio Key Principle Highlight */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-300/50 dark:border-amber-700/40">
                <blockquote className="text-base sm:text-lg font-bold text-stone-900 dark:text-amber-200 text-center font-serif leading-relaxed">
                  « {content.sections.dedication.goldenRatioQuote} »
                </blockquote>
              </div>
            </div>

            {/* Ultron, and a Missing Premise */}
            <div className="pt-6 border-t border-[#e3dacb] dark:border-stone-800 space-y-5">
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white font-serif">
                {content.sections.dedication.ultronTitle}
              </h3>

              <div className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed space-y-4 whitespace-pre-line font-serif">
                <p>{content.sections.dedication.ultronText}</p>
                <blockquote className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border-l-4 border-emerald-600 text-base sm:text-lg italic text-emerald-900 dark:text-emerald-200">
                  {content.sections.dedication.teilhardQuote}
                </blockquote>
                <p className="font-semibold">{content.sections.dedication.ultronQuestion}</p>
              </div>
            </div>

            {/* An Opening */}
            <div className="pt-6 border-t border-[#e3dacb] dark:border-stone-800 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white font-serif">
                {content.sections.dedication.openingTitle}
              </h3>

              <div className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed space-y-4 whitespace-pre-line font-serif">
                <p>{content.sections.dedication.openingText}</p>
              </div>

              <div className="text-right pt-4 text-sm font-bold text-stone-900 dark:text-white font-serif">
                — {content.sections.dedication.author}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e3dacb] dark:border-stone-800 px-4 sm:px-8 py-8 mt-16 text-center text-xs text-stone-500 dark:text-stone-400 space-y-2">
        <p>
          Développé sous l'architecture souveraine <strong>Shaper OS</strong> (Règle 0G & Règle 38) par{' '}
          <a href="https://xavdp.pro" className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline">
            Xavier de Poorter
          </a>
          .
        </p>
        <p>
          MeshFS v2.3.0 · Dépôt public :{' '}
          <a
            href="https://github.com/xavdp-pro/podmesh-meshfs"
            className="text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            github.com/xavdp-pro/podmesh-meshfs
          </a>{' '}
          · Paquets :{' '}
          <a href="https://deb.xavdp.pro" className="text-emerald-700 dark:text-emerald-400 hover:underline">
            deb.xavdp.pro
          </a>
        </p>
      </footer>
    </div>
  )
}
