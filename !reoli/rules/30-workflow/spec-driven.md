---
tipo: "regra_reolicode"
nome: "Regra — Regra de Spec-Driven Opcional"
camada: "30-workflow"
dominio: "workflow"
categoria: "regras_codigo"
prioridade: "condicional"
tags: ["reoli","reolicode","30-workflow"]
hub_pai: "[[REOLI]]"
aliases: ["Regra de Spec-Driven Opcional"]
---

# Regra de Spec-Driven Opcional

## Objetivo

Permitir que cada repositório tenha um modo leve de trabalho guiado por spec sem tornar isso obrigatório.

## Regras

- o modo spec-driven deve ser opcional por repositório
- antes de ativar, a ferramenta deve perguntar ao usuário se ele quer esse modo naquele repo
- quando ativado, o repositório instalado recebe um doc local e editável só dele
- o doc local deve guardar informações rápidas, decisões do projeto e observações específicas daquele repo
- o doc local não substitui regras permanentes nem documentação central
- o modo pode ser desligado sem afetar o catálogo global

## Resultado esperado

O repo ganha uma camada leve de contexto e decisão sem perder a separação entre regra global e memória local.

[Catálogo de regras](../README.md)
