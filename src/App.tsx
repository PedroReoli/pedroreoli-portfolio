import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProjectsPage from "./pages/ProjectsPage"
import MediaBlogPage from "./pages/MediaBlogPage"
import { LanguageProvider } from "./i18n/LanguageContext"
import { MotionConfig } from "framer-motion"

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <Routes>
            {/* Página 1: Início (Hero 100dvh + Destaques de Imprensa + Dossiê Integrado) */}
            <Route path="/" element={<HomePage />} />

            {/* Página 2: Projetos (Corporativo Autocom3 com 6 módulos & Gerais Flagship) */}
            <Route path="/projetos" element={<ProjectsPage />} />
            <Route path="/projetos=corporativos" element={<ProjectsPage defaultTab="corporativo" />} />
            <Route path="/projetos=coprporativos" element={<ProjectsPage defaultTab="corporativo" />} />
            <Route path="/projetos=gerais" element={<ProjectsPage defaultTab="gerais" />} />

            {/* Página 3: Mídia & Blog */}
            <Route path="/midia-blog" element={<MediaBlogPage />} />
            <Route path="/midia-e-blog" element={<MediaBlogPage />} />

            {/* Redirecionamentos de rota do dossiê para a home com âncora */}
            <Route path="/dossie-tecnico" element={<Navigate to="/" replace />} />
            <Route path="/dossie" element={<Navigate to="/" replace />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </MotionConfig>
    </LanguageProvider>
  )
}

export default App
