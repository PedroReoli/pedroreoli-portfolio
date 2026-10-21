import React, { Suspense, lazy } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import { LanguageProvider } from "./i18n/LanguageContext"
import { domAnimation, LazyMotion, MotionConfig } from "framer-motion"

const ProjectsPage = lazy(() => import("./pages/ProjectsPage"))
const MediaBlogPage = lazy(() => import("./pages/MediaBlogPage"))
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"))

const PageFallback: React.FC = () => (
  <div
    className="grid min-h-[100dvh] place-items-center bg-[#111010] text-[#edeae4]"
    role="status"
  >
    <span className="editorial-label text-[#77736f]">Loading / Carregando</span>
  </div>
)

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <BrowserRouter>
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projetos" element={<ProjectsPage />} />
                <Route
                  path="/projetos=corporativos"
                  element={<Navigate to="/projetos?tipo=corporativo" replace />}
                />
                <Route
                  path="/projetos=coprporativos"
                  element={<Navigate to="/projetos?tipo=corporativo" replace />}
                />
                <Route
                  path="/projetos=gerais"
                  element={<Navigate to="/projetos?tipo=gerais" replace />}
                />
                <Route path="/midia-blog" element={<MediaBlogPage />} />
                <Route
                  path="/midia-e-blog"
                  element={<Navigate to="/midia-blog" replace />}
                />
                <Route
                  path="/dossie-tecnico"
                  element={<Navigate to="/" replace />}
                />
                <Route path="/dossie" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </MotionConfig>
      </LazyMotion>
    </LanguageProvider>
  )
}

export default App
