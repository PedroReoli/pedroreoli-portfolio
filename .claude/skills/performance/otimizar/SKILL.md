---
tipo: skill
nome: Otimização completa de performance
name: otimizar
aliases:
  - performance
  - /performance
  - /otimizar
  - Otimização completa de performance
tags:
  - h4
  - skill
  - performance
  - reolios
camada: 3_folha
dominio: tecnologia
categoria: performance
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Performance]]'
description: >
  Otimiza performance de frontend. Lighthouse, Core Web Vitals, bundle size,
  images, caching. Use quando pedir "performance", "otimizar", "lighthouse",
  "/performance" ou "/speed".
---

# Otimização completa de performance

Otimiza performance de frontend seguindo melhores práticas de Core Web Vitals.

## Dependências

- **Stack:** qualquer (Next.js, React, Vue, etc)
- **Output:** otimizações no código

---

## Workflow

### Passo 1 — Análise

**Ferramentas de análise:**
```
┌─────────────────────────────────────────────────────────────┐
│                    FERRAMENTAS                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  LIGHTHOUSE                                                │
│  ├── https://pagespeed.web.dev                              │
│  ├── DevTools Chrome > Lighthouse                          │
│  └── CLI: npx lighthouse https://url                       │
│                                                             │
│  WEB VITALSCORE                                            │
│  ├── https://pagespeed.web.dev                              │
│  └── https://web.dev/measure                                │
│                                                             │
│  GTMETRIX                                                  │
│  ├── https://gtmetrix.com                                   │
│  └── Waterfall analysis                                     │
│                                                             │
│  THIRD PARTY ANALYZER                                       │
│  └── https://thirdpartyweb.today                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Métricas Core Web Vitals:**
```
LCP (Largest Contentful Paint) — Meta: < 2.5s
├── Imagens otimizadas
├── Fontes otimizadas
├── Server response time
└── CDN

FID (First Input Delay) — Meta: < 100ms
├── JS menos bloqueante
├── Code splitting
└── Lazy loading

CLS (Cumulative Layout Shift) — Meta: < 0.1
├── Dimensões de imagens
├── Fontes com display:swap
└── Layout estável
```

### Passo 2 — Imagens

**1. Formatos modernos:**
```typescript
// Next.js - usar WebP/AVIF
import Image from 'next/image'

// Componente otimizado
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  priority // para above-the-fold
/>
```

**2. Responsivo com srcset:**
```html
<img
  src="image-800.jpg"
  srcset="
    image-400.jpg 400w,
    image-800.jpg 800w,
    image-1200.jpg 1200w
  "
  sizes="(max-width: 600px) 100vw, 50vw"
  loading="lazy"
  alt="Responsive image"
/>
```

**3. Sprites CSS:**
```css
/* Gerar sprite de ícones */
.icon-sprite {
  background-image: url('/icons/sprite.svg');
  background-size: 1000px 1000px;
}

.icon-home { background-position: 0 0; width: 24px; height: 24px; }
.icon-user { background-position: -24px 0; width: 24px; height: 24px; }
```

### Passo 3 — Fontes

**1. Fontes otimizadas:**
```css
/* Sem display:swap, o navegador espera */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap; /* Evita FOIT (Flash of Invisible Text) */
  src: url('/fonts/inter-400.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/inter-700.woff2') format('woff2');
}
```

**2. Preload de fontes críticas:**
```html
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" href="/fonts/inter-400.woff2" as="font" type="font/woff2" crossorigin>
</head>
```

**3. Subset de fontes:**
```
Usar apenas caracteres necessários
- Google Fonts: &text=...
- Font Squirrel: subset
```

### Passo 4 — JavaScript

**1. Code Splitting:**
```typescript
// React - lazy loading
import { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))
const Dashboard = lazy(() => import('./Dashboard'))
const Settings = lazy(() => import('./Settings'))

// Uso com fallback
<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
```

**2. Tree Shaking:**
```javascript
// Importar apenas o necessário
// ❌ Importar tudo
import _ from 'lodash'

// ✅ Importar específico
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
```

**3. Dynamic imports:**
```typescript
// Carregar sob demanda
const useChat = () => {
  const [Chat, setChat] = useState(null)
  
  const loadChat = async () => {
    const module = await import('./Chat')
    setChat(module.default)
  }
  
  return { Chat, loadChat }
}
```

### Passo 5 — CSS

**1. Minificação:**
```javascript
// PostCSS + Autoprefixer
// vite.config.js
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [
    autoprefixer(),
    // ou
    cssnano() // minificação avançada
  ]
})
```

**2. Critical CSS:**
```html
<!-- Inline critical CSS -->
<style>
  .header { background: #333; color: white; }
  .hero { padding: 2rem; }
  .button { background: blue; }
</style>
<!-- Non-critical CSS carregado async -->
<link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="/styles.css"></noscript>
```

**3. PurgeCSS:**
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/**/*.html'
  ],
  // Remove CSS não usado
  plugins: [require('@fullhuman/postcss-purgecss')]
}
```

### Passo 6 — Caching

**1. Cache headers:**
```javascript
// express ou next.config.js
// Next.js - next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store'
          }
        ]
      }
    ]
  }
}
```

**2. Service Worker para offline:**
```javascript
// sw.js
const CACHE_NAME = 'v1'
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    })
  )
})
```

### Passo 7 — Server/CDN

**1. Compressão:**
```javascript
// Express
import compression from 'compression'

app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false
    return compression.filter(req, res)
  }
}))
```

**2. CDN:**
```
Provedores:
├── Vercel Edge Network (já incluso)
├── Cloudflare (grátis)
├── AWS CloudFront
└── Fastly

Configurar:
- Cachear assets estáticos (1 ano)
- Comprimir Brotli/Gzip
- HTTP/2 ou HTTP/3
```

### Passo 8 — Monitoramento

**1. Web Vitals analytics:**
```typescript
// src/lib/web-vitals.ts
import { getCLS, getFID, getLCP } from 'web-vitals'

function sendToAnalytics({ name, delta, id }: any) {
  fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify({
      name,
      delta,
      id,
      url: window.location.href
    })
  })
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getLCP(sendToAnalytics)
```

**2. Erro de performance:**
```typescript
// PerformanceObserver
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.duration > 1000) {
      console.warn('Slow resource:', entry.name)
    }
  }
})

observer.observe({ entryTypes: ['resource'] })
```

---

## Checklist de Performance

```
┌─────────────────────────────────────────────────────────────┐
│                    PERFORMANCE CHECKLIST                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  IMAGENS                                                    │
│  ├── [ ] WebP ou AVIF                                      │
│  ├── [ ] Lazy loading                                       │
│  ├── [ ] Dimensões explícitas                               │
│  └── [ ] Srcset para responsivo                            │
│                                                             │
│  FONTES                                                     │
│  ├── [ ] Font-display: swap                               │
│  ├── [ ] Preload de fontes críticas                        │
│  └── [ ] WOFF2 apenas                                      │
│                                                             │
│  JAVASCRIPT                                                 │
│  ├── [ ] Code splitting                                    │
│  ├── [ ] Tree shaking                                      │
│  ├── [ ] Lazy loading                                      │
│  └── [ ] <script async> para não-bloqueantes               │
│                                                             │
│  CSS                                                        │
│  ├── [ ] Critical CSS inline                               │
│  ├── [ ] Minificação                                       │
│  └── [ ] PurgeCSS                                          │
│                                                             │
│  SERVIDOR                                                   │
│  ├── [ ] Compression                                       │
│  ├── [ ] CDN configurado                                   │
│  ├── [ ] Cache headers                                     │
│  └── [ ] HTTP/2 ou HTTP/3                                  │
│                                                             │
│  MONITORAMENTO                                             │
│  ├── [ ] Core Web Vitals tracking                          │
│  └── [ ] Alertas de performance                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Meta de Performance

| Métrica | Bom | Precisa melhorar | Ruim |
|---------|-----|------------------|------|
| LCP | < 2.5s | 2.5s - 4s | > 4s |
| FID | < 100ms | 100ms - 300ms | > 300ms |
| CLS | < 0.1 | 0.1 - 0.25 | > 0.25 |
| TTI | < 3.8s | 3.8s - 7.3s | > 7.3s |

---

## Regras

- Sempre medir antes de otimizar
- Focar em Core Web Vitals
- Otimizar imagens primeiro (maior impacto)
- Lazy load tudo que não é above-the-fold
- Preload de recursos críticos
- Monitorar em produção (não só dev)

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Performance|Skills - Performance]]
<!-- vault-navigation:end -->
