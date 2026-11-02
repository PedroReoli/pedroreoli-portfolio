# Legado arquivado: vendas-atendimento/lead-scraper

> Snapshot integral pré-modernização da skill. Preservado para continuidade e comparação; pode conter comandos, métricas ou premissas desatualizados. **Não seguir em conflito com SKILL.md atual.**

---

---
tipo: skill
nome: Prospecção Ativa B2B e Contatos Locais
name: lead-scraper
aliases:
  - lead-scraper
  - /lead-scraper
  - Prospecção Ativa B2B e Contatos Locais
tags:
  - h4
  - skill
  - vendas
  - reolios
camada: 3_folha
dominio: vendas
categoria: vendas-atendimento
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Vendas Atendimento]]'
description: >
  Pesquisa empresas B2B em fontes permitidas, registrando origem e elegibilidade
  de contato. Use quando pedir "prospectar clientes",
  "buscar leads", "extrair contatos do google maps", "lead scraper", "prospecção
  b2b" ou "/lead-scraper".
---

# Prospecção Ativa B2B e Contatos Locais

Localiza empresas por nicho e região, com fonte e data verificáveis para cada registro. Diferencie dados institucionais de dados pessoais.

---

## 🎯 Quando Usar

- Prospecção de clientes locais para venda de software, automação ou sites (clínicas, imobiliárias, escritórios).
- Levantamento de empresas para abordagem comercial compatível com a base legal e regras do canal.
- Mapeamento de concorrência e parceiros estratégicos por cidade ou estado.

---

## 🛠️ Método de Operação

### Passo 1: Definição do Nicho e Localidade
Exemplo de comando:
> *"Prospectar 15 escritórios de advocacia em Curitiba com telefone e site para proposta comercial."*

### Passo 2: Busca em fontes permitidas
Confira termos de uso da fonte antes de coletar ou armazenar dados. A Places API do Google limita armazenamento de conteúdo; `place_id` tem exceção específica. Não trate uma página pública como autorização para raspagem massiva ou disparo de mensagens.

O agente usa busca web, fonte pública licenciada ou API autorizada:
1. Extrai o nome da empresa e endereço.
2. Captura o número de telefone / WhatsApp exibido.
3. Acessa o website institucional, quando permitido, para localizar na página `/contato` ou `/sobre`:
   - E-mail institucional de contato (`contato@...`, `comercial@...`).
   - Canal comercial divulgado pela própria empresa. Não colete perfil pessoal de sócios sem finalidade e necessidade documentadas.

### Passo 3: Exportação Estruturada
Gera uma tabela ou arquivo CSV limpo pronto para uso:

| Empresa | Cidade | Canal comercial | Website | Fonte e data | Uso permitido | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Exemplo fictício | Curitiba - PR | contato@exemplo.test | exemplo.test | site institucional, 2026-10-01 | revisar | Não contatado |

---

## 🔗 Integração com o ReoliOS

Após gerar a lista de leads:
1. Antes de usar `/cold-email`, confirme a base legal, as regras do canal e a existência de opção de não receber novos contatos.
2. Use a skill `/proposta` para gerar o orçamento quando o lead responder com interesse.
3. Mantenha os dados em `.privado/` para segurança e conformidade com a LGPD.

## Critério de conclusão

**Briefing mínimo:** nicho, região, quantidade, fontes aceitas, finalidade e campos necessários. Entregue apenas registros verificados, sem preencher lacunas por inferência. Informe quantos candidatos foram examinados, quantos descartados e por quê. Não envie mensagens durante a pesquisa.

**Fontes:** [Places API: políticas de armazenamento e atribuição](https://developers.google.com/maps/documentation/places/web-service/policies) e [Places API: identificadores](https://developers.google.com/maps/documentation/places/web-service/place-id).

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Vendas Atendimento|Skills - Vendas Atendimento]]
<!-- vault-navigation:end -->
