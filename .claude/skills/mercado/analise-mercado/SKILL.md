---
tipo: skill
nome: Análise completa de mercado e concorrência
name: analise-mercado
aliases:
  - analise-mercado
  - /analise-mercado
  - Análise completa de mercado e concorrência
tags:
  - h4
  - skill
  - mercado
  - reolios
camada: 3_folha
dominio: autoridade
categoria: mercado
subtipo: skill
hierarquia: 4
h: 4
hub_pai: '[[hubs/skills/Skills - Mercado]]'
description: >
  Analisa mercado, concorrência e oportunidades. Pesquisa nichos, identifica
  players, mapeia estratégias, preços e lacunas. Útil para novos projetos,
  posicionamento ou antes de criar um produto. Use quando pedir "analisar
  mercado", "pesquisar concorrência", "benchmark", "análise de nichos",
  "/mercado".
---

# Análise completa de mercado e concorrência

Pesquisa e analisa um mercado: concorrentes, preços, estratégias, pontos fortes/debéis e oportunidades.

## Dependências

- **Contexto:** `sistema/memoria/empresa.md`, `sistema/memoria/estrategia.md`
- **Output:** `saidas/analise-mercado/`

---

## Workflow

### Passo 1 — Briefing

Perguntar ao usuário:
1. Qual mercado/nicho quer analisar?
2. Qual o objetivo? (novo produto, posicionamento, precificação, expansão)
3. Tem concorrentes específicos em mente ou quer descobrir?
4. Qual região/idioma? (Brasil, EUA, global)
5. Já tem produto ou está em fase de ideação?

### Passo 2 — Pesquisa

Executar pesquisa em camadas:

**Camada 1: Visão Geral do Mercado**
- Tamanho do mercado (TAM, SAM, SOM)
- Tendências e crescimento
- Principais segmentos
- players tradicionais vs novos

**Camada 2: Concorrentes Diretos**
Para cada concorrente identificado:
- O que fazem (produto/serviço)
- Preço e modelo de cobrança
- Posicionamento e mensagem
- Canais de aquisição
- Pontos fortes
- Pontos fracos

**Camada 3: Análise de Preços**
- Faixa de preço do mercado
- Modelo de cobrança (único, mensal, por uso)
- O que está incluso em cada faixa
- Tendências de precificação

**Camada 4: Oportunidades**
- Lacunas não atendidas
- Segmentos subdesenvolvidos
- Tendências emergentes
- Formas de diferenciação

### Passo 3 — Análise SWOT

Para cada concorrente principal:
```
Forças:      O que fazem bem, que vantagem têm
Fraquezas:   O que fazem mal, o que falta
Oportunidades: Tendências que podem explorar
Ameaças:      Mudanças que podem prejudicar
```

### Passo 4 — Output

Salvar em `saidas/analise-mercado/<nicho>-<data>.md`:

```markdown
# Análise de Mercado: [Nicho]

## Resumo Executivo
[2-3 parágrafos com principais achados]

## Panorama do Mercado
[Tamanho, tendências, crescimento]

## Concorrentes
### Concorrente 1
- Produto:
- Preço:
- Posicionamento:
- Pontos fortes:
- Pontos fracos:
- Website:

### Concorrente 2
[...]

## Análise de Preços
[Faixas de preço do mercado]

## Oportunidades
[Lacunas e oportunidades identificadas]

## Recomendações
[Próximos passos sugeridos]
```

---

## Regras

- Pesquisa em múltiplas fontes (web, forums, redes sociais)
- Dados concretos > suposições
- Sempre buscar preços reais dos concorrentes
- Identificar o que diferencia cada player
- Notar tendências emergentes
- Se não encontrar info, dizer claramente ("dado não disponível")
- Atualizar quando o usuário tiver novas informações

<!-- vault-navigation:start -->
## Navegação
- [[hubs/skills/Skills - Mercado|Skills - Mercado]]
<!-- vault-navigation:end -->
