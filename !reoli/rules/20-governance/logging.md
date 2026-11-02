---
tipo: "regra_reolicode"
nome: "Regra — Regra de Logging"
camada: "20-governance"
dominio: "governanca"
categoria: "regras_codigo"
prioridade: "condicional"
tags: ["reoli","reolicode","20-governance"]
hub_pai: "[[REOLI]]"
aliases: ["Regra de Logging"]
---

# Regra de Logging

## Objetivo

Gerar logs úteis para diagnóstico sem expor informações sensíveis ou produzir ruído desnecessário.

## Princípios

* Registre eventos relevantes, não cada operação executada.
* Logs devem ajudar a identificar **o que aconteceu, onde aconteceu e por quê**.
* Prefira logs estruturados quando a stack permitir.
* Não utilize logs como substituto para tratamento correto de erros.

## Níveis

Quando disponíveis na stack:

* `debug` → diagnóstico técnico temporário ou detalhado.
* `info` → evento relevante concluído normalmente.
* `warn` → situação inesperada, mas recuperável.
* `error` → operação que falhou.

Não registre tudo como `info` ou `error`.

## Contexto

Quando útil, registre:

* operação;
* módulo;
* resultado;
* identificadores técnicos seguros;
* integração envolvida;
* causa da falha.

Evite mensagens genéricas como:

`Erro ao processar.`

Prefira contexto suficiente para localizar a origem da falha.

## Dados Sensíveis

Nunca registre desnecessariamente:

* senhas;
* tokens;
* secrets;
* cookies;
* credenciais;
* dados pessoais completos;
* payloads privados completos.

Registre somente o mínimo necessário para diagnóstico.

## Produção

* Evite logs excessivamente verbosos.
* Não deixe logs temporários de desenvolvimento.
* Não exponha stack traces ou detalhes internos ao usuário.
* Retenção e armazenamento devem seguir a política definida pelo produto.

## Resultado esperado

Logs pequenos, seguros e úteis para localizar falhas e compreender eventos relevantes do sistema.

[Catálogo de regras](../README.md)
