---
tipo: skill
nome: SEO completo + GEO + Google Ads
name: seo
aliases:
  - seo
  - /seo
  - SEO completo + GEO + Google Ads
tags:
  - h4
  - skill
  - marketing
  - reolios
camada: 3_folha
dominio: marketing
categoria: marketing
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Marketing]]'
description: >
  Planeja SEO local e orgânico, conteúdo, mensuração, presença em buscas com IA
  e mídia paga conforme o objetivo. Use para SEO, GEO, palavras-chave, Perfil
  da Empresa no Google ou análise de demanda.
---

# SEO completo + GEO + Google Ads

## Dependências

- **Contexto do negócio:** `sistema/memoria/empresa.md`
- **Tom de voz:** `sistema/memoria/preferencias.md`
- **Estratégia atual:** `sistema/memoria/estrategia.md`
- **Ferramentas:** WebSearch, WebFetch (nativos)
- **Outputs vão em:** `marketing/seo/`

---

## Workflow

### Passo 1 — DEMANDA: O que as pessoas buscam nesse nicho?

**Objetivo:** Entender se existe demanda real e como as pessoas buscam.

1. Ler `sistema/memoria/empresa.md` pra extrair: produtos/serviços, região, público-alvo, diferenciais
2. Gerar uma lista inicial de **30-50 termos-semente** baseados em:
   - Categorias de produto/serviço
   - Intenção de busca (informacional, comercial, transacional)
   - Localização (cidade, região, estado)
   - Uso final / contexto do cliente
3. Usar **WebSearch** pra cada grupo de termos:
   - Buscar `"[termo] site:trends.google.com"` pra ver sazonalidade
   - Buscar `"[termo]"` pra ver o que aparece (orgânico, ads, maps)
   - Buscar `"[termo] related searches"` pra expandir a lista
4. Classificar cada termo por:
   - **Volume:** informar somente quando houver dado de ferramenta com fonte, região e período; caso contrário, marcar "não medido"
   - **Intenção:** informacional, comercial, transacional, navegacional
   - **Dificuldade:** quantos concorrentes fortes aparecem?
   - **Relevância:** direto (produto exato) / indireto (nicho relacionado) / tangencial

**Output:** Salvar em `marketing/seo/01-pesquisa-demanda.md` com:
- Tabela de termos classificados
- Top 10 termos prioritários com justificativa baseada nos dados disponíveis; sem atribuir volume ou dificuldade numérica sem fonte
- Termos sazonais
- Termos descartados e por quê

---

### Passo 2 — CONCORRÊNCIA: Quem aparece pra essas buscas?

**Objetivo:** Mapear quem domina os resultados e onde estão os gaps.

1. Pegar os **top 10 termos** do Passo 1
2. Pra cada termo, usar **WebSearch** e analisar:
   - **Top 5 resultados orgânicos:** quem são, que tipo de página (site institucional, marketplace, blog, diretório)
   - **Resultados do Maps/Local Pack:** quem aparece, quantas avaliações, nota
   - **Google Ads:** alguém anuncia? qual a copy?
3. Pra cada concorrente relevante (máx 5-8), usar **WebFetch** pra analisar:
   - Estrutura do site (páginas, blog, catálogo)
   - Meta titles e descriptions das páginas principais
   - Conteúdo: falam de quê? com que profundidade?
   - Schema markup: usam dados estruturados?
   - GMB: perfil completo? fotos? posts? avaliações?
4. Identificar:
   - **Gaps:** o que nenhum concorrente faz bem
   - **Oportunidades:** termos onde ninguém domina
   - **Ameaças:** concorrentes fortes demais pra competir de frente
   - **Benchmark:** o padrão mínimo que o negócio precisa atingir

**Output:** `marketing/seo/02-analise-concorrencia.md` com:
- Tabela de concorrentes
- Mapa de gaps e oportunidades
- Recomendações: onde atacar primeiro

---

### Passo 3 — GMB: Google Meu Negócio (resultado mais rápido)

**Objetivo:** Montar o perfil completo do Google Business Profile pra aparecer no Maps e Local Pack.

1. Pesquisar como está o perfil atual (se existir): buscar o nome da empresa no Google
2. Criar documento com **tudo que precisa ser preenchido/otimizado:**

   **Informações básicas:**
   - Nome (idêntico ao registrado)
   - Categoria principal + secundárias (sugerir as melhores pro nicho)
   - Endereço, telefone, site
   - Horário de funcionamento
   - Área de atendimento

   **Descrição do negócio:**
   - Descrição otimizada (750 caracteres) com palavras-chave naturais
   - Tom: conforme `sistema/memoria/preferencias.md`

   **Atributos e serviços:**
   - Serviços relevantes
   - Atributos (entrega, atacado, produção própria, etc.)

   **Fotos recomendadas:**
   - Checklist (fachada, interior, produtos, equipe, produção)
   - Especificações

   **Posts GMB:**
   - 4 posts iniciais sugeridos
   - Calendário de posts recorrentes

   **Estratégia de avaliações:**
   - Como pedir avaliações dos clientes atuais
   - Template de resposta (positivas e negativas) — usar `/responder-avaliacoes`

   **Citações e diretórios:**
   - Lista de diretórios relevantes pro nicho
   - NAP consistente (Name, Address, Phone) pra todas as listagens

**Output:** `marketing/seo/03-google-meu-negocio.md`

---

### Passo 4 — ON-PAGE: Otimizar o site

**Objetivo:** Mapear a intenção de cada página e propor ajustes verificáveis de conteúdo e indexação.

1. Ler a estrutura atual do site (se `site/` existir; senão, perguntar as páginas)
2. Pra cada página:

   **Mapeamento de palavras-chave por página**

   **Meta tags otimizadas:**
   - Title descritivo e específico da página, sem comprimento rígido nem repetição artificial de termos
   - Meta description fiel ao conteúdo, com proposta clara para o leitor
   - H1, H2, H3 sugeridos

   **Schema Markup (dados estruturados):**
   - LocalBusiness quando representar uma empresa real e os dados forem verificáveis
   - Product apenas em páginas de produto compatíveis com as diretrizes do Google
   - FAQPage somente quando elegível e útil; não prometer rich result

   **Checklist técnico:**
   - URLs amigáveis
   - Alt text das imagens
   - Velocidade de carregamento
   - Mobile-friendly
   - Sitemap.xml, robots.txt, canonical, Open Graph

   **Internal linking:** mapa de links internos sugerido

**Output:** `marketing/seo/04-otimizacao-on-page.md` com:
- Tabela: página → keyword principal → title → description → H1
- JSON-LD aplicável à página, com dados conferidos e teste de validação indicado
- Checklist técnico com status (feito / pendente)

---

### Passo 5 — CONTEÚDO: Estratégia de autoridade

**Objetivo:** Criar plano de conteúdo que posicione a empresa como referência no nicho.

1. Baseado nos termos do Passo 1 (especialmente os informacionais):

   **Páginas/posts evergreen:**
   - 5-10 ideias que respondem dúvidas reais do público
   - Pra cada ideia: título otimizado, keyword-alvo, estrutura de headings, estimativa de tamanho

   **Cluster de conteúdo:**
   - Página pilar
   - Páginas satélite que linkam pra pilar
   - Estrutura de internal linking

   **Calendário editorial:**
   - Prioridade de publicação
   - Frequência sugerida
   - Formato (blog post, guia, FAQ, comparativo)

   **Conteúdo local:**
   - Páginas de área de atendimento (se fizer sentido)
   - Conteúdo com referências locais

**Output:** `marketing/seo/05-estrategia-conteudo.md`

> Essa lista é o insumo da skill `/publicar-tema` — cada item dessa estratégia vira artigo + carrossel + legendas com um único comando.

---

### Passo 6 — GOOGLE ADS: Campanhas prontas pra rodar

**Objetivo:** Estruturar campanhas baseadas nos dados reais da pesquisa.

1. Definir **objetivo das campanhas:**
   - Geração de leads (ligações, WhatsApp, formulário)
   - Visitas ao site
   - Alcance local

2. **Estrutura de campanhas:**

   **Search:**
   - Grupos de anúncios (1 por cluster de keyword)
   - Pra cada grupo: 10-15 palavras-chave, lista de negativas, 3 RSAs, extensões
   - Orçamento diário, estratégia de lance, segmentação geográfica

   **Local (se aplicável):** anúncios pra Google Maps, segmentação por proximidade

   **Display/Remarketing (opcional):** públicos, formatos

3. **Copies dos anúncios:**
   - Seguir tom de `sistema/memoria/preferencias.md`
   - Incluir diferenciais concretos
   - CTAs específicos
   - 15 headlines, 4 descriptions

4. **Landing page:** avaliar se o site atual serve ou precisa de página específica

**Output:** `marketing/seo/06-google-ads.md` com estrutura completa, palavras-chave organizadas, copies prontas, orçamento e configurações.

> A skill `/anuncio-google` consome esse arquivo e gera o CSV pronto pra importar no Google Ads.

---

### Passo 7 — MONITORAMENTO: Checklist mensal

**Objetivo:** Garantir que o trabalho continue dando resultado.

**Semanal:**
- Posição nos top 10 termos
- Responder avaliações no GMB
- Postar no GMB (1x/semana mínimo)

**Mensal:**
- Revisar métricas do Google Ads (CTR, CPC, conversões, custo/lead) — usar `/relatorio-ads`
- Verificar tráfego orgânico (Google Search Console)
- Atualizar palavras-chave negativas
- Publicar 1-2 conteúdos do calendário editorial
- Verificar citações/diretórios

**Trimestral:**
- Refazer pesquisa de concorrência (Passo 2 resumido)
- Atualizar fotos e posts do GMB
- Revisar estratégia de conteúdo
- Avaliar novas oportunidades de keywords

**Output:** `marketing/seo/07-checklist-monitoramento.md`

---

### Passo 8 — GEO: Monitorar presença em respostas de IA

**Objetivo:** Verificar se fontes públicas descrevem corretamente a empresa e acompanhar a presença em respostas de IA, sem prometer citação.

**Critério:** tratar cada resposta observada como uma amostra variável por data, consulta, localidade e serviço. Não inferir leads ou receita sem atribuição mensurada.

1. **Auditoria GEO:**
   - Consultar os termos prioritários nas interfaces de IA disponíveis e registrar consulta, data e contexto
   - Verificar se a empresa (ou concorrentes) aparece
   - Mapear quais fontes as IAs citam pra esse nicho

2. **Conteúdo otimizado pra IA:**
   - Cada artigo do Passo 5 deve ter **respostas diretas** nas primeiras linhas
   - Incluir **dados concretos** (números, certificações, endereços, fatos verificáveis)
   - Estruturar com **perguntas como H2/H3** (formato Q&A)
   - Evitar texto vago e manter cada afirmação apoiada em evidência publicável

3. **Perguntas frequentes no site:**
   - Responder perguntas reais do público na página adequada
   - Avaliar FAQPage apenas se o site e a página atenderem às políticas atuais do Google

4. **Citações externas (menções):**
   - Conferir perfis e menções editoriais relevantes e corrigir dados inconsistentes
   - Registrar apenas menções efetivamente observadas, sem fabricar avaliações ou comprar citações

5. **Dados estruturados elegíveis:**
   - Selecionar tipos de schema somente quando descreverem conteúdo visível e atenderem às políticas atuais
   - Dados estruturados e `llms.txt` não garantem inclusão em respostas de IA

6. **Monitoramento GEO:**
   - A cada 30 dias, testar os top 5 termos no ChatGPT, Gemini, Perplexity
   - Registrar: a empresa apareceu? quem apareceu? fonte citada?
   - Ajustar conteúdo com base nos resultados

**Output:** `marketing/seo/08-geo-otimizacao-ia.md` com amostras datadas, fontes observadas, inconsistências e ações justificadas.

---

## Execução

Ao rodar `/seo`, executar **todos os 8 passos em sequência**, salvando cada output no arquivo correspondente. Entre cada passo, mostrar resumo do que foi encontrado antes de seguir.

Se o usuário quiser rodar apenas um passo: `/seo passo 3` ou `/seo gmb` ou `/seo geo`.

Ao finalizar, apresentar **resumo executivo** com:
- Top 5 oportunidades encontradas
- Ações prioritárias (o que fazer primeiro)
- Estimativa de investimento em ads
- Próximos passos recomendados

---

## Regras

- Toda pesquisa deve ser real (usar WebSearch/WebFetch), nunca inventar dados de volume ou concorrência
- Copies e textos seguem `sistema/memoria/preferencias.md` estritamente
- Termos em português do Brasil, como o público busca
- Quando um dado não puder ser obtido (ex: volume de busca), marcar "não medido"; hipóteses qualitativas devem ter justificativa separada
- Focar em termos com intenção comercial/transacional pra negócio B2C/B2B local
- Schema markup em formato JSON-LD (padrão Google)
- Google Ads: nunca inventar CPC ou estimativas de custo sem base real

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Marketing|Skills - Marketing]]
<!-- vault-navigation:end -->
