export type Language = 'pt' | 'en';

export type LocalizedString = {
  pt: string;
  en: string;
};

export interface FlagInfo {
  default: string;
  square: string;
  alt: string;
}

export interface RouteAlias {
  from: string;
  to: string;
}

export interface SiteContent {
  name: string;
  brand: { first: string; last: string };
  legalName: string;
  siteUrl: string;
  defaultShareImage: string;
  staticAssets: { favicon: string };
  email: string;
  routes: {
    home: string;
    projects: string;
    media: string;
    curriculum?: string;
    notFound: string;
    projectCorporate: string;
    projectIndependent: string;
    aliases: RouteAlias[];
  };
  social: {
    github: string;
    whatsapp: string;
    linkedin: string;
  };
  profile: {
    jobTitle: string;
    address: { locality: string; region: string; country: string };
    knowsAbout: string[];
  };
  noScript: {
    label: string;
    titleFirst: string;
    titleLast: string;
    role: string;
    description: string;
    navigationLabel: string;
    emailAction: string;
  };
  flags: {
    br: FlagInfo;
    us: FlagInfo;
  };
}

export interface HeaderNav {
  path: string;
  icon: string;
  label: LocalizedString;
}

export interface FooterContact {
  label: string;
  href: string;
  icon: string;
  color: string;
  external: boolean;
  detail: LocalizedString;
}

export interface InterfaceContent {
  homeStructure: {
    intro: string[];
    sections: string[];
    footer: string;
    scenes: Array<{ id: string; background: string; steps: number }>;
  };
  seo: {
    home: { pt: { title: string; description: string }; en: { title: string; description: string } };
    projects: { pt: { title: string; description: string }; en: { title: string; description: string } };
    media: { pt: { title: string; description: string }; en: { title: string; description: string } };
    notFound: { pt: { title: string; description: string }; en: { title: string; description: string } };
  };
  hero: {
    id: string;
    sectionNumber: string;
    name: { accessible: string; firstLine: string; secondLine: string };
    location: string;
    actionHref: string;
    actionIcon: string;
    scene: { topLabel: string; bottomLabel: string };
    pt: { eyebrow: string; role: string; statement: string; availability: string; scroll: string; action: string; actionShort: string };
    en: { eyebrow: string; role: string; statement: string; availability: string; scroll: string; action: string; actionShort: string };
  };
  about: {
    id: string;
    sectionNumber: string;
    portrait: { src: string; width: number; height: number; name: string };
    pt: {
      eyebrow: string;
      location: string;
      portraitAlt: string;
      portraitRole: string;
      areas: string;
      title: string;
      summary: string;
      statsLabel: string;
    };
    en: {
      eyebrow: string;
      location: string;
      portraitAlt: string;
      portraitRole: string;
      areas: string;
      title: string;
      summary: string;
      statsLabel: string;
    };
    stats: Array<{ value: string; pt: string; en: string }>;
  };
  purpose: {
    id: string;
    sectionNumber: string;
    metadata: string;
    media: {
      src: string;
      srcSet: string;
      type: string;
      width: number;
      height: number;
    };
    articleHref: string;
    actionIcon: string;
    pt: {
      eyebrow: string;
      imageAlt: string;
      imageCategory: string;
      imageContext: string;
      title: string;
      titleAccent: string;
      summary: string;
      action: string;
    };
    en: {
      eyebrow: string;
      imageAlt: string;
      imageCategory: string;
      imageContext: string;
      title: string;
      titleAccent: string;
      summary: string;
      action: string;
    };
  };
  projectsPage: {
    pt: { eyebrow: string; title: string; description: string };
    en: { eyebrow: string; title: string; description: string };
  };
  projectCategories: {
    label: LocalizedString;
    items: Array<{ id: string; label: LocalizedString }>;
  };
  corporateProjects: {
    id: string;
    period: string;
    title: string;
    galleryIcon: string;
    pt: {
      sectionLabel: string;
      category: string;
      description: string;
      overviewAction: string;
      galleryAction: string;
    };
    en: {
      sectionLabel: string;
      category: string;
      description: string;
      overviewAction: string;
      galleryAction: string;
    };
  };
  independentProjects: {
    id: string;
    externalIcon: string;
    pt: {
      sectionLabel: string;
      title: string;
      description: string;
      externalLabel: string;
    };
    en: {
      sectionLabel: string;
      title: string;
      description: string;
      externalLabel: string;
    };
  };
  notFound: {
    brand: string;
    homePath: string;
    projectsPath: string;
    projectsIcon: string;
    pt: {
      label: string;
      titleFirst: string;
      titleSecond: string;
      description: string;
      navLabel: string;
      homeAction: string;
      projectsAction: string;
    };
    en: {
      label: string;
      titleFirst: string;
      titleSecond: string;
      description: string;
      navLabel: string;
      homeAction: string;
      projectsAction: string;
    };
  };
  selectedProjects: {
    id: string;
    sectionNumber: string;
    morePath: string;
    icons: { previous: string; next: string; scroll: string };
    pt: {
      moreStep: string;
      eyebrow: string;
      title: string;
      previous: string;
      navigation: string;
      next: string;
      moreAction: string;
      scrollNext: string;
      scrollNavigate: string;
    };
    en: {
      moreStep: string;
      eyebrow: string;
      title: string;
      previous: string;
      navigation: string;
      next: string;
      moreAction: string;
      scrollNext: string;
      scrollNavigate: string;
    };
  };
  featuredProject: {
    actionIcon: string;
    agent: { name: string; subtitle: string };
    pt: {
      agentAlt: string;
      agentKicker: string;
      observe: string;
      decide: string;
      operate: string;
      technologiesLabel: string;
      externalLabel: string;
    };
    en: {
      agentAlt: string;
      agentKicker: string;
      observe: string;
      decide: string;
      operate: string;
      technologiesLabel: string;
      externalLabel: string;
    };
  };
  mediaArchive: {
    feature: {
      href: string;
      actionIcon: string;
      image: {
        src: string;
        srcSet: string;
        type: string;
        width: number;
        height: number;
      };
    };
    referenceCount: string;
    referenceIcon: string;
    pt: {
      eyebrow: string;
      title: string;
      description: string;
      pressLabel: string;
      pressTitle: string;
      pressAction: string;
      imageAlt: string;
      referencesTitle: string;
      referencesCount: string;
      externalLabel: string;
    };
    en: {
      eyebrow: string;
      title: string;
      description: string;
      pressLabel: string;
      pressTitle: string;
      pressAction: string;
      imageAlt: string;
      referencesTitle: string;
      referencesCount: string;
      externalLabel: string;
    };
  };
  contentStatus: {
    retryIcon: string;
    homePath: string;
    contactHref: string;
    pt: Record<string, string>;
    en: Record<string, string>;
  };
  projectViewer: {
    icons: { close: string; previous: string; next: string; external: string };
    pt: {
      close: string;
      error: string;
      loading: string;
      previous: string;
      next: string;
      openAria: string;
      open: string;
    };
    en: {
      close: string;
      error: string;
      loading: string;
      previous: string;
      next: string;
      openAria: string;
      open: string;
    };
  };
  experience: {
    id: string;
    sectionNumber: string;
    icons: { scroll: string; chapter: string };
    pt: {
      eyebrow: string;
      title: string;
      scrollHint: string;
      chaptersLabel: string;
      end: string;
      continue: string;
    };
    en: {
      eyebrow: string;
      title: string;
      scrollHint: string;
      chaptersLabel: string;
      end: string;
      continue: string;
    };
  };
  stack: {
    id: string;
    sectionNumber: string;
    titleAccent: string;
    pt: { eyebrow: string; title: string; description: string; ariaLabel: string };
    en: { eyebrow: string; title: string; description: string; ariaLabel: string };
  };
  languageNotice: {
    icon: string;
    pt: string;
    en: string;
  };
  header: {
    brand: { first: string; last: string; homePath: string };
    skipHref: string;
    contactHref: string;
    menuIcon: string;
    closeIcon: string;
    navigation: HeaderNav[];
    pt: Record<string, string>;
    en: Record<string, string>;
  };
  footer: {
    id: string;
    sectionNumber: string;
    ctaHref: string;
    backToTopIcon: string;
    contacts: FooterContact[];
    pt: Record<string, string>;
    en: Record<string, string>;
  };
}

export interface FeaturedProjectImage {
  number: string;
  title: string;
  category: LocalizedString;
  year: string;
  description: LocalizedString;
  technologies: string[];
  action: LocalizedString;
  actionIcon: string;
  visual: 'image';
  image: string;
  imageSrcSet: string;
  imageAlt: LocalizedString;
  href: string;
  external?: boolean;
}

export interface FeaturedProjectAgentStep {
  number: string;
  label: LocalizedString;
  accent?: boolean;
}

export interface FeaturedProjectAgent {
  number: string;
  title: string;
  category: LocalizedString;
  year: string;
  description: LocalizedString;
  technologies: string[];
  action: LocalizedString;
  actionIcon: string;
  visual: 'agent';
  artwork: {
    name: string;
    subtitle: string;
    kicker: LocalizedString;
    alt: LocalizedString;
    steps: FeaturedProjectAgentStep[];
  };
  href: string;
  external: boolean;
}

export type FeaturedProject = FeaturedProjectImage | FeaturedProjectAgent;

export interface ExperienceItem {
  period: LocalizedString;
  company: string;
  role: LocalizedString;
  description: LocalizedString;
  highlights: {
    pt: string[];
    en: string[];
  };
  technologies: Array<string | LocalizedString>;
}

export interface HomeContent {
  featuredProjects: FeaturedProject[];
  experienceItems: ExperienceItem[];
}

export interface CorporateProjectImage {
  src: string;
  srcSet: string;
  alt: LocalizedString;
  wide?: boolean;
}

export interface IndependentProject {
  number: string;
  title: string;
  category: LocalizedString;
  description: LocalizedString;
  icon: string;
  href: string;
}

export interface ProjectsContent {
  corporateProjectImages: CorporateProjectImage[];
  independentProjects: IndependentProject[];
}

export interface MediaNote {
  number: string;
  category: LocalizedString;
  title: LocalizedString;
  description: LocalizedString;
  destination: LocalizedString;
  icon: string;
  href: string;
}

export interface TechnicalPublication {
  id: string;
  category: LocalizedString;
  title: LocalizedString;
  highlights: LocalizedString[];
  links: { label: LocalizedString; href: string }[];
}

export interface MediaContent {
  publications: TechnicalPublication[];
  mediaNotes: MediaNote[];
}

export interface TechnologyTool {
  name: string;
  icon: string;
  color: string;
  image?: string;
  source: 'simple-icons' | 'brand-asset' | 'concept';
  where?: LocalizedString;
  usage?: LocalizedString;
}

export interface TechnologyGroup {
  number: string;
  title: LocalizedString;
  tools: TechnologyTool[];
}

export interface TechnologyContent {
  groups: TechnologyGroup[];
}

export interface SceneClip {
  id: string;
  from: string;
  to: string;
  src: string;
  webm?: string;
  holdAt: number;
  duration: number;
  poster: string;
}

export interface SceneClipsContent {
  version: number;
  basePath: string;
  heroPoster: string;
  fallbackPoster?: string;
  clips: SceneClip[];
}
