import siteContentRaw from '@content/siteContent.json';
import interfaceContentRaw from '@content/interfaceContent.json';
import homeContentRaw from '@content/homeContent.json';
import projectsContentRaw from '@content/projectsContent.json';
import mediaContentRaw from '@content/mediaContent.json';
import technologyContentRaw from '@content/technologyContent.json';

import type {
  SiteContent,
  InterfaceContent,
  HomeContent,
  ProjectsContent,
  MediaContent,
  TechnologyContent,
  Language,
  LocalizedString,
} from '@/types/content';

export const siteContent = siteContentRaw as SiteContent;
export const interfaceContent = interfaceContentRaw as InterfaceContent;
export const homeContent = homeContentRaw as unknown as HomeContent;
export const projectsContent = projectsContentRaw as ProjectsContent;
export const mediaContent = mediaContentRaw as MediaContent;
export const technologyContent = technologyContentRaw as TechnologyContent;

export function getLocalized(item: LocalizedString, lang: Language): string {
  if (!item) return '';
  return lang === 'en' ? item.en : item.pt;
}
