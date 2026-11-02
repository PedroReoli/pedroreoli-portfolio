# AIsa — Referência Rápida para Agentes

> Guia compacto para agentes de IA operando neste workspace usarem o AIsa.

## Autenticação

A key está armazenada localmente em `~/.aisa/key`. Usar via:
- **CLI:** `aisa balance` (lê automaticamente)
- **HTTP:** Header `Authorization: Bearer <key>`
- **Env var:** `AISA_API_KEY` (sobrescreve a key armazenada se definida)

## Fluxo MCP (4 passos)

Para usar APIs de dados via MCP:

1. **`AISA_SEARCH_TOOL`** — Buscar a API/skill desejada
2. **`AISA_BATCH_GET_SCHEMA`** — Obter schema quando `has_full_schema: false`
3. **`AISA_BATCH_QUOTE`** — Obter cotação de preço (NÃO executa, NÃO é aprovação)
4. **`AISA_BATCH_USE`** — Executar a chamada (somente após aprovação do usuário)

> ⚠️ **Regra de ouro:** Quote não é aprovação. Nunca executar chamada paga sem aprovação explícita do usuário.

## Modelos Disponíveis

Consultar catálogo ao vivo:
```sh
aisa models
# ou
curl https://api.aisa.one/v1/models -H "Authorization: Bearer $(cat ~/.aisa/key)"
```

## Chamadas Pagas — Protocolo de Aprovação

Antes de qualquer chamada paga a endpoint de dados:

1. Ler a documentação do endpoint e pricing publicado
2. **PARAR** — Informar ao usuário:
   - Endpoint exato e escopo
   - Fórmula ou taxa
   - Exposição máxima documentada em USD
3. **ESPERAR** aprovação explícita em mensagem separada
4. Executar somente o request aprovado

**Proibido:**
- Usar chamada paga para testar disponibilidade
- Tratar o pedido inicial como consentimento
- Fazer chamada paga no turno de planejamento

## Links Úteis

| Recurso | URL |
|---------|-----|
| Docs Index | `https://aisa.one/docs/llms.txt` |
| API Reference | `https://aisa.one/docs/api-reference` |
| Pricing | `https://aisa.one/docs/guides/pricing` |
| Models | `https://aisa.one/docs/guides/models` |
| Agent Skills | `https://aisa.one/docs/agent-skills` |
| Console | `https://console.aisa.one` |
