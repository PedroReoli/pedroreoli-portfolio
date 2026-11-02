import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { interfaceContent } from '@/data/content';

export const SkipLink: React.FC = () => {
  const { language } = useLanguage();
  const label = interfaceContent.header[language].skip;

  return (
    <a
      href={interfaceContent.header.skipHref}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-5 focus:py-3 focus:bg-ink focus:text-paper-light focus:font-medium focus:text-sm focus:rounded focus:shadow-xl focus:ring-2 focus:ring-signal"
    >
      {label}
    </a>
  );
};
