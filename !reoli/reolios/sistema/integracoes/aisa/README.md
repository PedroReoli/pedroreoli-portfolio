# AIsa Integration — Reoli Suite

> Configuração e utilitários para integrar AIsa (APIs, Skills, LLMs) com a Reoli Suite.

## Status

- **CLI:** `@aisa-one/cli` v0.6.1 — instalada globalmente
- **Auth:** Key armazenada em `~/.aisa/key`
- **Saldo:** $1.00 USD
- **Key Limit:** Unlimited

## Estrutura

```
sistema/integracoes/aisa/
├── README.md              ← Este arquivo
├── config.json            ← Configuração de integração
└── docs/
    └── quickref.md        ← Guia de referência rápida para agentes
```

## Comandos Essenciais

```sh
# Verificar conexão
aisa balance

# Listar modelos disponíveis
aisa models

# Chat direto com modelo
aisa chat "sua pergunta aqui"

# Login (já feito)
aisa login --key <sua-key>
```

## Uso Programático (HTTP direto)

```sh
# Endpoint de Chat (OpenAI-compatible)
curl https://api.aisa.one/v1/chat/completions \
  -H "Authorization: Bearer $(cat ~/.aisa/key)" \
  -H "Content-Type: application/json" \
  -d '{"model": "gpt-4o-mini", "messages": [{"role": "user", "content": "Olá"}]}'

# Listar modelos
curl https://api.aisa.one/v1/models \
  -H "Authorization: Bearer $(cat ~/.aisa/key)"
```

## APIs de Dados Disponíveis

| API | Endpoint Base | Descrição |
|-----|--------------|-----------|
| Chat | `/v1/chat/completions` | Inference OpenAI-compatible |
| Search | `/apis/v1/youtube-search` | YouTube e Tavily |
| Perplexity | `/apis/v1/perplexity-sonar` | Respostas e deep research |
| Financial | `/apis/v1/prices` | Preços, fundamentals, filings |
| Twitter | `/apis/v1/twitter-user-info` | X/Twitter read/write |
| Scholar | `/apis/v1/scholar-search` | Pesquisa acadêmica |
| SimilarWeb | `/apis/v1/similarweb-*` | Inteligência digital |
| Prediction | `/apis/v1/polymarket-events` | Mercados de previsão |

## MCP (Machine Connect Protocol)

Para agentes cloud ou integrações avançadas:
```
URL: https://tools.aisa.one/mcp
Tipo: Streamable HTTP + OAuth
```

## Documentação Oficial

- [Agent Quickstart](https://aisa.one/docs/agent-quickstart)
- [API Reference](https://aisa.one/docs/api-reference)
- [Pricing](https://aisa.one/docs/guides/pricing)
- [Models](https://aisa.one/docs/guides/models)
- [Skills](https://aisa.one/docs/agent-skills)
- [Docs Index](https://aisa.one/docs/llms.txt)
