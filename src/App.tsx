import React, { Suspense, lazy } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import { LanguageProvider } from "./i18n/LanguageContext"
import { MotionConfig } from "framer-motion"

const ProjectsPage = lazy(() => import("./pages/ProjectsPage"))
const MediaBlogPage = lazy(() => import("./pages/MediaBlogPage"))
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"))

const PageFallback: React.FC = () => (
  <div className="grid min-h-screen place-items-center bg-[#111010] text-[#edeae4]" role="status">
    <span className="editorial-label text-[#77736f]">Loading / Carregando</span>
  </div>
)

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <Suspense fallback={<PageFallback />}>
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
          </Suspense>
        </BrowserRouter>
      </MotionConfig>
    </LanguageProvider>
  )
}

export default App
