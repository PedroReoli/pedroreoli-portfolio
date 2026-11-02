import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { siteContent } from '@/data/content';

interface RouterContextType {
  pathname: string;
  search: string;
  searchParams: URLSearchParams;
  navigate: (to: string, options?: { replace?: boolean }) => void;
  setSearchParam: (key: string, value: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

function resolveAlias(to: string): string {
  for (const alias of siteContent.routes.aliases) {
    if (to === alias.from) {
      return alias.to;
    }
    // Also handle trailing slashes
    if (to.replace(/\/$/, '') === alias.from) {
      return alias.to;
    }
  }
  return to;
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUrl, setCurrentUrl] = useState<string>(() => {
    if (typeof window === 'undefined') return '/';
    const resolved = resolveAlias(window.location.pathname + window.location.search);
    if (resolved !== window.location.pathname + window.location.search) {
      window.history.replaceState(null, '', resolved);
    }
    return resolved;
  });

  const pathname = useMemo(() => {
    const qIndex = currentUrl.indexOf('?');
    const path = qIndex >= 0 ? currentUrl.substring(0, qIndex) : currentUrl;
    return path || '/';
  }, [currentUrl]);

  const search = useMemo(() => {
    const qIndex = currentUrl.indexOf('?');
    return qIndex >= 0 ? currentUrl.substring(qIndex) : '';
  }, [currentUrl]);

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const navigate = useCallback((to: string, options?: { replace?: boolean }) => {
    const resolved = resolveAlias(to);
    if (options?.replace) {
      window.history.replaceState(null, '', resolved);
    } else {
      window.history.pushState(null, '', resolved);
    }
    setCurrentUrl(resolved);

    // Scroll to top or target hash
    if (resolved.includes('#')) {
      const hash = resolved.split('#')[1];
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const setSearchParam = useCallback((key: string, value: string) => {
    const sp = new URLSearchParams(window.location.search);
    if (value) {
      sp.set(key, value);
    } else {
      sp.delete(key);
    }
    const newSearch = sp.toString() ? `?${sp.toString()}` : '';
    const newUrl = `${window.location.pathname}${newSearch}`;
    window.history.replaceState(null, '', newUrl);
    setCurrentUrl(newUrl);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const resolved = resolveAlias(window.location.pathname + window.location.search);
      setCurrentUrl(resolved);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (!window.location.hash) return;

    const targetId = decodeURIComponent(window.location.hash.slice(1));
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'instant' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  const value = useMemo(
    () => ({
      pathname,
      search,
      searchParams,
      navigate,
      setSearchParam,
    }),
    [pathname, search, searchParams, navigate, setSearchParam]
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export function useRouter(): RouterContextType {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}
