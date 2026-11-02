import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { RouterProvider, useRouter } from '@/context/RouterContext';
import { SkipLink } from '@/components/layout/SkipLink';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HomePage } from '@/pages/HomePage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { MediaPage } from '@/pages/MediaPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

const AppContent: React.FC = () => {
  const { pathname } = useRouter();

  const renderCurrentRoute = () => {
    switch (pathname) {
      case '/':
        return <HomePage />;
      case '/projetos':
        return <ProjectsPage />;
      case '/midia-blog':
        return <MediaPage />;
      case '/404':
        return <NotFoundPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink font-sans selection:bg-signal selection:text-white">
      <SkipLink />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {renderCurrentRoute()}
      </main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </LanguageProvider>
  );
};

export default App;
