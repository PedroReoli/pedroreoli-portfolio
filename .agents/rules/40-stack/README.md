---
tipo: "regra_reolicode"
nome: "Regra — Regras Específicas de Stack"
camada: "40-stack"
dominio: "stack"
categoria: "regras_codigo"
prioridade: "situacional"
tags: ["reoli","reolicode","40-stack"]
hub_pai: "[[REOLI]]"
aliases: ["Regras Específicas de Stack"]
---

# Regras Específicas de Stack

## Objetivo

Guardar regras que só fazem sentido quando uma tecnologia, framework ou banco específico existe no projeto.

## Quando usar

- use estas regras apenas se a stack correspondente estiver presente no repositório alvo
- não use uma regra de stack para contradizer fundação, arquitetura ou governança
- se a stack mudar, revise também a regra correspondente

## Ordem

1. regras universais de `00-foundation`
2. regras estruturais de `10-architecture`
3. regras de risco e qualidade de `20-governance`
4. regras condicionais de `40-stack`
5. regras de contexto e integração de `90-integrations`

## Arquivos

| Caminho | Papel |
| --- | --- |
| `frontend-web.md` | Regras para interfaces web e renderização de UI |
| `backend-api.md` | Regras para APIs, serviços e camadas de negócio |
| `database.md` | Regras para banco de dados, persistência e consultas |

## Resultado esperado

O catálogo ganha precisão por tecnologia sem perder a separação entre regra universal e regra condicional.

[Catálogo de regras](../README.md)
