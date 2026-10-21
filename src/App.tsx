import React, { Suspense, lazy } from "react"
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import HomePage from "./pages/HomePage"
import { LanguageProvider } from "./i18n/LanguageContext"
import { domAnimation, LazyMotion, MotionConfig } from "framer-motion"
import ScrollToTop from "./components/atoms/ScrollToTop"
import TransitionEffect from "./components/atoms/TransitionEffect"
import LanguageTransitionOverlay from "./components/atoms/LanguageTransitionOverlay"
import SiteHeader from "./components/organisms/SiteHeader"

const ProjectsPage = lazy(() => import("./pages/ProjectsPage"))
const MediaBlogPage = lazy(() => import("./pages/MediaBlogPage"))
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"))

const PageFallback: React.FC = () => (
  <main
    id="main-content"
    tabIndex={-1}
    className="grid min-h-screen min-h-[100svh] min-h-[100dvh] place-items-center bg-[#111010] pt-16 text-[#edeae4] focus:outline-none"
    aria-live="polite"
    aria-busy="true"
  >
    <span className="editorial-label text-[#8d8984]">Loading / Carregando</span>
  </main>
)

const RoutedApp: React.FC = () => {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <TransitionEffect key={location.pathname} />
      <LanguageTransitionOverlay />
      <SiteHeader />
      <Suspense fallback={<PageFallback />}>
        <Routes location={location}>
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
          <Route path="/midia-e-blog" element={<Navigate to="/midia-blog" replace />} />
          <Route path="/dossie-tecnico" element={<Navigate to="/" replace />} />
          <Route path="/dossie" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  )
}

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <BrowserRouter>
            <RoutedApp />
          </BrowserRouter>
        </MotionConfig>
      </LazyMotion>
    </LanguageProvider>
  )
}

export default App
