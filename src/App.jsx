import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { I18nProvider } from './i18n/I18nProvider'
import CockpitPage from './pages/CockpitPage'
import TechnicalShowcasePage from './pages/TechnicalShowcasePage'
import MeshFsShowcasePage from './pages/MeshFsShowcasePage'
import MeshFsComparisonPage from './pages/MeshFsComparisonPage'
import PmbsShowcasePage from './pages/PmbsShowcasePage'
import ValidationPage from './pages/ValidationPage'
import FractalsPage from './pages/FractalsPage'

// Détection intelligente du domaine pour séparer nettement :
// 1. pmbs.xavdp.pro     --> Showcase dédié PMBS v2.3.0 (Backup & Rétention)
// 2. meshfs.xavdp.pro   --> Showcase dédié MeshFS v2.3.0 (Stockage CAS 4Mo)
// 3. podmesh.xavdp.pro  --> Site documentaire & vitrine officielle PodMesh
// 4. podmesh0.xavdp.pro & localhost:7620 --> Cockpit d'exploitation & administration pure
const getInitialView = () => {
  if (typeof window === 'undefined') return 'cockpit'
  const host = window.location.hostname
  const search = window.location.search

  // Sous-domaine dédié pmbs.xavdp.pro, backup.xavdp.pro ou paramètre explicite ?pmbs
  if (host === 'pmbs.xavdp.pro' || host === 'backup.xavdp.pro' || search.includes('pmbs')) {
    return 'pmbs'
  }

  // Sous-domaine dédié meshfs.xavdp.pro ou paramètre explicite ?meshfs
  if (host === 'meshfs.xavdp.pro' || search.includes('meshfs')) {
    return 'meshfs'
  }

  // Sur le domaine public de documentation podmesh.xavdp.pro (sans param admin) -> Vitrine PodMesh
  if (host === 'podmesh.xavdp.pro' && !search.includes('admin') && !search.includes('cockpit')) {
    return 'showcase'
  }

  // Par défaut sur localhost, 127.0.0.1, port 7620, ou sous-domaine podmesh0 -> COCKPIT D'EXPLOITATION
  return 'cockpit'
}

export default function App() {
  const initialView = getInitialView()

  return (
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          {/* Racine dynamique selon le domaine : */}
          {/* pmbs.xavdp.pro -> PmbsShowcasePage */}
          {/* meshfs.xavdp.pro -> MeshFsShowcasePage */}
          {/* podmesh.xavdp.pro -> TechnicalShowcasePage */}
          {/* podmesh0 / local -> CockpitPage */}
          <Route
            path="/"
            element={
              initialView === 'pmbs' ? (
                <PmbsShowcasePage />
              ) : initialView === 'meshfs' ? (
                <MeshFsShowcasePage />
              ) : initialView === 'showcase' ? (
                <TechnicalShowcasePage />
              ) : (
                <CockpitPage />
              )
            }
          />

          {/* Routes directes explicites */}
          <Route path="/pmbs" element={<PmbsShowcasePage />} />
          <Route path="/backup" element={<PmbsShowcasePage />} />
          <Route path="/meshfs" element={<MeshFsShowcasePage />} />
          <Route path="/comparatif" element={<MeshFsComparisonPage />} />
          <Route path="/compare" element={<MeshFsComparisonPage />} />
          <Route path="/vs" element={<MeshFsComparisonPage />} />
          <Route path="/meshfs/comparatif" element={<MeshFsComparisonPage />} />
          <Route path="/meshfs/compare" element={<MeshFsComparisonPage />} />
          <Route path="/admin" element={<CockpitPage />} />
          <Route path="/cockpit" element={<CockpitPage />} />
          <Route path="/exploitation" element={<CockpitPage />} />
          <Route path="/fractale" element={<FractalsPage />} />
          <Route path="/fractales" element={<FractalsPage />} />
          <Route path="/cathedrale" element={<FractalsPage />} />

          <Route path="/showcase" element={<TechnicalShowcasePage />} />
          <Route path="/technical-showcase" element={<TechnicalShowcasePage />} />
          <Route path="/docs" element={<TechnicalShowcasePage />} />
          <Route path="/validation" element={<ValidationPage />} />
          <Route path="/sla" element={<ValidationPage />} />

          {/* Fallback */}
          <Route
            path="*"
            element={
              <Navigate
                to={initialView === 'pmbs' ? '/pmbs' : initialView === 'meshfs' ? '/meshfs' : initialView === 'showcase' ? '/showcase' : '/admin'}
                replace
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  )
}
