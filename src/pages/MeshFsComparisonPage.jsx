import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  Sparkles,
  ExternalLink,
  BookOpen,
  Scale,
  Layers,
  CheckCircle2,
  ArrowLeft,
  ChevronRight,
  Code2,
  Cpu,
  HardDrive,
  Filter,
} from 'lucide-react'
import { useI18n } from '../i18n/I18nProvider'
import LanguageSwitcher from '../components/LanguageSwitcher'
import ThemeToggle from '../components/ui/ThemeToggle'
import { meshfsContent } from '../data/meshfsPageContent'
import { meshfsComparisonContent } from '../data/meshfsComparisonContent'

export default function MeshFsComparisonPage() {
  const { locale } = useI18n()
  const baseContent = meshfsContent[locale] || meshfsContent.fr
  const cmp = meshfsComparisonContent[locale] || meshfsComparisonContent.fr

  const [activeAudience, setActiveAudience] = useState('human') // 'human' | 'geek' | 'agent'
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredCompetitors =
    selectedCategory === 'all'
      ? cmp.competitorsSection.items
      : cmp.competitorsSection.items.filter((item) => item.category === selectedCategory)

  const tableCssVars = {
    '--label-2': `"${cmp.matrixSection.headers[1]}"`,
    '--label-3': `"${cmp.matrixSection.headers[2]}"`,
    '--label-4': `"${cmp.matrixSection.headers[3]}"`,
    '--label-5': `"${cmp.matrixSection.headers[4]}"`,
    '--label-6': `"${cmp.matrixSection.headers[5]}"`,
    '--label-7': `"${cmp.matrixSection.headers[6]}"`,
    '--label-8': `"${cmp.matrixSection.headers[7]}"`,
  }

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
                {cmp.nav.home}
              </Link>
              <Link
                to="/comparatif"
                className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-700 text-white shadow-sm flex items-center gap-1.5"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{cmp.nav.compare}</span>
              </Link>
              <a
                href="https://pmbs.xavdp.pro"
                className="px-3.5 py-1 rounded-full text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
              >
                {cmp.nav.pmbs}
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="md:hidden flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>MeshFS</span>
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
      <section className="relative overflow-hidden px-4 sm:px-8 pt-10 pb-14 border-b border-[#e3dacb] dark:border-stone-800">
        <div className="max-w-5xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#b4562c]/10 text-[#b4562c] text-xs font-bold uppercase tracking-widest">
            <Scale className="w-3.5 h-3.5" />
            <span>{cmp.hero.kicker}</span>
          </div>

          <h1 className="comparison-hero-title font-extrabold tracking-tight text-stone-900 dark:text-white leading-[1.12]">
            {cmp.hero.title}
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
            {cmp.hero.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#matrix"
              className="px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
            >
              <span>{cmp.hero.jumpMatrix}</span>
              <ChevronRight className="w-4 h-4" />
            </a>
            <Link
              to="/"
              className="px-5 py-2.5 rounded-full bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-semibold text-xs sm:text-sm transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{cmp.hero.backHome}</span>
            </Link>
          </div>

          <div className="pt-3 text-xs font-mono text-emerald-800 dark:text-emerald-400 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{cmp.hero.badge}</span>
          </div>
        </div>
      </section>

      {/* Global Audience Switcher (Human / Geek / AI Agent) */}
      <section className="sticky top-[61px] z-30 bg-[#faf7f2]/95 dark:bg-[#0c1512]/95 backdrop-blur border-b border-[#e3dacb] dark:border-stone-800 px-4 py-3">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
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
              {baseContent.audienceToggle.human}
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
              {baseContent.audienceToggle.geek}
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
              {baseContent.audienceToggle.agent}
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
        {/* Section 1: The 6-in-1 CAS Unification Singularity */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121c17] border border-[#e3dacb] dark:border-stone-800 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b4562c]">
              {cmp.unificationBanner.kicker}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
              {cmp.unificationBanner.title}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-4xl">
              {cmp.unificationBanner.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cmp.unificationBanner.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#faf7f2] dark:bg-stone-900/60 border border-[#e3dacb] dark:border-stone-800 space-y-1.5"
              >
                <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  {pillar.code}
                </div>
                <div className="font-bold text-stone-900 dark:text-white text-sm sm:text-base">
                  {pillar.title}
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {pillar.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Master Responsive Comparison Table */}
        <section id="matrix" className="space-y-5">
          <div className="border-b border-[#e3dacb] dark:border-stone-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b4562c]">
              {cmp.matrixSection.kicker}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
              {cmp.matrixSection.title}
            </h2>
          </div>

          <div
            tabIndex={0}
            role="region"
            aria-labelledby="comparison-table-caption"
            className="table-wrapper shadow-sm"
          >
            <table style={tableCssVars} className="text-left text-xs sm:text-sm">
              <caption id="comparison-table-caption" className="sr-only">
                {cmp.matrixSection.caption}
              </caption>
              <thead>
                <tr className="bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-b border-[#e3dacb] dark:border-stone-800">
                  {cmp.matrixSection.headers.map((header, idx) => (
                    <th
                      key={idx}
                      scope="col"
                      className="py-3.5 px-4 font-bold whitespace-nowrap border-b border-[#e3dacb] dark:border-stone-800"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e3dacb] dark:divide-stone-800">
                {cmp.matrixSection.rows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className={
                      row.isMeshfs
                        ? 'bg-emerald-50/90 dark:bg-emerald-950/40 font-semibold text-stone-900 dark:text-white'
                        : 'hover:bg-stone-50/80 dark:hover:bg-stone-900/40 transition-colors'
                    }
                  >
                    <th
                      scope="row"
                      className={`py-3.5 px-4 font-bold whitespace-nowrap border-r border-[#e3dacb]/60 dark:border-stone-800/60 ${
                        row.isMeshfs
                          ? '!bg-emerald-100 dark:!bg-emerald-950 text-emerald-950 dark:text-emerald-200'
                          : 'text-stone-900 dark:text-stone-100'
                      }`}
                    >
                      {row.name}
                    </th>
                    <td className="py-3 px-4 text-stone-600 dark:text-stone-300">{row.family}</td>
                    <td className="py-3 px-4 font-mono text-xs text-stone-700 dark:text-stone-300">
                      {row.ram}
                    </td>
                    <td className="py-3 px-4">{row.dedup}</td>
                    <td className="py-3 px-4">{row.mounts}</td>
                    <td className="py-3 px-4">{row.s3}</td>
                    <td className="py-3 px-4">{row.heal}</td>
                    <td className="py-3 px-4">{row.sovereignty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Deep-Dive Radiographies by Ecosystem */}
        <section id="deep-dive" className="space-y-6">
          <div className="border-b border-[#e3dacb] dark:border-stone-800 pb-4 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b4562c]">
              {cmp.competitorsSection.kicker}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
              {cmp.competitorsSection.title}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300">
              {cmp.competitorsSection.lead}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Famille :</span>
            </span>
            {Object.entries(cmp.filterLabels).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedCategory(key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  selectedCategory === key
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                    : 'bg-white dark:bg-[#121c17] text-stone-600 dark:text-stone-300 border-[#e3dacb] dark:border-stone-800 hover:border-emerald-500'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Competitor Cards */}
          <div className="grid grid-cols-1 gap-6">
            {filteredCompetitors.map((item) => (
              <article
                key={item.id}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#121c17] border border-[#e3dacb] dark:border-stone-800 shadow-sm space-y-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e3dacb]/70 dark:border-stone-800 pb-4">
                  <div>
                    <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 mb-1.5">
                      {item.badge}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 dark:text-white">
                      {item.name}
                    </h3>
                  </div>

                  <div className="text-xs font-mono px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300">
                    <span className="text-stone-400 mr-1.5">{cmp.competitorsSection.labels.resemblance}:</span>
                    <strong className="text-[#b4562c] dark:text-amber-400">{item.proximity}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#faf7f2] dark:bg-stone-900/50 border border-[#e3dacb] dark:border-stone-800 space-y-1.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                      ✓ {cmp.competitorsSection.labels.whatItDoesWell}
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                      {item.whatItDoesWell}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                      ⚡ {cmp.competitorsSection.labels.whereMeshFsWins}
                    </div>
                    <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                      {item.whereMeshFsWins}
                    </p>
                  </div>
                </div>

                {/* Audience-Specific Synthesis */}
                <div className="pt-1">
                  {activeAudience === 'human' && (
                    <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/15 border border-amber-300/50 dark:border-amber-700/30 text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                      <strong className="text-[#b4562c] dark:text-amber-400 mr-1.5">
                        👤 {cmp.competitorsSection.labels.verdict} :
                      </strong>
                      {item.human}
                    </div>
                  )}

                  {activeAudience === 'geek' && (
                    <div className="p-4 rounded-xl bg-stone-900 text-stone-100 font-mono text-xs leading-relaxed border border-stone-800">
                      <div className="text-emerald-400 font-bold mb-1">
                        ⚡ Diagnostic Ingénieur & Architecture Système :
                      </div>
                      {item.geek}
                    </div>
                  )}

                  {activeAudience === 'agent' && (
                    <div className="p-4 rounded-xl bg-purple-950/20 text-purple-800 dark:text-purple-300 font-mono text-xs border border-purple-500/30 leading-relaxed">
                      <div className="flex items-center gap-1.5 font-bold mb-1">
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Contrat Formel Agent IA (Shaper OS) :</span>
                      </div>
                      {item.agent}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Section 4: Conclusion & Decision Cards */}
        <section className="space-y-6">
          <div className="border-b border-[#e3dacb] dark:border-stone-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#b4562c]">
              {cmp.conclusionSection.kicker}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
              {cmp.conclusionSection.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cmp.conclusionSection.cards.map((card, i) => (
              <div
                key={i}
                className={`p-6 sm:p-8 rounded-2xl border space-y-3 ${
                  card.tone === 'emerald'
                    ? 'bg-emerald-900 text-white border-emerald-700 shadow-lg'
                    : 'bg-white dark:bg-[#121c17] text-stone-800 dark:text-stone-200 border-[#e3dacb] dark:border-stone-800'
                }`}
              >
                <h3 className="text-lg sm:text-xl font-extrabold flex items-center gap-2">
                  {card.tone === 'emerald' && <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />}
                  <span>{card.title}</span>
                </h3>
                <p
                  className={`text-sm sm:text-base leading-relaxed ${
                    card.tone === 'emerald' ? 'text-emerald-100' : 'text-stone-600 dark:text-stone-400'
                  }`}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
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
          <Link to="/comparatif" className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold">
            meshfs.xavdp.pro/comparatif
          </Link>{' '}
          · Paquets Debian 13 :{' '}
          <a href="https://deb.xavdp.pro" className="text-emerald-700 dark:text-emerald-400 hover:underline">
            deb.xavdp.pro
          </a>
        </p>
      </footer>
    </div>
  )
}
