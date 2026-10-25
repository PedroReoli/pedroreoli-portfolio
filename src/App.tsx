import React, { Suspense, lazy, useEffect, useRef } from "react"
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import HomePage from "./pages/HomePage"
import { LanguageProvider } from "./i18n/LanguageContext"
import { AnimatePresence, domAnimation, LazyMotion, MotionConfig } from "framer-motion"
import ScrollToTop from "./components/atoms/ScrollToTop"
import LanguageNotice from "./components/atoms/LanguageNotice"
import SiteHeader from "./components/organisms/SiteHeader"
import ContentBoundary from "./components/molecules/ContentBoundary"
import ContentStatus from "./components/molecules/ContentStatus"
import PageTransition from "./components/atoms/PageTransition"

const ProjectsPage = lazy(() => import("./pages/ProjectsPage"))
const MediaBlogPage = lazy(() => import("./pages/MediaBlogPage"))
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"))

const RoutedApp: React.FC = () => {
  const location = useLocation()
  const firstPath = useRef(location.pathname)
  const hasNavigated = useRef(false)
  const focusOnMount = hasNavigated.current || firstPath.current !== location.pathname
  useEffect(() => {
    if (firstPath.current !== location.pathname) hasNavigated.current = true
  }, [location.pathname])

  return (
    <>
      <LanguageNotice />
      <SiteHeader />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <ScrollToTop renderedPath={location.pathname} focusOnMount={focusOnMount} />
          <ContentBoundary fallback={<ContentStatus status="error" />}>
            <Suspense fallback={<ContentStatus status="loading" />}>
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
          </ContentBoundary>
        </PageTransition>
      </AnimatePresence>
    </>
  )
}

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <LazyMotion features={domAnimation} strict>
        {/* Cada animação usa o hook reativo local. O modo "user" do Framer 11
            captura a preferência na montagem e não acompanha mudanças em tempo real. */}
        <MotionConfig reducedMotion="never">
          <BrowserRouter>
            <RoutedApp />
          </BrowserRouter>
        </MotionConfig>
      </LazyMotion>
    </LanguageProvider>
  )
}

export default App
