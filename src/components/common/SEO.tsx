import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { siteContent, interfaceContent } from '@/data/content';

interface SEOProps {
  pageKey: 'home' | 'projects' | 'media' | 'notFound';
}

export const SEO: React.FC<SEOProps> = ({ pageKey }) => {
  const { language } = useLanguage();

  useEffect(() => {
    const pageSeo = interfaceContent.seo[pageKey][language];
    const pageTitle = pageKey === 'home'
      ? `${siteContent.name} | ${pageSeo.title}`
      : `${pageSeo.title} | ${siteContent.name}`;

    document.title = pageTitle;

    // Helper to set meta tag content
    const setMeta = (nameOrProperty: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${nameOrProperty}"]` : `meta[name="${nameOrProperty}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', nameOrProperty);
        } else {
          element.setAttribute('name', nameOrProperty);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMeta('description', pageSeo.description);
    setMeta('og:title', pageTitle, true);
    setMeta('og:description', pageSeo.description, true);
    setMeta('twitter:title', pageTitle);
    setMeta('twitter:description', pageSeo.description);

    const canonicalPath =
      pageKey === 'home'
        ? '/'
        : pageKey === 'projects'
        ? siteContent.routes.projects
        : pageKey === 'media'
        ? siteContent.routes.media
        : siteContent.routes.notFound;

    const fullUrl = `${siteContent.siteUrl}${canonicalPath}`;
    setMeta('og:url', fullUrl, true);
    setMeta('twitter:url', fullUrl);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);
  }, [pageKey, language]);

  return null;
};
