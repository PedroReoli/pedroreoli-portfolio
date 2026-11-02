---
name: seo-tecnico
description: Implementa SEO técnico completo. Sitemap, robots.txt, meta tags, structured data, Open Graph, schema.org. Use quando pedir "seo", "sitemap", "robots", "meta tags", "/seo-tecnico" ou "/seo".
license: Proprietary
metadata:
  tipo: skill
  nome-exibicao: SEO técnico completo
  aliases: seo-tecnico, /seo-tecnico, SEO técnico completo
  tags: h4, skill, seo, reolios
  camada: 3_folha
  dominio: marketing
  categoria: seo
  subtipo: skill
  hierarquia: "4"
  hub-pai: "[[hubs/skills/Skills - Seo]]"
---
# SEO técnico verificável — crawling, indexação e dados estruturados

## Objetivo
Garantir que páginas elegíveis possam ser rastreadas, interpretadas e indexadas de forma consistente: robots, sitemap, canonical, metadata, redirects, hreflang e schemas sem prometer posicionamento.

## Contrato da IA
1. Identificar CMS/framework/versão, domínio canônico, páginas reais, ambientes de produção e ferramentas disponíveis. Não inferir indexação a partir de código gerado.
2. **robots.txt NÃO é segurança e não impede indexação sozinho**. Página privada exige auth; página pública fora do índice pede noindex acessível. Não bloquear sitemap.xml nem assets essenciais para renderização.
3. Só incluir URL canônica e publicável no sitemap; não inventar páginas/lastmod. Canonical consolidará variações equivalentes, sem criar loops ou indexar páginas privadas.
4. JSON-LD precisa corresponder a conteúdo real visível e a tipo elegível; FAQ rich results limitados, nunca garantir rich snippet.
5. Não inventar empresa, avaliações, estrelas, preço, telefone, Google verification ou outras credenciais.
6. Usar API da versão do framework; Next.js App Router gera metadata, robots.ts e sitemap.ts no formato atual. Em CMS, respeitar mecanismo nativo.
7. Não modificar produção/robots sem autorização; reconhecer que SEO depende de Googlebot e crawl observado.
8. Registrar inspeção Search Console, HTTP status, canonical renderizado, robots efetivo, structured data validation e data.

## Fluxo
1. Inventariar URLs públicas, privadas, duplicadas, paginadas, idiomas e canonical URL.
2. Conferir headers/status, redirects, robots, meta robots e XML sitemap com site real, quando disponível.
3. Revisar metadata única (title, description, Open Graph), sem keyword stuffing ou limite fixo inútil.
4. Gerar ou ajustar URL sitemap apenas para páginas 200 e indexáveis, com lastModified verificável.
5. Validar schemas em Rich Results Test e Search Console; elegibilidade não garante exibição.
6. Auditar hreflang/alternates bidirecionais para mercados reais e canonical por idioma.
7. Comparar antes/depois em render HTML, logs de crawler, index coverage e visitas orgânicas.

## Exemplos Next.js App Router (adaptar domínio real)
~~~typescript
// app/robots.ts
import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/internal/'] },
    sitemap: 'https://example.com/sitemap.xml',
  };
}
~~~
~~~typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Para páginas dinâmicas: carregar URLs existentes e lastmod reais.
  return [
    { url: 'https://example.com/', lastModified: new Date('2026-01-01') },
    { url: 'https://example.com/sobre' },
  ];
}
~~~
Example.com é placeholder explícito: substituir por host validado antes de publicar. Nunca usar Disallow de arquivos *.xml indiscriminadamente ou /_next/ (pode bloquear recursos essenciais). Não usar sitemap como mecanismo de bloqueio de páginas.

## Segurança e dados
- /admin ou /api exigem autorização; Disallow não reduz superfície de ataque.
- Página removida: decidir 404/410, redirect 301/308 ou noindex, conforme intenção e conteúdo.
- Schema de Product/Organization/Article somente com informações verificadas da entidade e conteúdo.
- Não enviar nome/descrição de dados privados para buscas externas sem permissão.

## Casos de avaliação
- robots bloqueia sitemap e /_next: detectar e corrigir.
- Private URL no sitemap: excluir e proteger com auth, não apenas robots.
- Next sitemap com await em função não async: falha de compilação detectada.
- JSON-LD de reviews fictícias: rejeitar.
- Páginas multilíngues sem alternates: propor mapa baseado em URLs reais.
- Sem acesso ao domínio: não declarar "Google indexou".

## Fontes (08/10/2026)
- [Google — robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro).
- [Google — Control what you share](https://developers.google.com/search/docs/crawling-indexing/control-what-you-share).
- [Next.js — robots](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).
- [Next.js — sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap).
- [Google — Structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

## Aceite
Arquivos validados + fetch/HTTP, canonical e robots efetivos + sitemap e schema válidos; indexação só quando confirmada pela ferramenta apropriada.

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Seo|Skills - Seo]]
<!-- vault-navigation:end -->

## Qualidade e avaliação

- [Portões de qualidade e cenários mínimos](references/certification-v1.md) — carregue antes de finalizar a entrega ou executar avaliações.
- [Exemplo reproduzível](references/worked-example-v1.md) — use como contrato de entrada, decisão, saída e reprovação.
- [Estado das fontes](references/source-status-v1.md) — consulte antes de sustentar afirmações externas.
