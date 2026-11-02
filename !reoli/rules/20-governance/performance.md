---
tipo: "regra_reolicode"
nome: "Regra — Regra de Performance"
camada: "20-governance"
dominio: "governanca"
categoria: "regras_codigo"
prioridade: "condicional"
tags: ["reoli","reolicode","20-governance"]
hub_pai: "[[REOLI]]"
aliases: ["Regra de Performance"]
---

# Regra de Performance

## Objetivo

Manter desempenho mensurável e previsível sem adicionar complexidade desnecessária.

## Princípio

Toda otimização relevante deve possuir:

**sintoma → causa provável → alteração → validação**

* Não otimize apenas por possibilidade teórica.
* Priorize gargalos observados ou tecnicamente prováveis.
* Meça antes e depois quando o impacto justificar.
* Performance não deve quebrar comportamento, segurança ou UX.
* Não aumente significativamente a complexidade por ganhos irrelevantes.

## Frontend

* Reduza trabalho no carregamento e renderização inicial.
* Evite re-renderizações em cascata causadas por estado mal posicionado.
* Não execute processamento pesado durante renderização.
* Divida código por rota ou feature quando reduzir carga inicial de forma relevante.
* Carregue recursos pesados sob demanda quando possível.
* Use skeleton/loading/transições quando houver latência perceptível.
* Use memoização somente quando existir custo ou benefício justificável.
* Virtualize listas ou tabelas quando o volume afetar renderização.

## Bundle e Dependências

Antes de adicionar dependência relevante, considere:

* tamanho;
* impacto no bundle;
* frequência de uso;
* possibilidade de carregamento sob demanda;
* existência de solução já disponível no projeto.

Não adicione bibliotecas grandes para resolver problemas triviais.

## APIs e Dados

* Evite requests duplicados e padrões N+1.
* Não solicite dados que não serão utilizados.
* Prefira payloads enxutos.
* Use paginação quando o volume justificar.
* Cancele ou ignore requests obsoletos quando necessário.
* Cache deve possuir estratégia clara de invalidação.
* Evite carregar todo o conjunto no cliente apenas para filtrá-lo posteriormente quando o servidor puder fazer isso de forma eficiente.

## Backend e Banco

* Reduza round trips desnecessários.
* Analise consultas pesadas antes de tentar otimizá-las.
* Considere índices para filtros, joins e ordenações frequentes quando houver benefício comprovável.
* Não crie índices indiscriminadamente.
* Utilize transações quando a operação exigir atomicidade.
* Operações longas podem ser movidas para processamento assíncrono quando o fluxo permitir.

## Mídia e Interface

* Sirva imagens em dimensões e formatos adequados.
* Carregue mídia pesada sob demanda.
* Evite efeitos visuais caros quando causarem impacto perceptível.
* Animações devem permanecer fluidas e não bloquear interação.
* Evite trabalho de layout ou renderização repetitivo sem necessidade.

## Memória

Sempre libere recursos quando deixarem de ser necessários:

* timers;
* listeners;
* subscriptions;
* observers;
* recursos externos.

Evite:

* estruturas grandes duplicadas;
* caches sem limite;
* referências desnecessárias;
* recursos mantidos após desmontagem.

Vazamento de memória deve ser tratado como regressão.

## Validação

Para alterações relevantes, compare quando aplicável:

* tempo de carregamento;
* tempo de resposta;
* renderização;
* quantidade de requests;
* tamanho de payload/bundle;
* CPU;
* memória;
* consultas ao banco.

Não declare uma otimização como bem-sucedida sem critério observável.

## Resultado esperado

O sistema deve permanecer rápido e estável conforme cresce, priorizando gargalos reais e evitando otimizações prematuras ou complexidade sem benefício mensurável.

[Catálogo de regras](../README.md)
