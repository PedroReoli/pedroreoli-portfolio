---
tipo: skill
nome: Estrutura de campanha Google Ads
name: anuncio-google
aliases:
  - anuncio-google
  - /anuncio-google
  - Estrutura de campanha Google Ads
tags:
  - h4
  - skill
  - ads
  - reolios
camada: 3_folha
dominio: marketing
categoria: ads
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Ads]]'
description: >
  Planeja campanhas Search e gera CSV para Google Ads Editor com grupos,
  anúncios e negativas. Use quando pedirem campanha Google Ads ou
  /anuncio-google; valide o formato na versão atual do Editor.
---

# Estrutura de campanha Google Ads

Planeje a estrutura e gere arquivos para revisão no Google Ads Editor. Considere o CSV importável somente depois de conferir colunas, prévia e erros na versão do Editor usada pela conta.

## Dependências

- **Contexto do negócio:** `sistema/memoria/empresa.md` (produto/serviço, público, região, diferenciais)
- **Tom de voz:** `sistema/memoria/preferencias.md`
- **Pesquisa SEO (se existir):** `marketing/seo/01-pesquisa-demanda.md`, `06-google-ads.md` — usar como insumo
- **Outputs vão em:** `marketing/campanhas/google-ads-<YYYY-MM-DD>/`

---

## Workflow

### Passo 1 — Briefing

Se o usuário não passou briefing, perguntar:

1. **Produto/serviço a anunciar?** (1-3 linhas)
2. **Quem é o público?** (perfil, dor que resolve)
3. **Região:** raio em km a partir de qual cidade?
4. **Orçamento diário?** (R$/dia)
5. **Objetivo:** ligações / WhatsApp / formulário / visita?
6. **Site/landing page** existe? URL?

Se já existe `marketing/seo/06-google-ads.md` (criado pelo `/seo`), usar como base — pular as perguntas que já foram respondidas lá.

### Passo 2 — Pesquisa de palavras-chave

Se já existe `marketing/seo/01-pesquisa-demanda.md`, usar o top 10-20 de termos prioritários (intenção transacional + comercial).

Se não existe, gerar:
- 30-50 termos-semente baseados no briefing
- WebSearch pra cada grupo: ver concorrência, sazonalidade
- Filtrar pelos de **intenção comercial/transacional** (descartar informacionais)
- Agrupar em **clusters** (ex: "feijoada-buffet", "feijoada-restaurante", "feijoada-evento")

### Passo 3 — Estrutura de campanha

**Padrão recomendado pra B2B local:**

```
Campanha 1: <Negócio> — Search Geral
├── Grupo: <Cluster 1>
│   ├── Keywords em correspondência exata, de frase ou ampla, conforme a hipótese
│   ├── RSAs com títulos e descrições distintos dentro dos limites da plataforma
│   └── Negativas justificadas pelas buscas irrelevantes observadas
├── Grupo: <Cluster 2>
│   └── ...
└── ... (1 grupo por cluster do Passo 2)

Campanha 2: <Negócio> — Local (opcional)
├── Anúncios pra Google Maps
└── Segmentação por proximidade

Lista de negativas globais: termos genéricos descartados, marcas concorrentes
```

### Passo 4 — Copies (RSAs)

Para cada grupo, proponha RSAs (Responsive Search Ads) com variações úteis, sem impor quantidade fixa.

**Títulos:** distribua intenção de busca, oferta, diferenciais verificados e CTA sem repetir a mesma frase. Use números, certificações e prova social só quando fornecidos e conferidos.

**Descrições:** descreva produto, condição relevante e próximo passo; urgência e escassez exigem condição real com data.

**Restrições do Google:**
- Headline: 30 caracteres
- Description: 90 caracteres
- Sem emojis, sem caps lock, sem repetição de palavras
- Sem afirmações superlativas não-comprovadas ("o melhor", "número 1") sem fonte

Seguir `sistema/memoria/preferencias.md` pra tom.

### Passo 5 — Extensões

Gerar CSVs separados pra cada tipo de extensão:

- **Sitelinks** (4-6): "Sobre nós", "Catálogo", "Cases", "WhatsApp", "Localização"
- **Chamadas** (telefone): puxar de `sistema/memoria/empresa.md`
- **Snippets estruturados:** lista de serviços, categorias de produto
- **Preço** (se aplicável): faixas de preço dos serviços principais
- **Promoção** (se aplicável): desconto, condição especial

### Passo 6 — Configurações da campanha

Gerar arquivo `configuracoes.md` com:

- **Estratégia de lance:** selecionar conforme objetivo, histórico de conversões e opções disponíveis na conta; não fixar limiar universal de conversões
- **Orçamento diário:** conforme briefing
- **Segmentação geográfica:** raio em km a partir do endereço
- **Idioma:** Português
- **Dispositivos:** registrar dados por dispositivo antes de propor ajustes
- **Programação:** dias e horários conforme negócio
- **Conversões a configurar:** leads reais, como formulário enviado, ligação qualificada ou conversa iniciada; distinguir eventos de navegação de resultados de negócio

### Passo 7 — Gerar os CSVs

Estrutura de pastas final:

```
marketing/campanhas/google-ads-<YYYY-MM-DD>/
  campanhas.csv          ← linha por campanha
  grupos.csv             ← linha por grupo de anúncio
  keywords.csv           ← keywords + match type
  keywords-negativas.csv ← negativas por grupo + lista global
  anuncios.csv           ← RSAs (headlines + descriptions)
  extensoes-sitelinks.csv
  extensoes-chamadas.csv
  extensoes-snippets.csv
  extensoes-preco.csv (se aplicável)
  configuracoes.md       ← config + checklist de import
  README.md              ← passo a passo pra importar no Google Ads Editor
```

**Formato dos CSVs:** usar cabeçalhos aceitos na versão do Google Ads Editor e uma entidade por linha; conferir tipos de coluna e codificação. Importar em ambiente de revisão, examinar a prévia e corrigir avisos antes de postar alterações. Se o Editor não estiver disponível, rotular arquivos como **proposta não validada para importação**.

### Passo 8 — Resumo + próximos passos

Mostrar pro usuário:

```
✓ Proposta de campanha: marketing/campanhas/google-ads-<YYYY-MM-DD>/

Estrutura:
- <N> campanhas
- <N> grupos de anúncio
- <N> palavras-chave (positivas)
- <N> palavras-chave negativas
- <N> RSAs

Pra subir:
1. Abrir Google Ads Editor (desktop)
2. Conta → Importar → CSV
3. Subir campanhas.csv primeiro, depois grupos, keywords, anúncios, extensões
4. Revisar status (tudo "pausado" inicialmente — ativar manualmente)
5. Conferir conversões configuradas no Google Tag Manager
6. Ativar campanha quando estiver tudo OK

Sugestão de orçamento inicial: R$<X>/dia por <Y> dias antes de avaliar.
```

---

## Regras

- **Nunca inventar dados de CPC.** Estimativa de custo exige dados da conta ou ferramenta de planejamento com região e data; WebSearch isolado não fornece CPC confiável.
- **Sempre começar pausado.** Cliente revisa, ativa quando aprovar.
- **Termos informacionais:** decidir sua inclusão pelo objetivo e estágio do funil, com orçamento e medição separados.
- **Match type:** começar com Phrase Match na maioria. Exact pra termos premium. Broad só com dados consistentes.
- **Negativas:** revisar termos irrelevantes por campanha ou grupo e verificar se não bloqueiam buscas úteis.
- **Mensuração:** verificar eventos de conversão e sua atribuição antes de julgar o desempenho.
- Copies seguem `sistema/memoria/preferencias.md` estritamente. Sem jargão de marketing se o público não usa.

## Fontes

- [Google Ads: alterações na correspondência de frase e ampla modificada](https://support.google.com/google-ads/answer/10286719?hl=en-GB).
- [Google Ads: anúncios responsivos de pesquisa](https://support.google.com/google-ads/answer/7684791?hl=en).
- [Google Ads Editor: preparo e importação de CSV](https://support.google.com/google-ads/editor/answer/56368?hl=en).

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Ads|Skills - Ads]]
<!-- vault-navigation:end -->
