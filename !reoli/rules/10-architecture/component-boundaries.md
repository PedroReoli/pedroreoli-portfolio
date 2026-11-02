---
tipo: "regra_reolicode"
nome: "Regra — Regra de Fronteiras de Componentes"
camada: "10-architecture"
dominio: "arquitetura"
categoria: "regras_codigo"
prioridade: "condicional"
tags: ["reoli","reolicode","10-architecture"]
hub_pai: "[[REOLI]]"
aliases: ["Regra de Fronteiras de Componentes"]
---

# Regra de Fronteiras de Componentes

## Objetivo

Manter componentes focados em apresentação e orquestração, evitando mistura de UI, regra de negócio, dados, estado e efeitos.

## Responsabilidades

* **Página** → compõe e orquestra o fluxo.
* **Layout** → organiza estrutura visual.
* **Componente UI** → apresenta estado e emite eventos.
* **Hook** → encapsula comportamento ou efeitos controlados.
* **Service/Client** → acessa APIs, dados ou operações externas.
* **Store/State** → mantém estado compartilhado.
* **Utils** → executam transformações ou operações puras.
* **Domínio/Service** → concentra regras de negócio.

Regra de negócio não deve ficar escondida em JSX, callbacks visuais ou componentes de apresentação.

## Não misturar

Evite concentrar no mesmo componente:

* layout complexo + regra de negócio;
* acesso a API + transformação extensa + renderização;
* estado global + estado exclusivamente visual sem distinção;
* validação de domínio + apresentação;
* integração externa + UI;
* helpers genéricos + decisões críticas de negócio.

## Quando separar

Separe quando:

* o componente possuir responsabilidades diferentes;
* muitos hooks ou efeitos dificultarem entender o fluxo;
* uma alteração visual exigir entender regras de negócio;
* testes exigirem configurar partes não relacionadas ao comportamento testado;
* funções internas começarem a ser reutilizadas;
* o nome do arquivo deixar de representar claramente sua responsabilidade;
* for difícil identificar rapidamente entrada, comportamento e saída do componente.

## Como separar

Ao identificar uma responsabilidade independente:

* UI → componente;
* comportamento → hook;
* acesso externo → service/client;
* estado compartilhado → store/state;
* transformação pura → util;
* regra de negócio → domínio/service;
* dados estáticos → constants/data.

Se o recurso extraído for **reutilizável entre diferentes partes do projeto**, mova-o para o contexto `shared` correspondente.

Se for específico de uma feature, mantenha-o próximo dessa feature.

Não crie abstrações ou arquivos adicionais sem uma responsabilidade clara.

## Regra prática

Um componente saudável deve permitir entender rapidamente:

**o que recebe → o que apresenta → quais eventos dispara → o que delega**

Se for necessário entender persistência, integração, regras extensas ou transformações internas para compreender a UI, as fronteiras provavelmente estão incorretas.

## Resultado esperado

Componentes pequenos, previsíveis e testáveis, com responsabilidades independentes e reutilização centralizada quando aplicável.

[Catálogo de regras](../README.md)
