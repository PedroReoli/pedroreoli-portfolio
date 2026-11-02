---
tipo: "regra_reolicode"
nome: "Regra — Regra de Commits"
camada: "30-workflow"
dominio: "workflow"
categoria: "regras_codigo"
prioridade: "obrigatoria"
tags: ["reoli","reolicode","30-workflow"]
hub_pai: "[[REOLI]]"
aliases: ["Regra de Commits"]
---

# Regra de Commits

## Objetivo

Manter um histórico curto, padronizado e fácil de consultar.

## Padrão

Use **Conventional Commits**:

`tipo(escopo): descrição`

O escopo é opcional.

Exemplos:

`feat(auth): adiciona recuperação de senha`

`fix(contato): corrige envio pelo WhatsApp`

`refactor(shared): centraliza hooks reutilizáveis`

`style(header): ajusta responsividade mobile`

## Tipos

Utilize:

* `feat` → nova funcionalidade
* `fix` → correção
* `refactor` → alteração estrutural sem mudar comportamento
* `perf` → performance
* `style` → interface ou formatação
* `docs` → documentação
* `test` → testes
* `build` → build ou dependências
* `ci` → pipeline
* `chore` → manutenção

Não invente novos tipos quando um existente representar corretamente a alteração.

## Escrita

* Descrição sempre em **Português do Brasil**.
* Seja curto, técnico e específico.
* Use verbo no presente ou imperativo, com tipo, escopo e descrição em minúsculas.
* Não use ponto final no título.
* Evite descrições genéricas.
* Use escopo quando ajudar a localizar a alteração.

Prefira:

`fix(auth): corrige expiração da sessão`

Evite:

`fix: ajustes`

## Granularidade

Um commit deve representar uma alteração lógica coerente.

Não agrupe mudanças independentes apenas porque foram realizadas juntas.

Não fragmente excessivamente uma única alteração em commits sem valor isolado.

## Corpo

Não adicione corpo por padrão.

Use somente quando existir contexto importante que não caiba claramente no título.

## Restrições

* Não adicionar coautoria automaticamente.
* Não inventar referência de issue, PR ou ticket.
* Não incluir informações sensíveis.
* Não criar commit sem solicitação ou autorização quando isso estiver fora do escopo.

## Resultado esperado

Commits pequenos e rastreáveis, com mensagens que permitam entender rapidamente **o tipo, o contexto e a alteração realizada**.

[Catálogo de regras](../README.md)
