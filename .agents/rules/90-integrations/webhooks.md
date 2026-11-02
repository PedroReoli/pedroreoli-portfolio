---
tipo: "regra_reolicode"
nome: "Regra — Regra para Webhooks e Eventos de Terceiros"
camada: "90-integrations"
dominio: "stack"
categoria: "regras_codigo"
prioridade: "situacional"
tags: ["reoli","reolicode","90-integrations"]
hub_pai: "[[REOLI]]"
aliases: ["Regra para Webhooks e Eventos de Terceiros"]
---

# Regra para Webhooks e Eventos de Terceiros

## Objetivo

Garantir que o recebimento e processamento de webhooks de serviços de terceiros seja seguro, confiável, livre de vulnerabilidades de replay e à prova de falhas por duplicidade.

## Regras

* **Segurança e Assinatura**:
  - Use o mecanismo de autenticidade documentado pelo provedor. Para HMAC, valide contra o corpo bruto antes de processar o evento; a implementação precisa ler bytes suficientes para verificar a assinatura, com limite de tamanho.
  - Rejeite requisições com assinaturas inválidas imediatamente com status `401 Unauthorized` ou `400 Bad Request`.
  - Quando houver timestamp assinado, aplique janela compatível com o provedor e relógio confiável; combine com idempotência para evitar replay.

* **Idempotência Obrigatória**:
  - Webhooks de terceiros podem ser reenviados pelo servidor de origem.
  - Todo webhook deve registrar o ID do evento recebido (`event_id` ou equivalente) em tabela/cache de idempotência.
  - Se o mesmo `event_id` for recebido novamente, responda conforme o contrato do provedor sem repetir o efeito; proteja a gravação da chave contra corrida concorrente.

* **Resposta Rápida & Processamento Assíncrono**:
  - Não execute tarefas demoradas (como geração de PDFs ou chamadas de API externas) diretamente dentro do handler síncrono do webhook.
  - Receba, autentique, persista de modo durável e responda com o status exigido pelo provedor dentro do prazo. Se não persistir, não confirme processamento.

* **Tratamento de Erros e Logs**:
  - Retenha payload bruto somente se houver finalidade, prazo e acesso controlado; mascare dados pessoais nos logs.
  - Nunca exponha secrets do webhook nos logs.

[Catálogo de regras](../README.md)
