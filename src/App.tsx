import { LanguageProvider } from '@/context/LanguageContext'
import { RouterProvider, useRouter } from '@/context/RouterContext'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HomePage } from '@/pages/HomePage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { MediaPage } from '@/pages/MediaPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { LazyMotion, MotionConfig, domAnimation, m, AnimatePresence } from 'motion/react'

function AppRoute() {
  const { pathname } = useRouter()
  const pages: Record<string, React.ReactNode> = {
    '/': <HomePage />,
    '/projetos': <ProjectsPage />,
    '/midia-blog': <MediaPage />,
    '/404': <NotFoundPage />,
  }

  return (
    <div className="app-shell">
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <m.main
          id="main-content"
          key={pathname}
          tabIndex={-1}
          className="app-main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          {pages[pathname] ?? <NotFoundPage />}
        </m.main>
      </AnimatePresence>
      <div className="app-footer">
        <Footer />
      </div>
    </div>
  )
}

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <LanguageProvider><RouterProvider><AppRoute /></RouterProvider></LanguageProvider>
      </LazyMotion>
    </MotionConfig>
  )
}

export default App
