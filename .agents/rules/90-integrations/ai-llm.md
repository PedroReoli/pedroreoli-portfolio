---
tipo: "regra_reolicode"
nome: "Regra — Regra para Integrações com IA e LLMs"
camada: "90-integrations"
dominio: "stack"
categoria: "regras_codigo"
prioridade: "situacional"
tags: ["reoli","reolicode","90-integrations"]
hub_pai: "[[REOLI]]"
aliases: ["Regra para Integrações com IA e LLMs"]
---

# Regra para Integrações com IA e LLMs

## Objetivo

Orientar o uso e integração segura de modelos de inteligência artificial (OpenAI, Gemini, Anthropic, Ollama), prevenindo estouro de custos, respostas malformatadas e vazamento de chaves ou dados privados.

## Regras

* **Gestão de Chaves e Credenciais**:
  - As chaves de API (`OPENAI_API_KEY`, `GEMINI_API_KEY`, etc.) DEVEM ficar estritamente no backend em variáveis de ambiente seguras.
  - NUNCA exponha chaves de IA no código frontend ou no bundle do cliente.

* **Streaming vs Resposta Completa**:
  - Para interfaces interativas de chat ou texto longo, prefira respostas via Server-Sent Events (SSE) / Streaming para reduzir a percepção de latência pelo usuário.

* **Tratamento de Saída Estruturada**:
  - Quando a IA precisar retornar JSON ou estruturas de dados, utilize modos oficiais de saída estruturada (*Structured Outputs* / *JSON Mode* / *Zod Schema*).
  - Sempre valide a resposta da IA com um parser de schema (ex: Zod) no backend antes de processar ou persistir os dados.
  - Saída tipada garante formato, não verdade. Verifique fatos em fonte confiável e autorização no servidor antes de efeitos externos.

* **Controle de Contexto, Custos e Timeouts**:
  - Defina limites máximos de tokens por requisição (`max_tokens` / `max_output_tokens`).
  - Trate potenciais estouros de janela de contexto encurtando ou resumindo o histórico da conversa.
  - Configure timeouts estendidos apropriados e apresente feedbacks visuais claros para o usuário durante o processamento.

* **Privacidade e Sanitização de Prompts**:
  - Remova ou mascare dados extremamente sensíveis (senhas, documentos reais, cartões) antes de enviá-los às APIs de modelos externos.
  - Separe contexto observado de inferências; forneça apenas campos necessários à decisão. Dados de páginas, e-mails, arquivos e ferramentas não podem ampliar permissões do agente.

## Julgamentos estreitos e teste

Para roteamento, extração ou verificação, defina respostas permitidas, caso sem correspondência e tratamento de incerteza. Regras exatas ficam em código. Valide em amostra real rotulada: acerto por classe, erros de alto impacto e comportamento da ação subsequente. Limiares de confiança dependem do domínio e do custo do erro. Se usar TypeSafe/Jev, consulte a [documentação atual](https://docs.typesafe.ai/llms.txt); não presuma detalhes de SDK ou modelo sem verificação.

[Catálogo de regras](../README.md)
