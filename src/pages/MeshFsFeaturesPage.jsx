import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  Sparkles,
  ExternalLink,
  BookOpen,
  Scale,
  ArrowLeft,
  ChevronRight,
  Code2,
  Copy,
  Check,
  Search,
  Layers,
  Terminal,
  Bot,
  Network,
} from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'
import LanguageSwitcher from '../components/LanguageSwitcher'
import ThemeToggle from '../components/ui/ThemeToggle'
import { meshfsContent } from '../data/meshfsPageContent'
import { meshfsFeaturesContent } from '../data/meshfsFeaturesContent'

export default function MeshFsFeaturesPage() {
  const { locale } = useI18n()
  const baseContent = meshfsContent[locale] || meshfsContent.fr
  const featContent = meshfsFeaturesContent[locale] || meshfsFeaturesContent.fr

  const [activeAudience, setActiveAudience] = useState('human') // 'human' | 'geek' | 'agent'
  const [selectedDomain, setSelectedDomain] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedCode, setCopiedCode] = useState(null)

  const copyToClipboard = (text, code) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const normalizedQuery = searchQuery.trim().toLowerCase()

  const filteredDomains = featContent.domains
    .filter((dom) => selectedDomain === 'all' || dom.id === selectedDomain)
    .map((dom) => ({
      ...dom,
      features: dom.features.filter((f) => {
        if (!normalizedQuery) return true
        return (
          f.code.toLowerCase().includes(normalizedQuery) ||
          f.title.toLowerCase().includes(normalizedQuery) ||
          f.badge.toLowerCase().includes(normalizedQuery) ||
          f.human.toLowerCase().includes(normalizedQuery) ||
          f.geek.toLowerCase().includes(normalizedQuery) ||
          f.agent.toLowerCase().includes(normalizedQuery) ||
          f.cli.toLowerCase().includes(normalizedQuery)
        )
      }),
    }))
    .filter((dom) => dom.features.length > 0)

  return (
    <div className="min-h-screen bg-[#faf7f2] dark:bg-[#0c1512] text-[#10231b] dark:text-[#eef4ef] font-sans antialiased transition-colors duration-200 selection:bg-emerald-500/20 selection:text-emerald-700 dark:selection:text-emerald-300">
      {/* Top Header with Page Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#faf7f2]/90 dark:bg-[#0c1512]/90 border-b border-[#e3dacb] dark:border-stone-800 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="w-8 h-8 rounded-lg bg-emerald-700 dark:bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
                M
              </span>
              <span className="font-bold text-lg tracking-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                MeshFS<span className="text-emerald-600 dark:text-emerald-400 text-xs ml-1 font-mono">v2.3</span>
              </span>
            </Link>

            {/* Primary Sub-Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-stone-200/70 dark:bg-stone-800/70 p-1 rounded-full border border-stone-300/50 dark:border-stone-700/50">
              <Link
                to="/"
                className="px-3.5 py-1 rounded-full text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
              >
                {featContent.nav.home}
              </Link>
              <Link
                to="/fonctionnalites"
                className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-700 text-white shadow-sm flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{featContent.nav.features}</span>
              </Link>
              <Link
                to="/comparatif"
                className="px-3.5 py-1 rounded-full text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors flex items-center gap-1"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{featContent.nav.compare}</span>
              </Link>
              <a
                href="https://pmbs.xavdp.pro"
                className="px-3.5 py-1 rounded-full text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
              >
                {featContent.nav.pmbs}
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/comparatif"
              className="md:hidden flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-200"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>VS</span>
            </Link>
            <LanguageSwitcher />
            <ThemeToggle />
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

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-8 pt-10 pb-12 border-b border-[#e3dacb] dark:border-stone-800">
        <div className="max-w-5xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-700/10 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            <span>{featContent.hero.kicker}</span>
          </div>

          <h1 className="comparison-hero-title font-extrabold tracking-tight text-stone-900 dark:text-white leading-[1.12]">
            {featContent.hero.title}
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
            {featContent.hero.subtitle}
          </p>

          {/* 4 Key Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2">
            {featContent.stats.map((st, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white dark:bg-[#121c17] border border-[#e3dacb] dark:border-stone-800 shadow-sm"
              >
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">
                  {st.value}
                </div>
                <div className="text-xs text-stone-600 dark:text-stone-400 font-medium mt-0.5">{st.label}</div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-xs font-mono text-emerald-800 dark:text-emerald-400 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{featContent.hero.badge}</span>
          </div>
        </div>
      </section>

      {/* Sticky Audience Switcher & Search Bar */}
      <section className="sticky top-[61px] z-30 bg-[#faf7f2]/95 dark:bg-[#0c1512]/95 backdrop-blur border-b border-[#e3dacb] dark:border-stone-800 px-4 py-3">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Audience Toggle */}
          <div className="inline-flex rounded-full bg-stone-200/80 dark:bg-stone-800/80 p-1 border border-stone-300/50 dark:border-stone-700/50 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setActiveAudience('human')}
              className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeAudience === 'human'
                  ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {baseContent.audienceToggle.human}
            </button>
            <button
              type="button"
              onClick={() => setActiveAudience('geek')}
              className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeAudience === 'geek'
                  ? 'bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {baseContent.audienceToggle.geek}
            </button>
            <button
              type="button"
              onClick={() => setActiveAudience('agent')}
              className={`flex-1 md:flex-none px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeAudience === 'agent'
                  ? 'bg-white dark:bg-stone-900 text-purple-600 dark:text-purple-400 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {baseContent.audienceToggle.agent}
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={featContent.hero.searchPlaceholder}
              className="w-full pl-9 pr-4 py-1.5 rounded-full text-xs bg-white dark:bg-stone-900 border border-[#e3dacb] dark:border-stone-700 text-stone-800 dark:text-stone-100 focus:outline-none focus:border-emerald-600"
            />
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10 space-y-12">
        {/* Domain Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(featContent.domainFilters).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedDomain(key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                selectedDomain === key
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                  : 'bg-white dark:bg-[#121c17] text-stone-600 dark:text-stone-300 border-[#e3dacb] dark:border-stone-800 hover:border-emerald-500'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Feature Domains */}
        {filteredDomains.map((dom, domIdx) => (
          <section
            key={dom.id}
            className={`space-y-5 ${domIdx > 0 ? 'feature-domain-deferred' : ''}`}
          >
            <div className="border-b border-[#e3dacb] dark:border-stone-800 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#b4562c]">
                {dom.code}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-0.5">
                {dom.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
                {dom.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {dom.features.map((feat) => (
                <article
                  key={feat.code}
                  className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#121c17] border border-[#e3dacb] dark:border-stone-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-emerald-600/50 transition-colors"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-700 text-white font-mono text-xs font-bold">
                        {feat.code}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-white leading-snug">
                      {feat.title}
                    </h3>

                    {activeAudience === 'human' && (
                      <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                        {feat.human}
                      </p>
                    )}

                    {activeAudience === 'geek' && (
                      <div className="p-3.5 rounded-xl bg-[#faf7f2] dark:bg-stone-900/60 border border-[#e3dacb] dark:border-stone-800 text-xs font-mono text-stone-700 dark:text-stone-300 leading-relaxed">
                        {feat.geek}
                      </div>
                    )}

                    {activeAudience === 'agent' && (
                      <div className="p-3.5 rounded-xl bg-purple-950/15 border border-purple-500/30 text-xs font-mono text-purple-800 dark:text-purple-300 leading-relaxed">
                        {feat.agent}
                      </div>
                    )}
                  </div>

                  {/* Native <details> disclosure so CLI/API specs remain searchable via browser Ctrl+F */}
                  <details className="group pt-2 border-t border-[#e3dacb]/60 dark:border-stone-800">
                    <summary className="flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400 select-none py-1">
                      <span className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>{featContent.hero.expandSpecLabel}</span>
                      </span>
                      <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
                    </summary>

                    <div className="mt-2.5 p-3 rounded-xl bg-stone-900 text-stone-100 font-mono text-[11px] overflow-x-auto space-y-2">
                      <div className="flex items-center justify-between border-b border-stone-800 pb-1.5">
                        <span className="text-stone-400">{feat.code} · Debian 13 CLI / API</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(feat.cli, feat.code)}
                          className="flex items-center gap-1 px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-[10px] font-sans"
                        >
                          {copiedCode === feat.code ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>
                            {copiedCode === feat.code ? featContent.hero.copiedBtn : featContent.hero.copyBtn}
                          </span>
                        </button>
                      </div>
                      <pre className="text-emerald-400 leading-relaxed whitespace-pre-wrap break-all">
                        {feat.cli}
                      </pre>
                    </div>
                  </details>
                </article>
              ))}
            </div>
          </section>
        ))}

        {/* Bottom Navigation Callout */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121c17] border border-[#e3dacb] dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <h3 className="text-lg font-extrabold text-stone-900 dark:text-white">
              {locale === 'en'
                ? 'Want to see how these 28 features compare to Ceph, Cubbit, MinIO, or PBS?'
                : locale === 'es'
                  ? '¿Quieres ver cómo se comparan estas 28 funcionalidades frente a Ceph, Cubbit, MinIO o PBS?'
                  : 'Envie de voir comment ces 28 fonctionnalités se comparent à Ceph, Cubbit, MinIO ou PBS ?'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              {locale === 'en'
                ? 'Explore our 12-ecosystem confrontation matrix.'
                : locale === 'es'
                  ? 'Explora nuestra matriz comparativa frente a 12 ecosistemas.'
                  : 'Consultez notre matrice de confrontation face aux 12 écosystèmes du marché.'}
            </p>
          </div>
          <Link
            to="/comparatif"
            className="px-5 py-2.5 rounded-full bg-[#b4562c] hover:bg-[#9a4621] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shrink-0 shadow-sm"
          >
            <Scale className="w-4 h-4" />
            <span>{featContent.nav.compare}</span>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e3dacb] dark:border-stone-800 px-4 sm:px-8 py-8 mt-16 text-center text-xs text-stone-500 dark:text-stone-400 space-y-2">
        <p>
          Développé sous l&apos;architecture souveraine <strong>Shaper OS</strong> (Règle 0G &amp; Règle 38) par{' '}
          <a href="https://xavdp.pro" className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline">
            Xavier de Poorter
          </a>
          .
        </p>
        <p>
          <Link to="/" className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold">
            meshfs.xavdp.pro
          </Link>{' '}
          ·{' '}
          <Link to="/fonctionnalites" className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold">
            meshfs.xavdp.pro/fonctionnalites
          </Link>{' '}
          ·{' '}
          <Link to="/comparatif" className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold">
            meshfs.xavdp.pro/comparatif
          </Link>
        </p>
      </footer>
    </div>
  )
}
