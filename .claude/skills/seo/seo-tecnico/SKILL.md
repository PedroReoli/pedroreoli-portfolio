---
tipo: skill
nome: SEO técnico completo
name: seo-tecnico
aliases:
  - seo-tecnico
  - /seo-tecnico
  - SEO técnico completo
tags:
  - h4
  - skill
  - seo
  - reolios
camada: 3_folha
dominio: marketing
categoria: seo
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Seo]]'
description: >
  Implementa SEO técnico completo. Sitemap, robots.txt, meta tags, structured
  data, Open Graph, schema.org. Use quando pedir "seo", "sitemap", "robots",
  "meta tags", "/seo-tecnico" ou "/seo".
---

# SEO técnico completo

Implementa todas as otimizações técnicas de SEO.

## Dependências

- **Stack:** Next.js, React, Vue (detectar automaticamente)
- **Output:** `public/`, componentes de SEO

---

## Workflow

### Passo 1 — Briefing

Perguntar ao usuário:
1. Qual a plataforma? (Next.js, Gatsby, Hugo, etc)
2. Tem sitemap existente?
3. Quais páginas precisam de SEO?
4. Precisa de multilingual?

### Passo 2 — robots.txt

```txt
# public/robots.txt

User-agent: *
Allow: /

# Crawl delay (se tiver muitos recursos)
Crawl-delay: 1

# Sitemap
Sitemap: https://seudominio.com/sitemap.xml

# Block paths sensíveis
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /private/
Disallow: /*.json$
Disallow: /*.xml$

# Block pages com conteúdo duplicado
Disallow: /?s=*
Disallow: /search
Disallow: /tag/*

# Allow importante
Allow: /blog/*
Allow: /produtos/*
```

### Passo 3 — Sitemap.xml

**Next.js (gerar dinamicamente):**

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://seudominio.com'
  
  const staticPages = [
    { url: baseUrl, lastmod: new Date(), changeFreq: 'daily', priority: 1 },
    { url: `${baseUrl}/blog`, lastmod: new Date(), changeFreq: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/sobre`, lastmod: new Date(), changeFreq: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contato`, lastmod: new Date(), changeFreq: 'monthly', priority: 0.6 },
  ]

  // Páginas dinâmicas (posts, produtos)
  const posts = await getAllPosts()
  const dynamicPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastmod: post.updatedAt,
    changeFreq: 'weekly',
    priority: post.featured ? 0.9 : 0.7,
  }))

  return [...staticPages, ...dynamicPages]
}
```

**Static XML:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://seudominio.com/</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://seudominio.com/blog</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### Passo 4 — Meta Tags Base

**Next.js - Layout:**
```typescript
// app/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://seudominio.com'),
  title: {
    default: 'ReoliOS — Sistema Operacional do Negócio',
    template: '%s | ReoliOS',
  },
  description: 'Transforme o Claude Code na sua equipe completa: marketing, SEO, ads, conteúdo.',
  keywords: ['sistema operacional', 'IA', 'marketing', 'automação', 'dev solo'],
  authors: [{ name: 'Pedro Reoli', url: 'https://pedroreis.vercel.app' }],
  creator: 'Pedro Reoli',
  publisher: 'ReoliOS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://seudominio.com',
    siteName: 'ReoliOS',
    title: 'ReoliOS — Sistema Operacional do Negócio',
    description: 'Tudo que uma empresa precisa — num terminal.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ReoliOS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReoliOS — Sistema Operacional do Negócio',
    description: 'Tudo que uma empresa precisa — num terminal.',
    creator: '@pedroreis',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-verification-code',
    yandex: 'yandex-verification-code',
  },
}
```

### Passo 5 — Componente SEO

**Componente reutilizável:**
```typescript
// components/SEO.tsx
import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  author?: string
  tags?: string[]
}

export function SEO({
  title,
  description,
  image = '/og-image.png',
  url,
  type = 'website',
  publishedTime,
  author,
  tags = [],
}: SEOProps) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type,
      images: [{ url: image }],
      ...(publishedTime && {
        article: { publishedTime, authors: [author], tags }
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}

// Uso em páginas
export const metadata: Metadata = SEO({
  title: 'Blog — ReoliOS',
  description: 'Artigos sobre marketing, IA e operação de negócios.',
  type: 'website',
})
```

### Passo 6 — Structured Data (Schema.org)

**1. Organization:**
```typescript
// app/structured-data/organization.ts
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ReoliOS',
  url: 'https://seudominio.com',
  logo: 'https://seudominio.com/logo.png',
  sameAs: [
    'https://twitter.com/pedroreis',
    'https://linkedin.com/company/reolios',
    'https://github.com/pedroreis',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contato@seudominio.com',
    contactType: 'customer service',
  },
}
```

**2. WebSite:**
```typescript
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ReoliOS',
  url: 'https://seudominio.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://seudominio.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}
```

**3. Article/BlogPost:**
```typescript
export function articleSchema(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: `https://seudominio.com/author/${post.author.slug}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ReoliOS',
      logo: {
        '@type': 'ImageObject',
        url: 'https://seudominio.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://seudominio.com/blog/${post.slug}`,
    },
  }
}
```

**4. Product (se vender algo):**
```typescript
export const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'ReoliOS Pro',
  description: 'Acesso vitalício ao ReoliOS',
  image: 'https://seudominio.com/product.png',
  offers: {
    '@type': 'Offer',
    url: 'https://seudominio.com/comprar',
    priceCurrency: 'BRL',
    price: '450',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'ReoliOS',
    },
  },
}
```

**5. Breadcrumb:**
```typescript
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
```

**Componente para adicionar ao head:**
```typescript
// components/SchemaMarkup.tsx
import Script from 'next/script'

export function SchemaMarkup({ schema }: { schema: object }) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Uso
<SchemaMarkup schema={organizationSchema} />
```

### Passo 7 — Canonical URLs

```typescript
// lib/canonical.ts
export function getCanonicalUrl(path: string = '') {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://seudominio.com'
  return `${baseUrl}${path}`
}

// Uso em metadata
{
  alternates: {
    canonical: getCanonicalUrl('/blog/minha-postagem'),
  }
}
```

### Passo 8 — HTML Semântico

**Estrutura recomendada:**
```html
<header>
  <nav aria-label="Navegação principal">
    <a href="/" aria-label="Home">Logo</a>
    <ul>
      <li><a href="/sobre">Sobre</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/contato">Contato</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <header>
      <h1>Título do Artigo</h1>
      <p>Meta description aqui</p>
    </header>
    
    <section>
      <h2>Seção 1</h2>
      <p>Conteúdo...</p>
    </section>
  </article>
  
  <aside>
    <h2>Posts Relacionados</h2>
    <ul>
      <li><a href="/blog/post-1">Post 1</a></li>
      <li><a href="/blog/post-2">Post 2</a></li>
    </ul>
  </aside>
</main>

<footer>
  <nav aria-label="Links do rodapé">
    <a href="/privacidade">Privacidade</a>
    <a href="/termos">Termos</a>
  </nav>
</footer>
```

### Passo 9 — hreflang (Multilingual)

```html
<!-- Em todas as páginas -->
<link rel="alternate" hreflang="pt-BR" href="https://seudominio.com/pt/" />
<link rel="alternate" hreflang="en" href="https://seudominio.com/en/" />
<link rel="alternate" hreflang="x-default" href="https://seudominio.com/" />

<!-- Sitemap com hreflang -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://seudominio.com/pt/</loc>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="https://seudominio.com/pt/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://seudominio.com/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://seudominio.com/"/>
  </url>
</urlset>
```

### Passo 10 — Redirects

**Next.js - next.config.js:**
```javascript
module.exports = {
  async redirects() {
    return [
      // Redirect antigo para novo
      {
        source: '/blog/:slug',
        destination: '/artigos/:slug',
        permanent: true, // 301
      },
      // Redirect de paginação
      {
        source: '/page/:page',
        destination: '/blog?page=:page',
        permanent: true,
      },
      // Redirect de trailing slash
      {
        source: '/(.*)/',
        destination: '/$1',
        permanent: true,
      },
    ]
  }
}
```

---

## Checklist SEO Técnico

```
┌─────────────────────────────────────────────────────────────┐
│                    SEO CHECKLIST                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  INDEXAÇÃO                                                 │
│  ├── [ ] robots.txt configurado                            │
│  ├── [ ] sitemap.xml gerado                                │
│  ├── [ ] sitemap no Google Search Console                 │
│  └── [ ] Canonical URLs corretas                           │
│                                                             │
│  META TAGS                                                 │
│  ├── [ ] Title único por página                            │
│  ├── [ ] Description única por página                      │
│  ├── [ ] Open Graph tags                                   │
│  ├── [ ] Twitter cards                                     │
│  └── [ ] Favicon e apple-touch-icon                       │
│                                                             │
│  ESTRUTURA                                                 │
│  ├── [ ] Header semântico (h1, h2, h3)                    │
│  ├── [ ] Imagens com alt text                              │
│  ├── [ ] Links com anchor text descritivo                 │
│  └── [ ] HTML válido                                       │
│                                                             │
│  SCHEMA.ORG                                                │
│  ├── [ ] Organization                                      │
│  ├── [ ] WebSite/SearchAction                              │
│  ├── [ ] BreadcrumbList                                    │
│  ├── [ ] Article/BlogPosting                              │
│  └── [ ] Product (se aplicável)                           │
│                                                             │
│  PERFORMANCE (impacta SEO)                                 │
│  ├── [ ] Core Web Vitals bons                             │
│  ├── [ ] Mobile-first                                      │
│  └── [ ] HTTPS                                             │
│                                                             │
│  MONITORAMENTO                                            │
│  ├── [ ] Google Search Console                            │
│  ├── [ ] Google Analytics                                  │
│  └── [ ] Bing Webmaster Tools                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Regras

- Cada página tem title e description únicos
- h1 único por página
- Imagens sempre com alt text
- Structured data válido (testar no Google's Testing Tool)
- Sitemap atualizado quando criar páginas
- Canonical em todas as páginas
- Mobile-first (Google indexa mobile first)
- Velocidade importa (SEO + UX)

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Seo|Skills - Seo]]
<!-- vault-navigation:end -->
