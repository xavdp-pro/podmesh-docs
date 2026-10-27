import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { I18nProvider } from './i18n/I18nProvider'
import TechnicalShowcasePage from './pages/TechnicalShowcasePage'
import ValidationPage from './pages/ValidationPage'
import FractalsPage from './pages/FractalsPage'

// PodMesh Documentation & Interactive 2D/3D Fractal Cathedral Didactic Showcase (v2.3.0)
// 100% Read-Only Public Documentation & Didactic Sandbox Mode (https://podmesh.xavdp.pro).
// Default root `/` serves TechnicalShowcasePage; `/cathedrale` serves FractalsPage.
export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          {/* Default root route: Public Documentation & Technical Showcase */}
          <Route path="/" element={<TechnicalShowcasePage />} />

          {/* Interactive 2D/3D Fractal Cathedral Didactic Simulator Routes */}
          <Route path="/cathedrale" element={<FractalsPage />} />
          <Route path="/fractale" element={<FractalsPage />} />
          <Route path="/fractales" element={<FractalsPage />} />

          {/* Documentation & SLA Verification Aliases */}
          <Route path="/showcase" element={<TechnicalShowcasePage />} />
          <Route path="/technical-showcase" element={<TechnicalShowcasePage />} />
          <Route path="/docs" element={<TechnicalShowcasePage />} />
          <Route path="/validation" element={<ValidationPage />} />
          <Route path="/sla" element={<ValidationPage />} />

          {/* Fallback to public documentation root */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  )
}
