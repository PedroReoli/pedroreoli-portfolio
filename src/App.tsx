import { LanguageProvider } from '@/context/LanguageContext'
import { RouterProvider, useRouter } from '@/context/RouterContext'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HomePage } from '@/pages/HomePage'
import { ProjectsPage } from '@/pages/ProjectsPage'
import { MediaPage } from '@/pages/MediaPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

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
      <main id="main-content" tabIndex={-1}>{pages[pathname] ?? <NotFoundPage />}</main>
      <Footer />
    </div>
  )
}

export function App() {
  return <LanguageProvider><RouterProvider><AppRoute /></RouterProvider></LanguageProvider>
}

export default App
