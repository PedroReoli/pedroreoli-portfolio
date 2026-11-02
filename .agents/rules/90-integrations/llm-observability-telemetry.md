---
tipo: "regra_reolicode"
nome: "Regra — Observabilidade e Telemetria de LLMs"
camada: "90-integrations"
dominio: "observabilidade"
categoria: "regras_codigo"
prioridade: "condicional"
tags: ["reoli","reolicode","90-integrations"]
hub_pai: "[[REOLI]]"
aliases: ["Observabilidade e Telemetria de LLMs"]
---

# Observabilidade e Telemetria de LLMs

## Objetivo

Padronizar o rastreamento, monitoramento de custos, performance e tratamento de erros nas chamadas de APIs de modelos de linguagem (LLMs), criando visibilidade transparente sobre as operações de Inteligência Artificial.

## Regra do Agente

Sempre que implementar chamadas para serviços de IA, o agente deve adicionar telemetria estruturada. 

1. Trace latência, tokens consumidos e custos.
2. Mascare dados sensíveis (PII) nas cargas do trace.
3. Categorize erros de forma granular (Rate limit vs Erro de modelo vs Autenticação).

---

# 1. Integração com OpenTelemetry

Utilize os padrões do **OpenTelemetry (OTel)** ou bibliotecas especializadas (como Langfuse, Helicone, LangSmith) para criação de "spans" e traces da comunicação.

O *span* de uma chamada LLM deve registrar os seguintes metadados (atributos):
* `llm.model`: Nome do modelo (ex: `gpt-4o-mini`).
* `llm.usage.prompt_tokens`: Contagem de tokens da entrada.
* `llm.usage.completion_tokens`: Contagem de tokens da saída.
* `llm.temperature`: Temperatura utilizada.
* `llm.request.latency`: Duração da chamada.
* `llm.request.cost`: Estimativa de custo da chamada.
* `llm.prompt_hash`: Um hash criptográfico não reversível do prompt original (útil para agrupar e debugar sem vazar o conteúdo real).

**Exemplo em NodeJS (Pseudo-SDK OTel):**
```typescript
tracer.startActiveSpan('llm_generation', async (span) => {
  span.setAttribute('llm.model', 'gpt-4');
  span.setAttribute('llm.temperature', 0.7);

  const response = await llm.generate(prompt);

  span.setAttribute('llm.usage.prompt_tokens', response.usage.prompt_tokens);
  span.setAttribute('llm.usage.completion_tokens', response.usage.completion_tokens);
  span.end();
});
```

---

# 2. Dados Proibidos na Telemetria

O que **NÃO** rastrear ou enviar para o sistema de monitoramento:
* O texto completo do *prompt* se contiver *Personally Identifiable Information* (PII) sem mascaramento prévio.
* Chaves de API (`Authorization headers`, chaves secretas).
* Históricos de chat não relacionados diretamente ao log e não sanitizados.

---

# 3. Categorização e Tratamento de Erros

É crucial diferenciar a natureza da falha ao invocar um LLM para acionar os alertas corretos e estratégias de retentativa (*retry*).

* **429 Rate Limit**: Retentativa com *Exponential Backoff*. Emissão de métrica `llm.error.rate_limit`.
* **401/403 Autenticação**: Alerta Crítico. Chave expirada, rotacionada ou inválida.
* **400 Formato Inválido / Janela de Contexto Excedida**: Falha de negócio. Retentativa não resolverá a menos que o *input* seja reduzido/corrigido.
* **500/503 Model/Server Error**: Retentativa e circuito aberto (Circuit Breaker).

Aplica-se logging estruturado para registrar estas falhas:

```json
{
  "event": "LLM_API_ERROR",
  "category": "rate_limit",
  "model": "claude-3",
  "retry_count": 2,
  "timestamp": "2026-09-18T16:15:00.000Z"
}
```

---

# 4. Recomendações de Dashboards

A interface de monitoramento ou as ferramentas de APM (Datadog, Grafana, etc) devem ser configuradas para exibir:
1. **Custo Diário Agrupado por Modelo e Usuário/Tenant**.
2. **Taxa de Erro 429 (Rate Limit)**.
3. **Latência P95 e P99**.
4. **Volume Total de Tokens trafegados por minuto**.

---

# Critérios de Aceite

* [ ] Toda chamada LLM emite telemetria ou log estruturado com consumo de tokens.
* [ ] Tratamento explícito para erros 429 (Rate Limit) com backoff.
* [ ] Os spans não vazam dados restritos.
* [ ] Diferenciação clara entre falha de provedor, falha de infraestrutura e limitação de conta.

[Catálogo de regras](../README.md)
