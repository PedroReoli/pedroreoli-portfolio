---
name: otimizar
description: Otimiza performance de frontend. Lighthouse, Core Web Vitals, bundle size, images, caching. Use quando pedir "performance", "otimizar", "lighthouse", "/performance" ou "/speed".
license: Proprietary
metadata:
  tipo: skill
  nome-exibicao: Otimização completa de performance
  aliases: performance, /performance, /otimizar, Otimização completa de performance
  tags: h4, skill, performance, reolios
  camada: 3_folha
  dominio: tecnologia
  categoria: performance
  subtipo: skill
  hierarquia: "4"
  hub-pai: "[[hubs/skills/Skills - Performance]]"
---
# Performance web — diagnóstico com dados de campo

## Objetivo
Medir, diagnosticar e melhorar velocidade, interatividade e estabilidade visual em Next.js, React, Vue e sites HTML com evidências antes/depois. Não prometer pontuação Lighthouse nem desempenho sem execução.

## Contrato de comportamento para qualquer IA
1. Detectar stack, versão, URL/ambiente e ferramentas de browser/RUM realmente acessíveis. Não afirmar medição ou ganho se não mediu.
2. **Core Web Vitals atuais: LCP, INP e CLS**, não FID. Metas orientativas para experiência boa no percentil 75: LCP <= 2,5 s; INP <= 200 ms; CLS <= 0,1 (segmentar mobile/desktop).
3. Separar dados de campo (CrUX/RUM), laboratório (Lighthouse/DevTools) e simulação. Lighthouse pontual NÃO prova experiência real de usuários.
4. Diagnosticar gargalo antes de sugerir bibliotecas, CDN, preload ou lazy loading; risco de regressão e custo de manutenção contam.
5. Não aplicar cache longo e immutable ao HTML ou API dinâmica; usar somente assets com hash/versionamento e política adequada.
6. Não usar lazy loading para imagem LCP acima da dobra sem medição; definir width/height ou aspect-ratio para evitar shift.
7. Não introduzir scripts ou dependências sem consentimento; respeitar privacidade/PII na coleta de RUM.
8. Registrar método, URL, device, rede, janela, mudanças, regressão e limitação de cada métrica.

## Processo
1. Capturar baseline de CrUX/field (se disponível), Lighthouse repetido e trace de performance; guardar URL, data, dispositivo e versão.
2. Separar: LCP (TTFB, descoberta do recurso, load delay, render delay), INP (input, processamento, apresentação) e CLS (mudanças inesperadas).
3. Priorizar gargalos por impacto nos usuários, facilidade, risco e regressões; não otimizar score por score.
4. Corrigir: imagens responsivas/hero prioritária, JS long tasks, bundle, fontes, CSS/layout, cache, CDN e third parties conforme evidência.
5. Rodar medição posterior usando metodologia comparável, idealmente distribuição e p75, sem inferir causalidade de mudança simultânea.
6. Produzir relatório: linha de base, teste, ação, ganho medido, efeito colateral, rollback e próximo experimento.

## Instrumentação browser atual (web-vitals)
~~~typescript
// Instalar versão compatível no projeto e chamar 1x por page load
import { onCLS, onINP, onLCP } from 'web-vitals';
function report(metric: {name: string; value: number; id: string}) {
  // Aplicação real: enviar ao endpoint RUM consentido e seguro
  console.info(metric.name, metric.value, metric.id);
}
onCLS(report);
onINP(report);
onLCP(report);
~~~
INP pode não ser reportado se não houver interação. Cuidado com métricas depois de BFCache/SPA e suporte variável a Soft Navigation; ler changelog da versão instalada.

## Cache seguro
- Arquivos com hash e conteúdo imutável: Cache-Control public, max-age=31536000, immutable quando CDN/artefato suportarem.
- HTML/rotas dinâmicas: política específica por segurança e atualização (no-store/private/revalidation onde apropriado).
- APIs autenticadas ou personalizadas: jamais cache público sem contrato explícito.

## Casos de avaliação
- User pede "minha página está lenta" sem URL/acesso: plano e dados necessários, não números inventados.
- CrUX bom e Lighthouse ruim: explicar diferença entre campo e lab.
- FID citado como Core Vital atual: substituir por INP e explicar diferença.
- HTML cacheado 1 ano: sinalizar regressão crítica; propor teste de revalidação.
- LCP carregada em lazy: avaliar prioridade real e requisição em trace.
- Comparar before/after com amostras diferentes: não declarar melhora conclusiva.

## Fontes (08/10/2026)
- [web.dev — Web Vitals](https://web.dev/articles/vitals): LCP/INP/CLS e percentil 75.
- [web.dev — INP](https://web.dev/articles/inp): processamento da interação.
- [GoogleChrome/web-vitals GitHub](https://github.com/GoogleChrome/web-vitals): API onCLS/onINP/onLCP.
- [web-vitals Changelog](https://github.com/GoogleChrome/web-vitals/blob/main/CHANGELOG.md): compatibilidade e mudanças.
- [Chrome Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/): natureza dos testes.

## Aceite
Melhoria comprovada somente com evidência antes/depois e sem regressões críticas, descrevendo limitações.

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Performance|Skills - Performance]]
<!-- vault-navigation:end -->

## Qualidade e avaliação

- [Portões de qualidade e cenários mínimos](references/certification-v1.md) — carregue antes de finalizar a entrega ou executar avaliações.
- [Exemplo reproduzível](references/worked-example-v1.md) — use como contrato de entrada, decisão, saída e reprovação.
- [Estado das fontes](references/source-status-v1.md) — consulte antes de sustentar afirmações externas.
