export interface PortfolioProject {
  id: string
  name: string
  href?: string
  githubUrl?: string
  liveUrl?: string
  isProprietary?: boolean
  accessBadge?: string
  domain: string
  type: string
  category: string
  image: string
  shortDescription: string
  stack: readonly string[]
  features: readonly string[]
  metrics: readonly { label: string; value: string }[]
  flagship?: boolean
  group?: "flagship" | "freelance" | "modules"
  videoUrl?: string
  videoPoster?: string
}

export interface EducationItem {
  degree: string
  institution: string
  period: string
  status: string
  details?: readonly string[]
}

export interface LanguageItem {
  name: string
  level: string
  info: string
}

export interface AcademicLeadershipItem {
  title: string
  organization: string
  period: string
  info: string
}

export interface PortfolioArticle {
  id: string
  title: string
  category: string
  date: string
  readTime: string
  excerpt: string
  htmlUrl: string
}
