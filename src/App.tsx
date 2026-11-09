import { useEffect, useRef } from 'react'
import { LanguageProvider } from '@/context/LanguageContext'
import { RouterProvider, useRouter } from '@/context/RouterContext'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HomePage } from '@/pages/HomePage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { MediaPage } from '@/pages/MediaPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { DesignSystemPreview } from '@/components/layout/DesignSystemPreview'
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'

function AppRoute() {
  const { pathname } = useRouter()
  const previous = useRef(pathname)
  const main = useRef<HTMLElement>(null)
  useEffect(() => {
    if (previous.current !== pathname && !window.location.hash) main.current?.focus({ preventScroll: true })
    previous.current = pathname
  }, [pathname])
  const pages: Record<string, React.ReactNode> = {
    '/': <HomePage />,
    '/projetos': <ProjectsPage />,
    '/midia-blog': <MediaPage />,
    '/notas': <MediaPage />,
    '/404': <NotFoundPage />,
    ...(import.meta.env.DEV ? { '/design-system': <DesignSystemPreview /> } : {}),
  }
  return (
    <div className="app-shell">
      <Header />
      <main ref={main} id="main-content" tabIndex={-1} className="app-main">{pages[pathname] ?? <NotFoundPage />}</main>
      <div className="app-footer"><Footer /></div>
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
