import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProjectsPage from "./pages/ProjectsPage"
import MediaBlogPage from "./pages/MediaBlogPage"
import DossierPage from "./pages/DossierPage"
import { LanguageProvider } from "./i18n/LanguageContext"
import { MotionConfig } from "framer-motion"

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projetos" element={<ProjectsPage />} />
            {/* Suporte à rota direta solicitada com parâmetro /projetos=corporativos */}
            <Route path="/projetos=corporativos" element={<ProjectsPage defaultTab="corporativo" />} />
            <Route path="/projetos=coprporativos" element={<ProjectsPage defaultTab="corporativo" />} />
            <Route path="/projetos=gerais" element={<ProjectsPage defaultTab="gerais" />} />
            <Route path="/midia-blog" element={<MediaBlogPage />} />
            <Route path="/midia-e-blog" element={<MediaBlogPage />} />
            <Route path="/dossie-tecnico" element={<DossierPage />} />
            <Route path="/dossie" element={<DossierPage />} />
            {/* Fallback para home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </MotionConfig>
    </LanguageProvider>
  )
}

export default App
