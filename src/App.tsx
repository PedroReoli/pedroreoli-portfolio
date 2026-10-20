import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProjectsPage from "./pages/ProjectsPage"
import MediaBlogPage from "./pages/MediaBlogPage"
import NotFoundPage from "./pages/NotFoundPage"
import { LanguageProvider } from "./i18n/LanguageContext"
import { MotionConfig } from "framer-motion"

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <Routes>
            {/* Página 1: Início */}
            <Route path="/" element={<HomePage />} />

            {/* Página 2: Projetos */}
            <Route path="/projetos" element={<ProjectsPage />} />
            <Route path="/projetos=corporativos" element={<ProjectsPage defaultTab="corporativo" />} />
            <Route path="/projetos=coprporativos" element={<ProjectsPage defaultTab="corporativo" />} />
            <Route path="/projetos=gerais" element={<ProjectsPage defaultTab="gerais" />} />

            {/* Página 3: Mídia & Blog */}
            <Route path="/midia-blog" element={<MediaBlogPage />} />
            <Route path="/midia-e-blog" element={<MediaBlogPage />} />

            {/* Redirecionamentos de rotas antigas */}
            <Route path="/dossie-tecnico" element={<Navigate to="/" replace />} />
            <Route path="/dossie" element={<Navigate to="/" replace />} />

            {/* Página 404 dedicada */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </MotionConfig>
    </LanguageProvider>
  )
}

export default App
