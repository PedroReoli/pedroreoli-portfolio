---
tipo: "regra_reolicode"
nome: "Regra — Regra para Consumo de APIs de Terceiros e Resiliência"
camada: "90-integrations"
dominio: "stack"
categoria: "regras_codigo"
prioridade: "situacional"
tags: ["reoli","reolicode","90-integrations"]
hub_pai: "[[REOLI]]"
aliases: ["Regra para Consumo de APIs de Terceiros e Resiliência"]
---

# Regra para Consumo de APIs de Terceiros e Resiliência

## Objetivo

Garantir que chamadas a APIs HTTP/gRPC externas sejam resilientes, não travem a aplicação cliente e possuam estratégias contra falhas temporárias da rede.

## Regras

* **Timeouts Obrigatórios**:
  - NUNCA faça uma chamada HTTP para uma API externa sem configurar um timeout explícito (ex: limite máximo de 5s a 10s).
  - Nunca confie no timeout padrão da biblioteca de HTTP ou da linguagem (que pode ser infinito).

* **Resiliência e Retentativas (Retry & Exponential Backoff)**:
  - Aplique retentativas limitadas para falhas transitórias (como status `429`, `502`, `503`, `504` ou erros de conexão), respeitando `Retry-After` quando presente.
  - NUNCA repita requisições para erros de cliente (`400`, `401`, `403`, `404`).
  - Retente mutações apenas quando houver chave de idempotência ou outro mecanismo que impeça efeito duplicado. Use intervalo exponencial com jitter e limite total de tentativas.

* **Isolamento via Clients/Adapters**:
  - Isole toda chamada a API externa em uma camada dedicada (`clients/` ou `adapters/`).
  - O restante da aplicação deve interagir apenas com a interface do adaptador, facilitando a substituição da API externa ou criação de mocks nos testes.

* **Mocks e Ambientes de Teste**:
  - Testes unitários e de integração não devem realizar requisições HTTP reais para serviços de terceiros.
  - Use ferramentas de mock de servidor (MSW, WireMock, Nock) para validar cenários de sucesso, timeout e erro.

[Catálogo de regras](../README.md)
